import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

type sideBar = {
  title: string;
  icon: JSX.Element;
  link: string;
};

export const SideBarData: sideBar[] = [
  {
    title: "ホーム",
    icon: <FontAwesomeIcon icon={faHouse} style={{ fontSize: "20px" }} />,
    link: "/",
  },
  {
    title: "tree作成",
    icon: <FontAwesomeIcon icon={faPlus} style={{ fontSize: "20px" }} />,
    link: "/firstInput",
  },
  {
    title: "FREADとは",
    icon: <FontAwesomeIcon icon={faQuestion} style={{ fontSize: "20px" }} />,
    link: "/",
  },
  {
    title: "お問い合わせ",
    icon: <FontAwesomeIcon icon={faMessage} style={{ fontSize: "20px" }} />,
    link: "/",
  },
];
