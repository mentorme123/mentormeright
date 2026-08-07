import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import InstitutionDashboardContent from "./institution-dashboard-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function InstitutionDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    notFound();
  }
  return <InstitutionDashboardContent />;
}
