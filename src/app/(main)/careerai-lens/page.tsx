import type { Metadata } from "next";
import CareerAILensClient from "./client";

export const metadata: Metadata = {
  title: "CareerAI Lens | MentorMe",
  description: "Explore how AI could potentially reshape 250 careers with MentorMe CareerAI Lens.",
  alternates: {
    canonical: "https://www.mentormeright.com/careerai-lens",
  },
};

export default function CareerAILensPage() {
  return <CareerAILensClient />;
}
