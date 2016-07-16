import React from 'react';
import Radium from 'radium';

import {stencilOrange, darkGrey} from '../../theme/variables';
import { labelGreyLarge } from '../../theme/mixins';

const lineHeight = 3;
const titleRight = 60;
const lineTop = 55.2;

@Radium
class AppTitle extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  };

  render() {
    const {width=955, height=151} = this.props;

    const styles = {
      wrapper: {
        width, height,
        position: 'relative'
      },

      titleLine: {
        position: 'absolute',
        width: width - 20, height: `${lineHeight}%`,
        left: '50%', transform: 'translateX(-50%)',
        top: `${lineTop}%`,
        backgroundColor: stencilOrange
      },

      titleWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'no-wrap',
        alignItems: 'baseline',
        position: 'absolute',
        bottom: `calc(${lineTop}% - 17px)`,
        right: titleRight
      },

      titleBig: {
        ...labelGreyLarge,
        marginRight: 40,
        color: stencilOrange,
        fontSize: 50,
        textShadow: `0.3rem 0 ${darkGrey},0.3rem 0rem ${darkGrey},-0.3rem -0 ${darkGrey},-0.3rem 0 ${darkGrey}`
      },

      titleSmall: {
        ...labelGreyLarge,
        color: stencilOrange,
        fontSize: 40,
        letterSpacing: -1.7
      },

      subtitle: {
        ...labelGreyLarge,
        position: 'absolute',
        top: `${lineTop + (lineHeight * 1.5)}%`,
        right: titleRight,
        fontSize: 28,
        letterSpacing: -0.75
      }
    };

    return (
      <div style={styles.wrapper}>
        <div style={styles.titleLine}></div>
        <div style={styles.titleWrapper}>
          <div style={styles.titleBig}>Rhythm Composer</div>
          <div style={styles.titleSmall}>iO-808</div>
        </div>
        <div style={styles.subtitle}>Browser Controlled</div>
      </div>
    );
  }
}

export default AppTitle;
