import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import TawkToChat from "@/components/TawkToChat";

interface LayoutProps {
  children: ReactNode;
  /** Hide the agency availability badge and live chat (used on personal portfolio pages). */
  hideAgencyWidgets?: boolean;
}

const Layout = ({ children, hideAgencyWidgets = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      
      {!hideAgencyWidgets && (
        <>
          <AvailabilityBadge />
          <TawkToChat />
        </>
      )}
    </div>
  );
};

export default Layout;
