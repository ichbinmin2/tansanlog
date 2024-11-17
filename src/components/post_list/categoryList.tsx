"use client";

import { useRouter } from "next/navigation";

import { CategoryDetail } from "@/config/types";
import { CategoryButton } from "./categoryButton";

interface CategoryListProps {
  categoryList: CategoryDetail[];
  allPostCount: number;
  currentCategory?: string;
}

const CategoryList = ({
  categoryList,
  allPostCount,
  currentCategory = "all",
}: CategoryListProps) => {
  const router = useRouter();

  const onCategoryChange = (value: string) => {
    if (value === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog/${value}`);
    }
  };

  return (
    <>
      <section className='mb-10 hidden sm:block'>
        <ul className='flex gap-3'>
          <CategoryButton
            href='/blog'
            isCurrent={currentCategory === "all"}
            displayName='All'
            count={allPostCount}
          />
          {categoryList.map((cg) => (
            <CategoryButton
              key={cg.dirName}
              href={`/blog/${cg.dirName}`}
              displayName={cg.publicName}
              isCurrent={cg.dirName === currentCategory}
              count={cg.count}
            />
          ))}
        </ul>
      </section>

      <section className='mb-10 sm:hidden'>
        {/* TODO : CategoryList 셀렉 노출*/}
        <ul className='flex-col gap-3'>
          <CategoryButton
            href='/blog'
            isCurrent={currentCategory === "all"}
            displayName='All'
            count={allPostCount}
            type='col'
          />
          {categoryList.map((cg) => (
            <CategoryButton
              key={cg.dirName}
              href={`/blog/${cg.dirName}`}
              displayName={cg.publicName}
              isCurrent={cg.dirName === currentCategory}
              count={cg.count}
              type='col'
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default CategoryList;
