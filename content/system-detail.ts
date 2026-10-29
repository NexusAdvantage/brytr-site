/* PER-SYSTEM DETAIL — the fields that stop eight hardware pages being one hardware page.
 *
 * content/systems.ts already holds what each system IS: specs, wins, limits. All of that is
 * real and all of it differs. What the template was missing was everything ABOUT the
 * system: which photograph belongs to it, where it sits relative to the rest of the line,
 * and what it needs from the homeowner.
 *
 * PHOTOGRAPHS. Some are shared with a service page on purpose: the Q Series page and the
 * soffit service page are looking at the same hardware on the same overhang, and inventing
 * a second photograph of it would mean not having one. Where a shot is shared it is because
 * it is literally the subject, never to fill a slot.
 */

export type SystemDetail = {
  photo: string;
  photoAlt: string;
  objectPosition?: string;
  /** one line on where this sits relative to the rest of the lineup */
  position: string;
  /** the honest exclusion. Every entry names a real house we would steer away from it. */
  notFor: { h: string; p: string };
  /** chosen, in order — not the other seven sliced off the array */
  alsoSee: string[];
};

export const systemDetail: Record<string, SystemDetail> = {
  "haven-evolution": {
    photo: "/img/hero-game-day.jpg",
    photoAlt: "An Omaha home with its Brytr lighting switched to red and blue game day colors",
    objectPosition: "50% 52%",
    position:
      "One of the two roofline systems we install, alongside Jellyfish.",
    notFor: {
      h: "What it needs from you",
      p: "Home WiFi. Which system suits your house is decided with you at the design consultation.",
    },
    alsoSee: ["haven-q-series", "app-and-controls", "jellyfish-lighting"],
  },

  "haven-q-series": {
    /* Shared with /services/soffit-lighting on purpose: it is the same fixture under the
     * same overhang, and there is one photograph of it. */
    photo: "/img/soffit-eaves.jpg",
    photoAlt: "Soffit and eave lighting on an Omaha home, gables in color and eaves left white",
    objectPosition: "50% 55%",
    position: "Soffit lighting that can go with roofline lighting.",
    notFor: {
      h: "Is it right for your house",
      p: "We look at your house with you at the design consultation and tell you if it is a good fit.",
    },
    alsoSee: ["haven-evolution", "haven-x-bistro-lights", "app-and-controls"],
  },

  "haven-9-series-landscape-lights": {
    /* Shared with /services/landscape-lighting: same fixtures, same night. */
    photo: "/img/landscape.jpg",
    photoAlt: "Landscape lighting and tree uplighting at an Omaha home after dark",
    objectPosition: "50% 50%",
    position: "Landscape lighting for paths, trees and beds.",
    notFor: {
      h: "Planning it",
      p: "We walk the yard with you at the design consultation and plan the lighting around what you have.",
    },
    alsoSee: ["haven-x-bistro-lights", "haven-q-series", "app-and-controls"],
  },

  "haven-x-bistro-lights": {
    photo: "/img/g-pool-pergola.jpg",
    photoAlt:
      "A lit pergola over a pool patio at an Omaha home, the roofline and pergola fascia set to green, with a fire bowl on a seat wall",
    objectPosition: "50% 45%",
    position: "Permanent bistro lighting for pergolas, patio covers and gazebos.",
    notFor: {
      h: "What it needs",
      p: "Something to hang from, like a pergola or patio cover. We go over your space at the design consultation.",
    },
    alsoSee: ["haven-9-series-landscape-lights", "haven-q-series", "haven-evolution"],
  },

  "jellyfish-lighting": {
    photo: "/img/g-pool-pink.jpg",
    photoAlt: "An Omaha home and pool deck lit pink at dusk",
    objectPosition: "50% 45%",
    position:
      "One of the two roofline systems we install, alongside Haven.",
    notFor: {
      h: "What it needs from you",
      p: "Home WiFi. Which system suits your house is decided with you at the design consultation.",
    },
    alsoSee: ["haven-evolution", "app-and-controls"],
  },

  "app-and-controls": {
    photo: "/img/scene-fourth.jpg",
    photoAlt: "An Omaha home in red, white and blue for the Fourth of July",
    objectPosition: "50% 50%",
    position:
      "Not something you buy separately. It is how you control the lighting.",
    notFor: {
      h: "What it needs from you",
      p: "Home WiFi and a phone. We can help you get your scenes set up.",
    },
    alsoSee: ["jellyfish-lighting", "haven-evolution"],
  },
};

export const detailForSystem = (slug: string) => systemDetail[slug];
