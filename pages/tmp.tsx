import style from "../styles/Tree.module.css";
import { Header } from "./component/header/header";
import { SideBar } from "./component/sideBar/sideBar";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { treeListState } from "./component/atoms/atoms";
import { useRouter } from "next/router";
import { newTreeState } from "./component/atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

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

  const treeIndex = Number(router.query.treeIndex);

  const [treeList, setTreeList] = useRecoilState(treeListState);
  // console.log(treeList);
  const [newTree, setNewTree] = useRecoilState(newTreeState);
  // console.log(newTree);

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const [inputFeatureText, setInputFeatureText] = useState<string>("");

  const [inputTechText, setInputTechText] = useState<string>("");

  const [selectedTech, setSelectedTech] = useState<string>("追加先を選択");

  const onClickArrow = (feature: Feature) => {
    const newIsOpen = !feature.isOpen;

    const newFeatureList: Feature[] = newTree.featureList.map((feat) =>
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
  };

  const onClickAddFeature = () => {
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
  };

  const onClickDeleteFeature = (index: number) => {
    const newFeatureList = [...newTree.featureList];
    newFeatureList.splice(index, 1);

    setSelectedTech("追加先を選択");

    setNewTree({
      productName: newTree.productName,
      featureList: newFeatureList,
    });
  };

  const onClickAddTech = () => {
    const target = newTree.featureList.find((v) => v.name === selectedTech);

    // console.log(selectedTech);
    // console.log(target?.techList);

    if (selectedTech === "追加先を選択") {
      alert("追加先を入力してください");
    } else {
      // 存在確認でのif
      if (target) {
        const newTechList: string[] = [...target?.techList, inputTechText];
        // target?.techList.push(inputTechText);
        // targetには選択されている機能に対するものしか入ってないのでmapでfeatureリストを表示し名前がtargetと一致したら元のものと置き換える
        const newFeatureList: Feature[] = newTree.featureList.map((feature) =>
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
  };

  const onClickDeleteTech = (
    feature: Feature,
    techIndex: number,
    index: number
  ) => {
    const newTechList = [...feature.techList];

    newTechList.splice(techIndex, 1);

    const newFeatureList: Feature[] = newTree.featureList.map(
      (value, newIndex) =>
        index === newIndex
          ? {
              name: value.name,
              isOpen: value.isOpen,
              techList: newTechList,
            }
          : value
    );

    setNewTree({
      productName: newTree.productName,
      featureList: newFeatureList,
    });
  };

  const AddTreeListButton = () => {
    router.push({
      pathname: "/",
    });

    const newTreeList: treeList[] = [...treeList, newTree];

    setTreeList(newTreeList);
  };

  const EditTreeListButton = () => {
    router.push({
      pathname: "/",
    });

    const newTreeList: treeList[] = treeList.map((value, index) =>
      index === treeIndex ? newTree : value
    );

    setTreeList(newTreeList);
  };

  console.log(newTree);

  return (
    <div className={style.body}>
      <Header setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu}></Header>
      {/* {JSON.stringify(featureList)} */}

      <div className={style.main}>
        <div
          className={
            isOpenMenu ? style.trueMenuBarArea : style.falseMenuBarArea
          }
        >
          <SideBar></SideBar>
        </div>

        <div className={style.inputArea}>
          <div className={`${style.firstInputArea} ${style.contents}`}>
            <div className={style.inputFeature}>
              <p className={style.addFeatureTitle}>機能の追加</p>
              <input
                className={style.input}
                type="text"
                placeholder="実装したい機能を入力"
                value={inputFeatureText}
                onChange={(e) => setInputFeatureText(e.target.value)}
              ></input>

              {/* 機能の追加ボタン */}
              <button
                className={style.button}
                onClick={() => onClickAddFeature()}
              >
                追加
              </button>
            </div>

            <div className={style.inputTech}>
              <p className={style.addTechTitle}>必要な知識、技術の追加</p>

              {/* 機能リストを表示 */}
              {/* selectタグの中で選択された値を取得 */}
              <select
                className={style.selectItem}
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
                  className={style.input}
                  type="text"
                  placeholder="必要な技術を入力"
                  value={inputTechText}
                  onChange={(e) => setInputTechText(e.target.value)}
                ></input>

                {/* 必要な知識、技術の追加ボタン */}
                <button
                  className={style.button}
                  onClick={() => onClickAddTech()}
                >
                  追加
                </button>
              </div>
            </div>
          </div>

          <div className={`${style.treeOutputArea} ${style.contents}`}>
            <div className={style.treeArea}>
              <ul className={style.ul}>
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
                            onClick={() => onClickArrow(feature)}
                          >
                            {newTree.featureList[index].isOpen ? (
                              <FontAwesomeIcon
                                icon={faCaretDown}
                              ></FontAwesomeIcon>
                            ) : (
                              <FontAwesomeIcon
                                icon={faCaretDown}
                                rotation={270}
                              ></FontAwesomeIcon>
                            )}
                          </p>

                          <p className={style.featureText}>{feature.name}</p>

                          <button
                            className={style.button}
                            onClick={() => onClickDeleteFeature(index)}
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
                                    className={`${style.techDeleteButon} ${style.button}`}
                                    onClick={() =>
                                      onClickDeleteTech(
                                        feature,
                                        techIndex,
                                        index
                                      )
                                    }
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
              {/* {document.referrer === "/" ? (
                <button onClick={EditTreeListButton}>編集完了</button>
              ) : ( */}
              <button
                className={`${style.AddListButton} ${style.button}`}
                onClick={AddTreeListButton}
              >
                リストへ追加
              </button>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tmp;
