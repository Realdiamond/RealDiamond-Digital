import { Building2 } from "lucide-react";

const clients = [
  { name: "TechFlow", initials: "TF" },
  { name: "GrowthLab", initials: "GL" },
  { name: "Nexus Co", initials: "NC" },
  { name: "Vertex", initials: "VX" },
  { name: "Momentum", initials: "MM" },
  { name: "Synergy", initials: "SY" },
  { name: "Horizon", initials: "HZ" },
  { name: "Pulse", initials: "PL" },
];

const TrustedBy = () => {
  // Double the clients array for seamless loop
  const doubledClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-secondary/30 border-b border-border/50 overflow-hidden">
      <div className="container-wide mb-10">
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4 text-accent" />
            Trusted by innovative companies
          </p>
        </div>
      </div>

      {/* Scrolling Logo Carousel */}
      <div className="relative">
        {/* Gradient masks for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent z-10" />
        
        <div className="flex animate-marquee">
          {doubledClients.map((client, index) => (
            <div 
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-8 group"
            >
              <div className="flex items-center gap-3 px-6 py-4 glass-card hover:border-accent/40 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-glow group-hover:shadow-[0_0_30px_-5px_hsl(174_84%_35%/0.5)] transition-all duration-300">
                  <span className="font-heading font-bold text-sm text-accent-foreground">{client.initials}</span>
                </div>
                <span className="font-heading font-semibold text-lg text-foreground whitespace-nowrap">{client.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-wide mt-10">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Join 50+ businesses that trust RealDiamond Digital with their digital growth
        </p>
      </div>
    </section>
  );
};

export default TrustedBy;
