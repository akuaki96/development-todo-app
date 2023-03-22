import style from "../../styles/SideBar.module.css";
import { SideBarData } from "./sideBarData";

export const SideBar = () => {
  return (
    <>
      <div className={style.SideBar}>
        <ul className={style.SideBarList}>
          {SideBarData.map((value, index) => {
            return (
              <li
                key={index}
                className={style.row}
                // クリックされリンク先を表示
                onClick={() => {
                  window.location.pathname = value.link;
                }}
              >
                <div className={style.icon}>{value.icon}</div>
                <div className={style.title}>{value.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
