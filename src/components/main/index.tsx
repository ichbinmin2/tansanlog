import { ArrowRight, Github, LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getSortedPostList, getUniquePostList } from "@/lib/post";
import { Graphic } from "./graphic/graphic";

const strengths = [
  "디자인과 개발 관점을 함께 고려한 사용자 중심 UI 구현",
  "Next.js, React, TypeScript 기반의 제품 기능 개발",
  "문서화와 협업 흐름 개선으로 팀 생산성 강화",
];

const heroMetrics = [
  { value: "2+ yrs", label: "Product UI" },
  { value: "Next.js", label: "Main stack" },
  { value: "UX", label: "Design origin" },
];

const projects = [
  {
    title: "Realworld Web Experience",
    period: "2022.8 - 2024.9",
    role: "Frontend Engineer",
    impact: "웹뷰, 소셜 기능, 채널 페이지를 구현하며 앱과 웹 사이의 사용 흐름을 정리했습니다.",
    description:
      "모바일 앱과 연결되는 웹 페이지, 소셜 기능, 크리에이터 채널 페이지를 개발하며 다양한 브라우저 환경의 사용자 경험을 다듬었습니다.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Keep in touch",
    period: "2024.9 - 2025.1",
    role: "Frontend Owner",
    impact: "핵심 작성 플로우와 화면 구조를 잡고 테스트 가능한 컴포넌트 단위로 기능을 나눴습니다.",
    description:
      "연락이 닿지 않는 친구에게 메시지를 남기는 서비스의 프론트엔드 구조와 주요 화면을 구현했습니다.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vitest"],
  },
  {
    title: "Tansanlog",
    period: "2024.10 - Present",
    role: "Design & Build",
    impact: "MDX 기반 글 관리에서 어드민 에디터, 댓글, 최신 글 노출까지 개인 퍼블리싱 흐름을 만들었습니다.",
    description:
      "기술 학습과 기록을 이어가기 위해 만든 개인 블로그입니다. MDX 기반 글 관리와 Three.js 시각 요소를 적용했습니다.",
    stack: ["Next.js", "MDX", "Three.js", "Tailwind"],
  },
];

export const Main = async () => {
  const sortedPosts = getUniquePostList(await getSortedPostList());
  const latestPost = sortedPosts[0];
  const hasLatestPostThumbnail = latestPost?.thumbnail?.trim() !== "";

  return (
    <div className='relative mx-auto w-full max-w-6xl px-5 pb-28 pt-20 sm:px-8 lg:pt-28'>
      <div className='ambient-grid pointer-events-none absolute inset-x-0 top-0 h-[720px]' />
      <section className='grid min-h-[calc(100dvh-9rem)] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='relative z-10'>
          <p className='mb-4 inline-flex rounded-full border border-green-700/15 bg-green-700/10 px-3 py-1.5 text-xs font-semibold text-green-700 dark:border-green-300/15 dark:bg-green-300/10 dark:text-green-300'>
            Design-minded Frontend Developer
          </p>
          <h1 className='reveal-up max-w-[820px] text-4xl font-semibold leading-[1.02] text-balance sm:text-5xl lg:text-7xl'>
            <span className='block'>디자인의 맥락을</span>
            <span className='block'>
              <span className='whitespace-nowrap text-green-700 dark:text-green-300'>
                코드로 옮기는
              </span>
            </span>
            <span className='block'>프론트엔드 개발자</span>
            <span className='block'>Min Jiyeon입니다.</span>
          </h1>
          <p className='reveal-up reveal-up-delay-1 mt-6 max-w-[62ch] text-base leading-8 text-neutral-600 dark:text-neutral-300 sm:text-lg'>
            디자인의 의도, 사용자의 흐름, 코드의 구조가 같은 방향을 보도록
            제품 화면을 만듭니다.
          </p>
          <div className='reveal-up reveal-up-delay-2 mt-8'>
            <div className='flex flex-wrap items-center gap-3'>
              <Link
                href='/about'
                className='surface-shine group inline-flex h-12 items-center gap-3 rounded-full bg-neutral-950 py-1 pl-5 pr-1 text-sm font-medium text-white shadow-[0_16px_45px_rgba(15,23,42,0.18)] transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[0_22px_60px_rgba(15,23,42,0.24)] active:scale-[0.98] dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200'
              >
                About 보기
                <span className='inline-flex size-9 items-center justify-center rounded-full bg-white/10 transition duration-300 ease-out group-hover:translate-x-0.5 dark:bg-neutral-950/10'>
                  <ArrowRight size={16} />
                </span>
              </Link>
              <Link
                href='/blog'
                className='inline-flex h-12 items-center rounded-full border border-neutral-200 bg-white/70 px-5 text-sm font-medium text-neutral-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur transition duration-300 ease-out hover:-translate-y-0.5 hover:border-neutral-950 hover:text-neutral-950 active:scale-[0.98] dark:border-white/10 dark:bg-neutral-950/50 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white'
              >
                글 읽기
              </Link>
            </div>

            <div className='mt-8 grid max-w-xl grid-cols-3 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/55 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-neutral-950/45'>
              {heroMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className='px-4 py-3 ring-1 ring-inset ring-neutral-950/[0.04] dark:ring-white/[0.06]'
                >
                  <p className='text-sm font-semibold text-neutral-950 dark:text-white'>
                    {metric.value}
                  </p>
                  <p className='mt-1 text-[11px] text-neutral-500'>
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='reveal-up reveal-up-delay-3 relative z-10 rounded-[1.75rem] bg-neutral-950/[0.03] p-2 shadow-[0_30px_100px_rgba(15,23,42,0.10)] ring-1 ring-neutral-950/5 transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_38px_130px_rgba(15,23,42,0.16)] dark:bg-white/[0.04] dark:ring-white/10'>
          <div className='scanline relative h-[340px] overflow-hidden rounded-[1.25rem] bg-[radial-gradient(circle_at_30%_20%,#dcfce7,transparent_35%),linear-gradient(135deg,#ffffff,#f4f4f5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)] dark:bg-[radial-gradient(circle_at_30%_20%,#14532d,transparent_35%),linear-gradient(135deg,#18181b,#0a0a0a)] sm:h-[460px]'>
            <Graphic />
            <div className='absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-200'>
              {["UX", "React", "Docs"].map((label) => (
                <span
                  key={label}
                  className='surface-shine rounded-lg border border-white/70 bg-white/80 px-3 py-2 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-0.5 dark:border-white/10 dark:bg-neutral-950/70'
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='grid gap-4 border-y py-10 md:grid-cols-3'>
        {strengths.map((strength, index) => (
          <p
            key={strength}
            className='reveal-up rounded-2xl bg-white/45 p-4 text-sm leading-7 text-neutral-700 ring-1 ring-neutral-950/5 backdrop-blur dark:bg-white/[0.03] dark:text-neutral-300 dark:ring-white/10'
            style={{ animationDelay: `${120 + index * 90}ms` }}
          >
            {strength}
          </p>
        ))}
      </section>

      {latestPost && (
        <section className='surface-shine reveal-up mt-16 rounded-[1.75rem] bg-neutral-950/[0.03] p-2 shadow-[0_24px_90px_rgba(15,23,42,0.10)] ring-1 ring-neutral-950/5 transition duration-500 hover:-translate-y-1 dark:bg-white/[0.04] dark:ring-white/10'>
          <div className='grid overflow-hidden rounded-[1.25rem] bg-secondary shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] lg:grid-cols-[0.9fr_1.1fr]'>
            <div className='relative min-h-[220px] border-b border-neutral-200/80 lg:border-b-0 lg:border-r dark:border-white/10'>
              {hasLatestPostThumbnail ? (
                <Image
                  src={latestPost.thumbnail}
                  alt={`thumbnail for ${latestPost.title}`}
                  fill
                  sizes='(max-width: 1024px) 100vw, 440px'
                  className='object-cover transition duration-700 ease-out hover:scale-[1.03]'
                />
              ) : (
                <div className='flex h-full min-h-[220px] flex-col justify-between bg-[linear-gradient(135deg,#f7fee7,#f4f4f5)] p-6 dark:bg-[linear-gradient(135deg,#14532d,#18181b)]'>
                  <span className='text-xs font-semibold uppercase tracking-[0.22em] text-green-700 dark:text-green-300'>
                    No Thumbnail
                  </span>
                  <div>
                    <p className='text-sm text-neutral-500 dark:text-neutral-300'>
                      {latestPost.categoryPublicName}
                    </p>
                    <p className='mt-2 text-2xl font-semibold text-neutral-950 dark:text-white'>
                      {latestPost.title}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className='grid gap-5 p-5 sm:p-7 md:grid-cols-[1fr_auto] md:items-center'>
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
                className='surface-shine group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-neutral-950 py-1 pl-5 pr-1 text-sm font-medium text-white shadow-[0_14px_40px_rgba(15,23,42,0.18)] transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-neutral-800 active:scale-[0.98] dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200'
              >
                최신 글 보기
                <span className='inline-flex size-9 items-center justify-center rounded-full bg-white/10 transition duration-300 ease-out group-hover:translate-x-0.5 dark:bg-neutral-950/10'>
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className='mt-20'>
        <div className='mb-8 flex items-end justify-between gap-4'>
          <div>
            <p className='text-sm font-semibold text-green-700'>Selected Work</p>
            <h2 className='mt-2 text-2xl font-semibold'>프로젝트 경험</h2>
            <p className='mt-3 max-w-2xl text-sm leading-7 text-neutral-600 dark:text-neutral-300'>
              구현 범위와 역할이 바로 읽히도록 핵심 경험만 압축했습니다.
            </p>
          </div>
          <Link
            href='/about'
            className='hidden items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white sm:inline-flex'
          >
            전체 이력
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className='grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project, index) => (
            <article
              key={project.title}
              className='surface-shine reveal-up flex h-full min-h-[320px] flex-col rounded-2xl bg-neutral-950/[0.03] p-5 ring-1 ring-neutral-950/5 transition duration-500 ease-out hover:-translate-y-1.5 hover:bg-neutral-950/[0.05] hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)] dark:bg-white/[0.04] dark:ring-white/10 dark:hover:bg-white/[0.07]'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='flex items-start justify-between gap-4'>
                <p className='text-xs text-neutral-500'>{project.period}</p>
                <span className='rounded-full bg-green-700/10 px-2.5 py-1 text-[11px] font-medium text-green-700 dark:bg-green-300/10 dark:text-green-300'>
                  {project.role}
                </span>
              </div>
              <h3 className='mt-4 text-lg font-semibold'>{project.title}</h3>
              <p className='mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300'>
                {project.description}
              </p>
              <div className='mt-5 rounded-xl bg-white/60 p-3 text-xs leading-6 text-neutral-600 ring-1 ring-neutral-950/[0.04] dark:bg-neutral-950/40 dark:text-neutral-300 dark:ring-white/10'>
                {project.impact}
              </div>
              <div className='mt-auto flex flex-wrap gap-2 pt-5'>
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className='rounded-full border border-neutral-200 bg-white/60 px-2.5 py-1 text-[11px] font-medium text-neutral-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='surface-shine reveal-up mt-20 flex flex-col gap-5 rounded-[1.25rem] bg-neutral-950/[0.03] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] ring-1 ring-neutral-950/5 sm:flex-row sm:items-center sm:justify-between dark:bg-white/[0.04] dark:ring-white/10'>
        <div>
          <p className='text-sm font-medium text-green-700'>Contact</p>
          <h2 className='mt-2 text-2xl font-semibold'>
            함께 일할 수 있는 접점을 열어두었습니다.
          </h2>
        </div>
        <div className='flex flex-wrap gap-3'>
          <Link
            href='https://github.com/ichbinmin2'
            className='inline-flex h-10 items-center gap-2 rounded-full border border-neutral-200 px-4 text-sm text-neutral-700 transition duration-300 ease-out hover:border-neutral-950 hover:text-neutral-950 active:scale-[0.98] dark:border-white/10 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white'
          >
            <Github size={16} />
            GitHub
          </Link>
          <Link
            href='mailto:teta1dev@gmail.com'
            className='inline-flex h-10 items-center gap-2 rounded-full border border-neutral-200 px-4 text-sm text-neutral-700 transition duration-300 ease-out hover:border-neutral-950 hover:text-neutral-950 active:scale-[0.98] dark:border-white/10 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white'
          >
            <Mail size={16} />
            Email
          </Link>
          <Link
            href='/admin'
            aria-label='Admin'
            className='inline-flex h-10 items-center gap-2 rounded-full border border-neutral-200 px-3 text-sm text-neutral-500 transition duration-300 ease-out hover:border-neutral-950 hover:text-neutral-950 active:scale-[0.98] dark:border-white/10 dark:text-neutral-400 dark:hover:border-white dark:hover:text-white'
          >
            <LockKeyhole size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};
