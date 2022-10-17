import React, {
  useState,
  //useEffect,
  //useRef
} from "react";

import EditModal from "./EditModal";

//const sizes = ["small", "medium", "large"];

const Panel = ({ id, url, name, height, width, box_count }) => {
  // const randomSize = Math.floor(Math.random() * sizes.length);
  //const [spans, setSpans] = useState(0);
  // const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [boxCount, setBoxCount] = useState(1);
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
        onClick={() => {
          setBoxCount(box_count);
          setOpen(true);
        }}
      >
        <img src={url} alt={name} />
        <figcaption>{name}</figcaption>
      </figure>
      <EditModal
        id={id}
        title={name}
        open={open}
        onClose={() => setOpen(false)}
        url={url}
        boxCount={boxCount}
      ></EditModal>
    </>
  );
};

export default Panel;
