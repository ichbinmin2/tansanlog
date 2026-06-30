"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ADMIN_DRAFT_STORAGE_KEY,
  BlogDraft,
  createDefaultDraft,
} from "@/lib/adminEditor";
import { PreviewRenderer } from "./previewRenderer";

export const AdminPreviewPage = () => {
  const [draft, setDraft] = useState<BlogDraft>(() => createDefaultDraft());

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(ADMIN_DRAFT_STORAGE_KEY);
    if (savedDraft) {
      setDraft(JSON.parse(savedDraft));
    }
  }, []);

  return (
    <section className='mx-auto w-full pb-24 pt-16 lg:pt-24'>
      <div className='mx-auto mb-8 flex w-full max-w-[750px] px-5 sm:px-6'>
        <Button asChild variant='outline'>
          <Link href='/admin'>
            <ArrowLeft className='mr-2 size-4' />
            에디터로 돌아가기
          </Link>
        </Button>
      </div>
      <PreviewRenderer draft={draft} />
    </section>
  );
};

