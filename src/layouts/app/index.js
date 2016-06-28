// External Deps
import React from 'react';
import Radium from 'radium';
import { GatewayProvider, GatewayDest } from 'react-gateway';

// Theme
import {darkGrey, grey} from '../../theme/variables';

// Components
import TopRightSection from '../../layouts/topRightSection';

const APP_WIDTH = 1400;
const APP_HEIGHT = 800;

const TOP_BOTTOM_DIVIDER_HEIGHT = 3;
const TOP_HEIGHT = (APP_HEIGHT * 0.64) - (TOP_BOTTOM_DIVIDER_HEIGHT * 2);
const BOTTOM_HEIGHT = (APP_HEIGHT * 0.35) - (TOP_BOTTOM_DIVIDER_HEIGHT * 2);

const INSTRUMENT_SEPERATOR_WIDTH = 1;

const TOP_LEFT_WIDTH = (APP_WIDTH * 0.22) - INSTRUMENT_SEPERATOR_WIDTH;
const TOP_RIGHT_WIDTH = (APP_WIDTH * 0.78) - INSTRUMENT_SEPERATOR_WIDTH;

const TOP_HORIZONTAL_SEPERATOR_HEIGHT = TOP_HEIGHT - 10;

@Radium
class App extends React.Component {
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
      }
    };

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
                <TopRightSection width={TOP_RIGHT_WIDTH} height={TOP_HEIGHT}
                                 seperatorWidth={INSTRUMENT_SEPERATOR_WIDTH} />
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