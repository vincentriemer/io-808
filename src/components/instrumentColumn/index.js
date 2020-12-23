import React from "react";

// Layouts
import InstrumentColumnLayout from "layouts/instrumentColumn";

// Components
import InstrumentLabel from "components/instrumentLabel";
import DrumSwitch from "components/drumSwitch";
import DrumKnob, { LABEL_HEIGHT } from "components/drumKnob";

export const EMPTY_CONTROL = "EMPTY";

const ConnectedDrumSwitch = props => {
  const { name, type, values, selector, onChange } = props;
  const handleChange = React.useCallback(
    value => onChange(type, "selector", value),
    [onChange, type]
  );
  return (
    <DrumSwitch
      name={name}
      values={values}
      position={selector}
      onChange={handleChange}
    />
  );
};

const ConnectedDrumKnob = props => {
  const { value, onChange, size, type, controlName, level = false } = props;
  const handleChange = React.useCallback(
    value => onChange(type, controlName, value),
    [controlName, onChange, type]
  );
  return (
    <DrumKnob
      value={value}
      onChange={handleChange}
      size={size}
      level={level}
      label={controlName.toUpperCase()}
    />
  );
};

const InstrumentColumn = props => {
  const {
    config: { type, labels, switchConfig, controls },
    controlState,
    onChange,
    width,
    height
  } = props;

  const DRUM_KNOB_SIZE = Math.ceil(width * 0.72);

  // create label section
  let labelComponents = [];
  labelComponents.push(
    <InstrumentLabel key={`${type}-label-0`} label={labels[0]} />
  );
  if (labels.length == 2) {
    if (switchConfig != null) {
      const { name, values } = switchConfig;
      labelComponents.push(
        <ConnectedDrumSwitch
          key={`${type}-switch`}
          name={name}
          type={type}
          values={values}
          selector={controlState.selector}
          onChange={onChange}
        />
      );
    }
    labelComponents.push(
      <InstrumentLabel key={`${type}-label-1`} label={labels[1]} />
    );
  }

  // create control section
  let controlComponents = [];
  controlComponents.push(
    <ConnectedDrumKnob
      key={`${type}-knob-level`}
      type={type}
      value={controlState.level}
      onChange={onChange}
      size={DRUM_KNOB_SIZE}
      controlName="level"
      level
    />
  );
  controls.forEach((controlName, index) => {
    if (controlName !== EMPTY_CONTROL) {
      controlComponents.push(
        <ConnectedDrumKnob
          key={`${type}-knob-${index}`}
          value={controlState[controlName]}
          onChange={onChange}
          size={DRUM_KNOB_SIZE}
          type={type}
          controlName={controlName}
        />
      );
    } else {
      controlComponents.push(
        <div
          key={`${type}-knob-${index}`}
          style={{
            width: DRUM_KNOB_SIZE,
            height: DRUM_KNOB_SIZE + LABEL_HEIGHT
          }}
        />
      );
    }
  });

  return (
    <InstrumentColumnLayout
      labels={labelComponents}
      width={width}
      height={height}
    >
      {controlComponents}
    </InstrumentColumnLayout>
  );
};

export default InstrumentColumn;
