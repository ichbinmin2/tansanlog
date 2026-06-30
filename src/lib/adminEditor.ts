export interface BlogDraft {
  title: string;
  date: string;
  desc: string;
  category: string;
  slug: string;
  thumbnail: string;
  body: string;
}

export interface EditorAsset {
  name: string;
  path: string;
  dataUrl: string;
}

export const ADMIN_DRAFT_STORAGE_KEY = "tansanlog:admin-draft";

export const createTodayString = () => new Date().toISOString().slice(0, 10);

export const createSlug = (value: string) => {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || createTodayString().replaceAll("-", "");
};

export const createDefaultDraft = (): BlogDraft => ({
  title: "",
  date: createTodayString(),
  desc: "",
  category: "diary",
  slug: createTodayString().slice(2).replace("-", ""),
  thumbnail: "/posts/diary/diary2.png",
  body: [
    "## 제목을 입력하세요",
    "",
    "본문을 작성하면 오른쪽 미리보기와 전체 미리보기에서 실제 글과 비슷한 스타일로 확인할 수 있습니다.",
  ].join("\n"),
});

export const buildMdx = (draft: BlogDraft) => {
  const title = draft.title.trim() || "Untitled";
  const desc = draft.desc.trim() || title;
  const thumbnail = draft.thumbnail.trim();

  return [
    "---",
    `title: ${title}`,
    `date: ${draft.date}`,
    `desc: ${desc}`,
    `thumbnail: ${thumbnail}`,
    "---",
    "",
    draft.body.trim(),
    "",
  ].join("\n");
};

export const buildPostPath = (draft: BlogDraft) =>
  `src/posts/${draft.category || "diary"}/${draft.slug || createSlug(draft.title)}/content.mdx`;

export const buildAssetPath = (category: string, fileName: string) =>
  `/posts/${category || "diary"}/${fileName}`;

