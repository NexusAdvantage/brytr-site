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
      "Permanent lighting mounted to your soffit along the roofline. It turns on white every night at sunset, and a scheduled scene takes over for holidays and special occasions.",
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
    short: "Permanent lighting mounted to your soffit.",
    title: "Permanent Roofline Lighting for Omaha Homes",
    h1: "Permanent roofline lighting for Omaha homes.",
    keyword: "permanent roofline lighting",
    volume: "400/mo",
    icon: "roofline",
    photo: "serviceRoofline",
    lede:
      "Permanent lighting mounted to your soffit along the roofline. It stays up year round and runs white every night, with holiday scenes and team colors on a schedule.",
    includes: [
      "Jellyfish or Haven, chosen at the consultation",
      "Mounted to your soffit",
      "App control with scenes and schedules",
    ],
    system: "haven-evolution",
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
      "Permanent roofline lighting",
      "Your colors saved as scenes",
      "App control",
      "Schedules",
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
