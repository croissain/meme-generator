import React, { useState, useEffect } from "react";
import axios from "axios";
import GenerateButton from "./GenerateButton";
import Sidebar from "./Sidebar";
import Panel from "./Panel";

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
    console.log("click");
    if (startIndex === 90 && endIndex === 100) {
      setStartIndex(0);
      setEndIndex(10);
    } else {
      setStartIndex(startIndex + 10);
      setEndIndex(endIndex + 10);
    }
  };

  return (
    <>
      <div id="main-board">
        <GenerateButton onClick={() => handleClick()} />
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
              ></Panel>
            );
          })}
        </div>
      </div>
      <div id="sidebar">
        <Sidebar />
      </div>
    </>
  );
};

export default Gallery;
