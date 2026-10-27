import { client } from "../../sanity/lib/client";

interface SiteSettings {
  availabilityEnabled: boolean;
  availabilityMessage: string;
  availabilityColor: "green" | "yellow" | "red";
}

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const query = `*[_type == "siteSettings"][0]{
      availabilityEnabled,
      availabilityMessage,
      availabilityColor
    }`;
    
    const data = await client.fetch(
      query,
      {},
      {
        next: { revalidate: 86400 }
      }
    );
    
    return data || {
      availabilityEnabled: true,
      availabilityMessage: "Currently accepting new projects",
      availabilityColor: "green",
    };
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {
      availabilityEnabled: true,
      availabilityMessage: "Currently accepting new projects",
      availabilityColor: "green",
    };
  }
}

const AvailabilityBadge = async () => {
  const settings = await getSiteSettings();

  if (!settings || !settings.availabilityEnabled) {
    return null;
  }

  const colorClasses = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden md:block animate-fade-in">
      <div className="bp-panel flex items-center gap-2.5 px-3.5 py-2.5 shadow-elevated">
        <span className={`w-2 h-2 rounded-full ${colorClasses[settings.availabilityColor]}`} aria-hidden="true" />
        <span className="font-mono text-xs text-foreground whitespace-nowrap">{settings.availabilityMessage}</span>
      </div>
    </div>
  );
};

export default AvailabilityBadge;
