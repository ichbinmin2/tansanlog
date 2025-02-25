import { Metadata } from "next";
import { baseDomain } from "@/config/const";
import {
  getPostDetail,
  getPostPaths,
  parsePostAbstract,
  parseToc,
} from "@/lib/post";
import { PostHeader } from "@/components/post_detail/postHeader";
import TableOfContentTop from "@/components/post_detail/tableTop";
import TableOfContent from "@/components/post_detail/tableOfContent";
import { PostBody } from "@/components/post_detail/postBody";
import Giscus from "@/components/post_detail/giscus";

type Props = {
  params: { category: string; slug: string };
};

// 허용된 param 외 접근시 404
export const dynamicParams = false;

export async function generateMetadata({
  params: { category, slug },
}: Props): Promise<Metadata> {
  const post = await getPostDetail(category, slug);

  const title = `${post.title} | tasanlog`;
  const imageURL = `${baseDomain}${post.thumbnail}`;

  return {
    title,
    description: post.desc,

    openGraph: {
      title,
      description: post.desc,
      type: "article",
      publishedTime: post.date?.toISOString(),
      url: `${baseDomain}${post.url}`,
      images: [imageURL],
    },
    twitter: {
      title,
      description: post.desc,
      images: [imageURL],
    },
  };
}

export function generateStaticParams() {
  const postPaths: string[] = getPostPaths();
  const paramList = postPaths
    .map((path) => parsePostAbstract(path))
    .map((item) => ({ category: item.categoryPath, slug: item.slug }));
  return paramList;
}

const PostDetail = async ({ params: { category, slug } }: Props) => {
  const post = await getPostDetail(category, slug);
  const toc = parseToc(post.content);

  return (
    <div className='prose mx-auto w-full max-w-[750px] px-5 dark:prose-invert sm:px-6'>
      <PostHeader post={post} />
      <TableOfContentTop toc={toc} />
      <article className='relative'>
        <TableOfContent toc={toc} />
        <PostBody post={post} />
      </article>
      <hr />
      <Giscus />
    </div>
  );
};

export default PostDetail;
