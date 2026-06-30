import { AdminPreviewPage } from "@/components/admin/previewPage";

export const metadata = {
  title: "Admin Preview | Tansanlog",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreviewPage() {
  return <AdminPreviewPage />;
}
