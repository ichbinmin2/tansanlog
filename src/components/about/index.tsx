"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className='flex m-auto pt-[115px] pb-[115px] max-w-[500px] h-full flex-col gap-8'>
      {/* 상단 이미지 프로필 섹션 */}
      <div className='p-3'>
        <div className='flex justify-start items-center'>
          <div className='m-5'>
            <Image
              className='rounded-[50%]'
              src='/about/profile.png'
              alt='profile'
              width={100}
              height={100}
            />
          </div>

          <div className='flex-col'>
            <h1 className='text-lg font-semibold'>Min Jiyeon</h1>
            <p>Frontend Developer</p>
          </div>
        </div>
        {/* 내 소개 */}
        <div className='mb-[49px]'>
          <h2 className='font-medium'>About</h2>
          <p className='text-sm'>
            &quot;디자이너에서 개발자로, 사용자 중심의 문제 해결사&quot; <br />
            <br />
            디자이너 출신 2년 차 프론트엔드 개발자로서, 사용자 경험과 팀의
            생산성을 극대화하는 것을 목표로 합니다. 디자인과 개발의 관점을 모두
            이해하며, 효율적인 협업 문화를 이끌고 체계적인 문서화로 팀 내 신뢰를
            쌓아왔습니다.
            <br />
            <br /> 주어진 문제에 Why를 고민하며 구체적이고 실질적인 해결책을
            제시하고자 합니다. 다양한 사회 경험을 바탕으로 빠른 상황 파악과 문제
            해결 능력을 토대로, 프로젝트의 전반적인 방향성과 품질을 주도적으로
            관리하며 성과를 내고자 합니다. <br />
            <br />
            또한, 개발 환경 개선과 새로운 기술 도입을 통해 팀의 생산성을 높이고,
            꼼꼼한 디테일과 책임감을 바탕으로 신뢰받는 결과물을 만드는 것을
            목표로 하고 있습니다.
          </p>
        </div>
        {/* 경력 사항 */}
        <div className='flex flex-col gap-7'>
          <h2 className='font-medium'>Work Experience</h2>
          {/* 리얼월드 */}
          <div className='grid grid-cols-1 xxs:grid-cols-[1fr_3fr] gap-1'>
            <p className='text-sm xxs:col-span-1 text-neutral-500'>
              2022.8 - 2024.9
            </p>
            <div className='flex flex-col xxs:ol-span-2 gap-1'>
              <Link
                href='https://realworld.to/'
                className='flex justify-start items-center gap-1'
              >
                <h2 className='font-medium text-sm hover:underline transition duration-300 ease-in-out'>
                  Front End Engineer – UniqueGood
                </h2>
                <Image
                  width={8}
                  height={8}
                  src='/about/up-right-arrow.png'
                  alt='arrow-link'
                />
              </Link>
              <p className='text-sm'>
                리얼월드 모바일 앱 연동 웹 페이지를 개발하며 다양한 디바이스와
                브라우저에 호환성을 확보하였고 ‘토닥토닥 포토월 프로젝트’와 ‘웹
                플레이 프로젝트’의 주요 개발 업무를 수행하여 유저 경험 강화에
                기여했습니다. 리얼월드 모바일 앱 UX/UI와 동일한 사용자 경험을
                제공하는 웹 버전 홈페이지 개발을 주도하고, 소셜 기능(프로필,
                친구 맺기), 크리에이터 채널 페이지 개발을 통해 유저 간 네트워킹
                경험을 상승시켰으며, Safari Webview에서 발생하는 크로스브라우징
                이슈 해결 경험이 다수 있습니다.
              </p>
              <span className='text-sm text-neutral-500'>
                React • Next.js • TypeScript • Tailwind
              </span>
            </div>
          </div>

          <div className='grid grid-cols-1 xxs:grid-cols-[1fr_3fr] gap-1'>
            <p className='text-sm xxs:col-span-1 text-neutral-500'>
              2021.5 - 2021.7
            </p>
            <div className='flex flex-col xxs:ol-span-2 gap-1'>
              <Link
                href='https://www.welly.rest/'
                className='flex justify-start items-center gap-1'
              >
                <h2 className='font-medium text-sm hover:underline transition duration-300 ease-in-out'>
                  Front End Engineer – Welly
                </h2>
                <Image
                  width={8}
                  height={8}
                  src='/about/up-right-arrow.png'
                  alt='arrow-link'
                />
              </Link>
              <p className='text-sm'>
                카카오 소셜 로그인 기반의 오디오 플레이어 페이지와 이벤트 페이지
                및 상품 구매 페이지 개발하였습니다. Storybook으로 공용 UI 상태와
                컴포넌트를 체계적으로 관리하고 Airtable을 통해 프로젝트 데이터를
                관리했고, Sentry로 실시간으로 에러에 대응했습니다.
              </p>
              <span className='text-sm text-neutral-500'>
                React • Next.js • TypeScript • Styled-Components
              </span>
            </div>
          </div>

          {/* // 인탄 */}
          <div className='grid grid-cols-1 xxs:grid-cols-[1fr_3fr] gap-1'>
            <p className='text-sm xxs:col-span-1 text-neutral-500'>
              2020.11 - 2020.12
            </p>
            <div className='flex flex-col xxs:ol-span-2 gap-1'>
              <Link
                href='https://rencar.co.kr/intro'
                className='flex justify-start items-center gap-1'
              >
                <h2 className='font-medium text-sm hover:underline transition duration-300 ease-in-out'>
                  Front End Engineer Intern – Rencar
                </h2>
                <Image
                  width={8}
                  height={8}
                  src='/about/up-right-arrow.png'
                  alt='arrow-link'
                />
              </Link>
              <p className='text-sm'>
                쿼리스트링을 활용해 백엔드 API 데이터 통신 및 검색 기능을
                구현했습니다.
              </p>
              <span className='text-sm text-neutral-500'>
                React • Next.js • SASS
              </span>
            </div>
          </div>
        </div>

        {/* 사이드프로젝트 */}
        <div className='flex flex-col gap-7 mt-[49px]'>
          <h2 className='font-medium'>Side Projects</h2>
          <div className='grid grid-cols-1 xxs:grid-cols-[1fr_3fr] gap-1'>
            <p className='text-sm xxs:col-span-1 text-neutral-500'>
              2024.9 - 2024.1
            </p>
            <div className='flex flex-col xxs:ol-span-2 gap-1'>
              <Link
                href='https://decisive-aftermath-f41.notion.site/12884f40191d804caf64d1957abb3a93?pvs=4'
                className='flex justify-start items-center gap-1'
              >
                <h2 className='font-medium text-sm inline'>
                  너에게 닿기를(Keep in touch)
                </h2>
                <Image
                  width={8}
                  height={8}
                  src='/about/up-right-arrow.png'
                  alt='arrow-link'
                />
              </Link>

              <p className='text-sm'>
                연락이 닿지 않는 친구 및 지인에게 메세지를 남기는 서비스의
                프론트엔드 개발을 맡았습니다.
              </p>
              <span className='text-sm text-neutral-500'>
                React • Next.js • TypeScript • Tailwind • Vitest
              </span>
            </div>
          </div>

          <div className='grid grid-cols-1 xxs:grid-cols-[1fr_3fr] gap-1'>
            <p className='text-sm xxs:col-span-1 text-neutral-500'>
              2024.10 - (ing)
            </p>
            <div className='flex flex-col xxs:ol-span-2 gap-1'>
              <Link
                href='https://tasanlog.vercel.app/'
                className='flex justify-start items-center gap-1'
              >
                <h2 className='font-medium text-sm hover:underline transition duration-300 ease-in-out'>
                  Tansanlog
                </h2>
                <Image
                  width={8}
                  height={8}
                  src='/about/up-right-arrow.png'
                  alt='arrow-link'
                />
              </Link>
              <p className='text-sm'>
                기술 학습 및 아카이빙 용도의 개인 블로그를 제작했습니다.
              </p>
              <span className='text-sm text-neutral-500'>
                React • Next.js • TypeScript • Three.js • Tailwind
              </span>
            </div>
          </div>

          {/* // */}
          <div className='grid grid-cols-1 xxs:grid-cols-[1fr_3fr] gap-1'>
            <p className='text-sm xxs:col-span-1 text-neutral-500'>2021.2</p>
            <div className='flex flex-col xxs:ol-span-2 gap-1'>
              <Link
                href='https://603ce6b8d579f1f8067c72df--teta-cardmaker.netlify.app/'
                className='flex justify-start items-center gap-1'
              >
                <h2 className='font-medium text-sm hover:underline transition duration-300 ease-in-out'>
                  Card Maker
                </h2>
                <Image
                  width={8}
                  height={8}
                  src='/about/up-right-arrow.png'
                  alt='arrow-link'
                />
              </Link>
              <p className='text-sm'>
                지인의 정보를 card로 담아 입력하고, 입력한 데이터를
                저장/관리하는 웹사이트 토이 프로젝트입니다.
              </p>
              <span className='text-sm text-neutral-500'>
                React • PostCSS • Firebase • Cloudinary
              </span>
            </div>
          </div>

          <div className='grid grid-cols-1 xxs:grid-cols-[1fr_3fr] gap-1'>
            <p className='text-sm xxs:col-span-1 text-neutral-500'>2021.1</p>
            <div className='flex flex-col xxs:ol-span-2 gap-1'>
              <Link
                href='https://ichbinmin2.github.io/tetatube/'
                className='flex justify-start items-center gap-1'
              >
                <h2 className='font-medium text-sm hover:underline transition duration-300 ease-in-out'>
                  Tetatube
                </h2>
                <Image
                  width={8}
                  height={8}
                  src='/about/up-right-arrow.png'
                  alt='arrow-link'
                />
              </Link>
              <p className='text-sm'>
                YouTube의 API를 이용하여 영상 스트리밍 페이지의 기능을 React로
                구현하는 토이 프로젝트입니다.
              </p>
              <span className='text-sm text-neutral-500'>React • PostCSS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
