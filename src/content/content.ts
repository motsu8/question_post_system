chrome.runtime.onMessage.addListener((obj, sender, response)=>{
    console.log("connect!")
    console.log(sender.id)
    if(obj.message === "text request"){
      // question_title
      const title = document.querySelector("h4")?.innerText

      // console_text
      const consoleEle = document.querySelectorAll(".code-run-single-stdout")
      let consoleText = "";
      consoleEle.forEach((ele)=>{
        consoleText += (ele as HTMLElement).innerText + "\n"
      })

      // code_text
      const codeEle = document.querySelectorAll(".view-line")
      let codeText = "";
      codeEle.forEach(ele=>{
        codeText += (ele as HTMLElement).innerText + "\n"
      })

      // response
      const resObj = {
        title: title,
        code: codeText,
        console: consoleText,
      }
      response(resObj)
    }
  })
  