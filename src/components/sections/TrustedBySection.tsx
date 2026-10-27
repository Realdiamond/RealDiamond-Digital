import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

async function getCompanyLogos() {
  const logos = await client.fetch(
    `*[_type == "companyLogo"] | order(coalesce(order, 999) asc) {
      _id,
      name,
      initials,
      logo,
      website
    }`,
    {},
    {
      next: { revalidate: 3600 } // 1 hour - logos change very rarely
    }
  );
  return logos;
}

const TrustedBySection = async () => {
  const clients = await getCompanyLogos();

  // Double the array for seamless infinite scroll
  const doubledClients = [...clients, ...clients];

  return (
    <section className="pt-8" aria-label="Clients">
      <div className="container-wide">
        <div className="bg-foreground text-background border border-border flex flex-col md:flex-row md:items-center overflow-hidden">
          <p className="bp-label text-background/70 px-6 pt-5 md:py-0 md:w-48 shrink-0">Clients I&apos;ve worked with</p>
          <div className="relative flex-1 overflow-hidden md:border-l border-background/15">
            <div className="flex w-max animate-marquee">
              {doubledClients.map((client: any, index: number) => {
                const imageUrl = client.logo ? urlForImage(client.logo)?.width(400).url() : null;
                return (
                  <div
                    key={`${client._id}-${index}`}
                    className="flex-shrink-0 px-6 sm:px-8 py-5"
                    aria-hidden={index >= clients.length ? true : undefined}
                  >
                    {imageUrl ? (
                      <div
                        role="img"
                        aria-label={client.name}
                        className="h-12 sm:h-14 w-32 sm:w-36 bg-center bg-no-repeat bg-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                    ) : (
                      <span className="h-12 sm:h-14 flex items-center font-mono text-sm text-muted-foreground">
                        {client.initials || client.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
