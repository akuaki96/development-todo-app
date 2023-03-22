import { Header } from "./component/header";
import style from "../styles/Home.module.css";
import { SideBar } from "./component/sideBar";
import { useState } from "react";
import { featureListState } from "./component/atoms";
import { useRecoilState } from "recoil";
import { treeListState } from "./component/atoms";

const Home = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const [treeList, setTreeList] = useRecoilState(treeListState);

  return (
    <div className={style.homeBody}>
      <Header setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu}></Header>
      <div className={style.main}>
        <div
          className={
            isOpenMenu ? style.trueMenuBarArea : style.falseMenuBarArea
          }
        >
          <SideBar></SideBar>
        </div>

        <div className={style.treeListArea}>
          <ul>
            {treeList.map((treeList, index) => (
              <li key={index} className={style.treeListContents}>
                <p>{treeList.productName}</p>
                <ul>
                  {treeList.featureList.map((feat, featIndex) => (
                    <li key={featIndex}>
                      <p>{feat.name}</p>
                      <ul>
                        {feat.techList.map((tech, techIndex) => (
                          <li key={techIndex}>
                            <p>{tech}</p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.firstInputArea}></div>
      </div>
      {/* <FirstInput></FirstInput> */}
    </div>
  );
};

export default Home;
