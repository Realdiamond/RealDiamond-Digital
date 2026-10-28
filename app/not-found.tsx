import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <section className="py-20 lg:py-28 min-h-[60vh] flex items-center">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="bp-label mb-14">Error 404</p>
            <div className="relative bp-frame inline-block">
              <span className="bp-note absolute -top-8 left-0">page not found</span>
              <h1 className="text-[44px] leading-[1.02] sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em]">
                This page isn&apos;t on the plan.
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mt-10 max-w-2xl">
              The page you&apos;re looking for doesn&apos;t exist or has moved. Try the homepage or the case studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button variant="accent" size="lg" asChild>
                <Link href="/">Back to the homepage</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">
                  See the case studies
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
