import React, { useState, useEffect, useRef } from "react";

import EditModal from "./EditModal";

//const sizes = ["small", "medium", "large"];

const Panel = ({ id, url, name, height, width }) => {
  // const randomSize = Math.floor(Math.random() * sizes.length);
  //const [spans, setSpans] = useState(0);
  // const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const gridHeight = Math.ceil(height / (width / 400) / 10);

  // useEffect(() => {
  //   setSpans(ref.current.clientHeight);
  // }, []);

  return (
    <>
      <figure
        id={id}
        style={{
          gridRowEnd: `span ${gridHeight + 5}`,
        }}
        className={`panel`}
        onClick={() => setOpen(true)}
      >
        <img src={url} alt={name} />
        <figcaption>{name}</figcaption>
      </figure>
      <EditModal
        title={name}
        open={open}
        onClose={() => setOpen(false)}
        url={url}
      ></EditModal>
    </>
    // <div
    //   // ref={ref}
    //   id={id}
    //   className="panel"
    //   name={name}
    //   style={{
    //     backgroundImage: `url(${url})`,
    //     backgroundSize: "100% 100%",
    //     backgroundRepeat: "no-repeat",
    //     gridRowEnd: `span ${gridHeight}`,
    //   }}
    // >
    // </div>
  );
};

export default Panel;
