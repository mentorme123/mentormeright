import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AdminProfileContent from "./admin-profile-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    notFound();
  }
  return <AdminProfileContent />;
}