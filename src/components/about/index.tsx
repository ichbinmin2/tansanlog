"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const experiences = [
  {
    period: "2022.8 - 2024.9",
    title: "Front End Engineer - UniqueGood",
    href: "https://realworld.to/",
    description:
      "리얼월드 모바일 앱과 연결되는 웹 페이지를 개발하며 웹뷰, 소셜 기능, 크리에이터 채널 페이지의 사용자 경험을 다듬었습니다. Safari WebView 이슈와 다양한 브라우저 환경 대응 경험을 쌓았습니다.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    period: "2021.5 - 2021.7",
    title: "Front End Engineer - Welly",
    href: "https://www.welly.rest/",
    description:
      "오디오 플레이어, 이벤트 페이지, 상품 구매 페이지를 구현했습니다. Storybook으로 공용 UI 상태를 관리하고 Sentry 기반 에러 대응 흐름을 경험했습니다.",
    stack: ["React", "Next.js", "TypeScript", "Styled-Components"],
  },
  {
    period: "2020.11 - 2020.12",
    title: "Front End Engineer Intern - Rencar",
    href: "https://rencar.co.kr/intro",
    description:
      "쿼리스트링 기반 검색 기능과 백엔드 API 데이터 통신을 구현하며 프론트엔드 개발의 기본 흐름을 익혔습니다.",
    stack: ["React", "Next.js", "SASS"],
  },
];

const sideProjects = [
  {
    period: "2024.9 - 2025.1",
    title: "Keep in touch",
    href: "https://decisive-aftermath-f41.notion.site/12884f40191d804caf64d1957abb3a93?pvs=4",
    description:
      "연락이 닿지 않는 친구에게 메시지를 남기는 서비스의 프론트엔드 구조와 주요 화면을 구현했습니다.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Vitest"],
  },
  {
    period: "2024.10 - Present",
    title: "Tansanlog",
    href: "https://tansanlog.vercel.app/",
    description:
      "기술 학습과 기록을 위한 개인 블로그입니다. MDX 글 관리, 어드민 에디터, 댓글, Three.js 시각 요소를 연결했습니다.",
    stack: ["Next.js", "MDX", "Three.js", "Tailwind"],
  },
  {
    period: "2021.2",
    title: "Card Maker",
    href: "https://603ce6b8d579f1f8067c72df--teta-cardmaker.netlify.app/",
    description:
      "지인의 정보를 카드로 입력하고 저장, 관리하는 웹사이트 토이 프로젝트입니다.",
    stack: ["React", "PostCSS", "Firebase", "Cloudinary"],
  },
  {
    period: "2021.1",
    title: "Tetatube",
    href: "https://ichbinmin2.github.io/tetatube/",
    description:
      "YouTube API를 활용해 영상 스트리밍 페이지의 주요 기능을 React로 구현했습니다.",
    stack: ["React", "PostCSS"],
  },
];

const values = ["UX 관점", "구현 품질", "문서화", "협업 흐름"];

const TimelineCard = ({
  item,
}: {
  item: {
    period: string;
    title: string;
    href: string;
    description: string;
    stack: string[];
  };
}) => {
  return (
    <article className='surface-shine rounded-2xl bg-neutral-950/[0.03] p-5 ring-1 ring-neutral-950/5 transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,23,42,0.10)] dark:bg-white/[0.04] dark:ring-white/10'>
      <p className='text-xs text-neutral-500'>{item.period}</p>
      <Link
        href={item.href}
        className='mt-3 inline-flex items-center gap-2 text-base font-semibold transition hover:text-green-700 dark:hover:text-green-300'
      >
        {item.title}
        <ArrowUpRight size={15} />
      </Link>
      <p className='mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300'>
        {item.description}
      </p>
      <div className='mt-5 flex flex-wrap gap-2'>
        {item.stack.map((stack) => (
          <span
            key={stack}
            className='rounded-full border border-neutral-200 bg-white/60 px-2.5 py-1 text-[11px] font-medium text-neutral-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300'
          >
            {stack}
          </span>
        ))}
      </div>
    </article>
  );
};

export default function About() {
  return (
    <section className='relative mx-auto w-full max-w-5xl px-5 pb-24 pt-24 sm:px-8 lg:pt-32'>
      <div className='ambient-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]' />

      <div className='relative z-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end'>
        <div className='reveal-up rounded-[1.75rem] bg-neutral-950/[0.03] p-2 ring-1 ring-neutral-950/5 dark:bg-white/[0.04] dark:ring-white/10'>
          <div className='rounded-[1.25rem] bg-white/75 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)] backdrop-blur dark:bg-neutral-950/70'>
            <Image
              className='rounded-full ring-1 ring-neutral-950/10 dark:ring-white/10'
              src='/about/profile.png'
              alt='Min Jiyeon profile'
              width={104}
              height={104}
              priority
            />
            <p className='mt-6 text-sm font-semibold text-green-700'>
              Frontend Developer
            </p>
            <h1 className='mt-2 text-3xl font-semibold'>Min Jiyeon</h1>
            <p className='mt-4 text-sm leading-7 text-neutral-600 dark:text-neutral-300'>
              디자이너에서 프론트엔드 개발자로 전환한 배경을 바탕으로, 화면의
              맥락과 사용자의 흐름을 읽으며 구현 품질을 다듬습니다.
            </p>
            <div className='mt-6 flex flex-wrap gap-2'>
              {values.map((value) => (
                <span
                  key={value}
                  className='rounded-full bg-green-700/10 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-300/10 dark:text-green-300'
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className='reveal-up reveal-up-delay-1'>
          <p className='text-sm font-semibold text-green-700'>About</p>
          <h2 className='mt-3 max-w-2xl text-3xl font-semibold leading-tight text-balance sm:text-4xl'>
            사용자 중심의 문제 해결과 협업하기 좋은 구조를 함께 고민합니다.
          </h2>
          <p className='mt-6 max-w-2xl text-sm leading-8 text-neutral-600 dark:text-neutral-300 sm:text-base'>
            주어진 문제의 Why를 먼저 살피고, 구체적인 해결책을 화면과 코드로
            연결하는 것을 좋아합니다. 문서화와 UI 상태 정리를 통해 팀이 더 빠르게
            이해하고 유지보수할 수 있는 흐름을 만드는 데 관심이 있습니다.
          </p>
        </div>
      </div>

      <div className='relative z-10 mt-16'>
        <div className='mb-6'>
          <p className='text-sm font-semibold text-green-700'>Experience</p>
          <h2 className='mt-2 text-2xl font-semibold'>경력 사항</h2>
        </div>
        <div className='grid gap-4'>
          {experiences.map((item) => (
            <TimelineCard key={item.title} item={item} />
          ))}
        </div>
      </div>

      <div className='relative z-10 mt-16'>
        <div className='mb-6'>
          <p className='text-sm font-semibold text-green-700'>Side Projects</p>
          <h2 className='mt-2 text-2xl font-semibold'>사이드 프로젝트</h2>
        </div>
        <div className='grid gap-4 md:grid-cols-2'>
          {sideProjects.map((item) => (
            <TimelineCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
