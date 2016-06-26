import React from 'react';
import Radium from 'radium';

@Radium
class InstrumentColumn extends React.Component {
  static propTypes = {
    labels: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }

  render() {
    const { labels, children, width=110, height=450 } = this.props;

    const styles = {
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',

        width, height,
        padding: 4
      },

      knobsWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },

      controlSpacing: {
        marginBottom: 5
      },

      labelWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      },

      labelSpacing: {
        marginTop: 8
      }
    }

    return (
      <div style={styles.wrapper}>
        <div style={styles.knobsWrapper}>
          {React.Children.map(children, (child, index) => (
            <div key={index} style={styles.controlSpacing}>{child}</div>
          ))}
        </div>
        <div style={styles.labelWrapper}>
          {labels.map((label, index) => (
            <div style={styles.labelSpacing}>{label}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default InstrumentColumn;