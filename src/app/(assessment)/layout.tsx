import Link from "next/link";

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <header className="w-full border-b bg-background">
        <div className="container mx-auto flex h-14 items-center px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 pointer-events-none">
            <div className="h-6 w-6 bg-brand-blue rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-foreground">MentorMe</span>
          </Link>
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <span>Assessment Mode</span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
