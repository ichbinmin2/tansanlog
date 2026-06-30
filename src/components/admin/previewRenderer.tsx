"use client";

import { BlogDraft } from "@/lib/adminEditor";

interface PreviewRendererProps {
  draft: BlogDraft;
  mode?: "article" | "body";
}

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const renderInline = (value: string) => {
  const escaped = escapeHtml(value);

  return escaped
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
    );
};

const isRawHtmlLine = (line: string) =>
  /^<\/?(iframe|video|p|span|div|br|table|thead|tbody|tr|td|th)/.test(
    line.trim()
  );

const toPreviewHtml = (line: string) =>
  line
    .replace(/style=\{\{\s*textAlign:\s*"([^"]+)"\s*\}\}/g, 'style="text-align:$1"')
    .replace(
      /style=\{\{\s*width:\s*"([^"]+)"\s*,\s*aspectRatio:\s*"([^"]+)"\s*,\s*border:\s*0\s*\}\}/g,
      'style="width:$1;aspect-ratio:$2;border:0"'
    )
    .replace(/style=\{\{\s*width:\s*"([^"]+)"\s*\}\}/g, 'style="width:$1"')
    .replace(/\sallowFullScreen/g, " allowfullscreen")
    .replace(/<video([^>]*)\/>/g, "<video$1></video>");

const flushParagraph = (html: string[], paragraph: string[]) => {
  if (paragraph.length === 0) return;
  html.push(`<p>${paragraph.map(renderInline).join("<br />")}</p>`);
  paragraph.length = 0;
};

export const renderEditorMarkdown = (source: string) => {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  const paragraph: string[] = [];
  let listItems: string[] = [];
  let orderedItems: string[] = [];
  let codeLines: string[] = [];
  let inCode = false;

  const flushList = () => {
    if (listItems.length > 0) {
      html.push(`<ul>${listItems.join("")}</ul>`);
      listItems = [];
    }
    if (orderedItems.length > 0) {
      html.push(`<ol>${orderedItems.join("")}</ol>`);
      orderedItems = [];
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        flushParagraph(html, paragraph);
        flushList();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeLines.push(line);
      return;
    }

    if (line.trim() === "") {
      flushParagraph(html, paragraph);
      flushList();
      return;
    }

    if (isRawHtmlLine(line)) {
      flushParagraph(html, paragraph);
      flushList();
      html.push(toPreviewHtml(line));
      return;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph(html, paragraph);
      flushList();
      html.push(
        `<img src="${escapeHtml(image[2])}" alt="${escapeHtml(image[1])}" />`
      );
      if (image[1]) html.push(`<span>${escapeHtml(image[1])}</span>`);
      return;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph(html, paragraph);
      flushList();
      html.push("<hr />");
      return;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph(html, paragraph);
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      return;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph(html, paragraph);
      orderedItems = [];
      listItems.push(`<li>${renderInline(unordered[1])}</li>`);
      return;
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph(html, paragraph);
      listItems = [];
      orderedItems.push(`<li>${renderInline(ordered[1])}</li>`);
      return;
    }

    const quote = line.match(/^>\s+(.+)$/);
    if (quote) {
      flushParagraph(html, paragraph);
      flushList();
      html.push(`<blockquote><p>${renderInline(quote[1])}</p></blockquote>`);
      return;
    }

    paragraph.push(line);
  });

  flushParagraph(html, paragraph);
  flushList();

  return html.join("\n");
};

export const PreviewRenderer = ({
  draft,
  mode = "article",
}: PreviewRendererProps) => {
  return (
    <article className='prose mx-auto w-full max-w-[750px] px-5 dark:prose-invert sm:px-6'>
      {mode === "article" && (
        <header className='mt-14 text-center'>
          <h1 className='mb-5 text-3xl'>{draft.title || "Untitled"}</h1>
          <div className='mb-3 text-base'>
            <span className='font-semibold text-green-700'>
              {draft.category || "diary"}
            </span>
          </div>
          <div className='flex justify-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
            <span>{draft.date}</span>
            <span>{Math.max(1, Math.ceil(draft.body.length / 500))}분</span>
          </div>
          <hr className='mt-5' />
        </header>
      )}
      <div
        className='admin-preview'
        dangerouslySetInnerHTML={{ __html: renderEditorMarkdown(draft.body) }}
      />
    </article>
  );
};
