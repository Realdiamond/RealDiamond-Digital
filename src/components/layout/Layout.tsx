import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import WhatsAppChat from "@/components/WhatsAppChat";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      
      {/* Fixed Components */}
      <AvailabilityBadge />
      <WhatsAppChat />
    </div>
  );
};

export default Layout;
