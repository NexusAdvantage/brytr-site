/* PER-COMPARISON DETAIL — the fields that keep nine comparison pages from being one table
 * with the name swapped.
 *
 * content/compares.ts already holds what differs by argument: the verdict, where each side
 * wins, the cost tiers, and the neutral / labor flags. This file holds the photograph
 * and the two suggested next comparisons for each page.
 *
 * The "what we do not know" lists were removed 28 Oct 2026 along with every spec claim about
 * brands Brytr does not carry. See the note at the top of content/compares.ts.
 *
 * PHOTOGRAPHS. Every shot on these pages is a Brytr install, and the footnote on every one
 * of them says that the other system is not pictured. Photographing our own work and
 * captioning it as the competitor's, or theirs as ours, is the one thing a comparison page
 * must not do — so it does not happen, and the absence is stated rather than papered over.
 * Some of these shots also appear on a service or systems page; the alternative was no
 * photograph at all, which is worse.
 */

export type CompareDetail = {
  photo: string;
  photoAlt: string;
  objectPosition?: string;
  /** two chosen next comparisons, not the other eight */
  alsoSee: string[];
};

export const compareDetail: Record<string, CompareDetail> = {
  "haven-vs-jellyfish-lighting": {
    photo: "/img/roofline-detail.jpg",
    photoAlt: "Brytr channel lighting following the gable and eave lines of an Omaha home",
    objectPosition: "50% 52%",
    alsoSee: ["haven-vs-gemstone-lights", "jellyfish-vs-gemstone-lights"],
  },

  "haven-vs-gemstone-lights": {
    photo: "/img/g-gable-detail.jpg",
    photoAlt: "Close view of the lit channel following two gable edges on an Omaha home",
    objectPosition: "50% 45%",
    alsoSee: ["jellyfish-vs-gemstone-lights", "haven-vs-trimlight"],
  },

  "haven-vs-trimlight": {
    photo: "/img/christmas-detail.jpg",
    photoAlt:
      "Permanent Christmas lights alternating red and green bulbs along every roofline of an Omaha home",
    objectPosition: "50% 50%",
    alsoSee: ["haven-vs-gemstone-lights", "haven-vs-everlights"],
  },

  "haven-vs-oelo": {
    photo: "/img/channel-detail.jpg",
    photoAlt:
      "Close view of a Brytr channel tucked into the fascia of an Omaha home, individual warm white LEDs visible along every gable and eave",
    objectPosition: "50% 55%",
    alsoSee: ["haven-vs-gemstone-lights", "haven-vs-minleon-rainmin"],
  },

  "haven-vs-govee": {
    photo: "/img/g-pool-red.jpg",
    photoAlt: "An Omaha home and pool deck lit red at dusk",
    objectPosition: "50% 45%",
    alsoSee: ["haven-vs-jellyfish-lighting", "jellyfish-vs-gemstone-lights"],
  },

  "haven-vs-minleon-rainmin": {
    photo: "/img/scene-game-day.jpg",
    photoAlt: "An Omaha ranch home with its roofline in red over white for game day",
    objectPosition: "50% 48%",
    alsoSee: ["haven-vs-oelo", "haven-vs-everlights"],
  },


  "haven-vs-everlights": {
    photo: "/img/scene-green.jpg",
    photoAlt: "An Omaha ranch home with its roofline in green for St. Patrick's Day",
    objectPosition: "50% 50%",
    alsoSee: ["haven-vs-trimlight", "haven-vs-gemstone-lights"],
  },

  "jellyfish-vs-gemstone-lights": {
    photo: "/img/g-ranch-blue-white.jpg",
    photoAlt:
      "A long Omaha ranch elevation lit blue and white with landscape uplighting",
    objectPosition: "50% 45%",
    alsoSee: ["haven-vs-jellyfish-lighting", "haven-vs-gemstone-lights"],
  },
};

export const detailForCompare = (slug: string) => compareDetail[slug];
