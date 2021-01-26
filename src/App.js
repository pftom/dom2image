import React, { useEffect, useState } from "react";
import jiangzhuang from "./images/image.jpg";
import "./App.less";
import html2canvas from "html2canvas";
import saveAs from "file-saver";

import Upload from "./components/Upload";
import { Button, message } from "antd";

/** @jsx jsx */
import { jsx, css } from "@emotion/react";

let cnt = 0;

function App() {
  let [domArr, setDomArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [clickConfirm, setClickConfirm] = useState(false);
  const [downloading, setDownloading] = useState(false);

  async function handleClick(imageName, e) {
    const dom = e.currentTarget;
    const targetItem = dom.getElementsByClassName("item")[0];

    const canvas = await html2canvas(targetItem, {
      useCORS: true,
      allowTaint: true,
      logging: true,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    });

    canvas.toBlob(function (blob) {
      saveAs(blob, imageName);
    });
  }

  console.log("nameArr", nameArr, nameArr.length);

  useEffect(() => {
    if (nameArr.length && clickConfirm) {
      const nowDomArr = Array.from(document.getElementsByTagName("button"));
      setDomArr(domArr);

      let nowTimer = setInterval(() => {
        nowDomArr[cnt].click();

        if (cnt === nameArr.length + 1) {
          clearInterval(nowTimer);

          message.success("所有图片已下载完成！请查收！");
          setDownloading(false);
        }

        cnt++;
      }, 1200);
    }
  }, [nameArr.length, clickConfirm]);

  return (
    <div className="App">
      <div
        css={css`
          width: 100%;
          height: 100px;
          background-color: rgb(237, 225, 190);
          font-size: 40px;
          text-align: center;
          line-height: 100px;
          color: #1da57a;
          font-weight: bolder;
        `}
      >
        奖状一键下载
      </div>
      <div
        css={css`
          width: 800px;
          margin: 40px auto 80px;
        `}
      >
        <Upload handleSetRows={(result) => setNameArr(result)} />
        <Button
          onClick={() => {
            setClickConfirm(true);
            setDownloading(true);

            message.info("奖状正在排队下载中，请稍后！");
          }}
          css={css`
            margin: 0;
            margin-top: 30px;
            width: 100%;
          `}
          loading={downloading}
          type="primary"
        >
          {downloading ? "正在下载" : "一键下载"}
        </Button>
      </div>
      <div
        css={css`
          width: 800px;
          margin: 60px auto;
        `}
      >
        {nameArr.map((item) => (
          <div className="box" onClick={(e) => handleClick(`${item}.png`, e)}>
            <div className="item">
              <img src={jiangzhuang} alt="王丹" name="王丹" className="image" />
              <span className="name">{item}</span>
            </div>
            <button
              css={css`
                display: block;
              `}
            >
              下载
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
