import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

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
    <section className="relative pt-2 pb-12 sm:pt-4 sm:pb-16 bg-secondary/10 overflow-hidden">
      {/* Mesh Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
          backgroundSize: '64px 64px',
        }}
      />
      
      <div className="container-wide mb-8 relative z-10">
        <div className="text-center">
          <p className="text-base font-semibold text-gradient">
            Trusted by growing service businesses
          </p>
        </div>
      </div>

      {/* Scrolling Logo Carousel */}
      <div className="relative z-10">
        {/* Gradient masks for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-max animate-marquee hover:pause">
          {doubledClients.map((client, index) => (
            <div 
              key={`${client._id}-${index}`}
              className="flex-shrink-0 px-12"
            >
              {client.logo ? (
                <div className="h-20 max-w-[160px] flex items-center justify-center">
                  <Image
                    src={urlForImage(client.logo).width(160).height(80).url()}
                    alt={client.logo.alt || client.name}
                    width={160}
                    height={80}
                    className="object-contain h-full w-auto max-w-full"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-32 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                  <span className="font-heading font-bold text-xl text-white">{client.initials}</span>
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
