import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

async function getCompanyLogos() {
  const logos = await client.fetch(`
    *[_type == "companyLogo"] | order(order asc) {
      _id,
      name,
      initials,
      logo,
      website
    }
  `);
  return logos;
}

const TrustedBySection = async () => {
  const clients = await getCompanyLogos();

  // Double the array for seamless infinite scroll
  const doubledClients = [...clients, ...clients];

  return (
    <section className="relative pt-9 pb-12 sm:pt-11 sm:pb-16 bg-gradient-to-b from-background to-secondary/5 overflow-hidden">
      {/* Subtle heading */}
      <div className="container-wide mb-12 text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Trusted by leading brands
        </p>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container with w-max for content-based width */}
        <div className="flex w-max animate-marquee">
          {doubledClients.map((client, index) => (
            <div 
              key={`${client._id}-${index}`}
              className="flex-shrink-0 px-8 sm:px-12"
            >
              {client.logo ? (
                <div
                  className="h-16 sm:h-20 w-40 sm:w-48 flex-shrink-0 
                             bg-center bg-no-repeat bg-contain
                             grayscale opacity-60 
                             hover:grayscale-0 hover:opacity-100 
                             transition-all duration-300"
                  style={{
                    backgroundImage: `url(${urlForImage(client.logo).width(400).url()})`,
                  }}
                  aria-label={client.name}
                />
              ) : (
                <div className="h-16 sm:h-20 w-32 sm:w-40 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-lg bg-secondary/30 backdrop-blur-sm border border-border/50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <span className="font-heading font-bold text-lg text-foreground">{client.initials}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
