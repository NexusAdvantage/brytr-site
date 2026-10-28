export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  { q: "Can you actually see it during the day?",
    a: "The track is low profile and runs along the roofline, so it blends in during the day. Ask us for daytime photos at the consultation." },
  /* "What does it cost?" WAS HERE and is gone. It stated a pricing model - by linear foot plus
   * complexity - and then pointed at /pricing to "publish real ranges", which was a page of
   * invented figures. Removed 27 Aug 2026 with the page. When Brytr gives us a real basis this
   * question is the single most valuable one on the site and should come back first. Until then
   * the honest answer is a phone call, which is what /contact is for. */
  { q: "Does it damage my soffit or fascia?",
    a: "It is fastened to the house and sealed. We go over how it mounts on your home at the design consultation." },
  { q: "What happens when a section stops working?",
    a: "Call us. We service anything we installed." },
  { q: "Can it be installed in winter?",
    a: "It depends on the weather. We will talk through timing with you when we schedule the install." },
  { q: "Do I need to be home for the install?",
    a: "We will sort that out with you when we schedule it. Either way, we will make sure you know how to use the app." },
  /* THE HOA ANSWER ENDED "...and bring it to the visit, and we will go through it with you."
   * Removed 29 Aug 2026 off the client punch list: HOA has never been a problem for Brytr and it
   * is not something the crew discusses on site, so the site should not be promising a covenant
   * review at the appointment. The useful half - read your own clause first - stays. */
  { q: "Will my HOA allow it?",
    a: "That depends on your HOA. Check its rules on exterior lighting before you plan anything." },
  { q: "How long does an install take?",
    a: "It depends on the house and what is being installed. We can talk about timing when we give you your quote." },
];

/* THE PRICING FAQ SET IS GONE. Nine questions, and every one of them answered with a specific
 * nobody at Brytr supplied: a deposit policy, a lending partner, quote validity, what a second
 * visit saves, how fascia repair is charged. They read as authoritative because they were written
 * as answers rather than as guesses, which is exactly what made them dangerous on a live site.
 *
 * ONE OF THE NINE SURVIVES, moved into homeFaqs above: "Is there a charge for the consultation?"
 * The answer is no, and that is the offer Brytr has led with everywhere, on the old site included.
 * It is also the one answer that cannot hurt a homeowner if we have it wrong.
 *
 * The rest are in git: `git show c53361a:content/faqs.ts`. Do not restore any of them without
 * figures from Brytr in writing. */
export const pricingFaqs: Faq[] = [
  { q: "Is there a charge for the consultation?", a: "No. The design consultation and the written quote are free." },
];

/* `name` is no longer interpolated into a question: "How long does Holiday and Seasonal Scenes
 * take to install?" was broken grammar on several pages. Kept as a parameter so callers do not
 * change. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const serviceFaqsFor = (name: string): Faq[] => [
  { q: "How long does an install take?",
    a: "It depends on the house and what is being installed. We can talk about timing when we give you your quote." },
  { q: "Is this permanent or seasonal?",
    a: "Permanent. It stays up year round, so there is nothing to take down in January." },
  { q: "Can I add to it later?",
    a: "Yes. You can add more lighting later, such as landscape, patio or more of the roofline." },
  { q: "What areas do you cover?",
    a: "The Omaha metro and Council Bluffs. Every city we serve is named on our service areas page." },
  { q: "Will it work with my existing smart home?",
    a: "The lighting runs from its own app. Tell us what you use at home and we can talk about what works with it." },
  { q: "How do I get a quote?",
    a: "Book a free design consultation. We visit, design it with you, and give you a written quote." },
];
