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
      <main className="flex-1 flex flex-col w-full max-w-[1700px] mx-auto">
        <div className="w-full mx-[-1rem] sm:mx-[-1.5rem] lg:mx-[-2rem] xl:mx-[-3rem]">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
