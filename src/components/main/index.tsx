import { ArrowRight, FileText, Github, LockKeyhole } from "lucide-react";
import Link from "next/link";

import { getSortedPostList } from "@/lib/post";
import { Graphic } from "./graphic/graphic";

const strengths = [
  "디자인과 개발 관점을 함께 고려한 사용자 중심 UI 구현",
  "Next.js, React, TypeScript 기반의 제품 기능 개발",
  "문서화와 협업 흐름 개선으로 팀 생산성 강화",
];

const projects = [
  {
    title: "Realworld Web Experience",
    period: "2022.8 - 2024.9",
    description:
      "모바일 앱과 연결되는 웹 페이지, 소셜 기능, 크리에이터 채널 페이지를 개발하며 다양한 브라우저 환경의 사용자 경험을 다듬었습니다.",
    stack: "React / Next.js / TypeScript / Tailwind",
  },
  {
    title: "Keep in touch",
    period: "2024.9 - 2025.1",
    description:
      "연락이 닿지 않는 친구에게 메시지를 남기는 서비스의 프론트엔드 구조와 주요 화면을 구현했습니다.",
    stack: "Next.js / TypeScript / Tailwind / Vitest",
  },
  {
    title: "Tansanlog",
    period: "2024.10 - Present",
    description:
      "기술 학습과 기록을 이어가기 위해 만든 개인 블로그입니다. MDX 기반 글 관리와 Three.js 시각 요소를 적용했습니다.",
    stack: "Next.js / MDX / Three.js / Tailwind",
  },
];

export const Main = async () => {
  const sortedPosts = await getSortedPostList();
  const latestPost = sortedPosts[0];
  const latestPosts = sortedPosts.slice(0, 3);

  return (
    <div className='mx-auto w-full max-w-6xl px-5 pb-24 pt-16 sm:px-8 lg:pt-24'>
      <section className='grid min-h-[calc(100vh-10rem)] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]'>
        <div>
          <p className='mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-green-700'>
            Frontend Developer
          </p>
          <h1 className='max-w-3xl text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl'>
            사용자 경험과 구현 품질 사이를 촘촘하게 잇는 개발자, Min Jiyeon입니다.
          </h1>
          <p className='mt-6 max-w-2xl text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg'>
            디자이너에서 프론트엔드 개발자로 전환한 배경을 바탕으로 화면의 맥락,
            협업의 속도, 유지보수 가능한 구조를 함께 고민합니다.
          </p>
          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <Link
              href='/about'
              className='inline-flex h-11 items-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200'
            >
              About 보기
              <ArrowRight size={16} />
            </Link>
            <Link
              href='/blog'
              className='inline-flex h-11 items-center gap-2 rounded-md border px-5 text-sm font-medium transition hover:bg-accent'
            >
              글 읽기
            </Link>
            <Link
              href='/admin'
              className='inline-flex h-11 items-center gap-2 rounded-md border px-5 text-sm font-medium text-neutral-600 transition hover:bg-accent hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white'
            >
              <LockKeyhole size={16} />
              Admin
            </Link>
          </div>
        </div>

        <div className='relative h-[340px] overflow-hidden rounded-md border bg-[radial-gradient(circle_at_30%_20%,#dcfce7,transparent_35%),linear-gradient(135deg,#ffffff,#f4f4f5)] dark:bg-[radial-gradient(circle_at_30%_20%,#14532d,transparent_35%),linear-gradient(135deg,#18181b,#0a0a0a)] sm:h-[460px]'>
          <Graphic />
          <div className='absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-200'>
            <span className='rounded-md border bg-white/80 px-3 py-2 backdrop-blur dark:bg-neutral-950/70'>
              UX
            </span>
            <span className='rounded-md border bg-white/80 px-3 py-2 backdrop-blur dark:bg-neutral-950/70'>
              React
            </span>
            <span className='rounded-md border bg-white/80 px-3 py-2 backdrop-blur dark:bg-neutral-950/70'>
              Docs
            </span>
          </div>
        </div>
      </section>

      <section className='grid gap-4 border-y py-10 md:grid-cols-3'>
        {strengths.map((strength) => (
          <p
            key={strength}
            className='text-sm leading-7 text-neutral-700 dark:text-neutral-300'
          >
            {strength}
          </p>
        ))}
      </section>

      {latestPost && (
        <section className='mt-16 rounded-md border bg-secondary p-5 sm:p-7'>
          <div className='grid gap-5 md:grid-cols-[1fr_auto] md:items-center'>
            <div>
              <p className='text-sm font-semibold text-green-700'>
                Latest Article
              </p>
              <h2 className='mt-3 text-2xl font-semibold'>
                {latestPost.title}
              </h2>
              <p className='mt-3 max-w-3xl text-sm leading-7 text-neutral-600 dark:text-neutral-300'>
                {latestPost.desc}
              </p>
              <p className='mt-4 text-xs text-neutral-500'>
                {latestPost.categoryPublicName} · {latestPost.dateString} ·{" "}
                {latestPost.readingMinutes}분
              </p>
            </div>
            <Link
              href={latestPost.url}
              className='inline-flex h-11 items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200'
            >
              최신 글 보기
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      <section className='mt-20'>
        <div className='mb-8 flex items-end justify-between gap-4'>
          <div>
            <p className='text-sm font-semibold text-green-700'>Selected Work</p>
            <h2 className='mt-2 text-2xl font-semibold'>프로젝트 경험</h2>
          </div>
          <Link
            href='/about'
            className='hidden items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white sm:inline-flex'
          >
            전체 이력
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          {projects.map((project) => (
            <article
              key={project.title}
              className='rounded-md border p-5 transition hover:border-neutral-400 dark:hover:border-neutral-500'
            >
              <p className='text-xs text-neutral-500'>{project.period}</p>
              <h3 className='mt-3 text-lg font-semibold'>{project.title}</h3>
              <p className='mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300'>
                {project.description}
              </p>
              <p className='mt-5 text-xs font-medium text-neutral-500'>
                {project.stack}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className='mt-20'>
        <div className='mb-8 flex items-end justify-between gap-4'>
          <div>
            <p className='text-sm font-semibold text-green-700'>Latest Posts</p>
            <h2 className='mt-2 text-2xl font-semibold'>최근 기록</h2>
          </div>
          <Link
            href='/blog'
            className='inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white'
          >
            블로그
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className='divide-y rounded-md border'>
          {latestPosts.map((post) => (
            <Link
              key={post.url}
              href={post.url}
              className='grid gap-2 p-5 transition hover:bg-accent sm:grid-cols-[1fr_auto] sm:items-center'
            >
              <div>
                <p className='text-xs font-medium text-green-700'>
                  {post.categoryPublicName}
                </p>
                <h3 className='mt-2 font-semibold'>{post.title}</h3>
                <p className='mt-2 line-clamp-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300'>
                  {post.desc}
                </p>
              </div>
              <p className='text-sm text-neutral-500'>{post.dateString}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className='mt-20 flex flex-col gap-5 rounded-md border bg-neutral-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-neutral-300'>Contact</p>
          <h2 className='mt-2 text-2xl font-semibold'>
            함께 일할 수 있는 접점을 열어두었습니다.
          </h2>
        </div>
        <div className='flex flex-wrap gap-3'>
          <Link
            href='https://github.com/ichbinmin2'
            className='inline-flex h-10 items-center gap-2 rounded-md border border-white/20 px-4 text-sm transition hover:bg-white hover:text-neutral-950'
          >
            <Github size={16} />
            GitHub
          </Link>
          <Link
            href='https://decisive-aftermath-f41.notion.site/Front-end-Developer-11684f40191d80d19081d54133a34517?pvs=4'
            className='inline-flex h-10 items-center gap-2 rounded-md border border-white/20 px-4 text-sm transition hover:bg-white hover:text-neutral-950'
          >
            <FileText size={16} />
            Resume
          </Link>
        </div>
      </section>
    </div>
  );
};
