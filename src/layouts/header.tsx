import IconGithub from "@/components/icon/github";
import Link from "next/link";

export const ThemeHeader = () => {
  return (
    <header>
      <div className='flex justify-between items-center py-7 gap-5 border-b mx-7 border-gray-500'>
        <div className='flex justify-start items-center gap-5'>
          <Link href='/'>
            <h1>Home</h1>
          </Link>
          <Link href='/blog'>
            <h1>Post</h1>
          </Link>
          <Link href=''>
            <h1>Resume</h1>
          </Link>
        </div>
        <div>
          <Link href='https://github.com/ichbinmin2'>
            <IconGithub />
          </Link>
        </div>
      </div>
    </header>
  );
};
