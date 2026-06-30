import CategoryList from "./categoryList";
import Preview from "./preview";
import {
  getAllPostCount,
  getCategoryDetailList,
  getSortedPostList,
} from "@/lib/post";

interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const postList = await getSortedPostList(category);
  const categoryList = await getCategoryDetailList();
  const allPostCount = await getAllPostCount();
  const [featuredPost, ...remainingPosts] = postList;

  return (
    <section className='mx-auto mt-40 mb-24 w-full max-w-[1200px] px-4'>
      {featuredPost && (
        <div className='mx-auto max-w-[960px]'>
          <Preview key={featuredPost.url + featuredPost.date} post={featuredPost} />
        </div>
      )}

      <div className='mt-10'>
        <CategoryList
          allPostCount={allPostCount}
          categoryList={categoryList}
          currentCategory={category}
        />
      </div>
      <section>
        <ul className='grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12'>
          {remainingPosts.map((post) => {
            return <Preview key={post.url + post.date} post={post} />;
          })}
        </ul>
      </section>
    </section>
  );
};

export default PostListPage;
