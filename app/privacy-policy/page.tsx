import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";
import { Shell } from "@/app/layout-shell";
import { PageHero } from "@/components/sections/page-parts";
import { site } from "@/content/site";
import { Jsonld, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Brytr Co collects and uses the information you send through this site, and how to ask us to delete it.",
  ...pageUrl("/privacy-policy"),
  robots: { index: false, follow: true },
};
const trail = [{ name: "Home", href: "/" }, { name: "Privacy policy", href: "/privacy-policy" }];

export default function Page() {
  return (
    <Shell>
      <Jsonld data={breadcrumb(trail)} />
      {/* type variant: no photograph, no form, no closing band. A legal page should
        * look plain, and plain is the correct design for what this is. */}
      <PageHero
        variant="type"
        h1="Privacy policy"
        lede="What we collect when you send us a form, and how we use it."
        trail={trail}
      />
      <section className="section bg-card">
        <div className="shell">
          <div className="max-w-[76ch]">
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">What we collect</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">When you submit a form on this site we collect the details you type into it: your name, phone number, email address, property address, the city you selected, what you are looking to light, and anything you write in the notes field.</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">We also receive standard technical information that any website receives, such as your approximate location, browser and the pages you viewed.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Why we collect it</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">We use your details to respond to you, to set up a design consultation, and to give you a quote.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">How long we keep it</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">We keep your details for as long as we need them to respond to you and to provide and service any work you ask for.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Service providers</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">Details you submit are used to respond to you. They are handled by the service providers that operate this site&rsquo;s forms, scheduling and maps.</p>
          <h2 className="mt-9 text-[1.5rem] text-foreground first:mt-0">Your choices</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Call the number below.</p>
          <div className="mt-10 rounded-lg bg-muted p-6">
            <p className="label text-muted-foreground">Questions</p>
            <p className="mt-2 text-[0.95rem] text-muted-foreground">
              Anything on this page you want explained, call{" "}
              <a href={site.phoneHref} className="u text-foreground underline decoration-accent decoration-2 underline-offset-4">{site.phone}</a>.
            </p>
          </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
