/* PHOTOGRAPH SETS.
 *
 * Two problems solved in one file.
 *
 * ONE. Almost every page carried a single photograph — the hero — and then several thousand
 * words. The client's note was blunt and correct: pages should not be a picture followed by a
 * wall of text. So most templates now place two or three photographs in the body.
 *
 * TWO. One template generates eighteen city pages, another eleven service pages, another nine
 * system pages. If every one of those pulls the same photograph, the fix makes the sameness
 * problem worse rather than better — eighteen pages that are now identical AND illustrated.
 * So the sets below are pools, and `pick` walks a different window of the pool for every slug.
 *
 * THE CAPTION RULE, which is the whole reason this is a hand-written file and not a loop.
 *
 * These are real installs in the Omaha metro out of Brytr's own library, and for almost none
 * of them do we know which town. That matters: a photograph placed on the Lincoln page must
 * not be captioned as being in Lincoln, and a photograph on the Council Bluffs page must not
 * imply Council Bluffs. So every caption here describes WHAT IS IN THE FRAME and nothing about
 * where it is. The page's own copy carries the city; the photograph carries the light. Where a
 * caption does name a place, it is because the file's own provenance says so.
 *
 * Alt text is not here. It lives once, in content/images.ts, against the file — so a picture
 * cannot end up described as a different picture no matter which page it lands on.
 */

export type Shot = {
  photo: string;
  caption: string;
  /* NAMES THE ONE VARIABLE, and only where a set is genuinely one frame at several settings.
     Its presence is what turns a PhotoStrip into a numbered sequence, so leaving it off is the
     right default: on a set of different houses, numbering invents an order that is not there.
     See the note above the render in components/sections/photo-parts.tsx. */
  scene?: string;
};

/* The general pool. Ordered so that adjacent entries differ — a warm white next to a color
 * scene next to a detail — because `pick` takes a contiguous window and a run of five warm
 * white front elevations would look like a mistake. */
export const metroShots: Shot[] = [
  { photo: "homeShakeBrick", caption: "Warm white under the eaves and gables of a shake and brick home." },
  { photo: "gamedayRedBlueGables", caption: "One gable red, the next blue, eaves left white." },
  { photo: "detailGableMiter", caption: "The turn at a gable peak, close up." },
  { photo: "homeWideRanch", caption: "A long, low ranch with warm white along the roofline." },
  { photo: "christmasRedGreenGables", caption: "Red and green along every gable, with nothing to take down in January." },
  { photo: "poolPergolaDusk", caption: "A pool and pergola at sunset, with the roofline lit behind it." },
  { photo: "homeFarmhouseDark", caption: "Warm white on dark siding." },
  /* WAS "Color matched to the fascia, diffuser facing down". Brytr does not colour match the
     channel - client's punch list, 29 Aug 2026. What the frame actually shows is a run tucked
     under the roof edge, which is the checkable half of the claim. */
  { photo: "dayBrickGable", caption: "Roofline lighting on a brick gable in daylight." },
  { photo: "landscapeTreeBeds", caption: "Roofline and landscape lighting together." },
  { photo: "halloweenOrangePurple", caption: "Orange and violet for Halloween." },
  { photo: "homePrairieTwilight", caption: "Warm white at twilight." },
  { photo: "patioTimberStone", caption: "A timber and stone patio cover with lighting along the beam and on the stairs." },
  { photo: "winterSnowDusk", caption: "Snow on the drive and the lights on." },
  { photo: "homeCraftsmanPorch", caption: "Porch roof and upper gables carried on one run at blue hour." },
  { photo: "gamedayRedFull", caption: "The whole house in scarlet for gameday." },
  { photo: "homeEaveDownlights", caption: "Downlights under the eaves." },
  { photo: "fourthBrickRanch", caption: "Red, white and blue for the Fourth of July." },
  { photo: "homeModernStone", caption: "Lighting along a flat roof edge." },
  { photo: "christmasWreathsNets", caption: "Permanent lighting alongside wreaths and net lights." },
  { photo: "homeRanchBluehour", caption: "A long ranch at blue hour behind a bare tree, warm white holding the whole roofline." },
  { photo: "sceneWarmBlueBand", caption: "Gables in warm white, the stone band below in blue." },
  { photo: "poolRearWarm", caption: "The back of a house at dusk." },
  { photo: "dayShakeGable", caption: "A shake gable in daylight." },
  { photo: "homeStoneSiding", caption: "Warm downlights under the eaves of a stone and siding home." },
  { photo: "landscapeTreeTeal", caption: "An uplight through a mature tree." },
  { photo: "winterGradientSnow", caption: "A color gradient across a roofline in the snow." },
  { photo: "homeBrickGablesGold", caption: "A brick home with lots of gables, all in warm white." },
  { photo: "sceneAmberCyan", caption: "Amber and cyan on different zones." },
  { photo: "homeTanSunset", caption: "Warm white against a sunset sky." },
  { photo: "christmasEntryShrubs", caption: "Green and red at an entry with snow on the beds." },
  { photo: "homeGreyMoon", caption: "An ordinary evening with the lights on." },
  { photo: "hardscapeSeatwall", caption: "Lit wall caps in front, the porch lit behind." },
  { photo: "homeFarmhouseMoon", caption: "Cool white instead of warm white." },
  { photo: "sceneRedBlueHalves", caption: "Left half red, right half blue." },
  { photo: "deckRanchWarm", caption: "House and deck lit together." },
  { photo: "halloweenBlueOrange", caption: "A second October scene on a different house: violet low, orange on the gable." },
  { photo: "homeStuccoStone", caption: "Warm white along the roofline with a colored uplight in the bed." },
  { photo: "christmasGreenRed", caption: "Green with red on the upper gable." },
  { photo: "homeWhiteTwoStorey", caption: "Bright warm white on light siding." },
  { photo: "fourthRakeLines", caption: "Red, white and blue along the roof lines at dusk." },
  { photo: "gamedayRanchWide", caption: "Color across a long low roofline and a curved drive." },
  { photo: "dayStoneGable", caption: "A stone gable in overcast daylight." },
  { photo: "christmasBoardBatten", caption: "Restrained red and green on modern board-and-batten." },
  { photo: "sceneWhiteRedEntry", caption: "Cool white with only the entry changed to a different color." },
  { photo: "patioRearColor", caption: "Color in the backyard, on the roofline and the patio." },
  { photo: "winterRedBlueSnow", caption: "Red and blue on a snowy night." },
  { photo: "landscapeBrickUplight", caption: "Roofline, gable accent and uplight, each set separately." },
  { photo: "gamedayRedGable", caption: "A gable in saturated red." },
  { photo: "christmasBrickGable", caption: "A brick gable in red and green, close up." },
  { photo: "gamedayRedWhiteSplit", caption: "Two colors across one house with the eaves left white." },
];

/* Windows of the pool, offset by a stable seed so no two slugs open with the same photograph.
 *
 * The seed is a string hash rather than an array index on purpose: adding a city or a service
 * to the middle of a list must not reshuffle every other page's photographs, because the whole
 * point of this is that a returning reader sees the same page they saw last time. */
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100003;
  return h;
};

export function pick(seed: string, n: number, pool: Shot[] = metroShots): Shot[] {
  if (pool.length === 0) return [];
  const start = hash(seed) % pool.length;
  /* Stride of 7 rather than 1. A contiguous window would hand one page five warm white front
   * elevations in a row purely because they sit together in the pool; a stride that is coprime
   * with nothing in particular walks across the pool's own alternation instead. */
  const out: Shot[] = [];
  const seen = new Set<number>();
  for (let k = 0; out.length < n && k < pool.length * 2; k++) {
    const i = (start + k * 7) % pool.length;
    if (seen.has(i)) continue;
    seen.add(i);
    out.push(pool[i]);
  }
  return out;
}

/* ── THE NINETY-SECOND SEQUENCE ──
 * One house, one hover point, five states, ninety seconds. This is the only set on the site
 * where the frames are registered against each other, so it is the only set that can be shown
 * as a sequence and described as one. See the provenance note in content/images.ts. */
export const sequence: Shot[] = [
  { photo: "seqSecurity", caption: "Dimmed warm white." },
  { photo: "seqEveryday", caption: "Warm white on the roofline, eaves and garage." },
  { photo: "seqWarmChristmas", caption: "Warm white at full brightness." },
  { photo: "seqRedGreen", caption: "Red and green along the roofline." },
  { photo: "seqGameday", caption: "Scarlet across the house with white at the peaks." },
];
