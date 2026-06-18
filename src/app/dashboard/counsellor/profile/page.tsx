import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CounsellorProfileContent from "./counsellor-profile-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CounsellorProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    notFound();
  }
  return <CounsellorProfileContent />;
}