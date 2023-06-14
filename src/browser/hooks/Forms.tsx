import { useState } from "react";

const useForms = () => {
  const [title, setTitle] = useState("");
  const [expect, setExpect] = useState("");
  const [contents, setContents] = useState("");
  const [tried, setTried] = useState("");

  function updateTitle(str: string) {
    setTitle(str);
  }

  function updateExpect(str: string) {
    setExpect(str);
  }

  function updateContents(str: string) {
    setContents(str);
  }

  function updateTried(str: string) {
    setTried(str);
  }

  return {
    title,
    expect,
    contents,
    tried,
    updateTitle,
    updateExpect,
    updateContents,
    updateTried,
  };
};

export default useForms;
