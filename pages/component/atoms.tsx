import { atom } from "recoil";

// グローバルに扱える変数
export const productNameState = atom<string>({
  key: "productNameText",
  default: "ProductName",
});

export const featureListState = atom<string[]>({
  key: "featureList",
  default: [],
});
