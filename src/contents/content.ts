chrome.runtime.onMessage.addListener((obj, sender, response) => {
  console.log(`${sender}`);
  if (obj.message === "getScreen") {
    const responseObj = {
      width: window.screen.width,
      screenHeight: window.outerHeight,
    };
    response(responseObj);
  } else if (obj.message === "getText") {
    // question_title
    const titled = document.querySelector("h4")?.innerText;

    // console_text
    const consoleEle = document.querySelectorAll(".code-run-single-stdout");
    let consoleText = "";
    consoleEle.forEach((ele) => {
      consoleText += `${(ele as HTMLElement).innerText}\n`;
    });

    // code_text
    const codeEle = document.querySelectorAll(".view-line");
    let codeText = "";
    codeEle.forEach((ele) => {
      codeText += `${(ele as HTMLElement).innerText}\n`;
    });

    // language
    const languageEle = (document.getElementById("languageSelect") as HTMLSelectElement)
      .selectedOptions[0];
    const languageText = languageEle.value;

    // response
    const resObj = {
      title: titled,
      code: codeText,
      console: consoleText,
      language: languageText,
    };

    response(resObj);
  }
});
