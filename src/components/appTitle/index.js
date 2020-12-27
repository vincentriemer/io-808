import React from "react";

import { stencilOrange, darkGrey, brandingFontFamily } from "theme/variables";
import { labelGreyLarge } from "theme/mixins";

const lineHeight = 1.5;
const titleRight = 60;
const lineTop = 55;

const styles = {
  wrapper: {
    position: "relative"
  },
  titleLine: {
    position: "absolute",
    height: `${lineHeight}%`,
    left: "50%",
    transform: "translateX(-50%)",
    top: `${lineTop}%`,
    backgroundColor: stencilOrange
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap",
    alignItems: "baseline",
    position: "absolute",
    bottom: `calc(${lineTop}% - 17.5px)`,
    right: titleRight
  },
  titleBig: {
    ...labelGreyLarge,
    fontFamily: brandingFontFamily,
    marginRight: 40,
    color: stencilOrange,
    fontSize: 50,
    textShadow: `0.3rem 0 ${darkGrey},0.3rem 0rem ${darkGrey},-0.3rem -0 ${darkGrey},-0.3rem 0 ${darkGrey}`
  },
  titleSmall: {
    ...labelGreyLarge,
    fontFamily: brandingFontFamily,
    color: stencilOrange,
    fontSize: 40,
    letterSpacing: -1.5
  },
  subtitle: {
    ...labelGreyLarge,
    fontFamily: brandingFontFamily,
    position: "absolute",
    top: `${lineTop + lineHeight * 3}%`,
    right: titleRight,
    fontSize: 28,
    letterSpacing: -1
  }
};

const TitleText = React.memo(props => {
  const { text } = props;
  // Split the text by the e character and re-add them but with rotation applied
  const eSplit = text.split("e");
  const result = eSplit.reduce((acc, cur, idx) => {
    if (acc === null) {
      return [cur];
    }
    const rotatedE = (
      <span
        key={idx}
        style={{
          display: "inline-block",
          transformOrigin: "50% 60%",
          transform: "rotate(-40deg)"
        }}
      >
        e
      </span>
    );
    return [...acc, rotatedE, cur];
  }, null);
  return result;
});

const AppTitle = props => {
  const { width = 955, height = 151 } = props;

  return (
    <div style={{ ...styles.wrapper, width, height }}>
      <div style={{ ...styles.titleLine, width: width - 20 }} />
      <div style={styles.titleWrapper}>
        <div style={styles.titleBig}>
          <TitleText text="Rhythm Composer" />
        </div>
        <div style={styles.titleSmall}>
          <TitleText text="iO-808" />
        </div>
      </div>
      <div style={styles.subtitle}>
        <TitleText text="Browser Controlled" />
      </div>
    </div>
  );
};

export default AppTitle;
