import BasicLayout from "@/components/layout/BasicLayout";

export default function LandingGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BasicLayout>{children}</BasicLayout>;
}
