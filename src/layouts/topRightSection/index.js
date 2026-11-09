import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as stylex from "@stylexjs/stylex";

// Actions
import { onInstrumentChange, onMasterVolumeChange } from "actionCreators";

// Components
import AppTitle from "components/appTitle";
import MasterVolumeKnob from "components/masterVolumeKnob";
import InstrumentColumn, { EMPTY_CONTROL } from "components/instrumentColumn";

// Theme
import { tokens } from "theme/variables.stylex";

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

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column"
  },
  instrumentsWrapper: {
    width: 1079,
    height: 355,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  titleWrapper: {
    width: 1079,
    height: 151,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  appTitle: {
    width: 918,
    height: 151
  },
  masterVolumeWrapper: {
    height: 151,
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  masterVolumeKnob: {
    width: 129,
    height: 138
  },
  instrumentColumn: {
    width: 89,
    height: 355
  },
  instrumentSeparator: {
    width: 1,
    height: 345,
    backgroundColor: tokens.grey
  }
});

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

function generateInstrumentColumns() {
  return instrumentConfig.reduce((components, config, index) => {
    const result = [...components];

    if (index !== 0) {
      result.push(
        <div
          key={`separator-${index}`}
          {...stylex.props(styles.instrumentSeparator)}
        />
      );
    }
    result.push(
      <ConnectedInstrumentColumn
        key={`column-${index}`}
        config={config}
        xstyle={styles.instrumentColumn}
      />
    );

    return result;
  }, []);
}

function TopRightSection(props) {
  const { xstyle } = props;

  return (
    <div {...stylex.props(styles.wrapper, xstyle)}>
      <div {...stylex.props(styles.instrumentsWrapper)}>
        {generateInstrumentColumns()}
      </div>
      <div {...stylex.props(styles.titleWrapper)}>
        <AppTitle xstyle={styles.appTitle} />
        <div {...stylex.props(styles.masterVolumeWrapper)}>
          <ConnectedMasterVolumeKnob xstyle={styles.masterVolumeKnob} />
        </div>
      </div>
    </div>
  );
}

export default TopRightSection;
