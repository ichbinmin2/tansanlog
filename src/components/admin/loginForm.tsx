"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";

export const AdminLoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setMessage(result?.message || "로그인에 실패했습니다.");
      return;
    }

    router.replace(searchParams.get("next") || "/admin");
    router.refresh();
  };

  return (
    <section className='mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-md items-center px-5 py-20'>
      <form className='w-full rounded-md border p-6' onSubmit={handleSubmit}>
        <div className='mb-6'>
          <div className='mb-4 inline-flex size-11 items-center justify-center rounded-md bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'>
            <LockKeyhole size={20} />
          </div>
          <h1 className='text-2xl font-semibold'>Admin Login</h1>
          <p className='mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300'>
            글쓰기 에디터에 들어가려면 관리자 계정으로 로그인하세요.
          </p>
        </div>

        <label className='block text-sm font-medium'>
          아이디
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className='mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm'
            autoComplete='username'
          />
        </label>

        <label className='mt-4 block text-sm font-medium'>
          비밀번호
          <input
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm'
            autoComplete='current-password'
          />
        </label>

        {message && (
          <p className='mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
            {message}
          </p>
        )}

        <Button className='mt-6 w-full' disabled={isSubmitting}>
          {isSubmitting ? "확인 중..." : "어드민 입장"}
        </Button>
      </form>
    </section>
  );
};

