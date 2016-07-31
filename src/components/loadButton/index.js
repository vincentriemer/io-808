import React from 'react';
import Radium from 'radium';
import Octicon from 'react-octicon';

import Button from 'components/button';

import { PERSISTANCE_FILTER } from 'constants';
import { drumLabel, darkGrey } from 'theme/variables';

@Radium
class LoadButton extends React.Component {
  static propTypes = {
    playing: React.PropTypes.bool.isRequired,
    onLoadedState: React.PropTypes.func.isRequired,
    size: React.PropTypes.number
  };

  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.validateState = this.validateState.bind(this);
  }

  validateState(state) {
    let output = true;

    for (let stateProperty in state) {
      if (state.hasOwnProperty(stateProperty)) {
        if (!PERSISTANCE_FILTER.includes(stateProperty))
          output = false;
      }
    }
    return output;
  }

  handleFileChange() {
    const files = this.refs.fileUpload.files;
    if (files.length === 1) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        let loadedState = JSON.parse(reader.result);
        if (this.validateState(loadedState)) {
          this.props.onLoadedState(loadedState);
        } else {
          window.alert('Sorry, the given io808 save is invalid.');
        }
      };

      reader.readAsText(file);
    } else {
      window.alert('Sorry, please only upload one io808 save at a time.');
    }
  }

  handleClick() {
    this.refs.fileUpload.click();
  }

  render() {
    const { playing, size=50 } = this.props;

    const styles = {
      button: {
        width: size, height: size,
        borderRadius: 4,
        backgroundColor: drumLabel,
        marginLeft: 5, marginRight: 5
      },
      icon: {
        width: size, height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: darkGrey,
        transform: 'scale(0.8)'
      },
      input: {
        display: 'none'
      }
    };

    return (
      <Button style={styles.button} disabled={playing} onClick={this.handleClick}>
        <input ref='fileUpload' type='file' style={styles.input} onChange={this.handleFileChange} />
        <Octicon title='Load' style={styles.icon} name='cloud-upload' mega={true} />
      </Button>
    );
  }
}

export default LoadButton;