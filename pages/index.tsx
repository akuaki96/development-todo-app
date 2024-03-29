import { Header } from "./component/header/header";
import style from "../styles/Home.module.css";
import { SideBar } from "./component/sideBar/sideBar";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { treeListState } from "./component/atoms/atoms";
import { TreeList } from "./component/treeList";
import { TreeDetail } from "./component/treeDetail";

type Feature = {
  name: string;
  isOpen: boolean;
  techList: string[];
};

type treeList = {
  productName: string;
  featureList: Feature[];
};

const Home = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const [treeList, setTreeList] = useRecoilState<treeList[]>(treeListState);

  const [selected, setSelected] = useState<number | null>(null);

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
          <TreeList setSelected={setSelected} selected={selected}></TreeList>
        </div>

        <div className={style.treeDetail}>
          <TreeDetail selected={selected} treeList={treeList}></TreeDetail>
        </div>
      </div>
    </div>
  );
};

export default Home;
