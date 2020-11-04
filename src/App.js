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

    var e_width = targetItem.offsetWidth;
    var e_height = targetItem.offsetHeight;
    var e_x_offset = window.scrollX + targetItem.getBoundingClientRect().left;
    var e_y_offset = window.scrollY + targetItem.getBoundingClientRect().top;

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
