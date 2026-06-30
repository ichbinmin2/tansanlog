"use client";

import { useEffect, useRef } from "react";

import { useTheme } from "next-themes";

const repoName = process.env.NEXT_PUBLIC_GISCUS_REPO_NAME || "";
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "";
const categoryName =
  process.env.NEXT_PUBLIC_GISCUS_CATEGORY_NAME || "Comments";
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "";
const isGiscusDisabled = process.env.NEXT_PUBLIC_GISCUS_ENABLED === "false";

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const hasGiscusConfig =
    !isGiscusDisabled && repoName !== "" && repoId !== "" && categoryId !== "";

  // https://github.com/giscus/giscus/tree/main/styles/themes
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    if (!hasGiscusConfig) return;
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", repoName);
    scriptElem.setAttribute("data-repo-id", repoId);
    scriptElem.setAttribute("data-category", categoryName);
    scriptElem.setAttribute("data-category-id", categoryId);
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", theme);
    scriptElem.setAttribute("data-lang", "ko");

    ref.current.appendChild(scriptElem);
  }, [hasGiscusConfig, theme]);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    if (!hasGiscusConfig) return;

    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }, [hasGiscusConfig, theme]);

  if (!hasGiscusConfig) {
    if (process.env.NODE_ENV !== "development") return null;

    return (
      <section className='not-prose rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm leading-6 text-yellow-900'>
        Giscus 설정이 비어 있습니다. 댓글을 확인하려면
        NEXT_PUBLIC_GISCUS_REPO_NAME, REPO_ID, CATEGORY_ID를 설정해주세요.
      </section>
    );
  }

  return <section ref={ref} className='giscus' />;
}
