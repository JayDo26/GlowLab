import { Product, products } from "./mock-products";

type SkinType = "oily" | "dry" | "sensitive" | "combination";

const acneTypeToSkin: Record<string, SkinType[]> = {
  blackhead: ["oily"],
  whitehead: ["oily"],
  papular: ["sensitive"],
  purulent: ["sensitive"],
  cystic: ["oily"],
  keloid: ["sensitive"],
  milium: ["dry"],
  syringoma: ["dry"],
  flat_wart: ["sensitive"],
  folliculitis: ["sensitive"],
  acne_scars: ["sensitive", "dry"],
  "sebo-crystan-conglo": ["oily"],
};

export function inferSkinType(acneStats: Record<string, number>): SkinType {
  const score: Record<SkinType, number> = {
    oily: 0,
    dry: 0,
    sensitive: 0,
    combination: 0,
  };

  for (const acneType in acneStats) {
    const count = acneStats[acneType];
    const relatedSkin = acneTypeToSkin[acneType] || [];

    relatedSkin.forEach((type) => {
      score[type] += count;
    });
  }

  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0] as SkinType;
}
