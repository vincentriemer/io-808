import React from "react";

import Light from "components/light";

import { labelGreyNormal } from "theme/mixins";

import { FIRST_PART, SECOND_PART } from "store-constants";

const styles = {
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7
  },
  partWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  label: {
    ...labelGreyNormal,
    marginTop: 4,
    width: 60
  }
};

const PartLights = props => {
  const { currentPart, width, height, offset } = props;
  const firstActive = currentPart === FIRST_PART;
  const secondActive = currentPart === SECOND_PART;
  return (
    <div style={{ ...styles.wrapper, right: offset, width, height }}>
      <div style={styles.partWrapper}>
        <Light active={firstActive} />
        <div style={styles.label}>1st PART</div>
      </div>
      <div style={styles.partWrapper}>
        <Light active={secondActive} />
        <div style={styles.label}>2nd PART</div>
      </div>
    </div>
  );
};

export default PartLights;
