// External Deps
import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { GatewayProvider, GatewayDest } from 'react-gateway';

// Actions
import { instrumentChange } from '../../actionCreators';

// Theme
import {darkGrey, grey} from '../../theme/variables';

// Components
import InstrumentLabel from '../../components/instrumentLabel';
import DrumSwitch from '../../components/drumSwitch/drumSwitch';
import DrumKnob, { LABEL_HEIGHT } from '../../components/drumKnob/drumKnob';
import InstrumentColumn, {EMPTY_CONTROL} from '../../components/instrumentColumn';

// Constants
import { ACCENT, BASS_DRUM, SNARE_DRUM, LOW_CONGA_LOW_TOM, MID_CONGA_MID_TOM,
  HI_CONGA_HI_TOM, CLAVES_RIMSHOT, MARACAS_HANDCLAP, COWBELL, CYMBAL,
  OPEN_HIHAT, CLSD_HIHAT } from '../../constants';

const APP_WIDTH = 1400;
const APP_HEIGHT = 800;

const TOP_BOTTOM_DIVIDER_HEIGHT = 3;
const TOP_HEIGHT = (APP_HEIGHT * 0.64) - (TOP_BOTTOM_DIVIDER_HEIGHT * 2);
const BOTTOM_HEIGHT = (APP_HEIGHT * 0.35) - (TOP_BOTTOM_DIVIDER_HEIGHT * 2);

const INSTRUMENTS_HEIGHT = TOP_HEIGHT * 0.70;

const NUM_INSTRUMENTS = 12;
const INSTRUMENT_SEPERATOR_WIDTH = 1;

const TOP_LEFT_WIDTH = (APP_WIDTH * 0.22) - INSTRUMENT_SEPERATOR_WIDTH;
const TOP_RIGHT_WIDTH = (APP_WIDTH * 0.78) - INSTRUMENT_SEPERATOR_WIDTH;

const TOP_HORIZONTAL_SEPERATOR_HEIGHT = TOP_HEIGHT - 10;
const INSTRUMENT_SEPERATOR_HEIGHT = INSTRUMENTS_HEIGHT - 10;
const INSTRUMENT_COLUMN_WIDTH = (TOP_RIGHT_WIDTH / NUM_INSTRUMENTS) -
  (INSTRUMENT_SEPERATOR_WIDTH / NUM_INSTRUMENTS);
const DRUM_KNOB_SIZE = INSTRUMENT_COLUMN_WIDTH * 0.72;

const TITLE_HEIGHT = TOP_HEIGHT * 0.25;

@Radium
class App extends React.Component {
  static instrumentConfig = [
    {
      type: ACCENT,
      labels: [['*A','*C','CENT']],
      controls: []
    },
    {
      type: BASS_DRUM,
      labels: [['*B','ASS ','*D','RUM']],
      controls: ['tone', 'decay']
    },
    {
      type: SNARE_DRUM,
      labels: [['*S','NARE ','*D','RUM']],
      controls: ['tone', 'snappy']
    },
    {
      type: LOW_CONGA_LOW_TOM,
      labels: [['*L','OW ','*C','ONGA'], ['*L','OW ','*T','OM']],
      controls: ['tuning']
    },
    {
      type: MID_CONGA_MID_TOM,
      labels: [['*M','ID ','*C','ONGA'], ['*M','ID ','*T','OM']],
      controls: ['tuning']
    },
    {
      type: HI_CONGA_HI_TOM,
      labels: [['*H','I ','*C','ONGA'], ['*H','I ','*T','OM']],
      controls: ['tuning']
    },
    {
      type: CLAVES_RIMSHOT,
      labels: [['*C','*L','AVES'], ['*R','IM ','*S','HOT']],
      controls: []
    },
    {
      type: MARACAS_HANDCLAP,
      labels: [['*M','*A','RACAS'], ['HAND ','*C','LA','*P']],
      controls: []
    },
    {
      type: COWBELL,
      labels: [['*C','OW ','*B','ELL']],
      controls: []
    },
    {
      type: CYMBAL,
      labels: [['*C','*Y','MBAL']],
      controls: ['tone', 'decay']
    },
    {
      type: OPEN_HIHAT,
      labels: [['*O','PEN ','*H','IHAT']],
      controls: [EMPTY_CONTROL, 'decay']
    },
    {
      type: CLSD_HIHAT,
      labels: [['*C','LS\'D ','*H','IHAT']],
      controls: []
    }
  ]

  static generateColumns() {
    const seperatorStyle = {
      width: INSTRUMENT_SEPERATOR_WIDTH, height: INSTRUMENT_SEPERATOR_HEIGHT,
      backgroundColor: grey
    };

    return this.instrumentConfig.reduce((components, config, index) => {
      if (index !== 0)
        components.push(<div key={`separator-${index}`} style={seperatorStyle}></div>);

      const mapStateToProps = (state) => {
        return {
          controlState: state.instrumentState[config.type]
        };
      };

      const mapDispatchToProps = (dispatch) => ({
        onChange: (type, controlName, value) => {
          dispatch(instrumentChange(type, controlName, value));
        }
      });

      const ConnectedInstrumentColumn = connect(
        mapStateToProps,
        mapDispatchToProps,
      )(InstrumentColumn);

      components.push(
        <ConnectedInstrumentColumn
          key={`column-${index}`}
          config={config}
          width={INSTRUMENT_COLUMN_WIDTH} height={INSTRUMENTS_HEIGHT} />
      );
      return components;
    }, []);
  }

  render() {
    const styles = {
      background: {
        width: '100%', height: '100%',
        backgroundColor: darkGrey
      },

      wrapper: {
        width: '100%', height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },

      appWrapper: {
        width: APP_WIDTH, height: APP_HEIGHT,
        display: 'flex',
        flexDirection: 'column'
      },

      topBottomDivider: {
        width: APP_WIDTH, height: TOP_BOTTOM_DIVIDER_HEIGHT,
        backgroundColor: grey
      },

      topHorizontalDivider: {
        width: INSTRUMENT_SEPERATOR_WIDTH, height: TOP_HORIZONTAL_SEPERATOR_HEIGHT,
        backgroundColor: grey
      },

      topWrapper: {
        width: APP_WIDTH, height: TOP_HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },

      bottomWrapper: {
        width: APP_WIDTH, height: BOTTOM_HEIGHT
      },

      topLeftWrapper: {
        width: TOP_LEFT_WIDTH, height: TOP_HEIGHT
      },

      topRightWrapper: {
        width: TOP_RIGHT_WIDTH, height: TOP_HEIGHT,
        display: 'flex',
        flexDirection: 'column'
      },

      instrumentsWrapper: {
        width: TOP_RIGHT_WIDTH, height: INSTRUMENTS_HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },

      instrumentSeperator: {
        width: INSTRUMENT_SEPERATOR_WIDTH, height: INSTRUMENT_SEPERATOR_HEIGHT,
        backgroundColor: grey
      }
    }

    return (
      <GatewayProvider>
        <div style={styles.background}>
          <GatewayDest name="knobOverlay" />
          <div style={styles.wrapper}>
            <div style={styles.appWrapper}>
            <div style={styles.topBottomDivider}></div>
              <div style={styles.topWrapper}>
                <div style={styles.topLeftWrapper}></div>
                <div style={styles.topHorizontalDivider}></div>
                <div style={styles.topRightWrapper}>
                  <div style={styles.instrumentsWrapper}>
                    {App.generateColumns()}
                  </div>
                </div>
                <div style={styles.topHorizontalDivider}></div>
              </div>
              <div style={styles.topBottomDivider}></div>
              <div style={styles.bottomWrapper}>
              </div>
            </div>
          </div>
        </div>
      </GatewayProvider>
    );
  }
}

export default App;