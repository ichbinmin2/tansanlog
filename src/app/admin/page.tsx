import { PostEditor } from "@/components/admin/postEditor";
import { getSortedPostList } from "@/lib/post";

export const metadata = {
  title: "Admin Editor | Tansanlog",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const existingPosts = (await getSortedPostList()).map((post) => ({
    categoryPath: post.categoryPath,
    slug: post.slug,
    title: post.title,
    date:
      post.date instanceof Date
        ? post.date.toISOString().slice(0, 10)
        : String(post.date).slice(0, 10),
    url: post.url,
  }));

  return <PostEditor existingPosts={existingPosts} />;
}
