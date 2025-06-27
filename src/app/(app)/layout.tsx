import BasicLayout from "@/components/layout/BasicLayout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <BasicLayout>{children}</BasicLayout>;
}
