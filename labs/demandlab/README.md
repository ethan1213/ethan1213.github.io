# DemandLab

**MVP de investigación de ML aplicado a logística.** Convierte un CSV diario por SKU en un experimento auditable de pronóstico de demanda: modelo supervisado, referencia estacional, evaluación temporal y un informe HTML portable.

La demo utiliza datos **sintéticos**, no ventas de clientes. Su objetivo es demostrar ingeniería de datos, entrenamiento, prevención de fuga temporal y evaluación reproducible. No es un sistema validado para compras ni inventario real.

## Ejecutar en dos minutos

Python 3.10 o superior. Sin dependencias de ejecución, cuentas, API keys ni conexión a internet.

```bash
python -m demandlab demo
python -m unittest discover -s tests -v
```

Abra `artifacts/demo/index.html` en el navegador. El directorio también contiene `report.json` y `synthetic-demand.csv`. En el mismo entorno, la misma semilla y configuración producen los mismos datos, predicciones y JSON; no se insertan fechas de ejecución variables. Entre plataformas pueden aparecer diferencias de redondeo de punto flotante.

Opcionalmente puede servirlo con `python -m http.server 4184 --directory artifacts/demo --bind 127.0.0.1` y visitar `http://127.0.0.1:4184/`.

## Qué demuestra

- Un contrato de datos validado antes de entrenar, con errores legibles.
- Regresión ridge real: variables supervisadas, normalización aprendida en entrenamiento y ajuste de coeficientes por minimización cuadrática regularizada.
- Baseline estacional de siete días para contextualizar el modelo.
- Backtesting con ventanas expansivas, entrenamiento previo a cada corte y horizonte recursivo de catorce días. La segunda semana usa predicciones, no etiquetas futuras.
- MAE y WAPE por SKU, ventana y agregado, con valores completos y coeficientes exportados.
- Reporte estático con gráficos SVG, tablas accesibles y límites visibles.
- Prueba de fuga temporal: alterar las etiquetas futuras no cambia ni la normalización, ni los coeficientes, ni el primer pronóstico.

## Datos propios

```bash
python -m demandlab evaluate --csv ruta/demanda.csv --output artifacts/evaluacion
```

Contrato CSV UTF-8, encabezado exacto y en este orden:

```csv
date,sku,demand
2026-01-01,PACK-001,82.5
2026-01-02,PACK-001,87.0
```

`date` debe usar `YYYY-MM-DD`, `sku` debe tener de 1 a 80 caracteres y `demand` debe ser un número finito no negativo. Cada SKU necesita una fila diaria, sin duplicados ni días ausentes. El orden original no importa. Los datos no se imputan silenciosamente: un día sin registro podría significar cero demanda, una falla de captura o una tienda cerrada.

Con la configuración predeterminada se requieren **84 días por SKU**: 28 de historia para variables, 14 muestras mínimas para entrenar y tres bloques de 14 días para evaluar. La demo genera 210 días y tres SKU. El CSV de usuario se rotula como origen no verificado. El programa trabaja localmente; el informe incluye identificadores y demanda, por lo que debe revisarse antes de compartirlo.

## Diseño del experimento

| Elemento | Decisión |
| --- | --- |
| Unidad | Una serie diaria independiente por SKU |
| Modelo | Ridge, α=1 fijo; intercepto sin penalización |
| Variables | Tendencia, seno/coseno semanal, rezagos 7/14, medias móviles 7/28 |
| Normalización | Media y desviación calculadas solo en entrenamiento |
| Baseline | Repetición de la última semana disponible |
| Validación | Tres bloques finales consecutivos de 14 días, sin solapamiento de evaluación por SKU |
| Pronóstico | Recursivo; cada predicción alimenta la historia futura |
| Selección | No se eligen hiperparámetros usando los resultados de evaluación |
| Métricas | MAE en unidades de demanda; WAPE = error absoluto total / demanda total × 100 |
| WAPE con demanda total cero | `null` en JSON y «No definido» en HTML |

El entrenamiento del segundo bloque incorpora las observaciones del primer bloque, que ya serían historia en esa fecha. Cada SKU usa sus últimas ventanas disponibles, por lo que calendarios diferentes producen cortes diferentes. El agregado combina todas las observaciones de evaluación y no promedia porcentajes de los SKU.

Opciones: `--seed 20260907`, `--days 210` (solo demo), `--folds 3`, `--horizon 14`, `--alpha 1.0`. Variar α después de inspeccionar resultados transforma esos bloques en validación exploratoria: reserve otro bloque final antes de afirmar rendimiento fuera de muestra.

## Evidencia y recorrido de demostración

1. Ejecute la demo y las pruebas; muestre que no requiere servicios externos.
2. Abra el HTML y explique la etiqueta de datos sintéticos.
3. Compare el MAE del modelo y la referencia. Un resultado peor también es un resultado válido.
4. Abra la auditoría de fechas y la tabla de valores de un gráfico.
5. Abra el JSON: hash del dataset, configuraciones, coeficientes, métricas y límites.
6. Ejecute el test de modificación de etiquetas futuras para explicar cómo se verifica la ausencia de fuga.

`evidence/demo-summary.json` registra una corrida sintética de referencia, su configuración y las métricas obtenidas. `python scripts/verify_mvp.py` ejecuta las pruebas, regenera la demo y guarda este resumen únicamente si todo pasa; el HTML completo no necesita estar versionado.

## Límites y siguiente piloto

Este MVP no modela quiebres de stock, devoluciones, promociones, festivos, lead time, costos de inventario ni intervalos de incertidumbre. La demanda sintética tiene tendencias y estacionalidad conocidas; sus resultados favorecen supuestos explícitos del experimento y no prueban generalización comercial. No se toman decisiones automáticas de compra.

Para un piloto: acordar una métrica de negocio y el horizonte de reposición; auditar ventas frente a demanda censurada; añadir covariables disponibles en la fecha de decisión; comparar más baselines; reservar una evaluación temporal final; medir por SKU y segmento; agregar intervalos y monitoreo de degradación. Cualquier afirmación de reducción de costo requiere medirla en ese piloto.

## Estructura

```text
demandlab/core.py       contrato, features, ridge, baseline, evaluación
demandlab/report.py     informe HTML/SVG autocontenido
demandlab/__main__.py   CLI demo/evaluate
tests/                 contratos, métricas, temporalidad y exportación
evidence/              resumen de ejecución reproducible
scripts/verify_mvp.py   verificación completa y regeneración de evidencia
```

Estado: **MVP de investigación ejecutable localmente**, pendiente de validación con datos operacionales y de revisión externa. No implica certificación profesional ni garantía de contratación.
