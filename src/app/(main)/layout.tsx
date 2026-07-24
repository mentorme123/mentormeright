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
      <main className="flex-1 flex flex-col max-w-[1700px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
