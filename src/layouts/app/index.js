// External Deps
import React from "react";
import * as stylex from "@stylexjs/stylex";

// Theme
import { tokens } from "theme/variables.stylex";
import { themeStyles } from "theme/styles";

// Sub-layouts
import TopLeftSection from "layouts/topLeftSection";
import TopRightSection from "layouts/topRightSection";
import BottomSection from "layouts/bottomSection";

// Components
import Octicon from "react-octicon";
import {
  ConnectedSaveButton,
  ConnectedLoadButton,
  ConnectedResetButton
} from "./connectedComponents";

const GithubLink = () => {
  return (
    <a
      {...stylex.props(styles.githubLink)}
      href="https://github.com/vincentriemer/io-808"
      target="_blank"
      rel="noopener noreferrer"
      title="Github Repo"
    >
      <Octicon name="mark-github" mega />
    </a>
  );
};

// layout constants
const APP_WIDTH = 1400;
const APP_HEIGHT = 800;
const APP_PADDING = 40;

const HEADER_HEIGHT = 50;
const FOOTER_HEIGHT = 30;

const TOP_BOTTOM_DIVIDER_HEIGHT = 3;
const TOP_HEIGHT = Math.ceil(APP_HEIGHT * 0.64) - TOP_BOTTOM_DIVIDER_HEIGHT * 2;
const BOTTOM_HEIGHT = APP_HEIGHT - TOP_HEIGHT - TOP_BOTTOM_DIVIDER_HEIGHT * 2;

const INSTRUMENT_SEPERATOR_WIDTH = 1;

const TOP_LEFT_WIDTH = Math.ceil(APP_WIDTH * 0.23) - INSTRUMENT_SEPERATOR_WIDTH;
const TOP_RIGHT_WIDTH = APP_WIDTH - TOP_LEFT_WIDTH;

const TOP_HORIZONTAL_SEPERATOR_HEIGHT = TOP_HEIGHT - 10;

const styles = stylex.create({
  pageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    minWidth: APP_WIDTH + APP_PADDING,
    minHeight: APP_HEIGHT + HEADER_HEIGHT + FOOTER_HEIGHT + APP_PADDING
  },

  wrapper: {
    position: "absolute",
    width: APP_WIDTH,
    height: APP_HEIGHT + HEADER_HEIGHT + FOOTER_HEIGHT,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  headerWrapper: {
    width: APP_WIDTH,
    height: HEADER_HEIGHT,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  saveLoadClearWrapper: {
    display: "flex",
    flexDirection: "row"
  },
  headerButton: {
    width: 35,
    height: 35
  },
  headerButtonIcon: {
    width: 35,
    height: 35
  },
  resetButton: {
    height: 35
  },

  footerWrapper: {
    width: APP_WIDTH,
    height: FOOTER_HEIGHT,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10
  },

  appWrapper: {
    width: APP_WIDTH,
    height: APP_HEIGHT,
    display: "flex",
    flexDirection: "column"
  },

  topBottomDivider: {
    width: APP_WIDTH,
    height: TOP_BOTTOM_DIVIDER_HEIGHT,
    backgroundColor: tokens.grey
  },

  topHorizontalDivider: {
    width: INSTRUMENT_SEPERATOR_WIDTH,
    height: TOP_HORIZONTAL_SEPERATOR_HEIGHT,
    backgroundColor: tokens.grey
  },

  topWrapper: {
    width: APP_WIDTH,
    height: TOP_HEIGHT,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  topLeftSection: {
    width: TOP_LEFT_WIDTH,
    height: TOP_HEIGHT
  },

  topRightSection: {
    width: TOP_RIGHT_WIDTH,
    height: TOP_HEIGHT
  },

  bottomWrapper: {
    width: APP_WIDTH,
    height: BOTTOM_HEIGHT
  },

  bottomSection: {
    width: APP_WIDTH,
    height: BOTTOM_HEIGHT
  },

  blmLink: {
    position: "relative",
    color: tokens.white,
    fontSize: 24,
    fontWeight: "bold",
    textDecoration: "underline",
    backgroundColor: tokens.black,
    padding: "10px 15px",
    top: -10
  },

  githubLink: {
    color: tokens.slightlyDarkerBlack,
    cursor: "pointer",
    opacity: 0.75,
    transition: "opacity 0.2s",
    ":hover": {
      opacity: 1
    }
  },

  authorLink: {
    color: tokens.grey
  }
});

const AppLayout = React.memo(
  () => {
    return (
      <div {...stylex.props(styles.pageWrapper)}>
        <div {...stylex.props(styles.wrapper)}>
          <div {...stylex.props(styles.headerWrapper)}>
            <div {...stylex.props(styles.saveLoadClearWrapper)}>
              <ConnectedLoadButton
                xstyle={styles.headerButton}
                iconXstyle={styles.headerButtonIcon}
              />
              <ConnectedSaveButton
                xstyle={styles.headerButton}
                iconXstyle={styles.headerButtonIcon}
              />
              <ConnectedResetButton xstyle={styles.resetButton} />
            </div>
            <GithubLink />
          </div>
          <div {...stylex.props(styles.appWrapper)}>
            <div {...stylex.props(styles.topBottomDivider)} />
            <div {...stylex.props(styles.topWrapper)}>
              <TopLeftSection xstyle={styles.topLeftSection} />
              <div {...stylex.props(styles.topHorizontalDivider)} />
              <TopRightSection xstyle={styles.topRightSection} />
              <div {...stylex.props(styles.topHorizontalDivider)} />
            </div>
            <div {...stylex.props(styles.topBottomDivider)} />
            <div {...stylex.props(styles.bottomWrapper)}>
              <BottomSection xstyle={styles.bottomSection} />
            </div>
          </div>
          <div {...stylex.props(styles.footerWrapper)}>
            <div>
              <a
                {...stylex.props(
                  themeStyles.labelBase,
                  themeStyles.labelGreyLarge,
                  themeStyles.autoCursor
                )}
                href="/tutorial"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tutorial
              </a>
            </div>
            <div
              {...stylex.props(
                themeStyles.labelBase,
                themeStyles.labelGreyLarge
              )}
            >
              Made with <Octicon name="heart" /> by{" "}
              <a
                {...stylex.props(styles.authorLink)}
                href="http://vincentriemer.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vincent Riemer
              </a>
            </div>
            <div>
              <a
                {...stylex.props(
                  themeStyles.labelBase,
                  themeStyles.labelGreyLarge,
                  themeStyles.autoCursor
                )}
                href="https://github.com/vincentriemer/io-808/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Report an Issue
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  },
  () => true
);

export default AppLayout;
