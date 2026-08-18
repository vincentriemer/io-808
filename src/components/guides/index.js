import React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  guide: {
    position: "absolute",
    top: "50%",
    left: "50%"
  },
  wrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none"
  },
  rotate75: {
    transform: "rotate(-75deg)"
  },
  rotate7043478260869566: {
    transform: "rotate(-70.43478260869566deg)"
  },
  rotate225: {
    transform: "rotate(-22.5deg)"
  },
  rotate0: {
    transform: "rotate(0deg)"
  }
});

const dynamicStyles = stylex.create({
  guideTransform: transform => ({ transform })
});

const wrapperRotationStyles = {
  0: styles.rotate0,
  1: styles.rotate0,
  6: styles.rotate75,
  5.5: styles.rotate7043478260869566,
  7: styles.rotate225
};

const Guides = React.memo(
  props => {
    let {
      num,
      distance,
      hideCount = 0,
      guideStyle = null,
      rotate = true,
      values,
      offset
    } = props;

    let useValues = false;
    if (values != null && values.length !== 0) {
      num = values.length;
      useValues = true;
    }

    let guides = [];
    let angleCounter = 360 / (num + hideCount);
    let currentAngle = 180 + hideCount * angleCounter;

    if (offset) currentAngle += offset;

    const hideCountAdjust = hideCount > 1 ? hideCount - 1 : 0;
    const hideCompensation = (angleCounter * hideCountAdjust) / 2;

    for (let i = 0; i < num; i++) {
      let value = null;
      if (useValues) value = values[i];

      let transform = `translateX(-50%) translateY(-50%) rotate(${currentAngle}deg) translateY(-${distance}px)`;
      if (rotate === false)
        transform += ` rotate(-${currentAngle - hideCompensation}deg)`;

      guides.push(
        <div
          {...stylex.props(
            guideStyle,
            styles.guide,
            dynamicStyles.guideTransform(transform)
          )}
          key={i}
        >
          {value}
        </div>
      );

      currentAngle += angleCounter;
    }
    return (
      <div {...stylex.props(styles.wrapper, wrapperRotationStyles[hideCount])}>
        {guides}
      </div>
    );
  },
  // This is a static component so it should never need to update
  () => true
);

export default Guides;
