import React, { ReactNode } from 'react';
import SPAHeader from '@/components/SPAHeader';
import Footer from '@/components/Footer';

interface SPALayoutProps {
  children: ReactNode;
}

export default function SPALayout({ children }: SPALayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SPAHeader />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}