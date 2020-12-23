import React from "react";

import Light from "components/light";
import Switch from "components/switch";

import { grey, darkBlack, silver } from "theme/variables";
import { labelDarkGrey } from "theme/mixins";

import { A_VARIATION, B_VARIATION, BOTH_VARIATIONS } from "store-constants";

const switchValues = {
  A: A_VARIATION,
  AB: BOTH_VARIATIONS,
  B: B_VARIATION
};

const styles = {
  wrapper: {
    height: 110,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switchTitle: labelDarkGrey,
  label: labelDarkGrey,
  switchWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  labelWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    borderRadius: 1
  },
  lightsWrapper: {
    backgroundColor: darkBlack,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    borderRadius: 2
  },
  switchOuter: {
    backgroundColor: darkBlack
  },
  switchInner: {
    backgroundColor: silver,
    borderRadius: "50%",
    border: `solid ${grey} 2px`
  }
};

const BasicVariationSwitch = props => {
  const { onChange, position, lightState } = props;
  const thickness = 30;
  const length = 80;

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
    <div style={{ ...styles.wrapper, minWidth: length * 1.8 }}>
      <div style={styles.switchTitle}>BASIC VARIATION</div>
      <div style={{ ...styles.switchWrapper, width: length }}>
        <Switch
          name="Basic Variation"
          position={position}
          onChange={onChange}
          direction="horizontal"
          values={switchValues}
          thickness={thickness}
          length={length}
          padding={4}
          innerThickness={thickness - 8}
          outerStyle={{
            ...styles.switchOuter,
            borderRadius: thickness * 0.475
          }}
          innerStyle={styles.switchInner}
        />
        <div style={{ ...styles.labelWrapper, width: length - 15 }}>
          <div style={styles.label}>A</div>
          <div style={styles.label}>AB</div>
          <div style={styles.label}>B</div>
        </div>
      </div>
      <div
        style={{
          ...styles.lightsWrapper,
          width: length,
          height: thickness - 3
        }}
      >
        <Light active={aActive} />
        <Light active={bActive} />
      </div>
    </div>
  );
};

export default BasicVariationSwitch;
