import type { Metadata } from "next";
import CareerAILensClient from "./client";

export const metadata: Metadata = {
  title: "CareerAI Lens | MentorMe — 250 Career-Specific Insights",
  description: "Explore role-specific ways AI could reshape 250 careers with MentorMe CareerAI Lens.",
  alternates: {
    canonical: "https://www.mentormeright.com/careerai-lens",
  },
};

export default function CareerAILensPage() {
  return <CareerAILensClient />;
}
