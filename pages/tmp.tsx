import style from "../styles/Tree.module.css";
import { Header } from "./component/header";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { treeListState } from "./component/atoms";
import { useRouter } from "next/router";
import { newTreeState } from "./component/atoms";

type Feature = {
  name: string;
  isOpen: boolean;
  techList: string[];
};

type treeList = {
  productName: string;
  featureList: Feature[];
};

const Tmp = () => {
  const router = useRouter();

  const [treeList, setTreeList] = useRecoilState(treeListState);

  const [newTree, setNewTree] = useRecoilState(newTreeState);

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [inputFeatureText, setInputFeatureText] = useState<string>("");
  const [inputTechText, setInputTechText] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<string>("追加先を選択");

  const AddTreeListButton = () => {
    router.push({
      pathname: "/",
    });

    const newTreeList: treeList[] = [...treeList, newTree];
    // console.log(newTreeList);

    setTreeList(newTreeList);
  };

  return (
    <>
      <Header setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu}></Header>
      {/* {JSON.stringify(featureList)} */}

      <div className={style.createTreeBody}>
        <div className={`${style.sideMenu}`}>
          <p>aaaa</p>
        </div>

        <div className={style.inputArea}>
          <div className={`${style.firstInputArea} ${style.contents}`}>
            <div className={`${style.inputFeature} ${style.input}`}>
              <p>機能</p>
              <input
                type="text"
                placeholder="実装したい機能を入力"
                value={inputFeatureText}
                onChange={(e) => setInputFeatureText(e.target.value)}
              ></input>

              {/* 機能の追加ボタン */}
              <button
                onClick={() => {
                  // すでにある配列の後ろに追加

                  const newFeatureList: Feature[] = [...newTree.featureList];

                  newFeatureList.push({
                    name: inputFeatureText,
                    isOpen: false,
                    techList: [],
                  });

                  setNewTree({
                    productName: newTree.productName,
                    featureList: newFeatureList,
                  });

                  // inputFeatureTextの初期化
                  setInputFeatureText("");
                }}
              >
                追加
              </button>
            </div>

            <div className={`${style.inputTech} ${style.input}`}>
              <p>必要な知識、技術</p>

              {/* 機能リストを表示 */}
              {/* selectタグの中で選択された値を取得 */}
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
              >
                <option value="追加先を選択" hidden>
                  追加先を選択
                </option>
                {newTree.featureList.map((feature, index) => (
                  <option key={index} value={feature.name}>
                    {feature.name}
                  </option>
                ))}
              </select>

              <div>
                <input
                  type="text"
                  placeholder="必要な技術を入力"
                  value={inputTechText}
                  onChange={(e) => setInputTechText(e.target.value)}
                ></input>

                {/* 必要な知識、技術の追加ボタン */}
                <button
                  onClick={() => {
                    // featureListを1つずつ見ていき、選択された文字列とfeatureList.nameが一致したらtargetに代入
                    const target = newTree.featureList.find(
                      (v) => v.name === selectedTech
                    );

                    console.log(selectedTech);
                    console.log(target?.techList);

                    if (selectedTech === "追加先を選択") {
                      alert("追加先を入力してください");
                    } else {
                      // 存在確認でのif
                      if (target) {
                        const newTechList: string[] = [
                          ...target?.techList,
                          inputTechText,
                        ];
                        // target?.techList.push(inputTechText);
                        // targetには選択されている機能に対するものしか入ってないのでmapでfeatureリストを表示し名前がtargetと一致したら元のものと置き換える
                        const newFeatureList: Feature[] =
                          newTree.featureList.map((feature) =>
                            feature.name === target.name
                              ? {
                                  name: feature.name,
                                  isOpen: feature.isOpen,
                                  techList: newTechList,
                                }
                              : feature
                          );
                        setNewTree({
                          productName: newTree.productName,
                          featureList: newFeatureList,
                        });
                      }
                    }
                    setInputTechText("");
                  }}
                >
                  追加
                </button>
              </div>
            </div>
          </div>

          <div className={`${style.treeOutputArea} ${style.contents}`}>
            <div className={style.treeArea}>
              <ul>
                <li>
                  {/* <p>{productNameText}</p> */}
                  <p className={style.productNameText}>{newTree.productName}</p>

                  {/* 機能リストの表示 */}
                  <ul className={style.ul}>
                    {newTree.featureList.map((feature, index) => (
                      <li key={index}>
                        <div className={style.featureListContents}>
                          <p
                            className={style.isOpenArrow}
                            onClick={() => {
                              const newIsOpen = !feature.isOpen;

                              const newFeatureList: Feature[] =
                                newTree.featureList.map((feat) =>
                                  feat.name === feature.name
                                    ? {
                                        name: feature.name,
                                        isOpen: newIsOpen,
                                        techList: feature.techList,
                                      }
                                    : feat
                                );

                              setNewTree({
                                productName: newTree.productName,
                                featureList: newFeatureList,
                              });
                            }}
                          >
                            {newTree.featureList[index].isOpen ? "∨" : ">"}
                          </p>

                          <p className={style.featureText}>{feature.name}</p>

                          <button
                            className={style.featureListRightContents}
                            onClick={() => {
                              const newFeatureList = [...newTree.featureList];
                              newFeatureList.splice(index, 1);

                              setSelectedTech("追加先を選択");

                              setNewTree({
                                productName: newTree.productName,
                                featureList: newFeatureList,
                              });
                            }}
                          >
                            削除
                          </button>
                        </div>

                        {/* 必要な知識、技術リストの表示 */}

                        {/* 開閉の状態によってclassNameを分ける */}
                        <div
                          className={
                            newTree.featureList[index].isOpen
                              ? style.isOpenTrueContents
                              : style.isOpenFalseContents
                          }
                        >
                          <ul className={style.ul}>
                            {feature.techList.map((tech, techIndex) => (
                              <li key={techIndex}>
                                <div className={style.techListContents}>
                                  <p className={style.techText}>{tech}</p>
                                  <button
                                    className={style.techListRightContents}
                                    onClick={() => {
                                      const newFeatureList = [
                                        ...newTree.featureList,
                                      ];

                                      const newTechList = feature.techList;

                                      newTechList.splice(techIndex, 1);

                                      newFeatureList[index].techList =
                                        newTechList;
                                      setNewTree({
                                        productName: newTree.productName,
                                        featureList: newFeatureList,
                                      });
                                    }}
                                  >
                                    削除
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <button onClick={AddTreeListButton}>リストへ追加</button>
            </div>
          </div>
        </div>
        <div className="todoList"></div>
      </div>
    </>
  );
};

export default Tmp;
