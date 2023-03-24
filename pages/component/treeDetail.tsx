import { FC } from "react";
import style from "../../styles/TreeDetail.module.css";
type Feature = {
  name: string;
  isOpen: boolean;
  techList: string[];
};

type treeList = {
  productName: string;
  featureList: Feature[];
};

type Props = {
  selected: number;
  treeList: treeList[];
};

export const TreeDetail: FC<Props> = (props) => {
  const { selected, treeList } = props;
  return (
    <div>
      <p className={style.productNameText}>{treeList[selected].productName}</p>

      <ul className={style.ul}>
        {treeList[selected].featureList.map((feat, featIndex) => (
          <li key={featIndex} className={style.featureContent}>
            <p className={style.featureTitle}>{feat.name}</p>
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
  );
};
