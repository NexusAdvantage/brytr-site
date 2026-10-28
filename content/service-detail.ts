/* PER-SERVICE PAGE DETAIL.
 *
 * Why this file exists. One template generates eleven service pages, and before this it
 * gave all eleven the same body: the same six "Step 1…6" cards with identical copy, the
 * same "Quick facts" table (including "Roof types: shingle, metal, tile, flat" on the
 * landscape page, which has nothing to do with a roof), the same permanent-versus-hanging
 * comparison table (on the hardscape page, where nobody hangs anything seasonally), and
 * the same related-services grid. Eleven URLs, one page.
 *
 * So everything that should differ per service lives here, and the template reads it:
 *
 *   facts     — the quick-facts table, written for THIS service. Nothing generic, and
 *               nothing that is not true of it.
 *   included  — what is in the written quote for THIS service. No step numbers; the
 *               client's rule is no numbers used as descriptors.
 *   figure    — which centerpiece the page carries. One per service, and no two services
 *               share one. See components/sections/service-figures.tsx.
 *   compare   — whether the permanent-versus-hanging table belongs on the page at all. It
 *               is honest on the roofline and holiday pages and nonsense on the others.
 *   alsoSee   — chosen, in order, not `services.slice(0, 4)`.
 *   proofShot — the photograph that page closes on, so eleven pages do not all show the
 *               same house.
 *
 * Everything here is either a fact about the hardware we install or a judgment we are
 * making as the installer. No invented prices, warranties or timescales.
 *
 * Oct 2026: rewritten to general copy. No specs, measurements, install methods or claims
 * about what customers do that Brytr has not confirmed. Unrendered `shots` arrays were
 * removed with it.
 */

import type { Shot } from "@/content/photo-sets";

export type FigureKey =
  | "zones" | "calendar" | "eave" | "beam" | "wall"
  | "fixtures" | "pergola" | "scenes" | "gameday" | "parapet";

export type ServiceDetail = {
  /** The second paragraph of "What X actually is."
   *
   *  This used to be one hardcoded sentence in the template, printed on every service page:
   *  "It is installed once, by our own crew, and it stays on the building. Nothing goes up in
   *  November and nothing comes down in January." True of a new roofline install, and a
   *  non-answer on the landscape and hardscape pages, which is the loudest reason several of
   *  these pages used to read as one document. */
  secondPara: string;
  facts: [string, string][];
  included: [string, string][];
  figure: FigureKey;
  compare: boolean;
  alsoSee: string[];
  proofShot?: string;      // path in /public/img
  proofCaption?: string;

  /* PHOTOGRAPHS IN THE BODY, CHOSEN PER SERVICE.
   *
   * The city pages rotate a shared pool, because a photograph of a lit roofline is equally
   * true in Elkhorn and in Gretna. That trick is wrong here: on a service page the photograph
   * has to be OF the service. A Christmas frame on the hardscape page would be worse than no
   * photograph at all, so these are assigned by hand, per slug, with the caption written
   * against the specific thing in the specific frame.
   *
   * `shots`  three or four for a strip.
   * `pair`   two frames of the SAME subject that mean something only together — the arch by
   *          day and lit, the one house on warm white and on a color scene. Only set this
   *          where the two frames are genuinely registered against each other; a pair of two
   *          different houses is a strip with a misleading label on it. */
  shots?: Shot[];
  pair?: { a: string; b: string; aLabel: string; bLabel: string; title: string; lede: string };
};

export const serviceDetail: Record<string, ServiceDetail> = {
  "permanent-outdoor-lighting": {
    pair: {
      a: "seqEveryday", b: "seqGameday",
      aLabel: "Warm white on the roofline, eaves and garage.",
      bLabel: "The same house with a gameday scene switched on.",
      title: "The same house, with the setting changed.",
      lede: "Same lights, two different scenes, picked from the app.",
    },
    secondPara:
      "It is installed once and it stays on the house. Nothing goes up in November and nothing comes down in January.",
    figure: "zones",
    compare: true,
    facts: [
      ["Systems", "Jellyfish or Haven"],
      ["Color", "Full color and white"],
      ["Control", "App, with scenes and schedules"],
      ["Stays up", "Year round"],
      ["Add to it", "Later, if you want"],
    ],
    included: [
      ["Design consultation", "We visit and design it with you at your house."],
      ["The system", "Jellyfish or Haven, chosen with you at the consultation."],
      ["The install", "We handle the install."],
      ["App setup", "Scenes and schedules on your phone."],
    ],
    alsoSee: ["permanent-roofline-lighting", "landscape-lighting", "patio-pergola-bistro-lighting", "holiday-seasonal-scenes"],
    proofShot: "/img/scene-warm-white.jpg",
    proofCaption: "Warm white on an Omaha home, with the pergola and hardscape lit too.",
  },

  "permanent-christmas-lights": {
    secondPara:
      "The lights that run red and green in December can run warm white the rest of the year. You set Christmas from your phone and then set it back.",
    figure: "calendar",
    compare: true,
    facts: [
      ["Hung each year", "Never again"],
      ["Christmas colors", "Red and green, or any you like"],
      ["Scheduling", "From the app"],
      ["January takedown", "Nothing to take down"],
      ["Rest of the year", "Warm white, or any scene"],
    ],
    included: [
      ["Christmas scenes", "Red and green, warm white, or your own colors."],
      ["Schedules", "Set the lights to come on and go off without touching them."],
      ["Everyday lighting", "The same lights work the rest of the year."],
      ["No storage", "No boxes, no clips and no ladder in December."],
    ],
    alsoSee: ["holiday-seasonal-scenes", "permanent-roofline-lighting", "gameday-lighting", "permanent-outdoor-lighting"],
    proofShot: "/img/christmas-detail.jpg",
    proofCaption: "Red and green on an Omaha roofline.",
  },

  "permanent-roofline-lighting": {
    pair: {
      a: "archByDay", b: "archAtNight",
      aLabel: "An arched entry in daylight.",
      bLabel: "The same entry after dark.",
      title: "Day and night.",
      lede: "The lighting follows the shape of the roof.",
    },
    secondPara:
      "The track runs along the roofline and stays up year round. You control it from an app.",
    figure: "eave",
    compare: true,
    facts: [
      ["Systems", "Jellyfish or Haven"],
      ["Runs along", "The roofline"],
      ["Color", "Full color and white"],
      ["Control", "App, with scenes and schedules"],
    ],
    included: [
      ["Design consultation", "We look at your roofline with you and plan the lighting."],
      ["The system", "Jellyfish or Haven, chosen with you at the consultation."],
      ["The install", "We handle the install and we are here for service afterwards."],
    ],
    alsoSee: ["soffit-lighting", "permanent-outdoor-lighting", "permanent-christmas-lights", "landscape-lighting"],
    proofShot: "/img/roofline-detail.jpg",
    proofCaption: "Roofline lighting along a gable.",
  },

  "soffit-lighting": {
    secondPara:
      "Soffit lighting sits under the overhang and lights the face of the house. It is a different look from roofline lighting, and you can use both.",
    figure: "beam",
    compare: false,
    facts: [
      ["Sits", "Under the overhang"],
      ["Lights", "The face of the house"],
      ["Control", "From the app"],
      ["Zoned", "Apart from the roofline"],
    ],
    included: [
      ["Design consultation", "We look at the house with you and plan the lighting."],
      ["The install", "We handle the install."],
      ["Its own setting", "Soffit and roofline can be set differently."],
    ],
    alsoSee: ["permanent-roofline-lighting", "permanent-outdoor-lighting", "hardscape-lighting", "landscape-lighting"],
    proofShot: "/img/soffit-eaves.jpg",
    proofCaption: "Soffit and eave lighting on an Omaha home: gables in color, eaves left white.",
  },

  "hardscape-lighting": {
    secondPara:
      "Hardscape lighting goes into walls, steps and columns so the stone is lit at night.",
    figure: "wall",
    compare: false,
    facts: [
      ["Goes into", "Walls, steps and columns"],
      ["Lights", "The stone and the steps"],
      ["Control", "From the app"],
    ],
    included: [
      ["Design consultation", "We look at the patio and yard with you and plan the lighting."],
      ["Wall and step lighting", "Light on the walls and steps."],
      ["The install", "We handle the install."],
    ],
    alsoSee: ["landscape-lighting", "patio-pergola-bistro-lighting", "permanent-outdoor-lighting", "soffit-lighting"],
    proofShot: "/img/hardscape.jpg",
    proofCaption: "Hardscape lighting on stone at an Omaha pool deck.",
  },

  "landscape-lighting": {
    secondPara:
      "Path lights, tree uplighting and lighting for beds. It can be set apart from the house, so the yard can be on when the roofline is off.",
    figure: "fixtures",
    compare: false,
    facts: [
      ["Lights", "Paths, trees and beds"],
      ["Control", "From the app"],
      ["Zoned", "Apart from the house"],
      ["Season", "Year round"],
    ],
    included: [
      ["Design consultation", "We walk the yard with you and plan the lighting."],
      ["Trees and beds", "Uplighting for trees and lighting for beds."],
      ["Paths", "Path lights along your walks."],
      ["The install", "We handle the install."],
    ],
    alsoSee: ["hardscape-lighting", "patio-pergola-bistro-lighting", "permanent-outdoor-lighting", "permanent-roofline-lighting"],
    proofShot: "/img/landscape.jpg",
    proofCaption: "Tree uplighting and bed lighting on an Omaha property after dark.",
  },

  "patio-pergola-bistro-lighting": {
    secondPara:
      "Permanent lighting on your pergola, patio cover or gazebo, controlled from the app with the rest of your lighting.",
    figure: "pergola",
    compare: false,
    facts: [
      ["Goes on", "Pergolas, patio covers and gazebos"],
      ["Bistro option", "Yes"],
      ["Color", "Warm white or full color"],
      ["Control", "From the app"],
    ],
    included: [
      ["Design consultation", "We look at the space with you and plan the lighting."],
      ["Overhead lighting", "Lighting on the pergola or patio cover."],
      ["Bistro lighting", "Permanent bistro lights if you want them."],
      ["The install", "We handle the install."],
    ],
    alsoSee: ["hardscape-lighting", "landscape-lighting", "permanent-outdoor-lighting", "holiday-seasonal-scenes"],
    proofShot: "/img/patio-pergola.jpg",
    proofCaption: "A lit pergola over an Omaha pool deck at dusk.",
  },

  "holiday-seasonal-scenes": {
    secondPara:
      "There is nothing extra to hang. A scene is a setting on lighting that is already on your house, so changing for a holiday is a tap in the app.",
    figure: "scenes",
    compare: true,
    facts: [
      ["Saved scenes", "As many as you want"],
      ["Switching", "One tap, or by schedule"],
      ["Colors", "Set by zone"],
    ],
    included: [
      ["Holiday scenes", "Halloween, Christmas, the Fourth and more."],
      ["Schedules", "Set a scene for a date and let it run."],
      ["Color by zone", "Different parts of the house can be different colors."],
      ["Brightness", "Adjust it for each scene."],
    ],
    alsoSee: ["permanent-christmas-lights", "gameday-lighting", "permanent-outdoor-lighting", "patio-pergola-bistro-lighting"],
  },

  "gameday-lighting": {
    pair: {
      a: "seqEveryday", b: "seqGameday",
      aLabel: "Warm white for everyday.",
      bLabel: "Team colors for gameday.",
      title: "Everyday, then gameday.",
      lede: "The same house with a different scene picked in the app.",
    },
    secondPara:
      "Gameday lighting is the same lighting set to your team colors. Nothing extra to buy or hang.",
    figure: "gameday",
    compare: false,
    facts: [
      ["Set by", "One tap in the app"],
      ["Colors", "Your team colors"],
      ["Saved", "As a scene"],
      ["Back to normal", "By schedule or one tap"],
    ],
    included: [
      ["Team colors saved", "Your colors saved as a scene."],
      ["Scheduled", "Set it to come on for the game and go back after."],
      ["Color by zone", "Color on some parts of the house and white on others."],
      ["Saved for next time", "Next game it is one tap again."],
    ],
    alsoSee: ["holiday-seasonal-scenes", "permanent-outdoor-lighting", "permanent-roofline-lighting", "permanent-christmas-lights"],
  },

  "commercial-outdoor-lighting": {
    secondPara:
      "Permanent lighting for businesses, controlled from an app. Ask us about your building at the consultation.",
    figure: "parapet",
    compare: false,
    facts: [
      ["Buildings", "Businesses"],
      ["Color", "Full color and white"],
      ["Control", "App, with scenes and schedules"],
    ],
    included: [
      ["Design consultation", "We look at the building with you and plan the lighting."],
      ["Your colors", "Company colors saved as scenes."],
      ["Schedules", "Set to your hours, seasons and events."],
    ],
    alsoSee: ["permanent-outdoor-lighting", "permanent-roofline-lighting", "holiday-seasonal-scenes", "hardscape-lighting"],
  },

};

export const detailFor = (slug: string) => serviceDetail[slug];
