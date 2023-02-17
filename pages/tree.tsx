import style from "../styles/Tree.module.css";
import { Header } from "./component/header";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { productNameState, featureListState } from "./component/atoms";

const Tree = () => {
  const [selected, setSelected] = useState<string>();

  // 機能のテキスト入力のための変数
  const [inputFeatureText, setInputFeatureText] = useState<string>("");

  // 必要な技術のテキスト入力のための変数
  const [inputTechText, setInputTechText] = useState<string>("");

  // 樹形図に記載するproductName名(グローバルstate)
  const [productNameText, setProductNameText] =
    useRecoilState<string>(productNameState);

  // 樹形図に記載する機能リストの配列（グローバルstate)
  const [featureList, setFeatureList] =
    useRecoilState<string[]>(featureListState);

  // 樹形図に記載する「必要な技術がどこの機能のものか」を選択した値を格納する変数
  const [featureTarget, setFeatureTarget] = useState<string>("機能を選択");

  // 樹形図に記載する必要な技術の配列
  const [techList, setTechList] = useState<string[][]>([
    ["やるべきこと１", "やるべきこと２"],
    [],
  ]);

  // 機能用onchange関数
  const onChangeFeatureText = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputFeatureText(e.target.value);
  };

  // 必要な技術用onchange関数
  const onChangeTechText = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputTechText(e.target.value);
  };

  const onClickAddFeature = () => {
    const newfeatureList: Array<string> = [...featureList];
    newfeatureList.push(inputFeatureText);
    setFeatureList(newfeatureList);
    setInputFeatureText("");
  };

  const onClickAddTech = () => {
    // const newTechList: Array<string> = [...techList];
    // newTechList.push(inputTechText);
    // setTechList(newTechList);
    // setInputTechText("");
  };

  // const handleChange = (e: ChangeEvent<HTMLElement>) => {
  //   setSelected(e.target.value);
  // };

  console.log(selected);
  return (
    <>
      <Header></Header>

      <div className={style.inputArea}>
        <div className={style.firstInputArea}>
          <div className={`${style.inputProductName} ${style.input}`}></div>

          <div className={`${style.inputFeature} ${style.input}`}>
            <p>機能</p>
            <input
              type="text"
              placeholder="実装したい機能を入力"
              value={inputFeatureText}
              onChange={onChangeFeatureText}
            ></input>
            <button onClick={onClickAddFeature}>追加</button>
          </div>

          <div className={`${style.inputTech} ${style.input}`}>
            <p>必要な知識、技術</p>
            <select
              className="featureList"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {featureList.map((feature, index) => (
                <option key={index} value={index}>
                  {feature}
                </option>
              ))}
            </select>
            <div>
              <input
                type="text"
                placeholder="必要な技術を入力"
                value={inputTechText}
                onChange={onChangeTechText}
              ></input>
              <button onClick={onClickAddTech}>追加</button>
            </div>
          </div>
        </div>

        <div className={style.treeOutputArea}>
          <div className={style.treeArea}>
            <ul>
              <li>
                <p>{productNameText}</p>

                {/* 機能リストの配列の中に必要な技術リストの配列が入っている多次元配列 */}
                <ul>
                  {featureList.map((feature, index) => (
                    <li key={index}>
                      <p>{feature}</p>
                      <ul>
                        {techList.map((tech, techindex) => (
                          <li key={techindex}>{tech}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <div className={style.addListButton}>
            <button>リストへ追加</button>
          </div>
        </div>
      </div>
      <div className="todoList"></div>
    </>
  );
};

export default Tree;
