"""Carga estricta de corpus y evaluaciones sintéticas versionadas."""

import hashlib
import json
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Document:
    id: str
    title: str
    text: str
    source: str


@dataclass(frozen=True)
class Question:
    id: str
    question: str
    gold_document_ids: tuple[str, ...]
    answerable: bool


def file_digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def _rows(path: Path) -> list[dict]:
    rows = []
    for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        try:
            row = json.loads(line)
        except json.JSONDecodeError as exc:
            raise ValueError(f"JSON inválido en línea {line_number}: {exc.msg}") from exc
        if not isinstance(row, dict):
            raise ValueError(f"Se esperaba un objeto en línea {line_number}")
        rows.append(row)
    if not rows:
        raise ValueError("El archivo no contiene registros")
    return rows


def _required_text(row: dict, field: str) -> str:
    value = row.get(field)
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"Campo de texto obligatorio inválido: {field}")
    return value


def load_corpus(path: Path) -> list[Document]:
    documents = []
    identifiers = set()
    for row in _rows(path):
        identifier = _required_text(row, "id")
        if identifier in identifiers:
            raise ValueError(f"Documento duplicado: {identifier}")
        if row.get("synthetic") is not True:
            raise ValueError("Este MVP solo admite documentos marcados synthetic: true")
        identifiers.add(identifier)
        documents.append(Document(identifier, *(_required_text(row, key) for key in ("title", "text", "source"))))
    return documents


def load_questions(path: Path, document_ids: set[str]) -> list[Question]:
    questions = []
    identifiers = set()
    for row in _rows(path):
        identifier = _required_text(row, "id")
        if identifier in identifiers:
            raise ValueError(f"Pregunta duplicada: {identifier}")
        identifiers.add(identifier)
        query = _required_text(row, "question")
        gold = row.get("gold_document_ids")
        answerable = row.get("answerable")
        if not isinstance(answerable, bool) or not isinstance(gold, list) or any(not isinstance(item, str) for item in gold):
            raise ValueError(f"Etiquetas inválidas: {identifier}")
        if len(gold) != len(set(gold)) or bool(gold) != answerable or not set(gold) <= document_ids:
            raise ValueError(f"Referencias de evaluación inconsistentes: {identifier}")
        questions.append(Question(identifier, query, tuple(gold), answerable))
    return questions
