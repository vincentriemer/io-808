// External Deps
import React from 'react';
import Radium from 'radium';
import { GatewayProvider, GatewayDest } from 'react-gateway';

// Theme
import { grey, slightlyDarkerBlack } from 'theme/variables';
import { labelGreyLarge } from 'theme/mixins';

// Sub-layouts
import TopLeftSection from 'layouts/topLeftSection';
import TopRightSection from 'layouts/topRightSection';
import BottomSection from 'layouts/bottomSection';

// Components
import Octicon from 'react-octicon';
import { ConnectedSaveButton, ConnectedLoadButton } from './connectedComponents';

const GithubLink = Radium(() => (
  <a style={{
    color: slightlyDarkerBlack,
    opacity: 0.5,
    transition: 'opacity 0.2s',
    ':hover': {
      opacity: 1.0
    }
  }} href="https://github.com/vincentriemer/io-808" target="_blank" title="Github Repo">
    <Octicon name="mark-github" mega/>
  </a>
));

// layout constants
const APP_WIDTH = 1400;
const APP_HEIGHT = 800;
const APP_PADDING = 40;

const HEADER_HEIGHT = 50;
const FOOTER_HEIGHT = 40;

const TOP_BOTTOM_DIVIDER_HEIGHT = 3;
const TOP_HEIGHT = Math.ceil(APP_HEIGHT * 0.64) - (TOP_BOTTOM_DIVIDER_HEIGHT * 2);
const BOTTOM_HEIGHT = APP_HEIGHT - TOP_HEIGHT - (TOP_BOTTOM_DIVIDER_HEIGHT * 2);

const INSTRUMENT_SEPERATOR_WIDTH = 1;

const TOP_LEFT_WIDTH = Math.ceil(APP_WIDTH * 0.23) - INSTRUMENT_SEPERATOR_WIDTH;
const TOP_RIGHT_WIDTH = APP_WIDTH - TOP_LEFT_WIDTH ;

const TOP_HORIZONTAL_SEPERATOR_HEIGHT = TOP_HEIGHT - 10;

@Radium
class AppLayout extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const styles = {
      pageWrapper: {
        position: 'relative',
        width: '100%', height: '100%',
        minWidth: APP_WIDTH + APP_PADDING, minHeight: APP_HEIGHT + HEADER_HEIGHT + FOOTER_HEIGHT + APP_PADDING
      },

      wrapper: {
        position: 'absolute',
        width: APP_WIDTH, height: APP_HEIGHT + HEADER_HEIGHT + FOOTER_HEIGHT,
        top: 0, left: 0, right: 0, bottom: 0,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },

      headerWrapper: {
        width: APP_WIDTH, height: HEADER_HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },

      saveLoadClearWrapper: {
        display: 'flex',
        flexDirection: 'row'
      },

      footerWrapper: {
        width: APP_WIDTH, height: FOOTER_HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
      }
    };

    return (
      <GatewayProvider>
        <div style={styles.pageWrapper}>
          <GatewayDest name="knobOverlay" />
          <div style={styles.wrapper}>
            <div style={styles.headerWrapper}>
              <div style={styles.saveLoadClearWrapper}>
                <ConnectedLoadButton size={35} />
                <ConnectedSaveButton size={35} />
              </div>
              <GithubLink />
            </div>
            <div style={styles.appWrapper}>
              <div style={styles.topBottomDivider}></div>
              <div style={styles.topWrapper}>
                <TopLeftSection width={TOP_LEFT_WIDTH} height={TOP_HEIGHT} />
                <div style={styles.topHorizontalDivider}></div>
                <TopRightSection width={TOP_RIGHT_WIDTH} height={TOP_HEIGHT}
                                 seperatorWidth={INSTRUMENT_SEPERATOR_WIDTH} />
                <div style={styles.topHorizontalDivider}></div>
              </div>
              <div style={styles.topBottomDivider}></div>
              <div style={styles.bottomWrapper}>
                <BottomSection width={APP_WIDTH} height={BOTTOM_HEIGHT} topLeftWidth={TOP_LEFT_WIDTH} />
              </div>
            </div>
            <div style={styles.footerWrapper}>
              <div style={labelGreyLarge}>
                Made with <Octicon name="heart" /> by <a style={{ color: grey }} href="http://vincentriemer.com" target="_blank">
                  Vincent Riemer
                </a>
              </div>
              <a style={labelGreyLarge} href="https://github.com/vincentriemer/io-808/issues" target="_blank">Submit an Issue</a>
            </div>
          </div>
        </div>
      </GatewayProvider>
    );
  }
}

export default AppLayout;