import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import readXlsxFile from "read-excel-file";
import uniq from "lodash.uniq";

const { Dragger } = Upload;

function recursiveGetNames(elem, nameArr, blackList) {
  elem.forEach((elemItem) => {
    if (Array.isArray(elemItem))
      return recursiveGetNames(elemItem, nameArr, blackList);
    if (blackList.includes(elemItem) || !elemItem) return;

    nameArr.push(elemItem);
  });
}

export default function UploadComponent({ handleSetRows }) {
  let nameArr = [];
  let blackList = ["姓名"];

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    beforeUpload(file) {
      console.log("file", file);

      readXlsxFile(file).then((rows) => {
        recursiveGetNames(rows, nameArr, blackList);

        handleSetRows(uniq(nameArr));
      });
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击上传或拖拽 Excel 文件</p>
    </Dragger>
  );
}
