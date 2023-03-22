import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

type Feature = {
  name: string;
  isOpen: boolean;
  techList: string[];
};

type treeList = {
  productName: string;
  featureList: Feature[];
};

// グローバルに扱える変数
export const productNameState = atom<string>({
  key: "productNameText",
  default: "ProductName",
});

export const featureListState = atom<string[]>({
  key: "featureList",
  default: [],
});

export const treeListState = atom<treeList[]>({
  key: "treeListState",
  default: [
    {
      productName: "twitter",
      featureList: [
        {
          name: "フォロー機能",
          isOpen: false,
          techList: ["reactf", "typescriptf"],
        },
        {
          name: "投稿機能",
          isOpen: false,
          techList: ["reactt", "typescriptt"],
        },
        {
          name: "ストーリー機能",
          isOpen: false,
          techList: ["reacts", "typescripts"],
        },
      ],
    },
  ],
});

// 新しくリストに追加するためのstate

export const newTreeState = atom<treeList>({
  key: "newTreeState",
  default: {
    productName: "",
    featureList: [
      {
        name: "",
        isOpen: false,
        techList: [],
      },
      {
        name: "",
        isOpen: false,
        techList: [],
      },
      {
        name: "",
        isOpen: false,
        techList: [],
      },
    ],
  },
});
