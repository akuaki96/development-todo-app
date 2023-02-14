import style from "../styles/Home.module.css";

const Home = () => {
  return (
    <>
      <div className={style.inputArea}>
        <div className={style.firstInputArea}>
          <div className={style.inputProductName}>
            <p>ProductName</p>
            <input placeholder="目標となる制作物を入力"></input>
          </div>

          <div className={style.inputFeature}>
            <p>機能</p>
            <input placeholder="実装したい機能を入力"></input>
            <button>追加</button>
          </div>

          <div className={style.inputTech}>
            <p>必要な知識、技術</p>
            <input placeholder="必要な技術を入力"></input>
            <button>追加</button>
          </div>
        </div>

        <div className={style.treeArea}>
          <ul>
            <li>
              <p>ProductName</p>

              <ul>
                <li>
                  <p>機能１</p>
                  <ul>
                    <li>機能１のやるべきこと１</li>
                    <li>機能１のやるべきこと２</li>
                  </ul>
                </li>
              </ul>

              <ul>
                <li>
                  <p>機能２</p>
                  <ul>
                    <li>機能２のやるべきこと１</li>
                    <li>機能２のやるべきこと２</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="todoList"></div>
      </div>
    </>
  );
};

export default Home;
