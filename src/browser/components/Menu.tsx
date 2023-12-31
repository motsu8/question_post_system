import React from "react";

function Menu({
  updateDraw,
  updateDrawFeedBack,
}: {
  updateDraw: (bool: boolean) => void;
  updateDrawFeedBack: (bool: boolean) => void;
}) {
  const nav = document.querySelector("#navArea");

  const toggleClass = () => nav?.classList.toggle("open");

  const clearStorage = () => {
    localStorage.clear();
    updateDraw(false);
  };

  return (
    <div id="navArea">
      <nav className="drop-shadow-lg rounded-md">
        <div className="inner">
          <ul>
            <li id="nav-logout">
              <button
                type="button"
                onClick={() => {
                  clearStorage();
                  toggleClass();
                }}
              >
                ログアウト
              </button>
            </li>
            <li id="nav-feedback">
              <button
                type="button"
                onClick={() => {
                  updateDrawFeedBack(true);
                  toggleClass();
                }}
              >
                フィードバック
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="toggleBtn" onClick={toggleClass} aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div id="mask" onClick={toggleClass} aria-hidden />
    </div>
  );
}

export default Menu;
