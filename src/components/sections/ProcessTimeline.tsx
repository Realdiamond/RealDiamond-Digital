const steps = [
  {
    title: "Discover",
    description:
      "We talk through your goals, your audience and what each visitor needs to do on the site. I review your current site and competitors.",
    deliverable: "Call + site review",
  },
  {
    title: "Structure",
    description:
      "I map the pages and wireframe the key screens, so we agree on the content and the path to each action before any visual design.",
    deliverable: "Sitemap + wireframes",
  },
  {
    title: "Design & build",
    description:
      "The interface is designed from consistent components, then built fast, responsive and SEO-ready, desktop and mobile together.",
    deliverable: "Designs + build",
  },
  {
    title: "Launch & refine",
    description:
      "We launch, check everything on real devices, and keep improving based on how real visitors use the site.",
    deliverable: "Launch + updates",
  },
];

const ProcessTimeline = () => {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="process-title">
      <div className="container-wide">
        <div className="bp-heading mb-10">
          <h2 id="process-title" className="text-4xl md:text-5xl font-bold">
            How we&apos;ll work together
          </h2>
          <span className="bp-note">4 steps · you see the structure before the pixels</span>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-card p-6 sm:p-7 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="bp-note">{step.deliverable}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessTimeline;
