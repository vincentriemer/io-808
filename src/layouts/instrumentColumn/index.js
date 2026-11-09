import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 4
  },
  knobsWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  controlSpacing: {
    marginBottom: 5
  },
  labelWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  labelSpacing: {
    marginTop: 8
  }
});

const InstrumentColumn = props => {
  const { labels, children, xstyle } = props;

  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.knobsWrapper)}>
        {React.Children.map(children, (child, index) => (
          <div key={index} {...stylex.props(styles.controlSpacing)}>
            {child}
          </div>
        ))}
      </div>
      <div {...stylex.props(styles.labelWrapper)}>
        {labels.map((label, index) => (
          <div key={index} {...stylex.props(styles.labelSpacing)}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstrumentColumn;
