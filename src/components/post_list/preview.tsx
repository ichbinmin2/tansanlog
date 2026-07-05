import Image from "next/image";
import Link from "next/link";

import { Post } from "@/config/types";
import { CalendarDays } from "lucide-react";

interface Props {
  post: Post;
  variant?: "default" | "featured";
}

const Preview = ({ post, variant = "default" }: Props) => {
  const hasThumbnail = post.thumbnail?.trim() !== "";
  const isFeatured = variant === "featured";

  return (
    <Link href={post.url} className='group block'>
      <li
        className={
          isFeatured
            ? "surface-shine grid overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-950/10 transition duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_28px_80px_rgba(15,23,42,0.14)] dark:bg-neutral-950 dark:ring-white/10 md:grid-cols-[1.05fr_0.95fr]"
            : "surface-shine flex h-full flex-col gap-3 overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-950/10 transition duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)] dark:bg-neutral-950 dark:ring-white/10"
        }
      >
        <div
          className={
            isFeatured
              ? "relative aspect-video w-full border-b border-neutral-200/80 md:border-b-0 md:border-r dark:border-white/10"
              : "relative aspect-video w-full border-b border-neutral-200/80 dark:border-white/10"
          }
        >
          {hasThumbnail ? (
            <Image
              src={post.thumbnail}
              alt={`thumbnail for ${post.title}`}
              sizes='(max-width: 1000px) 50vw, 450px'
              fill
              priority
              className='transition duration-700 ease-out group-hover:scale-[1.035]'
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
        <div
          className={
            isFeatured
              ? "flex flex-1 flex-col justify-center p-6"
              : "flex flex-1 flex-col justify-between p-4 pt-2"
          }
        >
          <div>
            <div className='text-sm font-medium text-green-700 lg:text-base'>
              {post.categoryPublicName}
            </div>
            <h2
              className={
                isFeatured
                  ? "mb-3 mt-2 text-2xl font-bold transition duration-300 group-hover:text-green-700 dark:group-hover:text-green-300"
                  : "mb-3 mt-1 text-lg font-bold transition duration-300 group-hover:text-green-700 dark:group-hover:text-green-300 sm:text-xl md:text-lg"
              }
            >
              {post.title}
            </h2>
            {isFeatured && (
              <p className='mb-5 line-clamp-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300'>
                {post.desc}
              </p>
            )}
          </div>
          <div className='flex gap-3 text-sm text-gray-500 dark:text-gray-400'>
            <div className='flex items-center gap-1'>
              <CalendarDays className='w-3.5' />
              <span>{post.dateString}</span>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default Preview;
