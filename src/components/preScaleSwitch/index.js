import React from "react";

import Switch from "components/switch";

import { drumSwitchHandle, slightlyDarkerBlack } from "theme/variables";
import { labelGreyNormal, labelGreySmall } from "theme/mixins";

const noOp = () => {};

const borderRadius = 2;

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    ...labelGreyNormal
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
  label: labelGreySmall,
  inner: {
    backgroundColor: drumSwitchHandle,
    borderRadius: borderRadius
  },
  outer: {
    backgroundColor: slightlyDarkerBlack,
    borderRadius: borderRadius
  }
};

const switchValues = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4"
};

const PreScaleSwitch = props => {
  const { offset = 0, position } = props;
  const titlePadding = 5;
  return (
    <div style={{ ...styles.wrapper, right: offset }}>
      <div style={{ ...styles.title, marginBottom: titlePadding }}>
        PRE-SCALE
      </div>
      <div style={styles.switchWrapper}>
        <div style={styles.labelWrapper}>
          <div style={styles.label}>1</div>
          <div style={styles.label}>2</div>
          <div style={styles.label}>3</div>
          <div style={styles.label}>4</div>
        </div>
        <Switch
          name="pre-scale"
          onChange={noOp}
          position={position}
          disabled={true}
          direction="vertical"
          values={switchValues}
          thickness={22}
          length={80}
          padding={4}
          innerThickness={21}
          outerStyle={styles.outer}
          innerStyle={styles.inner}
        />
      </div>
    </div>
  );
};

export default PreScaleSwitch;
