export type City = {
  slug: string;
  name: string;
  state: "NE" | "IA";
  /* "outstate" IS CURRENTLY UNUSED, and deliberately kept in the union.
     The service area was Omaha metro plus six towns out to Grand Island, two and a quarter hours
     from the shop. The client: "change the location so that it is only Omaha-type areas and
     Council Bluffs." So Lincoln, Fremont, Ashland, Norfolk, Columbus and Grand Island came out -
     which removes them from the map, the home list, /service-areas, their own six pages, the
     sitemap, the footer and the city select on every form, because all of that reads this array.
     Their entries in content/city-detail.ts are parked rather than deleted, so re-adding a town is
     one row here. */
  tier: "metro" | "outstate" | "iowa";
  drive: string;            // drive time from the Brytr shop
  /* Real coordinates, so the service-area map is plotted rather than eyeballed. Simple
   * equirectangular projection — relative positions are correct, which is the only claim
   * the drawing makes. It is a service-area diagram, not a survey. */
  lat: number;
  lon: number;
  neighborhoods: string[];  // real subdivisions / districts
  nearby: string[];         // slugs
  note?: string;            // city-specific content slot
};

export const cities: City[] = [
  { slug: "omaha", name: "Omaha", state: "NE", tier: "metro", drive: "In town", lat: 41.257, lon: -95.938,
    neighborhoods: ["Dundee", "Aksarben", "Benson", "Regency", "Field Club", "Bemis Park", "Country Club", "Morton Meadows", "Rockbrook", "Keystone"],
    nearby: ["elkhorn", "papillion", "la-vista", "bellevue"] },
  { slug: "elkhorn", name: "Elkhorn", state: "NE", tier: "metro", drive: "15 min", lat: 41.288, lon: -96.236,
    neighborhoods: ["Elkhorn South", "Skyline Ranches", "Pacific Springs", "The Hamptons", "Indian Creek", "Anchor Pointe"],
    nearby: ["omaha", "gretna", "papillion", "ashland"] },
  { slug: "papillion", name: "Papillion", state: "NE", tier: "metro", drive: "20 min", lat: 41.154, lon: -96.043,
    neighborhoods: ["Shadow Lake", "Settlers Creek", "Walnut Creek", "Eagle Ridge", "Tara Heights"],
    nearby: ["la-vista", "bellevue", "omaha", "gretna"] },
  { slug: "la-vista", name: "La Vista", state: "NE", tier: "metro", drive: "20 min", lat: 41.183, lon: -96.031,
    neighborhoods: ["Central Park", "Southport", "Brentwood", "Thompson Creek"],
    nearby: ["papillion", "bellevue", "omaha", "gretna"] },
  { slug: "bellevue", name: "Bellevue", state: "NE", tier: "metro", drive: "25 min", lat: 41.137, lon: -95.911,
    neighborhoods: ["Olde Towne", "Twin Creek", "Fontenelle Hills", "Cedar Creek", "Willow Wood"],
    nearby: ["papillion", "la-vista", "omaha", "council-bluffs"] },
  { slug: "gretna", name: "Gretna", state: "NE", tier: "metro", drive: "25 min", lat: 41.14, lon: -96.24,
    neighborhoods: ["Remington Ridge", "Prairie Queen", "Thousand Oaks", "Fountain Springs"],
    nearby: ["elkhorn", "papillion", "la-vista", "omaha", "ashland"] },
  /* Ashland added 29 Oct 2026 from Zac's answers. No neighborhoods listed until Brytr gives us
   * some: the town list came from them, the subdivisions did not. */
  { slug: "ashland", name: "Ashland", state: "NE", tier: "metro", drive: "35 min", lat: 41.039, lon: -96.369,
    neighborhoods: [],
    nearby: ["gretna", "elkhorn", "papillion", "omaha"] },
  { slug: "council-bluffs", name: "Council Bluffs", state: "IA", tier: "iowa", drive: "20 min", lat: 41.262, lon: -95.861,
    neighborhoods: ["Manawa", "Bloomer", "Twin City", "Harvest Hills"],
    nearby: ["omaha", "bellevue", "la-vista", "papillion", "elkhorn"] },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const metroCities = cities.filter((c) => c.tier === "metro");
export const outstateCities = cities.filter((c) => c.tier === "outstate");
export const iowaCities = cities.filter((c) => c.tier === "iowa");
