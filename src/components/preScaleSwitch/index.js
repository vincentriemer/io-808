import React from "react";
import * as stylex from "@stylexjs/stylex";

import Switch from "components/switch";

import { themeStyles } from "theme/styles";
import { tokens } from "theme/variables.stylex";

const noOp = () => {};

const borderRadius = 2;

const styles = stylex.create({
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    marginBottom: 5
  },
  switchWrapper: {
    position: "relative"
  },
  labelWrapper: {
    position: "absolute",
    height: "80%",
    top: "50%",
    right: -15,
    transform: "translateY(-50%)",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  inner: {
    width: 14,
    height: 21,
    backgroundColor: tokens.drumSwitchHandle,
    borderRadius: borderRadius
  },
  outer: {
    width: 22,
    height: 80,
    padding: 4,
    backgroundColor: tokens.slightlyDarkerBlack,
    borderRadius: borderRadius
  },
  position0: {
    transform: "translateY(0px)"
  },
  position1: {
    transform: "translateY(17px)"
  },
  position2: {
    transform: "translateY(34px)"
  },
  position3: {
    transform: "translateY(51px)"
  }
});

const positionXstyles = [
  styles.position0,
  styles.position1,
  styles.position2,
  styles.position3
];

const switchValues = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4"
};

const PreScaleSwitch = props => {
  const { xstyle, position } = props;
  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(themeStyles.labelGreyNormal, styles.title)}>
        PRE-SCALE
      </div>
      <div {...stylex.props(styles.switchWrapper)}>
        <div {...stylex.props(styles.labelWrapper)}>
          <div {...stylex.props(themeStyles.labelGreySmall)}>1</div>
          <div {...stylex.props(themeStyles.labelGreySmall)}>2</div>
          <div {...stylex.props(themeStyles.labelGreySmall)}>3</div>
          <div {...stylex.props(themeStyles.labelGreySmall)}>4</div>
        </div>
        <Switch
          name="pre-scale"
          onChange={noOp}
          position={position}
          disabled={true}
          direction="vertical"
          values={switchValues}
          outerXstyle={styles.outer}
          handleXstyle={styles.inner}
          positionXstyles={positionXstyles}
        />
      </div>
    </div>
  );
};

export default PreScaleSwitch;
