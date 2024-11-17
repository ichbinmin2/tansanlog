import IconGithub from "@/components/icon/github";
import Link from "next/link";

export const ThemeHeader = () => {
  return (
    <header className='bg-white fixed w-full z-30'>
      <div className='flex justify-between items-center py-7 gap-5 border-b mx-7 border-gray-500'>
        <div className='flex justify-start items-center gap-5'>
          <Link href='/'>
            <h1>Home</h1>
          </Link>
          <Link href='/about'>
            <h1>About</h1>
          </Link>
          <Link href='/blog'>
            <h1>Post</h1>
          </Link>
          <Link href='/study'>
            <h1>Study</h1>
          </Link>
        </div>
        <div className='flex justify-end items-center gap-2'>
          <Link href='https://decisive-aftermath-f41.notion.site/Front-end-Developer-11684f40191d80d19081d54133a34517?pvs=4'>
            <div className='border-solid border-[1px] border-black rounded-lg p-1 flex justify-center items-center hover:bg-accent hover:text-accent-foreground'>
              <span className='text-xs'>Resume</span>
            </div>
          </Link>

          <Link href='https://github.com/ichbinmin2'>
            <IconGithub />
          </Link>
        </div>
      </div>
    </header>
  );
};
