import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Small redline annotation shown under the title */
  note?: string;
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, title, description, note, children }: PageHeaderProps) {
  return (
    <section className="pt-14 pb-12 lg:pt-20 lg:pb-16">
      <div className="container-wide">
        <div className="max-w-4xl">
          <p className="bp-label mb-8">{eyebrow}</p>
          <h1 className="text-[40px] leading-[1.05] sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em]">{title}</h1>
          {note && <p className="bp-note mt-4">{note}</p>}
          {description && (
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mt-6 max-w-2xl">{description}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
