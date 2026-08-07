import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CareerDashboard from "./career-dashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StudentDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    notFound();
  }
  return <CareerDashboard userId={user.id} />;
}
