import React from "react";

function Console({ active, input }: { active: string; input: string }) {
  return (
    <div className={`${active} flex justify-center p-3`}>
      <textarea
        id="console"
        className="bg-neutral-700 text-sm p-3 rounded-md drop-shadow-lg"
        placeholder={input}
        rows={15}
        cols={80}
        disabled
      />
    </div>
  );
}

export default Console;
