import React, { useEffect, useState } from "react";
import jiangzhuang from "./images/image.png";
import "./App.css";
import names from "./images/name.json";
import html2canvas from "html2canvas";
import saveAs from "file-saver";

let cnt = 0;

function App() {
  let [domArr, setDomArr] = useState([]);
  let [timer, setTimer] = useState(null);
  function handleClick(imageName, e) {
    const dom = e.currentTarget;
    const targetItem = dom.getElementsByClassName("item")[0];

    html2canvas(targetItem, {
      useCORS: true,
      allowTaint: true,
      logging: true,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      canvas.toBlob(function (blob) {
        saveAs(blob, imageName);
      });
    });
  }

  // useEffect(() => {
  //   if (!timer) {
  //     const nowDomArr = Array.from(document.getElementsByTagName("button"));
  //     setDomArr(domArr);

  //     let nowTimer = setInterval(() => {
  //       nowDomArr[cnt].click();
  //       cnt++;
  //     }, 1000);

  //     setTimer(nowTimer);
  //   } else {
  //     if (cnt === 106) {
  //       clearInterval(timer);
  //     }
  //   }
  // }, [cnt]);

  return (
    <div className="App">
      {names.map((item) => (
        <div className="box" onClick={(e) => handleClick(`${item}.png`, e)}>
          <div className="item">
            <img src={jiangzhuang} alt="王丹" name="王丹" className="image" />
            <span className="name">{item}</span>
          </div>
          <button>下载</button>
        </div>
      ))}
    </div>
  );
}

export default App;
