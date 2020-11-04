import React, { useEffect } from "react";
import jiangzhuang from "./images/image.png";
import "./App.css";
import names from "./images/name.json";
import domtoimage from "dom-to-image";

function App() {
  useEffect(() => {
    const node = document.getElementsByClassName("item");

    console.log("node", node);
    // domtoimage.toPng(node[0]).then((dataUrl) => {
    //   var link = document.createElement("a");
    //   link.download = "my-image-name.jpeg";
    //   link.href = dataUrl;
    //   link.click();
    // });
  }, []);

  return (
    <div className="App">
      {names.map((item) => (
        <div className="item" name="王丹.png" alt="王丹.png">
          <img src={jiangzhuang} alt="" className="image" />
          <span className="name">{item}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
