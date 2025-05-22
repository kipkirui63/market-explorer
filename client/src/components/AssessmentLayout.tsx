import { ReactNode } from "react";
import Header from "./Header";

interface AssessmentLayoutProps {
  children: ReactNode;
}

export default function AssessmentLayout({ children }: AssessmentLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background-light text-primary-dark">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {/* No footer in Assessment page as requested */}
    </div>
  );
}