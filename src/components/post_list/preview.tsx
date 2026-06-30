import Image from "next/image";
import Link from "next/link";

import { Post } from "@/config/types";
import { CalendarDays, Clock3 } from "lucide-react";

interface Props {
  post: Post;
}

const Preview = ({ post }: Props) => {
  const hasThumbnail = post.thumbnail?.trim() !== "";

  return (
    <Link href={post.url}>
      <li className='flex h-full flex-col gap-3 overflow-hidden rounded-md border shadow-md transition hover:shadow-xl dark:border-slate-700 dark:hover:border-white'>
        <div className='relative aspect-video w-full rounded-t-md border-b'>
          {hasThumbnail ? (
            <Image
              src={post.thumbnail}
              alt={`thumbnail for ${post.title}`}
              sizes='(max-width: 1000px) 50vw, 450px'
              fill
              priority
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <div className='flex h-full w-full flex-col justify-between bg-[linear-gradient(135deg,#f7fee7,#f4f4f5)] p-5 dark:bg-[linear-gradient(135deg,#14532d,#18181b)]'>
              <span className='text-xs font-semibold uppercase tracking-[0.2em] text-green-700 dark:text-green-300'>
                {post.categoryPublicName}
              </span>
              <span className='line-clamp-2 text-xl font-semibold text-neutral-900 dark:text-white'>
                {post.title}
              </span>
            </div>
          )}
        </div>
        <div className='flex flex-1 flex-col justify-between p-4 pt-1'>
          <div>
            <div className='text-sm font-medium text-green-700 lg:text-base'>
              {post.categoryPublicName}
            </div>
            <h2 className='mb-3 mt-1 text-lg font-bold sm:text-xl md:text-lg'>
              {post.title}
            </h2>
          </div>
          <div className='flex justify-between gap-3 text-sm text-gray-500 dark:text-gray-400'>
            <div className='flex items-center gap-1'>
              <CalendarDays className='w-3.5' />
              <span>{post.dateString}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Clock3 className='w-3.5' />
              <span>{post.readingMinutes}분</span>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default Preview;
