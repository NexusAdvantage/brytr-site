export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  { q: "Can you actually see it during the day?",
    a: "It is mounted to your soffit, up under the roof edge. We bring a demo kit to the consultation so you can see both products in person." },
  { q: "How is it mounted?",
    a: "We mount it to your soffit." },
  { q: "What happens at the design consultation?",
    a: "We come to your home and spend about an hour. We measure with a laser, turn on our demo kit to show you Jellyfish and Haven, price out both options and answer any questions about the install. You get exact pricing at the visit. We never quote off a photo or Google Earth." },
  { q: "What happens when a section stops working?",
    a: "Call us. Every system we install is backed by our lifetime product warranty, and full warranty details come with your quote. We only service lights we installed." },
  { q: "Do you show me how to use the app?",
    a: "Yes. After the install we schedule an app training visit. We spend about an hour walking you through everything, set up your everyday lighting and schedule your holidays so they turn on automatically." },
  { q: "Do you offer financing?",
    a: "Yes, financing is available. Ask us about it at the consultation." },
  { q: "Can it be installed in winter?",
    a: "It depends on the weather. We will talk through timing with you when we schedule the install." },
];

export const pricingFaqs: Faq[] = [
  { q: "Is there a charge for the consultation?", a: "No. The design consultation is free, and you get exact pricing at the visit." },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const serviceFaqsFor = (name: string): Faq[] => [
  { q: "Is this permanent or seasonal?",
    a: "Permanent. It stays up year round. It turns on white every night at sunset, and scheduled scenes take over for holidays and special occasions." },
  { q: "Can I add to it later?",
    a: "Yes. You can add landscape lighting or more of the roofline later." },
  { q: "What areas do you cover?",
    a: "Omaha, Elkhorn, Papillion, Gretna, Bellevue, La Vista, Ashland and Council Bluffs." },
  { q: "Will it work with my existing smart home?",
    a: "The lighting runs from its own app. Tell us what you use at home and we can talk about what works with it." },
  { q: "Is there a warranty?",
    a: "Yes. Every system is backed by our lifetime product warranty. Full warranty details come with your quote." },
  { q: "How do I get a quote?",
    a: "Book a free design consultation. We come to your home, show you both products and give you exact pricing at the visit." },
];
