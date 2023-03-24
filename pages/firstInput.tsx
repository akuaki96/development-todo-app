import style from "../styles/FirstInput.module.css";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { newTreeState } from "./component/atoms";
import { Header } from "./component/header";
import { SideBar } from "./component/sideBar";
import { treeListState } from "./component/atoms";

type Feature = {
  name: string;
  isOpen: boolean;
  techList: string[];
};

type treeList = {
  productName: string;
  featureList: Feature[];
};

const FirstInput = () => {
  // ページ移動のための変数
  const router = useRouter();

  const [treeList, setTreeList] = useRecoilState<treeList[]>(treeListState);

  const [newTree, setNewTree] = useRecoilState(newTreeState);

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  // productNameのテキスト入力のための変数
  const [inputProductNameText, setInputProductNameText] = useState<string>("");

  // 機能のテキスト入力のための変数
  const [inputFeatureText1, setInputFeatureText1] = useState<string>("");
  const [inputFeatureText2, setInputFeatureText2] = useState<string>("");
  const [inputFeatureText3, setInputFeatureText3] = useState<string>("");

  // productName用onchange関数
  const onChangeProductNameText = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputProductNameText(e.target.value);
  };

  // 機能用onchange関数
  const onChangeFeatureText1 = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputFeatureText1(e.target.value);
  };
  const onChangeFeatureText2 = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputFeatureText2(e.target.value);
  };
  const onChangeFeatureText3 = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputFeatureText3(e.target.value);
  };

  // 樹形図の作成
  const onClickCreateTree = () => {
    router.push({
      pathname: "/tmp",
    });

    const newTree: treeList = {
      productName: inputProductNameText,
      featureList: [
        {
          name: inputFeatureText1,
          isOpen: false,
          techList: [],
        },
        {
          name: inputFeatureText2,
          isOpen: false,
          techList: [],
        },
        {
          name: inputFeatureText3,
          isOpen: false,
          techList: [],
        },
      ],
    };

    setNewTree(newTree);

    // inputの中を空白にする
    setInputProductNameText("");
    setInputFeatureText1("");
    setInputFeatureText2("");
    setInputFeatureText3("");
  };

  return (
    <div className={style.body}>
      <Header setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu}></Header>

      <div className={style.main}>
        <div
          className={
            isOpenMenu ? style.trueMenuBarArea : style.falseMenuBarArea
          }
        >
          <SideBar></SideBar>
        </div>

        <div className={style.inputArea}>
          <p className={style.inputTitle}>ProductName</p>
          <input
            className={style.input}
            type="text"
            placeholder="目標となる制作物"
            value={inputProductNameText}
            onChange={onChangeProductNameText}
          ></input>

          <p className={style.inputTitle}>Function</p>

          <div className={style.inputFeatureList}>
            <input
              className={`${style.input} ${style.featureInput}`}
              type="text"
              placeholder="実装したい機能１"
              value={inputFeatureText1}
              onChange={onChangeFeatureText1}
            ></input>
            <input
              className={`${style.input} ${style.featureInput}`}
              type="text"
              placeholder="実装したい機能２"
              value={inputFeatureText2}
              onChange={onChangeFeatureText2}
            ></input>
            <input
              className={`${style.input} ${style.featureInput}`}
              type="text"
              placeholder="実装したい機能３"
              value={inputFeatureText3}
              onChange={onChangeFeatureText3}
            ></input>
          </div>

          <div className={style.onClickCreateTreeButton}>
            <button className={style.button} onClick={onClickCreateTree}>
              作成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstInput;
