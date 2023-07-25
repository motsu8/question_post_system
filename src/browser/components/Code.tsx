import React from "react";

function Code({ active, input }: { active: string; input: string }) {
  return (
    <div className={`${active} flex justify-center p-3`}>
      <textarea
        id="code"
        className="bg-neutral-100 text-sm placeholder:text-inherit p-3 rounded-md drop-shadow-lg"
        placeholder={input}
        rows={15}
        cols={80}
        disabled
      />
    </div>
  );
}

export default Code;
