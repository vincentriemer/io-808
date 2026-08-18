import React from "react";
import * as stylex from "@stylexjs/stylex";

import Button from "components/button";
import Light from "components/light";
import { tokens } from "theme/variables.stylex";

const styles = stylex.create({
  dragWrapper: {
    transition: "transform 0.2s"
  },
  dropable: {
    transform: "scale(1.05)"
  },
  dropTarget: {
    transform: "scale(1)"
  },
  button: {
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    willChange: "transform"
  },
  red: {
    backgroundColor: tokens.red
  },
  orange: {
    backgroundColor: tokens.buttonOrange
  },
  yellow: {
    backgroundColor: tokens.yellow
  },
  offWhite: {
    backgroundColor: tokens.offWhite
  }
});

const toneStyles = {
  red: styles.red,
  orange: styles.orange,
  yellow: styles.yellow,
  offWhite: styles.offWhite
};

const StepButton = props => {
  const {
    tone,
    xstyle,
    onClick,
    active,
    onDrop,
    onDragExit,
    onDragEnter,
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

  if (dropable) {
    return (
      <div
        {...stylex.props(
          styles.dragWrapper,
          over ? styles.dropTarget : styles.dropable
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragExit}
        onDragExit={handleDragExit}
        onDrop={handleDrop}
      >
        <Button
          xstyle={[styles.button, toneStyles[tone], xstyle]}
          onClick={onClick}
        >
          <Light active={active} />
        </Button>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.dragWrapper)}>
      <Button
        xstyle={[styles.button, toneStyles[tone], xstyle]}
        onClick={onClick}
      >
        <Light active={active} />
      </Button>
    </div>
  );
};

export default StepButton;
