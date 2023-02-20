import style from "../styles/Home.module.css";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { Header } from "./component/header";
import { useRecoilState } from "recoil";
import { productNameState, featureListState } from "./component/atoms";

const Home = () => {
  // ページ移動のための変数
  const router = useRouter();

  // productNameのテキスト入力のための変数
  const [inputProductNameText, setInputProductNameText] = useState<string>("");

  // 機能のテキスト入力のための変数
  const [inputFeatureText1, setInputFeatureText1] = useState<string>("");
  const [inputFeatureText2, setInputFeatureText2] = useState<string>("");
  const [inputFeatureText3, setInputFeatureText3] = useState<string>("");

  // 樹形図に記載するproductName名の変数
  const [productNameText, setProductNameText] =
    useRecoilState<string>(productNameState);

  // 樹形図に記載する機能リストの配列
  const [featureList, setFeatureList] =
    useRecoilState<string[]>(featureListState);

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
    // 入力している文字を樹形図のプロダクト名に表示
    setProductNameText(inputProductNameText);

    // 新しい機能を機能リストの最後尾に格納
    const newfeatureList: Array<string> = [...featureList];
    newfeatureList.push(
      inputFeatureText1,
      inputFeatureText2,
      inputFeatureText3
    );
    setFeatureList(newfeatureList);

    router.push({
      pathname: "/tree",
      query: { ProductNameText: productNameText, featureList: featureList },
    });

    // inputの中を空白にする
    setInputProductNameText("");
    setInputFeatureText1("");
    setInputFeatureText2("");
    setInputFeatureText3("");
  };

  return (
    <div className={style.body}>
      <Header></Header>

      <div className={style.inputArea}>
        <div className={style.inputContents}>
          <div className={style.inputProductName}>
            <p>ProductName</p>
            <input
              className={style.input}
              type="text"
              placeholder="目標となる制作物"
              value={inputProductNameText}
              onChange={onChangeProductNameText}
            ></input>
          </div>

          <div className={style.inputFeature}>
            <p>Function</p>

            <div className={style.inputFeatureList}>
              <input
                className={style.input}
                type="text"
                placeholder="実装したい機能１"
                value={inputFeatureText1}
                onChange={onChangeFeatureText1}
              ></input>
              <input
                className={style.input}
                type="text"
                placeholder="実装したい機能２"
                value={inputFeatureText2}
                onChange={onChangeFeatureText2}
              ></input>
              <input
                className={style.input}
                type="text"
                placeholder="実装したい機能３"
                value={inputFeatureText3}
                onChange={onChangeFeatureText3}
              ></input>
            </div>
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

export default Home;
