import Navbar from "./navbar";
import type { ReactElement } from 'react';

interface LayoutProps {
  children: ReactElement;
}

export default function LandingLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
