import React from "react";

function FeedBack({ drawFeedBack }: { drawFeedBack: boolean }) {
  return (
    <div className={`${drawFeedBack ? "block" : "hidden"}`}>
      <div className="flex flex-col">
        <textarea
          name="feedBack"
          id="feedBack"
          cols={20}
          rows={10}
          aria-label="フィードバック内容"
        />
        <button type="button">送信する</button>
      </div>
    </div>
  );
}

export default FeedBack;
