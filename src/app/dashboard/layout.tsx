import { BackButtonCompact } from "@/components/back-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackButtonCompact />
      {children}
    </>
  );
}
