import style from "../../styles/Header.module.css";

export const Header = () => {
  return (
    <>
      <div className={style.header}>
        <h1>開発支援ツール</h1>
        <p>開発に必要な要素を整理し効率化</p>
      </div>
    </>
  );
};
