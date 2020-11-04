import React, { useEffect } from "react";
import jiangzhuang from "./images/image.png";
import "./App.css";
import names from "./images/name.json";
import html2canvas from "html2canvas";
import saveAs from "file-saver";

function App() {
  function handleClick(imageName, e) {
    const dom = e.currentTarget;
    const targetItem = dom.getElementsByClassName("item")[0];

    console.log("e", targetItem);

    html2canvas(targetItem, {
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      canvas.toBlob(function (blob) {
        saveAs(blob, imageName);
      });
    });
  }

  return (
    <div className="App">
      {names.map((item) => (
        <div className="box" onClick={(e) => handleClick(`${item}.png`, e)}>
          <div className="item">
            <img
              src="https://static.tuture.co/u/7e511f48-f17e-4a4f-a04f-45ae08eb73ea.png"
              alt="王丹"
              name="王丹"
              className="image"
            />
            <span className="name">{item}</span>
          </div>
          <button>下载</button>
        </div>
      ))}
    </div>
  );
}

export default App;
