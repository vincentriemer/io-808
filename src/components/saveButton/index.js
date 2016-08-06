import React from 'react';
import Radium from 'radium';
import Octicon from 'react-octicon';
import {saveAs} from 'file-saver';

import Button from 'components/button';

import { PERSISTANCE_FILTER } from 'constants';
import { buttonColor, darkGrey } from 'theme/variables';

@Radium
class SaveButton extends React.Component {
  static propTypes = {
    storeState: React.PropTypes.object.isRequired,
    size: React.PropTypes.number
  };

  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const storeState = this.props.storeState;

    // only save properties defined by persistance filter
    const saveObj = {};
    PERSISTANCE_FILTER.forEach((key) => {
      saveObj[key] = storeState[key];
    });

    const saveString = JSON.stringify(saveObj);
    const saveData = new Blob([saveString], {type: 'text/plain;charset=utf-8'});
    saveAs(saveData, 'io808.json');
  }

  render() {
    const { storeState, size=50 } = this.props;

    const styles = {
      button: {
        width: size, height: size,
        borderRadius: 4,
        backgroundColor: buttonColor,
        marginLeft: 5, marginRight: 5
      },
      icon: {
        width: size, height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: darkGrey,
        transform: 'scale(0.7)'
      }
    };

    return (
      <Button style={styles.button} disabled={storeState.playing} onClick={this.handleClick}>
        <Octicon title='Save' style={styles.icon} name='desktop-download' mega />
      </Button>
    );
  }
}

export default SaveButton;
