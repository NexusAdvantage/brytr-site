export type CompareDetail = {
  photo: string;
  photoAlt: string;
  objectPosition?: string;
  alsoSee: string[];
};

export const compareDetail: Record<string, CompareDetail> = {
  "jellyfish-vs-haven": {
    photo: "/img/roofline-detail.jpg",
    photoAlt: "Permanent roofline lighting following the gable and eave lines of an Omaha home",
    objectPosition: "50% 52%",
    alsoSee: [],
  },
};

export const detailForCompare = (slug: string) => compareDetail[slug];
