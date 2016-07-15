import {
  fontFamily, fontWeight, textAlign, letterSpacing, normalSize, largeSize, smallSize, xSmallSize,
  grey, darkGrey, xLargeSize
} from './variables';

// TYPOGRAPHY PRESETS ==========================
const basePreset = {
  fontFamily, fontWeight, textAlign, letterSpacing
};

export const labelGreyNormal = {
  ...basePreset,
  fontSize: normalSize,
  color: grey
};

export const labelGreyLarge = {
  ...basePreset,
  fontSize: largeSize,
  color: grey
};

export const labelGreyXLarge = {
  ...basePreset,
  fontSize: xLargeSize,
  color: grey,
  letterSpacing: '-1px',
  padding: 2
};

export const labelGreySmall = {
  ...basePreset,
  fontSize: smallSize,
  color: grey
};

export const labelGreyXSmall = {
  ...basePreset,
  fontSize: xSmallSize,
  color: grey
};

export const labelDarkGrey = {
  ...basePreset,
  fontSize: normalSize,
  color: darkGrey,
  fontWeight: 'normal'
};

// LAYOUT MACROS ==========================
export const ring = (size, color) => ({
  position: 'absolute',
  width: size, height: size,
  left: 0, right: 0, top: 0, bottom: 0,
  margin: 'auto',
  borderRadius: '50%',
  backgroundColor: color
});