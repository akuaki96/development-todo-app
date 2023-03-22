import { Header } from "./component/header";
import style from "../styles/Home.module.css";
import { SideBar } from "./component/sideBar";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { treeListState } from "./component/atoms";
import { TreeList } from "./component/treeList";

const Home = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const [treeList, setTreeList] = useRecoilState(treeListState);

  const [selected, setSelected] = useState<number>(0);

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
          <TreeList setSelected={setSelected}></TreeList>
        </div>

        <div className={style.firstInputArea}>
          <p>{treeList[selected].productName}</p>
          <ul className={style.ul}>
            {treeList[selected].featureList.map((feat, featIndex) => (
              <li key={featIndex}>
                <p>{feat.name}</p>
                <ul className={style.ul}>
                  {feat.techList.map((tech, techIndex) => (
                    <li key={techIndex}>
                      <p>{tech}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <FirstInput></FirstInput> */}
    </div>
  );
};

export default Home;
