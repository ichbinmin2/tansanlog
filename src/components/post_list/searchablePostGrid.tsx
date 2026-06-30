"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Post } from "@/config/types";
import Preview from "./preview";

interface SearchablePostGridProps {
  posts: Post[];
}

const SearchablePostGrid = ({ posts }: SearchablePostGridProps) => {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) return posts;

    return posts.filter((post) =>
      [
        post.title,
        post.desc,
        post.categoryPublicName,
        post.categoryPath,
        post.dateString,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery, posts]);

  return (
    <section>
      <label className='mb-8 flex h-11 items-center gap-2 rounded-md border px-3 text-sm'>
        <Search className='size-4 text-neutral-500' />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className='min-w-0 flex-1 bg-transparent outline-none'
          placeholder='글 제목, 설명, 카테고리 검색'
        />
      </label>

      {filteredPosts.length > 0 ? (
        <ul className='grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12'>
          {filteredPosts.map((post) => {
            return <Preview key={post.url + post.date} post={post} />;
          })}
        </ul>
      ) : (
        <p className='rounded-md border p-6 text-center text-sm text-neutral-500'>
          검색 결과가 없습니다.
        </p>
      )}
    </section>
  );
};

export default SearchablePostGrid;

