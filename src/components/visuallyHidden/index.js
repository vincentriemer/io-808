import * as React from "react";

const style = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
  wordWrap: "normal"
};

function VisuallyHidden(props) {
  return <span style={style}>{props.children}</span>;
}

export default VisuallyHidden;
