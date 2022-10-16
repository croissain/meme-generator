import { Button } from "antd";
import React from "react";

const GenerateButton = ({ onClick }) => {
  return (
    <Button type="primary" onClick={onClick} className="btn-generate">
      Another one!
    </Button>
  );
};

export default GenerateButton;
