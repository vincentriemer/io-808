import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

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
  CLSD_HIHAT
} from "store-constants";

const instrumentConfig = [
  {
    type: ACCENT,
    labels: [["*A", "*C", "CENT"]],
    controls: []
  },
  {
    type: BASS_DRUM,
    labels: [["*B", "ASS ", "*D", "RUM"]],
    controls: ["tone", "decay"]
  },
  {
    type: SNARE_DRUM,
    labels: [["*S", "NARE ", "*D", "RUM"]],
    controls: ["tone", "snappy"]
  },
  {
    type: LOW_CONGA_LOW_TOM,
    labels: [["*L", "OW ", "*C", "ONGA"], ["*L", "OW ", "*T", "OM"]],
    switchConfig: {
      name: "Low Conga/Tom",
      values: {
        "Low Conga": "0",
        "Low Tom": "1"
      }
    },
    controls: ["tuning"]
  },
  {
    type: MID_CONGA_MID_TOM,
    labels: [["*M", "ID ", "*C", "ONGA"], ["*M", "ID ", "*T", "OM"]],
    switchConfig: {
      name: "Mid Conga/Tom",
      values: {
        "Mid Conga": "0",
        "Mid Tom": "1"
      }
    },
    controls: ["tuning"]
  },
  {
    type: HI_CONGA_HI_TOM,
    labels: [["*H", "I ", "*C", "ONGA"], ["*H", "I ", "*T", "OM"]],
    switchConfig: {
      name: "Hi Conga/Tom",
      values: {
        "Hi Conga": "0",
        "Hi Tom": "1"
      }
    },
    controls: ["tuning"]
  },
  {
    type: CLAVES_RIMSHOT,
    labels: [["*C", "*L", "AVES"], ["*R", "IM ", "*S", "HOT"]],
    switchConfig: {
      name: "Claves/Rimshot",
      values: {
        Claves: "0",
        Rimshot: "1"
      }
    },
    controls: []
  },
  {
    type: MARACAS_HANDCLAP,
    labels: [["*M", "*A", "RACAS"], ["HAND ", "*C", "LA", "*P"]],
    switchConfig: {
      name: "Maracas/Handclap",
      values: {
        Maracas: "0",
        Handclap: "1"
      }
    },
    controls: []
  },
  {
    type: COWBELL,
    labels: [["*C", "OW ", "*B", "ELL"]],
    controls: []
  },
  {
    type: CYMBAL,
    labels: [["*C", "*Y", "MBAL"]],
    controls: ["tone", "decay"]
  },
  {
    type: OPEN_HIHAT,
    labels: [["*O", "PEN ", "*H", "IHAT"]],
    controls: [EMPTY_CONTROL, "decay"]
  },
  {
    type: CLSD_HIHAT,
    labels: [["*C", "LS'D ", "*H", "IHAT"]],
    controls: []
  }
];

function ConnectedInstrumentColumn(props) {
  const { config } = props;

  const controlState = useSelector(state => state.instrumentState[config.type]);

  const dispatch = useDispatch();
  const onChange = React.useCallback(
    (type, controlName, value) => {
      dispatch(onInstrumentChange(type, controlName, value));
    },
    [dispatch]
  );

  return (
    <InstrumentColumn
      {...props}
      controlState={controlState}
      onChange={onChange}
    />
  );
}

function ConnectedMasterVolumeKnob(props) {
  const value = useSelector(state => state.masterVolume);

  const dispatch = useDispatch();
  const onChange = React.useCallback(
    value => {
      dispatch(onMasterVolumeChange(value));
    },
    [dispatch]
  );

  return <MasterVolumeKnob {...props} value={value} onChange={onChange} />;
}

function generateInstrumentColumns(
  seperatorWidth,
  instrumentColumnWidth,
  instrumentColumnHeight
) {
  const instrumentSeperatorHeight = instrumentColumnHeight - 10;

  const seperatorStyle = {
    width: seperatorWidth,
    height: instrumentSeperatorHeight,
    backgroundColor: grey
  };

  return instrumentConfig.reduce((components, config, index) => {
    const result = [...components];

    if (index !== 0) {
      result.push(<div key={`separator-${index}`} style={seperatorStyle} />);
    }
    result.push(
      <ConnectedInstrumentColumn
        key={`column-${index}`}
        config={config}
        width={instrumentColumnWidth}
        height={instrumentColumnHeight}
      />
    );

    return result;
  }, []);
}

function TopRightSection(props) {
  const { width, height, seperatorWidth } = props;

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
      flexDirection: "column"
    },

    instrumentsWrapper: {
      width: width,
      height: instrumentsHeight,
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },

    titleWrapper: {
      width: width,
      height: titleSectionHeight,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },

    masterVolumeWrapper: {
      height: titleSectionHeight,
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },

    instrumentSeperator: {
      width: seperatorWidth,
      height: instrumentSeperatorHeight,
      backgroundColor: grey
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.instrumentsWrapper}>
        {generateInstrumentColumns(
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

export default TopRightSection;
