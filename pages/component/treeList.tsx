import style from "../../styles/TreeList.module.css";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { treeListState } from "./atoms/atoms";
import { newTreeState } from "./atoms/atoms";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
  selected: number | null;
};

export const TreeList: FC<Props> = (props) => {
  const router = useRouter();

  const { setSelected, selected } = props;

  const [treeList, setTreeList] = useRecoilState(treeListState);
  const [newTree, setNewTree] = useRecoilState(newTreeState);

  const onClickDelete = (index: number) => {
    const newTreeList = [...treeList];
    newTreeList.splice(index, 1);

    setTreeList(newTreeList);
    setSelected(null);
  };

  const onClickEdit = (index: number) => {
    router.push({
      pathname: "/tmp",
      query: { treeIndex: index },
    });

    setNewTree(treeList[index]);
  };

  // console.log(selected);

  return (
    <div>
      <p className={style.listTitle}>目標リスト</p>
      <ul className={style.ul}>
        {treeList.map((value, index) => (
          <li key={index} className={style.listContent}>
            <div className={style.textContent}>
              <p
                className={style.productNameText}
                onClick={() => {
                  setSelected(index);
                }}
              >
                {value.productName}
              </p>
              <p className={style.subText}>
                <span>要素数 : </span>
                {value.featureList.length}
              </p>
            </div>

            <div className={style.buttonContent}>
              <button className={style.button}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className={style.icon}
                  onClick={() => onClickDelete(index)}
                ></FontAwesomeIcon>
              </button>

              <button className={style.button}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={style.icon}
                  onClick={() => onClickEdit(index)}
                ></FontAwesomeIcon>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
