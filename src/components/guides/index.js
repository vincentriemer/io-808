import React from "react";

const baseGuideStyle = {
  cursor: "default",
  position: "absolute",
  top: "50%",
  left: "50%"
};

const baseWrapperStyle = {
  position: "absolute",
  width: "100%",
  height: "100%"
};

const Guides = React.memo(
  props => {
    let {
      num,
      distance,
      hideCount = 0,
      guideStyle = {},
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
          style={{
            ...guideStyle,
            ...baseGuideStyle,
            transform
          }}
          key={i}
        >
          {value}
        </div>
      );

      currentAngle += angleCounter;
    }
    return (
      <div
        style={{
          ...baseWrapperStyle,
          transform: `rotate(-${hideCompensation}deg)`
        }}
      >
        {guides}
      </div>
    );
  },
  // This is a static component so it should never need to update
  () => true
);

export default Guides;
