import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { devProfile } from "@/data/developer";

const terminalLines: { prompt?: string; output: string; tone?: "accent" | "string" }[] = [
  { prompt: "whoami", output: "Oluwatimilehin Akinsanmi, front-end developer" },
  { prompt: "cat stack.txt", output: devProfile.stack.join(" · "), tone: "string" },
  { prompt: "ls ~/projects", output: "glazionstudio  campushealth  sbz-farm  pottery-by-tolu  bto-global  smitbridge" },
  { prompt: "vercel ls --prod", output: "95+ production deployments", tone: "accent" },
];

export default function Hero() {
  return (
    <section className="pt-14 pb-20 lg:pt-20 lg:pb-28">
      <div className="container-wide grid lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-14 lg:gap-16 items-center">
        <div className="min-w-0">
          <p className="bp-label mb-10">Front-end development · React · Next.js · TypeScript</p>
          <h1 className="text-[44px] leading-[1.02] sm:text-6xl lg:text-[80px] lg:leading-[0.98] font-bold tracking-[-0.035em]">
            I build fast, accessible interfaces for the <span className="text-accent">web</span>.
          </h1>
          <p className="bp-note mt-5">React, Next.js and WordPress, from first commit to production</p>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mt-6 mb-8">
            I&apos;m <strong className="text-foreground font-semibold">Oluwatimilehin Akinsanmi</strong>, a front-end
            developer and UI/UX designer. I turn designs into typed, responsive, accessible interfaces, from client websites to
            AI-powered web apps and offline-first mobile apps.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="accent" size="lg" asChild>
              <Link href="/contact">
                Start a project
                <ArrowRight />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={devProfile.github} target="_blank" rel="noopener noreferrer">
                <Github />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        <figure className="bp-panel shadow-elevated min-w-0" aria-label="Terminal summary">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">~/realdiamond — zsh</span>
          </div>
          <div className="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-relaxed space-y-4 overflow-x-auto">
            {terminalLines.map((line) => (
              <div key={line.prompt}>
                <p>
                  <span className="text-accent">$</span> {line.prompt}
                </p>
                <p
                  className={
                    line.tone === "accent"
                      ? "text-accent"
                      : line.tone === "string"
                        ? "text-annotation-ink"
                        : "text-muted-foreground"
                  }
                >
                  {line.output}
                </p>
              </div>
            ))}
            <p aria-hidden="true">
              <span className="text-accent">$</span> <span className="inline-block w-2 h-4 align-middle bg-foreground animate-pulse" />
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}
