import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CounselorProfileContent from "./counselor-profile-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CounselorProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    notFound();
  }
  return <CounselorProfileContent />;
}