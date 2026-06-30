import { Suspense } from "react";

import { AdminLoginForm } from "@/components/admin/loginForm";

export const metadata = {
  title: "Admin Login | Tansanlog",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}

