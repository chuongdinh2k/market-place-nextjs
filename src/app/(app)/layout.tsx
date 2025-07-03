import BasicLayout from "@/components/layout/BasicLayout";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BasicLayout>{children}</BasicLayout>;
}
