"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Copy,
  Download,
  Eye,
  FileText,
  FolderOpen,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  LogOut,
  Save,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ADMIN_DRAFT_STORAGE_KEY,
  AdminPostSummary,
  BlogDraft,
  buildAssetPath,
  buildMdx,
  buildPostPath,
  createDefaultDraft,
  createSlug,
  EditorAsset,
  parseMdxDraft,
} from "@/lib/adminEditor";
import { PreviewRenderer } from "./previewRenderer";

type DirectoryHandle = {
  getDirectoryHandle: (
    name: string,
    options?: { create?: boolean }
  ) => Promise<DirectoryHandle>;
  getFileHandle: (
    name: string,
    options?: { create?: boolean }
  ) => Promise<{
    createWritable: () => Promise<{
      write: (data: string | Blob) => Promise<void>;
      close: () => Promise<void>;
    }>;
  }>;
};

const insertPairs = {
  bold: ["**", "**"],
  italic: ["*", "*"],
  code: ["`", "`"],
} as const;

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const getYoutubeEmbedUrl = (url: string) => {
  const id =
    url.match(/[?&]v=([^&]+)/)?.[1] ||
    url.match(/youtu\.be\/([^?]+)/)?.[1] ||
    url.match(/youtube\.com\/shorts\/([^?]+)/)?.[1];

  return id ? `https://www.youtube.com/embed/${id}` : url;
};

interface PostEditorProps {
  existingPosts: AdminPostSummary[];
}

export const PostEditor = ({ existingPosts }: PostEditorProps) => {
  const [draft, setDraft] = useState<BlogDraft>(() => createDefaultDraft());
  const [assets, setAssets] = useState<EditorAsset[]>([]);
  const [message, setMessage] = useState("");
  const [saveStep, setSaveStep] = useState<"idle" | "saved" | "downloaded">(
    "idle"
  );
  const [editorMode, setEditorMode] = useState<"write" | "preview" | "source">(
    "write"
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mdxInputRef = useRef<HTMLInputElement>(null);

  const mdx = useMemo(() => buildMdx(draft), [draft]);
  const postPath = useMemo(() => buildPostPath(draft), [draft]);
  const firstBodyImage = useMemo(
    () => draft.body.match(/!\[[^\]]*]\(([^)]+)\)/)?.[1] || "",
    [draft.body]
  );
  const validationItems = useMemo(() => {
    const title = draft.title.trim();
    const desc = draft.desc.trim();
    const slug = draft.slug.trim();
    const category = draft.category.trim();
    const duplicateSlug = existingPosts.find(
      (post) => post.categoryPath === category && post.slug === slug
    );
    const duplicateTitleDate = existingPosts.find(
      (post) =>
        post.categoryPath === category &&
        post.title === title &&
        post.date === draft.date
    );

    return [
      { ok: title !== "", label: "제목 입력" },
      { ok: desc !== "", label: "설명 입력" },
      { ok: slug !== "", label: "slug 입력" },
      { ok: category !== "", label: "카테고리 입력" },
      {
        ok: !duplicateSlug,
        label: duplicateSlug
          ? `같은 slug 글 존재: ${duplicateSlug.url}`
          : "같은 slug 없음",
      },
      {
        ok: !duplicateTitleDate,
        label: duplicateTitleDate
          ? `같은 제목/날짜 글 존재: ${duplicateTitleDate.url}`
          : "같은 제목/날짜 없음",
      },
      {
        ok: /^##\s+/.test(draft.body.trim()),
        label: "본문 첫 제목(##) 입력",
      },
      {
        ok:
          draft.thumbnail.trim() === "" ||
          draft.thumbnail.startsWith("/") ||
          draft.thumbnail.startsWith("http"),
        label: "썸네일 경로 형식 확인",
      },
    ];
  }, [draft, existingPosts]);
  const hasBlockingValidation = validationItems.some((item) => !item.ok);

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(ADMIN_DRAFT_STORAGE_KEY);
    if (savedDraft) {
      setDraft(JSON.parse(savedDraft));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(ADMIN_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  const updateDraft = (value: Partial<BlogDraft>) => {
    setDraft((prev) => ({ ...prev, ...value }));
  };

  const updateField =
    (key: keyof BlogDraft) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateDraft({ [key]: event.target.value });
    };

  const replaceSelection = (nextValue: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const body =
      draft.body.slice(0, start) + nextValue + draft.body.slice(end);

    updateDraft({ body });
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + nextValue.length);
    });
  };

  const wrapSelection = (before: string, after = before) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = draft.body.slice(start, end) || "텍스트";
    replaceSelection(`${before}${selected}${after}`);
  };

  const prefixLine = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = draft.body.lastIndexOf("\n", start - 1) + 1;
    const nextBody =
      draft.body.slice(0, lineStart) + prefix + draft.body.slice(lineStart);
    updateDraft({ body: nextBody });
    requestAnimationFrame(() => textarea.focus());
  };

  const wrapAlignedParagraph = (align: "left" | "center" | "right") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = draft.body.slice(start, end) || "정렬할 문장";
    replaceSelection(`<p style={{ textAlign: "${align}" }}>${selected}</p>`);
  };

  const insertImageByUrl = () => {
    const url = window.prompt("이미지 URL 또는 public 경로를 입력하세요.");
    if (!url) return;

    const alt = window.prompt("이미지 설명을 입력하세요.", draft.title) || "";
    replaceSelection(`![${alt}](${url})`);
  };

  const insertVideo = () => {
    const url = window.prompt("YouTube 또는 영상 URL을 입력하세요.");
    if (!url) return;

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      replaceSelection(
        `<iframe src="${getYoutubeEmbedUrl(url)}" title="video" allowFullScreen style={{ width: "100%", aspectRatio: "16 / 9", border: 0 }}></iframe>`
      );
      return;
    }

    replaceSelection(`<video controls src="${url}" style={{ width: "100%" }} />`);
  };

  const handleImageFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const path = buildAssetPath(draft.category, file.name);
    const dataUrl = await readFileAsDataUrl(file);
    setAssets((prev) => [...prev, { name: file.name, path, dataUrl }]);
    replaceSelection(`![${file.name}](${path})`);
    updateDraft({ thumbnail: draft.thumbnail || path });
    event.target.value = "";
  };

  const copyMdx = async () => {
    await window.navigator.clipboard.writeText(mdx);
    setMessage("MDX 원문을 클립보드에 복사했습니다.");
  };

  const downloadMdx = () => {
    const blob = new Blob([mdx], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "content.mdx";
    link.click();
    URL.revokeObjectURL(url);
    setSaveStep("downloaded");
    setMessage(`${postPath} 위치에 넣을 content.mdx를 다운로드했습니다.`);
  };

  const writeFile = async (
    root: DirectoryHandle,
    pathSegments: string[],
    content: string | Blob
  ) => {
    const fileName = pathSegments.at(-1);
    if (!fileName) return;

    let current = root;
    for (const segment of pathSegments.slice(0, -1)) {
      current = await current.getDirectoryHandle(segment, { create: true });
    }

    const file = await current.getFileHandle(fileName, { create: true });
    const writable = await file.createWritable();
    await writable.write(content);
    await writable.close();
  };

  const saveToProject = async () => {
    if (hasBlockingValidation) {
      setMessage("발행 전 검증 항목을 먼저 확인해주세요.");
      return;
    }

    const picker = (window as any).showDirectoryPicker as
      | (() => Promise<DirectoryHandle>)
      | undefined;

    if (!picker) {
      setMessage("이 브라우저는 로컬 폴더 저장을 지원하지 않습니다.");
      return;
    }

    const root = await picker();
    await writeFile(root, postPath.split("/"), mdx);

    for (const asset of assets) {
      const response = await fetch(asset.dataUrl);
      const blob = await response.blob();
      await writeFile(
        root,
        ["public", "posts", draft.category || "diary", asset.name],
        blob
      );
    }

    setMessage(`프로젝트 폴더에 ${postPath} 파일을 저장했습니다.`);
    setSaveStep("saved");
  };

  const applyTitleToSlug = () => {
    updateDraft({ slug: createSlug(draft.title) });
  };

  const applyFirstImageAsThumbnail = () => {
    if (!firstBodyImage) {
      setMessage("본문에서 먼저 이미지를 추가해주세요.");
      return;
    }

    updateDraft({ thumbnail: firstBodyImage });
    setMessage("본문의 첫 번째 이미지를 썸네일로 설정했습니다.");
  };

  const handleMdxFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const loadedDraft = parseMdxDraft(await file.text());
    updateDraft(loadedDraft);
    setMessage(`${file.name} 파일을 에디터로 불러왔습니다.`);
    event.target.value = "";
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <section className='mx-auto w-full max-w-7xl px-5 pb-24 pt-16 sm:px-8 lg:pt-24'>
      <div className='mb-8 flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-end lg:justify-between'>
        <div>
          <p className='text-sm font-semibold text-green-700'>Admin</p>
          <h1 className='mt-2 text-3xl font-semibold'>블로그 글쓰기 에디터</h1>
          <p className='mt-3 max-w-2xl text-sm leading-7 text-neutral-600 dark:text-neutral-300'>
            서버 없이 MDX 파일을 만들고, 지원 브라우저에서는 프로젝트 폴더에
            직접 저장할 수 있습니다.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button variant='outline' onClick={copyMdx}>
            <Copy className='mr-2 size-4' />
            복사
          </Button>
          <Button variant='outline' onClick={downloadMdx}>
            <Download className='mr-2 size-4' />
            MDX 다운로드
          </Button>
          <Button
            variant='outline'
            onClick={() => mdxInputRef.current?.click()}
          >
            <FolderOpen className='mr-2 size-4' />
            MDX 불러오기
          </Button>
          <Button asChild variant='outline'>
            <Link href='/admin/preview'>
              <Eye className='mr-2 size-4' />
              전체 미리보기
            </Link>
          </Button>
          <Button onClick={saveToProject}>
            <Save className='mr-2 size-4' />
            프로젝트에 저장
          </Button>
          <Button variant='ghost' onClick={logout}>
            <LogOut className='mr-2 size-4' />
            로그아웃
          </Button>
          <input
            ref={mdxInputRef}
            type='file'
            accept='.md,.mdx,text/markdown'
            className='hidden'
            onChange={handleMdxFile}
          />
        </div>
      </div>

      <div className='space-y-6'>
        <aside className='grid gap-4 rounded-md border p-4 lg:grid-cols-4'>
          <label className='block text-sm font-medium'>
            제목
            <input
              value={draft.title}
              onChange={updateField("title")}
              className='mt-2 h-10 w-full rounded-md border bg-background px-3 text-sm'
              placeholder='글 제목'
            />
          </label>
          <label className='block text-sm font-medium lg:col-span-2'>
            설명
            <input
              value={draft.desc}
              onChange={updateField("desc")}
              className='mt-2 h-10 w-full rounded-md border bg-background px-3 text-sm'
              placeholder='목록과 메타데이터에 보일 설명'
            />
          </label>
          <label className='block text-sm font-medium'>
            카테고리
            <input
              value={draft.category}
              onChange={updateField("category")}
              className='mt-2 h-10 w-full rounded-md border bg-background px-3 text-sm'
            />
          </label>
          <label className='block text-sm font-medium'>
            날짜
            <input
              type='date'
              value={draft.date}
              onChange={updateField("date")}
              className='mt-2 h-10 w-full rounded-md border bg-background px-3 text-sm'
            />
          </label>
          <label className='block text-sm font-medium'>
            슬러그
            <div className='mt-2 flex gap-2'>
              <input
                value={draft.slug}
                onChange={updateField("slug")}
                className='h-10 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm'
              />
              <Button type='button' variant='outline' onClick={applyTitleToSlug}>
                생성
              </Button>
            </div>
          </label>
          <label className='block text-sm font-medium'>
            썸네일
            <input
              value={draft.thumbnail}
              onChange={updateField("thumbnail")}
              className='mt-2 h-10 w-full rounded-md border bg-background px-3 text-sm'
              placeholder='/posts/diary/image.png'
            />
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='mt-2'
              onClick={applyFirstImageAsThumbnail}
            >
              첫 이미지로 설정
            </Button>
          </label>
          <div className='rounded-md border bg-secondary p-4 text-sm leading-7 lg:col-span-2'>
            <p className='font-medium'>저장 위치</p>
            <p className='mt-2 break-all text-neutral-600 dark:text-neutral-300'>
              {postPath}
            </p>
            {assets.length > 0 && (
              <p className='mt-3 text-neutral-600 dark:text-neutral-300'>
                선택한 이미지 {assets.length}개는 프로젝트 저장 시
                public/posts/{draft.category}/ 경로에 함께 저장됩니다.
              </p>
            )}
          </div>
          <div className='rounded-md border p-4 text-sm leading-7 lg:col-span-2'>
            <p className='font-medium'>저장 후 체크</p>
            <ul className='mt-2 space-y-1 text-neutral-600 dark:text-neutral-300'>
              <li>
                {saveStep === "saved" || saveStep === "downloaded" ? "✓" : "○"}{" "}
                content.mdx 생성
              </li>
              <li>
                {assets.length > 0 && saveStep === "saved" ? "✓" : "○"} 이미지{" "}
                {assets.length}개 저장 확인
              </li>
              <li>○ git commit / push 후 배포 확인</li>
            </ul>
          </div>
          <div className='rounded-md border p-4 text-sm leading-7 lg:col-span-2'>
            <p className='font-medium'>발행 전 검증</p>
            <ul className='mt-2 space-y-1 text-neutral-600 dark:text-neutral-300'>
              {validationItems.map((item) => (
                <li
                  key={item.label}
                  className={item.ok ? "" : "font-medium text-red-600"}
                >
                  {item.ok ? "✓" : "!"} {item.label}
                </li>
              ))}
            </ul>
          </div>
          {message && (
            <p className='rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800 lg:col-span-4'>
              {message}
            </p>
          )}
        </aside>

        <div className='min-w-0'>
          <div className='mb-3 flex flex-wrap items-center gap-2 rounded-md border p-2'>
            <Button variant='ghost' size='icon' onClick={() => prefixLine("## ")}>
              <Heading2 size={16} />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => prefixLine("### ")}>
              <Heading3 size={16} />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => wrapSelection(...insertPairs.bold)}
            >
              <Bold size={16} />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => wrapSelection(...insertPairs.italic)}
            >
              <Italic size={16} />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => wrapSelection(...insertPairs.code)}
            >
              <Code2 size={16} />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => prefixLine("- ")}>
              <List size={16} />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => prefixLine("1. ")}>
              <ListOrdered size={16} />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => wrapAlignedParagraph("left")}
            >
              <AlignLeft size={16} />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => wrapAlignedParagraph("center")}
            >
              <AlignCenter size={16} />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => wrapAlignedParagraph("right")}
            >
              <AlignRight size={16} />
            </Button>
            <Button variant='ghost' size='icon' onClick={insertImageByUrl}>
              <ImageIcon size={16} />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => imageInputRef.current?.click()}
            >
              <FileText size={16} />
            </Button>
            <Button variant='ghost' size='icon' onClick={insertVideo}>
              <Video size={16} />
            </Button>
            <div className='ml-auto flex rounded-md border p-1'>
              <Button
                variant={editorMode === "write" ? "secondary" : "ghost"}
                size='sm'
                onClick={() => setEditorMode("write")}
              >
                작성
              </Button>
              <Button
                variant={editorMode === "preview" ? "secondary" : "ghost"}
                size='sm'
                onClick={() => setEditorMode("preview")}
              >
                미리보기
              </Button>
              <Button
                variant={editorMode === "source" ? "secondary" : "ghost"}
                size='sm'
                onClick={() => setEditorMode("source")}
              >
                MDX 원문
              </Button>
            </div>
            <input
              ref={imageInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageFile}
            />
          </div>

          <div>
            <textarea
              ref={textareaRef}
              value={draft.body}
              onChange={updateField("body")}
              className={
                editorMode === "write"
                  ? "min-h-[760px] w-full resize-y rounded-md border bg-background p-5 font-mono text-sm leading-7 outline-none focus:ring-2 focus:ring-ring"
                  : "hidden"
              }
              spellCheck={false}
            />
            <div
              className={
                editorMode === "preview"
                  ? "min-h-[760px] overflow-auto rounded-md border bg-background py-6"
                  : "hidden"
              }
            >
              <PreviewRenderer draft={draft} mode='body' />
            </div>
            <pre
              className={
                editorMode === "source"
                  ? "min-h-[760px] overflow-auto whitespace-pre-wrap rounded-md border bg-neutral-950 p-5 text-sm leading-7 text-neutral-50"
                  : "hidden"
              }
            >
              {mdx}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
