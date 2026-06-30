import { PostEditor } from "@/components/admin/postEditor";

export const metadata = {
  title: "Admin Editor | Tansanlog",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <PostEditor />;
}
