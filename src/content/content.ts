chrome.runtime.onMessage.addListener((obj, sender, response)=>{
    console.log("connect!")
    console.log(sender.id)
    if(obj.message === "text request"){
      const consoleEle = document.querySelectorAll(".code-run-single-stdout")
      const title = document.querySelector("h4")?.innerText
      let consoleText = "";
      consoleEle.forEach((ele)=>{
        consoleText += (ele as HTMLElement).innerText + "\n"
      })
      const resObj = {
        text: consoleText,
        title: title
      }
      response(resObj)
    }
  })
  