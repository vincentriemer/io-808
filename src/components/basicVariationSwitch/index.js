import React from "react";
import * as stylex from "@stylexjs/stylex";

import Light from "components/light";
import Switch from "components/switch";

import { themeStyles } from "theme/styles";
import { tokens } from "theme/variables.stylex";

import { A_VARIATION, B_VARIATION, BOTH_VARIATIONS } from "store-constants";

const switchValues = {
  A: A_VARIATION,
  AB: BOTH_VARIATIONS,
  B: B_VARIATION
};

const thickness = 30;
const length = 80;

const styles = stylex.create({
  wrapper: {
    minWidth: length * 1.8,
    height: 110,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switchWrapper: {
    width: length,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  labelWrapper: {
    width: length - 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    borderRadius: 1
  },
  lightsWrapper: {
    width: length,
    height: thickness - 3,
    backgroundColor: tokens.darkBlack,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    borderRadius: 2
  },
  switchOuter: {
    width: 80,
    height: 30,
    padding: 4,
    backgroundColor: tokens.darkBlack,
    borderRadius: thickness * 0.475
  },
  switchInner: {
    width: 22,
    height: 22,
    backgroundColor: tokens.silver,
    borderRadius: "50%",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: tokens.grey
  },
  position0: {
    transform: "translateX(0px)"
  },
  position1: {
    transform: "translateX(25px)"
  },
  position2: {
    transform: "translateX(50px)"
  }
});

const positionXstyles = [styles.position0, styles.position1, styles.position2];

const BasicVariationSwitch = props => {
  const { onChange, position, lightState } = props;
  let aActive = false,
    bActive = false;
  switch (lightState) {
    case A_VARIATION:
      aActive = true;
      break;
    case BOTH_VARIATIONS:
      aActive = true;
      bActive = true;
      break;
    case B_VARIATION:
      bActive = true;
      break;
  }

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(themeStyles.labelDarkGrey)}>BASIC VARIATION</div>
      <div {...stylex.props(styles.switchWrapper)}>
        <Switch
          name="Basic Variation"
          position={position}
          onChange={onChange}
          direction="horizontal"
          values={switchValues}
          outerXstyle={styles.switchOuter}
          handleXstyle={styles.switchInner}
          positionXstyles={positionXstyles}
        />
        <div {...stylex.props(styles.labelWrapper)}>
          <div {...stylex.props(themeStyles.labelDarkGrey)}>A</div>
          <div {...stylex.props(themeStyles.labelDarkGrey)}>AB</div>
          <div {...stylex.props(themeStyles.labelDarkGrey)}>B</div>
        </div>
      </div>
      <div {...stylex.props(styles.lightsWrapper)}>
        <Light active={aActive} />
        <Light active={bActive} />
      </div>
    </div>
  );
};

export default BasicVariationSwitch;
