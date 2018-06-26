import React from "react";

// External Deps
import PropTypes from "prop-types";

import Radium from "radium";
import { connect } from "react-redux";

// Actions
import { onInstrumentChange, onMasterVolumeChange } from "actionCreators";

// Components
import AppTitle from "components/appTitle";
import MasterVolumeKnob from "components/masterVolumeKnob";
import InstrumentColumn, { EMPTY_CONTROL } from "components/instrumentColumn";

// Theme
import { grey } from "theme/variables";

// Constants
import {
  ACCENT,
  BASS_DRUM,
  SNARE_DRUM,
  LOW_CONGA_LOW_TOM,
  MID_CONGA_MID_TOM,
  HI_CONGA_HI_TOM,
  CLAVES_RIMSHOT,
  MARACAS_HANDCLAP,
  COWBELL,
  CYMBAL,
  OPEN_HIHAT,
  CLSD_HIHAT,
} from "store-constants";

class TopRightSection extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    seperatorWidth: PropTypes.number.isRequired,
  };

  static instrumentConfig = [
    {
      type: ACCENT,
      labels: [["*A", "*C", "CENT"]],
      controls: [],
    },
    {
      type: BASS_DRUM,
      labels: [["*B", "ASS ", "*D", "RUM"]],
      controls: ["tone", "decay"],
    },
    {
      type: SNARE_DRUM,
      labels: [["*S", "NARE ", "*D", "RUM"]],
      controls: ["tone", "snappy"],
    },
    {
      type: LOW_CONGA_LOW_TOM,
      labels: [["*L", "OW ", "*C", "ONGA"], ["*L", "OW ", "*T", "OM"]],
      controls: ["tuning"],
    },
    {
      type: MID_CONGA_MID_TOM,
      labels: [["*M", "ID ", "*C", "ONGA"], ["*M", "ID ", "*T", "OM"]],
      controls: ["tuning"],
    },
    {
      type: HI_CONGA_HI_TOM,
      labels: [["*H", "I ", "*C", "ONGA"], ["*H", "I ", "*T", "OM"]],
      controls: ["tuning"],
    },
    {
      type: CLAVES_RIMSHOT,
      labels: [["*C", "*L", "AVES"], ["*R", "IM ", "*S", "HOT"]],
      controls: [],
    },
    {
      type: MARACAS_HANDCLAP,
      labels: [["*M", "*A", "RACAS"], ["HAND ", "*C", "LA", "*P"]],
      controls: [],
    },
    {
      type: COWBELL,
      labels: [["*C", "OW ", "*B", "ELL"]],
      controls: [],
    },
    {
      type: CYMBAL,
      labels: [["*C", "*Y", "MBAL"]],
      controls: ["tone", "decay"],
    },
    {
      type: OPEN_HIHAT,
      labels: [["*O", "PEN ", "*H", "IHAT"]],
      controls: [EMPTY_CONTROL, "decay"],
    },
    {
      type: CLSD_HIHAT,
      labels: [["*C", "LS'D ", "*H", "IHAT"]],
      controls: [],
    },
  ];

  static generateInstrumentColumns(
    seperatorWidth,
    instrumentColumnWidth,
    instrumentColumnHeight
  ) {
    const instrumentSeperatorHeight = instrumentColumnHeight - 10;

    const seperatorStyle = {
      width: seperatorWidth,
      height: instrumentSeperatorHeight,
      backgroundColor: grey,
    };

    return TopRightSection.instrumentConfig.reduce(
      (components, config, index) => {
        if (index !== 0)
          components.push(
            <div key={`separator-${index}`} style={seperatorStyle} />
          );

        const mapStateToProps = state => {
          return {
            controlState: state.instrumentState[config.type],
          };
        };

        const mapDispatchToProps = dispatch => ({
          onChange: (type, controlName, value) => {
            dispatch(onInstrumentChange(type, controlName, value));
          },
        });

        const ConnectedInstrumentColumn = connect(
          mapStateToProps,
          mapDispatchToProps
        )(InstrumentColumn);

        components.push(
          <ConnectedInstrumentColumn
            key={`column-${index}`}
            config={config}
            width={instrumentColumnWidth}
            height={instrumentColumnHeight}
          />
        );
        return components;
      },
      []
    );
  }

  static connectedMasterVolumeKnob() {
    const mapStateToProps = state => ({
      value: state.masterVolume,
    });

    const mapDispatchToProps = dispatch => ({
      onChange: value => dispatch(onMasterVolumeChange(value)),
    });

    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(MasterVolumeKnob);
  }

  render() {
    const { width, height, seperatorWidth } = this.props;

    // Component Dimensions
    const numInstruments = 12;
    const titleWidth = Math.ceil(width * 0.85);
    const instrumentsHeight = Math.ceil(height * 0.7);
    const titleSectionHeight = height - instrumentsHeight;
    const masterVolumeKnobSize = Math.floor(titleSectionHeight * 0.86);
    const instrumentSeperatorHeight = instrumentsHeight - 10;
    const instrumentColumnWidth = Math.floor(
      width / numInstruments - seperatorWidth / numInstruments
    );

    const styles = {
      wrapper: {
        width,
        height,
        display: "flex",
        flexDirection: "column",
      },

      instrumentsWrapper: {
        width: width,
        height: instrumentsHeight,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },

      titleWrapper: {
        width: width,
        height: titleSectionHeight,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },

      masterVolumeWrapper: {
        height: titleSectionHeight,
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },

      instrumentSeperator: {
        width: seperatorWidth,
        height: instrumentSeperatorHeight,
        backgroundColor: grey,
      },
    };

    const ConnectedMasterVolumeKnob = TopRightSection.connectedMasterVolumeKnob();

    return (
      <div style={styles.wrapper}>
        <div style={styles.instrumentsWrapper}>
          {TopRightSection.generateInstrumentColumns(
            seperatorWidth,
            instrumentColumnWidth,
            instrumentsHeight
          )}
        </div>
        <div style={styles.titleWrapper}>
          <AppTitle width={titleWidth} height={titleSectionHeight} />
          <div style={styles.masterVolumeWrapper}>
            <ConnectedMasterVolumeKnob size={masterVolumeKnobSize} />
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(TopRightSection);
