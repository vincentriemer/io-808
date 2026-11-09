import React from "react";
import * as stylex from "@stylexjs/stylex";

import Switch from "components/switch";

import { themeStyles } from "theme/styles";
import { tokens } from "theme/variables.stylex";

const thickness = 30;
const length = 65;

const styles = stylex.create({
  wrapper: {
    minWidth: length * 1.8,
    height: 69,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switchTitle: {
    fontFeatureSettings: '"frac" 1, "liga" 1, "kern" 1'
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
    paddingTop: 5
  },
  switchOuter: {
    width: 65,
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
    transform: "translateX(35px)"
  }
});

const positionXstyles = [styles.position0, styles.position1];

const switchValues = {
  A: "A",
  B: "B"
};

const IFVariationSwitch = props => {
  const { onChange, position } = props;
  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(themeStyles.labelDarkGrey, styles.switchTitle)}>
        I / F - VARIATION
      </div>
      <div {...stylex.props(styles.switchWrapper)}>
        <Switch
          name="I/F Variation"
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
          <div {...stylex.props(themeStyles.labelDarkGrey)}>B</div>
        </div>
      </div>
    </div>
  );
};

export default IFVariationSwitch;
