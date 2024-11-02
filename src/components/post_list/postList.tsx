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
  const mainPost = postList.filter((item, i) => i !== 0);

  return (
    <section className='mx-auto mt-12 w-full max-w-[950px] px-4'>
      {postList.map((post, index) => {
        if (index === 0) {
          return <Preview key={post.url + post.date} post={post} />;
        }
      })}

      <div className='mt-10'>
        <CategoryList
          allPostCount={allPostCount}
          categoryList={categoryList}
          currentCategory={category}
        />
      </div>
      <section>
        <ul className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12'>
          {mainPost.map((post) => (
            <Preview key={post.url + post.date} post={post} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default PostListPage;
