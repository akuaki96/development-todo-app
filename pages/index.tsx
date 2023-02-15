import style from "../styles/Home.module.css";
import { ChangeEvent, useState } from "react";

const Home = () => {
  // productNameのテキスト入力のための変数
  const [inputProductNameText, setInputProductNameText] = useState<string>("");

  // 機能のテキスト入力のための変数
  const [inputFeatureText, setInputFeatureText] = useState<string>("");

  // 必要な技術のテキスト入力のための変数
  const [inputTechText, setInputTechText] = useState<string>("");

  // 樹形図に記載するproductName名の変数
  const [ProductNameText, setProductNameText] = useState<string>("ProductName");

  // 樹形図に記載する機能リストの配列
  const [featureList, setFeatureList] = useState<string[]>([
    "機能１",
    "機能２",
  ]);

  const [techList, setTechList] = useState<string[]>([
    "やるべきこと１",
    "やるべきこと２",
  ]);

  // productName用onchange関数
  const onChangeProductNameText = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputProductNameText(e.target.value);
  };

  // 機能用onchange関数
  const onChangeFeatureText = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputFeatureText(e.target.value);
  };

  // 必要な技術用onchange関数
  const onChangeTechText = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputTechText(e.target.value);
  };

  const onClickAddFeature = () => {
    alert("機能の追加");
  };

  const onClickAddTech = () => {
    alert("必要な技術の追加");
  };

  // 樹形図の作成
  const onClickCreateTree = () => {
    // 入力している文字を樹形図のプロダクト名に表示
    setProductNameText(inputProductNameText);

    // 新しい機能を機能リストの最後尾に格納
    const newfeatureList: Array<string> = [...featureList];
    newfeatureList.push(inputFeatureText);
    setFeatureList(newfeatureList);

    const newtechList: Array<string> = [...techList];
    newtechList.push(inputTechText);
    setTechList(newtechList);

    setInputProductNameText("");
    setInputFeatureText("");
    setInputTechText("");
  };

  console.log(inputProductNameText);

  return (
    <>
      <div className={style.inputArea}>
        <div className={style.firstInputArea}>
          <div className={`${style.inputProductName} ${style.input}`}>
            <p>ProductName</p>
            <input
              type="text"
              placeholder="目標となる制作物を入力"
              value={inputProductNameText}
              onChange={onChangeProductNameText}
            ></input>
          </div>

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
            <select name="featureList">
              {featureList.map((feature, index) => (
                <option key={index}>{feature}</option>
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

          <button
            onClick={onClickCreateTree}
            className={style.onClickCreateTreeButton}
          >
            作成
          </button>
        </div>

        <div className={style.treeOutputArea}>
          <div className={style.treeArea}>
            <ul>
              <li>
                <p>{ProductNameText}</p>

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

export default Home;
