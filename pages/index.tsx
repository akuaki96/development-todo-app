import style from "../styles/Home.module.css";
import { ChangeEvent, useState } from "react";

const Home = () => {
  const [inputProductNameText, setInputProductNameText] = useState<string>("");

  const [ProductNameText, setProductNameText] = useState<string>("ProductName");

  const onChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputProductNameText(e.target.value);
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
              onChange={onChangeText}
            ></input>
          </div>

          <div className={`${style.inputFeature} ${style.input}`}>
            <p>機能</p>
            <input placeholder="実装したい機能を入力"></input>
            <button onClick={onClickAddFeature}>追加</button>
          </div>

          <div className={`${style.inputTech} ${style.input}`}>
            <p>必要な知識、技術</p>
            <select name="featureList">
              <option>機能１</option>
              <option>機能２</option>
            </select>
            <div>
              <input placeholder="必要な技術を入力"></input>
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

                <ul>
                  <li>
                    <p>機能１</p>
                    <ul>
                      <li>機能１のやるべきこと１</li>
                      <li>機能１のやるべきこと２</li>
                    </ul>
                  </li>
                </ul>

                <ul>
                  <li>
                    <p>機能２</p>
                    <ul>
                      <li>機能２のやるべきこと１</li>
                      <li>機能２のやるべきこと２</li>
                    </ul>
                  </li>
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
