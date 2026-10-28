import { client } from "@/sanity/lib/client";
import { CMS_REVALIDATE, listTag } from "@/lib/cms-cache";

async function getReviewStats() {
  return client.fetch<{ reviewCount: number; averageRating: number | null }>(
    `{
      "reviewCount": count(*[_type == "testimonial"]),
      "averageRating": math::avg(*[_type == "testimonial" && defined(rating)].rating)
    }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.testimonial,
        tags: [listTag("testimonial")],
      },
    }
  );
}

export default async function ProofBar() {
  const { reviewCount, averageRating } = await getReviewStats();

  const items = [
    { value: "10+", label: "Client websites since 2023" },
    { value: "4", label: "Countries · NG US CA NZ" },
    ...(averageRating
      ? [{ value: averageRating.toFixed(1), label: `Average · ${reviewCount} client reviews` }]
      : []),
    { value: "+75%", label: "Traffic · Pottery by Tolu" },
  ];

  return (
    <section aria-label="Results at a glance">
      <div className="container-wide">
        <dl className="bp-panel grid grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col-reverse justify-end p-5 sm:p-7 border-border ${index % 2 === 1 ? "border-l" : ""} ${
                index >= 2 ? "border-t lg:border-t-0" : ""
              } ${index === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="bp-label mt-3 normal-case tracking-normal">{item.label}</dt>
              <dd className="text-3xl sm:text-[42px] font-bold tracking-tight leading-none tabular-nums">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
