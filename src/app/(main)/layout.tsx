import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackButton } from "@/components/back-button";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <BackButton />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
