"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/field";
import { submitLead, type LeadState } from "@/app/actions/lead";
import { ATTRIBUTION_KEYS, captureFirstTouch, type FirstTouch } from "@/lib/attribution";
import { trackGoogleLead } from "@/components/analytics/google-tag";

/* THE LEAD FORM. Four variants, one component, and every form on the site is one of them.
 *
 * IT LIVES IN ITS OWN FILE NOW because it is a Client Component and bits.tsx is not. Putting
 * "use client" at the top of bits.tsx would have dragged SectionHead, Check, Cross, TextLink and
 * ChannelEdge across the boundary with it - five components that render on twenty pages and have no
 * reason to ship JavaScript. bits.tsx re-exports this one so no caller had to change.
 *
 * IT IS A CLIENT COMPONENT for exactly one reason: `useActionState`, which is what turns a form
 * post into a success panel or an error message instead of a page navigation. The action itself
 * still runs on the server - see app/actions/lead.ts.
 *
 * WHAT IT REPLACED: `action="/free-design-consultation" method="get"`. Every form on this site
 * navigated to a page and put the homeowner's phone number in the URL bar. HANDOFF.md has carried
 * "Forms are not wired" as an open item since the site was built.
 *
 * THE VARIANTS:
 *   mini       name, phone, city. The home hero. No email - this is a trade that calls people back,
 *              and the rest of the conversation is better had by a person than by a select element
 *              sitting on a photograph.
 *   compact    adds email and what-are-you-lighting. The closing section, and page CTAs.
 *   full       adds street address and notes. /free-design-consultation.
 *   financing  compact, on a dark ground, with linear-foot language on the scope select.
 */
export function QuoteForm({
  variant = "full", city, heading, submitLabel = "Get my free design consultation", dark, className,
}: {
  variant?: "mini" | "compact" | "full" | "financing";
  city?: string; heading?: string; submitLabel?: string; dark?: boolean;
  /* Passed through to the <form>, and it exists for one caller: the home hero, which sets
   * `bg-background` so the card lands on warm limestone rather than white. `cn` is tailwind-merge,
   * so a background passed here beats the one in the base list rather than fighting it. */
  className?: string;
}) {
  const [state, formAction, pending] = useActionState<LeadState, FormData>(submitLead, null);
  const pathname = usePathname();

  /* FIRST TOUCH, READ IN AN EFFECT RATHER THAN DURING RENDER.
   *
   * localStorage does not exist on the server, so reading it while rendering would either throw
   * during the prerender or produce markup the client disagrees with. Starting at null means the
   * server and the browser's first render both emit empty hidden inputs, and the real values land
   * on the pass straight after hydration. See lib/attribution.ts.
   *
   * IT CALLS capture RATHER THAN read, AND THAT IS NOT A STYLE CHOICE. The first version read
   * storage here and left the writing to FirstTouchAttribution in the root layout. Measured in a
   * browser, that loses the campaign on the single most important visit there is: somebody landing
   * straight from an ad onto a page with a form on it. The form is inside children, so it mounts
   * and runs its effect BEFORE the analytics components that follow children in the layout, and it
   * read an empty store a tick before the capture wrote it. Every hidden field posted blank.
   *
   * captureFirstTouch returns what is already stored when there is something, and otherwise reads
   * the URL, stores it and returns that, so calling it from both places is safe and the form no
   * longer depends on mount order to know where its visitor came from. */
  const [firstTouch, setFirstTouch] = useState<FirstTouch | null>(null);
  useEffect(() => {
    setFirstTouch(captureFirstTouch());
  }, []);

  /* THE META LEAD EVENT, AND THE THREE WAYS IT COULD HAVE BEEN WRONG.
   *
   * It fires here and nowhere else, which means it cannot fire on page load: this effect has
   * nothing to do until a submission has come back.
   *
   * It is keyed on state.lead rather than state.ok. A failed post leaves ok false and never gets
   * here, and the honeypot returns ok true with nothing posted, which must not count as a
   * conversion. app/actions/lead.ts sets `lead` on exactly one path, the one where the CRM
   * answered 2xx.
   *
   * The ref is the guard against counting one submission twice. useActionState hands back a new
   * state object per submission so the dependency genuinely changes once per post, but React runs
   * effects twice in development StrictMode, and a remount for any other reason would replay the
   * last state. Latching it means one conversion per successful submission, permanently. */
  const leadFired = useRef(false);
  useEffect(() => {
    if (!state?.lead || leadFired.current) return;
    leadFired.current = true;
    window.fbq?.("track", "Lead");
    /* Google Ads gets the same conversion on the same path, under the same latch. */
    trackGoogleLead();
  }, [state]);

  const onDark = variant === "financing" || !!dark;
  const mini = variant === "mini";

  /* THE FORM BREAKS ON ITS OWN WIDTH, NOT THE VIEWPORT. `sm:grid-cols-2` is a viewport query, so
   * in the 24rem panel that closes twelve page templates the form still went two columns at
   * desktop: "Email" rendered as "you@example.or" and the city select as "Select your ci". A
   * container query asks the box instead, so the same component is two columns on the
   * consultation page and one column in a narrow rail, with nothing passed in to say so. */
  const shell = cn(
    "@container rounded-lg p-6 sm:p-7",
    onDark
      ? "form-on-dark bg-raise shadow-[var(--shadow-dark)] ring-1 ring-accent/15"
      /* The hairline matches the four light card types on the home page - see the note above
         Services in components/sections/home.tsx. A white form card on warm limestone was
         separated by a soft shadow alone, which reads as blur rather than as an object. */
      : "bg-card shadow-[var(--shadow-lg)] ring-1 ring-border",
    className
  );

  /* SUCCESS REPLACES THE FORM RATHER THAN SITTING ABOVE IT. A confirmation message with the fields
   * still underneath reads as though it might not have worked, and invites a second submission. */
  if (state?.ok) {
    return (
      <div className={shell}>
 <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent" aria-hidden>
            <svg viewBox="0 0 16 16" className="size-4 text-accent-foreground" fill="none">
              <path d="m3.2 8.4 3 3 6.6-6.8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h3 className={cn("text-xl", onDark ? "text-on-dark" : "text-foreground")}>
              Request received
            </h3>
            <p className={cn("mt-2 text-[0.95rem] leading-relaxed", onDark ? "text-on-dark-muted" : "text-muted-foreground")}>
              {state.message}
            </p>
            <a
              href={site.phoneHref}
              className={cn(
 "u mt-4 inline-block font-display font-bold underline decoration-accent decoration-2 underline-offset-4",
                onDark ? "text-on-dark" : "text-foreground"
              )}
            >
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className={shell}>
 {heading && (
        <h3 className={cn("mb-5 text-xl", onDark ? "text-on-dark" : "text-foreground")}>{heading}</h3>
      )}

      {/* Context for whoever picks the lead up in the CRM: which page it came from and which form. */}
      <input type="hidden" name="page" value={pathname} />
      <input type="hidden" name="form" value={variant} />
      {/* The city pages still know their own town. Nobody picks it any more, so it travels as a
        * hidden value and the CRM keeps the key it has always mapped. */}
      {city && <input type="hidden" name="city" value={city} />}

      {/* WHICH AD BROUGHT THEM, CARRIED INTO THE CRM WITH THE LEAD.
        *
        * One hidden input per attribution key, always rendered, empty when there is nothing
        * stored. Always rendering them keeps the posted field set identical on every submission,
        * so a direct visit reads in the CRM as an empty campaign rather than as a missing field,
        * and nobody has to write a mapping that copes with both shapes.
        *
        * The values are whatever was captured on the visitor's FIRST page of their first visit,
        * which is usually not this page and may not even be this week. lib/attribution.ts has the
        * reasoning. */}
      {ATTRIBUTION_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} value={firstTouch?.[k] ?? ""} />
      ))}

      {/* THE HONEYPOT. Not `display:none` - some bots skip hidden fields and some screen readers
        * announce them - so it is pulled off-screen, taken out of the tab order, and labelled as
        * not-for-you for anything that does read it.
        *
        * IT WAS NAMED `company` AND LABELLED "Company", AND IT SWALLOWED REAL LEADS. Autofill and
        * password managers match on the name, the id and the label text, and they fill a field
        * called "company" no matter where it sits on the page or what autoComplete says. Anyone
        * with an employer saved in their browser tripped it, saw the thank-you, and was never
        * heard from. The name, the id and the label are all meaningless now for exactly that
        * reason - nothing in any browser's heuristics matches `ref_ck`. DO NOT give this field a
        * human-sounding name again. The full account is in app/actions/lead.ts. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={variant + "-ref-ck"}>Leave this field empty</label>
        <input
          id={variant + "-ref-ck"}
          name="ref_ck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-form-type="other"
        />
      </div>

      {/* MINI PUTS NAME AND PHONE ON ONE ROW AND THE CITY UNDER THEM, which is the reference
        * form's shape (edentreepros.com: name + phone paired, then a full-width field, then the
        * select). Three fields in an L rather than three stacked full-width rows takes about 90px
        * off the card's height, and on a hero card height is the whole argument. */}
      {/* MINI KEEPS ITS PAIR; EVERYTHING ELSE STACKS.
        *
        * Measured, because the first attempt at this was wrong in both directions. Every form on
        * the site sits in a 384px to 448px box - the hero card, the closer panel, even the
        * consultation page - so `sm:grid-cols-2`, a VIEWPORT query, put two ~180px fields side by
        * side everywhere at desktop. That is where "you@example.or" and "Select your ci" came
        * from, and it was sitewide rather than new.
        *
        * A container query fixed the asking but not the threshold: at `@md` the hero lost its
        * name-and-phone row, which is a deliberate piece of that card - three fields in an L
        * rather than three stacked rows takes about 90px off its height, and on a hero card
        * height is the argument.
        *
        * THE ANSWER IS PER FIELD, NOT PER FORM, and stacking everything was an overcorrection.
        * Making the whole form one column stopped the clipping and made it five rows tall, which
        * in the closer left the copy column finishing 260px above the form and a hole in the
        * bottom left of the section on twelve templates.
        *
        * Only two fields actually need the width. "you@example.org" and the city select both
        * clip at 156px; "Jordan Miller" and "402-555-0134" do not. So the grid is two columns
        * from a 20rem container, the name and the phone share the first row, and everything with
        * a long value spans both. One row shorter than the stack, and nothing is cut off. */}
      <div className={`grid gap-4 ${mini ? "grid-cols-2" : "@xs:grid-cols-2"}`}>
        <div>
          <Label htmlFor={variant + "-name"}>Full name</Label>
          <Input id={variant + "-name"} name="name" required autoComplete="name" placeholder="Jordan Miller" />
        </div>
        <div>
          <Label htmlFor={variant + "-phone"}>Phone</Label>
          <Input id={variant + "-phone"} name="phone" type="tel" required autoComplete="tel" className="u" placeholder="402-555-0134" />
        </div>
        {!mini && (
          <div className="@xs:col-span-2">
            <Label htmlFor={variant + "-email"}>Email</Label>
            <Input id={variant + "-email"} name="email" type="email" required autoComplete="email" placeholder="you@example.org" />
          </div>
        )}
        {/* The `full` variant had its own "Street address" input as well. With City replaced by
          * Address that was the same question twice on one form, so it is gone rather than
          * renamed. */}
        {/* ADDRESS, NOT A CITY SELECT. Asked for on every variant.
          *
          * The select was a closed list of the twelve towns we serve, which reads as a filter the
          * homeowner has to pass rather than a question about their house, and it told us the one
          * thing we could already guess from the page they were on. The street address is what the
          * crew actually needs to turn up, and it contains the town anyway.
          *
          * Where the page knows the city, it still rides along as a hidden field, so the CRM keeps
          * the same key it has always had even though nobody is picking it from a list any more. */}
        <div className="col-span-2">
          <Label htmlFor={variant + "-address"}>Address</Label>
          <Input
            id={variant + "-address"}
            name="address"
            required
            autoComplete="street-address"
            placeholder="1400 N 90th St, Omaha"
          />
        </div>
        {!mini && (
          <div className="@xs:col-span-2">
            <Label htmlFor={variant + "-scope"}>
              {variant === "financing" ? "Estimated roofline" : "What are you lighting"}
            </Label>
            {/* This had no empty option, so "Roofline" was not a placeholder - it was the
              * default, and a form left alone submitted "Roofline" for somebody who came for
              * landscape. Both selects now start empty and ask. */}
            <Select id={variant + "-scope"} name="scope" defaultValue="" required>
              <option value="">
                {variant === "financing" ? "Roughly how much" : "Choose one"}
              </option>
              {variant === "financing" ? (
                <>
                  <option>Under 150 linear ft</option>
                  <option>150 to 250 linear ft</option>
                  <option>250 to 400 linear ft</option>
                  <option>Over 400 linear ft</option>
                  <option>Not sure yet</option>
                </>
              ) : (
                <>
                  <option>Roofline</option>
                  <option>Landscape</option>
                  <option>Patio or pergola</option>
                  <option>Hardscape</option>
                  <option>Not sure yet</option>
                </>
              )}
            </Select>
          </div>
        )}
        {/* ONE FREE-TEXT FIELD, ON EVERY VARIANT INCLUDING THE HERO. It was a `full`-only "Notes"
          * box. It is the field that catches the thing no dropdown covers, and the placeholder is
          * a real example rather than the word "notes", because an empty box labelled Notes gets
          * left empty. Optional: it must not stand between somebody and the callback. */}
        <div className="col-span-2">
          <Label htmlFor={variant + "-note"}>Anything we should know</Label>
          <Textarea
            id={variant + "-note"}
            name="note"
            rows={mini ? 2 : 3}
            placeholder="Two story, dormers on the front elevation."
          />
        </div>
      </div>

      <Button size="block" className="mt-5" type="submit" disabled={pending}>
        {pending ? "Sending…" : submitLabel}
      </Button>

      {/* aria-live so the failure is announced rather than only drawn. */}
      {state && !state.ok && (
        <p role="alert" aria-live="polite" className="mt-3 text-sm font-semibold text-destructive">
          {state.message}
        </p>
      )}

    </form>
  );
}
