import React from "react";
import PropTypes from 'prop-types';
import Radium from "radium";

import Light from "components/light";
import Switch from "components/switch";

import { grey, darkBlack, silver } from "theme/variables";
import { labelDarkGrey } from "theme/mixins";

import { A_VARIATION, B_VARIATION, BOTH_VARIATIONS } from "store-constants";

class BasicVariationSwitch extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    lightState: PropTypes.oneOf([
      null,
      A_VARIATION,
      B_VARIATION,
      BOTH_VARIATIONS
    ]).isRequired
  };

  render() {
    const { onChange, position, lightState } = this.props;

    const thickness = 30;
    const length = 80;

    const styles = {
      wrapper: {
        minWidth: length * 1.8,
        height: 110,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
      },

      switchTitle: labelDarkGrey,

      label: labelDarkGrey,

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
        backgroundColor: darkBlack,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 4,
        borderRadius: 2
      },

      switchOuter: {
        backgroundColor: darkBlack,
        borderRadius: thickness * 0.475
      },

      switchInner: {
        backgroundColor: silver,
        borderRadius: "50%",
        border: `solid ${grey} 2px`
      }
    };

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
      <div style={styles.wrapper}>
        <div style={styles.switchTitle}>BASIC VARIATION</div>
        <div style={styles.switchWrapper}>
          <Switch
            position={position}
            onChange={onChange}
            direction="horizontal"
            numPositions={3}
            thickness={thickness}
            length={length}
            padding={4}
            innerThickness={thickness - 8}
            outerStyle={styles.switchOuter}
            innerStyle={styles.switchInner}
          />
          <div style={styles.labelWrapper}>
            <div style={styles.label}>A</div>
            <div style={styles.label}>AB</div>
            <div style={styles.label}>B</div>
          </div>
        </div>
        <div style={styles.lightsWrapper}>
          <Light active={aActive} />
          <Light active={bActive} />
        </div>
      </div>
    );
  }
}

export default Radium(BasicVariationSwitch);
