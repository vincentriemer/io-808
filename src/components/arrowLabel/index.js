import React from "react";

import { labelGreyNormal } from "theme/mixins";

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },

  arrowPoint: {
    width: 0,
    height: 0
  },

  arrowShaft: {
    position: "relative",
    transform: "scaleX(1.1)"
  },

  labelWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1
  },

  label: {
    ...labelGreyNormal
  }
};

const ArrowLabel = props => {
  const { label, width, height, textColor, backgroundColor, direction } = props;

  const arrowEndWidth = height;
  const arrowShaftWidth = height / 4;
  const arrowShaftHeight = height / 3;
  const labelWrapperWidth = width - arrowEndWidth - arrowShaftWidth;

  const transparentTriangeSides = `${(arrowEndWidth * 3) /
    8}px solid transparent`;
  const coloredTriangleSide = `${arrowEndWidth / 2}px solid ${backgroundColor}`;

  return (
    <div
      style={{
        ...styles.wrapper,
        width,
        height,
        flexDirection: direction === "left" ? "row-reverse" : "row"
      }}
    >
      <div
        style={{
          ...styles.labelWrapper,
          width: labelWrapperWidth + arrowEndWidth / 2,
          height,
          backgroundColor
        }}
      >
        <div style={{ ...styles.label, color: textColor }}>{label}</div>
      </div>
      <div
        style={{
          ...styles.arrowShaft,
          width: arrowShaftWidth,
          height: arrowShaftHeight,
          backgroundColor
        }}
      />
      <div
        style={{
          ...styles.arrowPoint,
          borderTop: transparentTriangeSides,
          borderBottom: transparentTriangeSides,
          [direction === "left"
            ? "borderRight"
            : "borderLeft"]: coloredTriangleSide
        }}
      />
    </div>
  );
};

export default ArrowLabel;
