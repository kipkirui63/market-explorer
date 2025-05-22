import { ReactNode } from "react";
import Header from "@/components/Header";

interface LayoutNoFooterProps {
  children: ReactNode;
}

export default function LayoutNoFooter({ children }: LayoutNoFooterProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}