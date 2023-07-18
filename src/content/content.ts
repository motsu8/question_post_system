chrome.runtime.onMessage.addListener((obj, sender, response) => {
  console.log(sender.id);
  if (obj.message === "getScreen") {
    const responseObj = {
      width: window.screen.width,
      screenHeight: window.outerHeight,
    };
    console.log(responseObj);
    response(responseObj);
  }

  if (obj.message === "text request") {
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

    // response
    const resObj = {
      title: titled,
      code: codeText,
      console: consoleText,
    };
    response(resObj);
  }
});
