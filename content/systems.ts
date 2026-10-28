import type { IconKey } from "./icon-map";

export type Spec = { label: string; value: string };
export type System = {
  slug: string;
  name: string;
  maker: string;
  tier: "Component" | "Control";
  short: string;
  title: string;
  h1: string;
  keyword: string;
  volume?: string;
  icon: IconKey;
  lede: string;
  specs: Spec[];
  wins: string[];
  limits?: string[];
};

export const systems: System[] = [
  {
    slug: "haven-evolution",
    name: "Haven Lighting Evolution",
    maker: "Haven Lighting",
    tier: "Component",
    short: "Permanent roofline lighting from Haven.",
    title: "Haven Evolution in Omaha | Installed by Brytr",
    h1: "Haven Lighting Evolution, installed by Brytr.",
    keyword: "haven lighting",
    volume: "800/mo",
    icon: "wholeHome",
    lede:
      "Haven Evolution is a permanent lighting system we install on Omaha homes. It runs along your roofline, stays up year round, and runs warm white, full color or any saved scene from the Haven app.",
    specs: [
      { label: "Manufacturer", value: "Haven Lighting" },
      { label: "Type", value: "Permanent roofline lighting" },
      { label: "Color", value: "Full color and white" },
      { label: "App", value: "Haven app" },
      { label: "Control", value: "Scenes and schedules" },
      { label: "Installed by", value: "Brytr" },
    ],
    wins: [
      "A permanent install that stays up year round, with nothing to take down in January",
      "Everyday white, holiday colors and gameday scenes from the same app",
      "Installed by Brytr, and we are here for service afterwards",
    ],
    limits: [
      "Needs home WiFi",
      "Layout is planned at the design consultation",
    ],
  },
  {
    slug: "haven-q-series",
    name: "Haven Q Series",
    maker: "Haven Lighting",
    tier: "Component",
    short: "Soffit lighting from Haven.",
    title: "Haven Q Series Permanent Lighting",
    h1: "Haven Q Series.",
    keyword: "haven q series",
    icon: "soffit",
    lede: "Haven's soffit lighting. It sits under the overhang and lights the face of the house.",
    specs: [
      { label: "Manufacturer", value: "Haven Lighting" },
      { label: "Use", value: "Soffit lighting" },
      { label: "Color", value: "Full color and white" },
      { label: "Control", value: "App, scenes and schedules" },
      { label: "Installed by", value: "Brytr" },
    ],
    wins: ["Lights the face of the house", "Controlled from the app"],
    limits: ["Whether it suits your house is checked at the consultation", "A different look from roofline lighting"],
  },
  {
    slug: "haven-9-series-landscape-lights",
    name: "Haven 9 Series Landscape Lights",
    maker: "Haven Lighting",
    tier: "Component",
    short: "Landscape lighting from Haven.",
    title: "Haven 9 Series Landscape Lighting",
    h1: "Haven 9 Series landscape lighting.",
    keyword: "haven 9 series landscape lights",
    icon: "pathLight",
    lede: "Haven's landscape lighting. Path lights, uplights and lighting for beds and trees.",
    specs: [
      { label: "Manufacturer", value: "Haven Lighting" },
      { label: "Use", value: "Paths, trees and beds" },
      { label: "Color", value: "Full color and white" },
      { label: "Control", value: "App, scenes and schedules" },
      { label: "Installed by", value: "Brytr" },
    ],
    wins: ["Lights the yard as well as the house", "Controlled from the app"],
    limits: ["Layout is planned at the design consultation"],
  },
  {
    slug: "haven-x-bistro-lights",
    name: "Haven X Bistro Lights",
    maker: "Haven Lighting",
    tier: "Component",
    short: "Permanent bistro lighting from Haven.",
    title: "Haven X Bistro Lights | Patio and Pergola",
    h1: "Haven X bistro lights.",
    keyword: "haven x bistro lights",
    icon: "pergola",
    lede: "Haven's permanent bistro lighting for pergolas, patio covers and gazebos.",
    specs: [
      { label: "Manufacturer", value: "Haven Lighting" },
      { label: "Use", value: "Pergola, patio cover, gazebo" },
      { label: "Color", value: "Full color and white" },
      { label: "Control", value: "App, scenes and schedules" },
      { label: "Installed by", value: "Brytr" },
    ],
    wins: ["Stays up year round", "Controlled from the app"],
    limits: ["Needs a structure to hang from"],
  },
  {
    slug: "jellyfish-lighting",
    name: "Jellyfish Lighting",
    maker: "Jellyfish Lighting",
    tier: "Component",
    short: "Permanent roofline lighting, installed by Brytr.",
    title: "Jellyfish Lighting in Omaha | Installed by Brytr",
    h1: "Jellyfish Lighting, installed by Brytr.",
    keyword: "jellyfish lighting",
    volume: "15,000/mo",
    icon: "twoTiers",
    lede:
      "Jellyfish is a permanent lighting system we install on Omaha homes. The channel mounts along your roofline, stays up year round, and runs warm white, full color or any saved scene from the Jellyfish app.",
    specs: [
      { label: "Manufacturer", value: "Jellyfish Lighting" },
      { label: "Type", value: "Permanent roofline channel" },
      { label: "Color", value: "Full color and white" },
      { label: "App", value: "Jellyfish app" },
      { label: "Control", value: "Scenes, schedules and zones" },
      { label: "Installed by", value: "Brytr" },
        ],
    wins: [
      "A permanent install that stays up year round, with nothing to take down in January",
      "Everyday white, holiday colors and gameday scenes from the same app",
      "Installed by Brytr, and we are here for service afterwards",
    ],
    limits: [
      "Needs home WiFi",
      "Layout is planned at the design consultation",
    ],
  },
  {
    slug: "app-and-controls",
    name: "App and Controls",
    maker: "Jellyfish or Haven",
    tier: "Control",
    short: "Scenes, schedules and color from your phone.",
    title: "The App: Every Light From Your Phone",
    h1: "Every light, every color, from the couch.",
    keyword: "permanent lighting app",
    icon: "dimmer",
    lede:
      "Jellyfish and Haven each have their own app. Either way, you pick colors, save scenes and set schedules from your phone.",
    specs: [
      { label: "App", value: "Jellyfish app or Haven app" },
      { label: "Scenes", value: "Save your own" },
      { label: "Schedules", value: "Yes" },
      { label: "Color", value: "Full color and white" },
    ],
    wins: ["Set a schedule and leave it", "Or change the colors any night you like"],
    limits: ["Needs home WiFi"],
  },
];

export const systemBySlug = (slug: string) => systems.find((s) => s.slug === slug);
