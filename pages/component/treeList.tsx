import style from "../../styles/TreeList.module.css";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { treeListState } from ".././component/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

export const TreeList: FC<Props> = (props) => {
  const { setSelected } = props;

  const [treeList, setTreeList] = useRecoilState(treeListState);
  return (
    <div>
      <p className={style.listTitle}>目標リスト</p>
      <ul className={style.ul}>
        {treeList.map((value, index) => (
          <li
            key={index}
            className={style.listContent}
            onClick={() => {
              setSelected(index);
            }}
          >
            <div className={style.textContent}>
              <p className={style.productNameText}>{value.productName}</p>
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
                ></FontAwesomeIcon>
              </button>

              <button className={style.button}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={style.icon}
                ></FontAwesomeIcon>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
