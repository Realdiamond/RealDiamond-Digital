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

  // Triple the array for seamless infinite scroll
  const tripleClients = [...clients, ...clients, ...clients];

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
        
        <div className="flex animate-marquee hover:pause">
          {tripleClients.map((client, index) => (
            <div 
              key={`${client._id}-${index}`}
              className="flex-shrink-0 mx-12 group cursor-default"
            >
              {client.logo ? (
                <div className="w-32 h-20 flex items-center justify-center">
                  <Image
                    src={urlForImage(client.logo).width(128).height(80).url()}
                    alt={client.logo.alt || client.name}
                    width={128}
                    height={80}
                    className="object-contain w-full h-full"
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
