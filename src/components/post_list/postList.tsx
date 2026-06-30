import CategoryList from "./categoryList";
import Preview from "./preview";
import SearchablePostGrid from "./searchablePostGrid";
import {
  getCategoryDetailList,
  getSortedPostList,
  getUniquePostList,
} from "@/lib/post";

interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const postList = getUniquePostList(await getSortedPostList(category));
  const categoryList = await getCategoryDetailList();
  const [featuredPost, ...remainingPosts] = postList;

  return (
    <section className='mx-auto mt-40 mb-24 w-full max-w-[1200px] px-4'>
      {featuredPost && (
        <div className='mx-auto max-w-[960px]'>
          <Preview
            key={featuredPost.url + featuredPost.date}
            post={featuredPost}
            variant='featured'
          />
        </div>
      )}

      <div className='mt-10'>
        <CategoryList
          allPostCount={postList.length}
          categoryList={categoryList}
          currentCategory={category}
        />
      </div>
      <SearchablePostGrid posts={remainingPosts} />
    </section>
  );
};

export default PostListPage;
