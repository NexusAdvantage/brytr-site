import type { IconKey } from "./icon-map";

export type Service = {
  slug: string;
  name: string;
  short: string;
  title: string;
  h1: string;
  keyword: string;
  volume?: string;
  icon: IconKey;
  photo?: string; // key into content/images.ts
  lede: string;
  includes: string[];
  system?: string; // matching /lighting-systems/<slug>
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "permanent-outdoor-lighting",
    name: "Permanent Outdoor Lighting",
    short: "Roofline lighting for every season and scene.",
    title: "Permanent Outdoor Lighting Installation | Omaha",
    h1: "Permanent outdoor lighting, installed once.",
    keyword: "permanent outdoor lighting",
    volume: "900/mo",
    icon: "wholeHome",
    photo: "serviceWholeHome",
    featured: true,
    lede:
      "A track along your roofline with LEDs in it, controlled from an app. Warm white for everyday and color whenever you want it.",
    includes: [
      "Jellyfish or Haven, chosen at the consultation",
      "Full color and white",
      "App control with scenes and schedules",
      "Installed by Brytr",
    ],
    system: "haven-evolution",
  },
  {
    slug: "permanent-christmas-lights",
    name: "Permanent Christmas Lights",
    short: "Nobody on a ladder in December, ever again.",
    title: "Permanent Christmas Lights, Installed Once",
    h1: "Permanent Christmas lights for Omaha homes.",
    keyword: "permanent christmas lights",
    volume: "21,000/mo",
    icon: "christmas",
    photo: "serviceChristmas",
    featured: true,
    lede:
      "You hang them in November, you take them down in January, and somebody is on a ladder in ice both times. This is the version you install once.",
    includes: [
      "Warm white, color, or both",
      "Scheduled on and off from the app",
      "No storage and no tangles",
      "Works the rest of the year too",
    ],
    system: "haven-evolution",
  },
  {
    slug: "permanent-roofline-lighting",
    name: "Permanent Roofline Lighting",
    short: "Lighting that runs along your roofline.",
    title: "Permanent Roofline Lighting for Omaha Homes",
    h1: "Permanent roofline lighting for Omaha homes.",
    keyword: "permanent roofline lighting",
    volume: "400/mo",
    icon: "roofline",
    photo: "serviceRoofline",
    lede:
      "A low profile track runs along the roofline and stays up year round. Set it to warm white, a holiday scene or team colors from the app.",
    includes: [
      "Jellyfish or Haven, chosen at the consultation",
      "Low profile track along the roofline",
      "App control with scenes and schedules",
    ],
    system: "haven-evolution",
  },
  {
    slug: "soffit-lighting",
    name: "Soffit Lighting",
    short: "Lighting under the overhang.",
    title: "Soffit Lighting for Omaha Homes",
    h1: "Soffit lighting for Omaha homes.",
    keyword: "soffit lighting",
    volume: "5,000/mo",
    icon: "soffit",
    photo: "serviceSoffit",
    lede:
      "Lighting set under the overhang that lights the face of the house. A different look from roofline lighting.",
    includes: [
      "Lighting under the overhang",
      "Lights the face of the house",
      "Controlled from the app",
      "Can be set apart from the roofline",
    ],
    system: "haven-q-series",
  },
  {
    slug: "hardscape-lighting",
    name: "Hardscape Lighting",
    short: "Built into walls, steps and coping.",
    title: "Hardscape Lighting: Patios, Walls and Steps",
    h1: "Hardscape lighting built into the stone.",
    keyword: "hardscape lighting",
    volume: "600/mo",
    icon: "hardscape",
    photo: "serviceHardscape",
    lede:
      "Lighting for walls, steps and columns on your patio and around the yard.",
    includes: [
      "Wall lighting",
      "Step lighting",
      "Column and pillar lighting",
      "New or existing hardscape",
    ],
  },
  {
    slug: "landscape-lighting",
    name: "Landscape Lighting",
    short: "Path, uplighting, tree wash and beds.",
    title: "Landscape Lighting Design and Install, Omaha",
    h1: "Landscape lighting, designed on your own planting.",
    keyword: "landscape lighting omaha",
    volume: "150/mo",
    icon: "pathLight",
    photo: "serviceLandscape",
    lede:
      "Path lights, tree uplighting and lighting for beds. Designed with you at your house.",
    includes: [
      "Path lights",
      "Tree uplighting",
      "Lighting for beds",
      "Controlled from an app",
    ],
    system: "haven-9-series-landscape-lights",
  },
  {
    slug: "patio-pergola-bistro-lighting",
    name: "Patio, Pergola and Bistro Lighting",
    short: "Overhead runs on structures, not trees.",
    title: "Patio, Pergola and Bistro Lighting",
    h1: "Patio, pergola and bistro lighting.",
    keyword: "pergola lighting",
    volume: "500/mo",
    icon: "pergola",
    photo: "servicePatio",
    featured: true,
    lede:
      "Permanent overhead lighting on pergolas, patio covers and gazebos, with no seasonal takedown.",
    includes: [
      "Pergola, patio cover or gazebo",
      "Warm white or full color",
      "Controlled from an app",
      "Stays up year round",
    ],
    system: "haven-x-bistro-lights",
  },
  {
    slug: "holiday-seasonal-scenes",
    name: "Holiday and Seasonal Scenes",
    short: "Scenes for every holiday.",
    title: "Holiday and Seasonal Lighting Scenes",
    h1: "Every holiday, already programmed.",
    keyword: "holiday lighting omaha",
    volume: "50/mo",
    icon: "seasonal",
    photo: "serviceHoliday",
    lede:
      "Halloween, the Fourth, Valentine's, St Patrick's, a birthday. Set a scene from the app on the lighting you already have.",
    includes: [
      "Scenes for holidays",
      "Your own custom scenes",
      "Schedules",
      "Brightness you can adjust",
    ],
  },
  {
    slug: "gameday-lighting",
    name: "Gameday Lighting",
    short: "Husker red on a Saturday, one tap.",
    title: "Gameday Lighting: Team Colors on Your Roof",
    h1: "Gameday lighting, saved as a scene.",
    keyword: "game day lighting",
    volume: "70/mo",
    icon: "gameday",
    photo: "serviceGameday",
    lede:
      "Husker scarlet, Creighton blue, or your high school's colors, saved as a scene and scheduled for game time.",
    includes: [
      "Team colors saved as scenes",
      "Scheduled for game time",
      "Back to everyday lighting after",
      "More than one team saved",
    ],
  },
  {
    slug: "commercial-outdoor-lighting",
    /* The only service that had no card photograph. crewPortrait is a lit commercial roofline
       with a person in front of it. */
    photo: "crewPortrait",
    name: "Commercial Outdoor Lighting",
    short: "Permanent lighting for businesses.",
    title: "Commercial Permanent Lighting | Omaha",
    h1: "Commercial permanent lighting in Omaha.",
    keyword: "commercial outdoor lighting omaha",
    icon: "commercial",
    lede:
      "Permanent lighting for businesses. Your colors year round and holiday scenes, controlled from an app.",
    includes: [
      "Roofline and soffit lighting",
      "Your colors saved as scenes",
      "App control",
      "Schedules",
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
