import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ReactNode } from "react";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothCursor } from "@/components/SmoothCursor";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <SmoothCursor />
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
