import React from 'react';
import Radium from 'radium';

import Button from 'components/button';
import Light from 'components/light';

@Radium
class StepButton extends React.Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    dropable: React.PropTypes.bool,
    onDrop: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { over: false };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragExit = this.handleDragExit.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
  }

  handleDrop(e) {
    this.props.onDrop();
    this.setState({ over: false });
    e.preventDefault();
  }

  handleDragExit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ over: false });
    return false;
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ over: true });
    return false;
  }

  render() {
    const {color, onClick, active, width=50, height=80, dropable=false} = this.props;

    const dropableTransform = dropable && !this.state.over ? 'scale(1.05)' : 'scale(1)';

    const styles = {
      dragWrapper: {
        transition: 'transform 0.2s',
        transform: dropableTransform
      },
      button: {
        width, height,
        backgroundColor: color,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
      }
    };

    if (dropable) {
      return (
        <div style={styles.dragWrapper}
             onDragEnter={this.handleDragEnter}
             onDragOver={this.handleDragOver}
             onDragLeave={this.handleDragExit}
             onDragExit={this.handleDragExit}
             onDrop={this.handleDrop}>
          <Button style={styles.button} onClick={onClick}>
            <Light active={false}/>
          </Button>
        </div>
      );
    } else {
      return (
        <div style={styles.dragWrapper}>
          <Button style={styles.button} onClick={onClick}>
            <Light active={active}/>
          </Button>
        </div>
      );
    }
  }
}

export default StepButton;