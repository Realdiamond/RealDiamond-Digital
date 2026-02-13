"use client";

import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";

interface SiteSettings {
  availabilityEnabled: boolean;
  availabilityMessage: string;
  availabilityColor: "green" | "yellow" | "red";
}

const AvailabilityBadge = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const query = `*[_type == "siteSettings"][0]{
          availabilityEnabled,
          availabilityMessage,
          availabilityColor
        }`;
        
        const data = await client.fetch(query);
        setSettings(data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
        // Fallback to default
        setSettings({
          availabilityEnabled: true,
          availabilityMessage: "Currently accepting new projects",
          availabilityColor: "green",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Don't render if loading, disabled, or no settings
  if (loading || !settings || !settings.availabilityEnabled) {
    return null;
  }

  const colorClasses = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-5 duration-500">
      <div className="glass-card px-4 py-3 shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${colorClasses[settings.availabilityColor]} animate-pulse`} />
          <span className="text-sm font-semibold text-foreground whitespace-nowrap">
            {settings.availabilityMessage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityBadge;
