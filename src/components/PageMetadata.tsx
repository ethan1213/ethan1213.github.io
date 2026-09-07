import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCaseStudy } from "../data/caseStudies";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL } from "../data/siteMetadata";

export function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const study = getCaseStudy(pathname.replace(/^\/proyectos\//, "").replace(/\/$/, ""));
    const title = study ? `${study.name} | Ethan Astorga · AI Engineer` : HOME_TITLE;
    const description = study?.summary ?? HOME_DESCRIPTION;
    const url = study ? `${SITE_URL}/proyectos/${study.slug}/` : `${SITE_URL}/`;
    document.title = title;
    for (const [selector, content] of [["meta[name='description']", description], ["meta[property='og:title']", title], ["meta[property='og:description']", description], ["meta[property='og:url']", url], ["meta[name='twitter:title']", title], ["meta[name='twitter:description']", description]]) document.querySelector(selector)?.setAttribute("content", content);
    document.querySelector("link[rel='canonical']")?.setAttribute("href", url);
  }, [pathname]);
  return null;
}
