import { FC } from "react";
import style from "../../../styles/Header.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";

type props = {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;

  isOpenMenu: boolean;
};
export const Header: FC<props> = (props) => {
  const { setIsOpenMenu, isOpenMenu } = props;

  const onClickMenuBar = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  return (
    <>
      <div className={style.header}>
        <div className={style.menuBarContents}>
          <button className={style.menuBarButton} onClick={onClickMenuBar}>
            <FontAwesomeIcon icon={faBars} className={style.menuBar} />
          </button>
        </div>

        <div className={style.iconImageContents}>
          <Image
            src="/image/fread_header.jpg"
            alt=""
            height={90}
            width={170}
          ></Image>
        </div>

        <div className={style.userIconContents}>
          <FontAwesomeIcon icon={faCircleUser} className={style.userIcon} />
        </div>
      </div>
    </>
  );
};
