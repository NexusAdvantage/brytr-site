import "server-only";
import { cache } from "react";
import { reviewProof as fallback } from "@/content/reviews";

/* THE LIVE STAR RATING AND REVIEW COUNT, straight from Brytr's Google Business Profile.
 *
 * One call to the Places API (New), asking for two fields only: rating and userRatingCount.
 * The fetch is cached for a day (`revalidate`), so Google is asked at most once a day and
 * every page that shows the number is rebuilt with it in the background. Visitors never
 * wait on Google.
 *
 * The key lives in Vercel as GOOGLE_PLACES_API_KEY and never reaches the browser. This file
 * is server-only, so a client component that imports it fails the build rather than
 * shipping the key.
 *
 * If the key is missing, Google errors, or the answer looks wrong, the site shows the
 * figures typed into content/reviews.ts instead. Keep those roughly current; they are the
 * fallback, not the source. */

const PLACE_ID = "ChIJFfzXlqbstYoR4ChWno-N3E0";

export type ReviewProof = {
  average: string;
  count: number;
  countLabel: string;
  platform: string;
  url: string;
};

/* Rounded down to the nearest five with a plus, so one new review does not change the page
 * every day and a removed review never makes the site overstate the count. */
const label = (n: number) => `${Math.floor(n / 5) * 5}+`;

export const getReviewProof = cache(async (): Promise<ReviewProof> => {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return fallback;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return fallback;
    const d = (await res.json()) as { rating?: number; userRatingCount?: number };
    if (typeof d.rating !== "number" || typeof d.userRatingCount !== "number" || d.userRatingCount < 1) {
      return fallback;
    }
    return {
      ...fallback,
      average: d.rating.toFixed(1),
      count: d.userRatingCount,
      countLabel: label(d.userRatingCount),
    };
  } catch {
    return fallback;
  }
});
