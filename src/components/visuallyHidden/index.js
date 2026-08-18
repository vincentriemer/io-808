import * as React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    borderWidth: 0,
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    pointerEvents: "none",
    position: "absolute",
    width: "1px",
    whiteSpace: "nowrap",
    wordWrap: "normal"
  }
});

function VisuallyHidden(props) {
  return (
    <span role={props.role} {...stylex.props(styles.root)}>
      {props.children}
    </span>
  );
}

export default VisuallyHidden;
