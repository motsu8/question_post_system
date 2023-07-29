import React, { useState } from "react";
import Backend from "../constants/Backend";

function FeedBack({
  drawFeedBack,
  updateDrawFeedBack,
}: {
  drawFeedBack: boolean;
  updateDrawFeedBack: (bool: boolean) => void;
}) {
  const [feedBack, setFeedBack] = useState("");

  const sendFeedBack = () => {
    const feedBackParams = new URLSearchParams({ feedBack }).toString();
    fetch(`${Backend.BASE_URL}/feedback?${feedBackParams}`, { method: "POST" })
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "Message sent successfully.") {
          updateDrawFeedBack(false);
        }
      });
  };
  return (
    <div className={`${drawFeedBack ? "flex" : "hidden"} justify-center items-center flex-col p-4`}>
      <div className="text-lg py-4 font-medium">フィードバック</div>
      <textarea
        name="feedBack"
        id="feedBack"
        className="bg-neutral-100 w-1/2 text-sm placeholder:text-inherit p-3 rounded-md drop-shadow-lg"
        cols={20}
        rows={10}
        onChange={(e) => setFeedBack(e.target.value)}
        aria-label="フィードバック内容"
      />
      <div className="flex justify-around m-3 w-1/2">
        <button
          type="button"
          onClick={() => updateDrawFeedBack(false)}
          className="bg-neutral-100 hover:bg-blue-500 my-1 drop-shadow-lg font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          戻る
        </button>
        <button
          type="button"
          className="text-white bg-recursion hover:bg-blue-500 my-1 drop-shadow-lg font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={sendFeedBack}
        >
          送信する
        </button>
      </div>
    </div>
  );
}

export default FeedBack;
