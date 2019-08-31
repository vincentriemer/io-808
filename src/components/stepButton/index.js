import React from "react";

import Button from "components/button";
import Light from "components/light";

const styles = {
  dragWrapper: {
    transition: "transform 0.2s"
  },
  button: {
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 5
  }
};

const StepButton = props => {
  const {
    color,
    onClick,
    active,
    onDrop,
    onDragExit,
    onDragEnter,
    width = 50,
    height = 80,
    dropable = false
  } = props;

  const [over, setOver] = React.useState(false);

  const handleDrop = React.useCallback(
    evt => {
      evt.preventDefault();
      onDrop();
      setOver(false);
      return false;
    },
    [onDrop]
  );
  const handleDragExit = React.useCallback(
    evt => {
      evt.preventDefault();
      evt.stopPropagation();
      onDragExit();
      setOver(false);
      return false;
    },
    [onDragExit]
  );
  const handleDragOver = React.useCallback(evt => {
    evt.preventDefault();
    evt.stopPropagation();
    return false;
  }, []);
  const handleDragEnter = React.useCallback(
    evt => {
      evt.preventDefault();
      evt.stopPropagation();
      onDragEnter();
      setOver(true);
      return false;
    },
    [onDragEnter]
  );

  const dropableTransform = dropable && !over ? "scale(1.05)" : "scale(1)";

  if (dropable) {
    return (
      <div
        style={{ ...styles.dragWrapper, transform: dropableTransform }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragExit}
        onDragExit={handleDragExit}
        onDrop={handleDrop}
      >
        <Button
          style={{ ...styles.button, width, height, backgroundColor: color }}
          onClick={onClick}
        >
          <Light active={active} />
        </Button>
      </div>
    );
  }

  return (
    <div style={styles.dragWrapper}>
      <Button
        style={{ ...styles.button, width, height, backgroundColor: color }}
        onClick={onClick}
      >
        <Light active={active} />
      </Button>
    </div>
  );
};

export default StepButton;
