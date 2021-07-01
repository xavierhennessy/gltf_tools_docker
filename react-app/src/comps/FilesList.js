import React from "react";
import GetDriveFiles from "./GDriveFiles";
import axios from "../api/Queue";
import { Button, Tree, message } from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined, CarryOutOutlined } from "@ant-design/icons";
import { wait } from "@testing-library/react";

const ROOT_FOLDER = "1vbVxi0vq7vsfOE7E5fc-RgT1Lbj8Wgwe"; //EA PRODUCTS

class GDriveFiles extends React.Component {
  state = {
    data: [
      {
        title: "Getting Files...",
        // key: "You just couldn't wait huh....",
        icon: <LoadingOutlined />,
      },
    ],
    selectedFiles: ["one", "two", "three"],
    bakingLods: [],
  };

  componentDidMount = () => {
    this.getThoseDriveFiles();
  };

  getThoseDriveFiles = async () => {
    console.log("getting files....");
    let data = await GetDriveFiles(ROOT_FOLDER);
    console.log(data);
    setTimeout(() => {
      this.setState({ data: data });
    }, 1000);
    // console.log(this.state.data);
  };

  onFileSelect = (selectedKeys, info) => {
    // console.log("selected", selectedKeys, info);
    let selectedLods = info.checkedNodes.filter((node) => !node.children);
    this.setState({ selectedFiles: selectedLods });
    setTimeout(() => {
      console.log(this.state.selectedFiles);
    }, 500);
  };

  buttonClick = async () => {
    axios
      .post("/q", {
        data: this.state.selectedFiles,
      })
      .then((res) => {
        console.log("from queue =>" + res.data);
        this.setState({ bakingLods: res.data });
        this.info(res.data);
      });
  };

  info = (data) => {
    data.forEach((object, i) => {
      setTimeout(() => {
        message.info(`${object} has been queued....`);
      }, 500 * i);
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.buttonClick}>
          Test it out
        </Button>
        <br />
        <br />
        <Tree
          checkable={true}
          onCheck={this.onFileSelect}
          onSelect={this.onFileSelect}
          showLine={true}
          // showIcon={true}
          defaultExpandedKeys={["0-0"]}
          treeData={this.state.data}
          // treeData={testData}
          multiple={true}
        />
      </div>
    );
  }
}

// hi my name is niki and i am on the train and i am coding, the trick to coding is to buy high and sell low, i know you probably think i'm crazzzzy but that's money babey. I am a capricorn so i know about money, i am listening to a podcast with an aquitted murderer

export default GDriveFiles;

// on mount call gdrive and get the file list
// then once the the files are ready rerender and show the list
// on the lsit maybe change the tree type
// then once the items are selected and the "bake" button has been pressed
// the array with the gdrive items will be queued with rabbit
// the consumer will then fo what it has to do
