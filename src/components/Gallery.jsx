import React, { useState, useEffect } from "react";
import axios from "axios";
import GenerateButton from "./GenerateButton";
import Panel from "./Panel";
import { Typography } from "antd";
const { Title } = Typography;

const Gallery = () => {
  const [panels, setPanels] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then((response) => {
      setPanels(response.data.data.memes);
    });
  }, []);

  const handleClick = () => {
    if (startIndex === 90 && endIndex === 100) {
      setStartIndex(0);
      setEndIndex(10);
    } else {
      setStartIndex(startIndex + 10);
      setEndIndex(endIndex + 10);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div id="main-board">
        <Title level={1} className="h1-title">
          CHOOSE YOUR MEME
        </Title>
        <div className="panel_container">
          {panels.slice(startIndex, endIndex).map((panel) => {
            return (
              <Panel
                Panel
                key={panel.id}
                id={panel.id}
                url={panel.url}
                name={panel.name}
                height={panel.height}
                width={panel.width}
                box_count={panel.box_count}
              ></Panel>
            );
          })}
          <GenerateButton onClick={() => handleClick()} />
        </div>
      </div>
    </>
  );
};

export default Gallery;
