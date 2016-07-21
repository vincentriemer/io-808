import Path from 'paths-js/path';

export const separatorPath = Path()
  .moveto(317, 200)
  .lineto(143, 200)
  .lineto(143, 270)
  .lineto(0, 270)
  .print();

export const rhythmToCompose = Path()
  .moveto(181,25)
  .lineto(159,25)
  .smoothcurveto(157, 25, 157, 27)
  .vlineto(100)
  .smoothcurveto(157, 103, 154, 103)
  .print();

export const rhythmToPlay = Path()
  .moveto(157, 27)
  .vlineto(77)
  .smoothcurveto(157, 80, 154, 80)
  .hlineto(140)
  .print();

export const patternToInstrument = Path()
  .moveto(110, 10)
  .hlineto(183)
  .print();

export const manualPlayPath = Path()
  .moveto(93, 60)
  .hlineto(89)
  .smoothcurveto(87, 60, 87, 62)
  .vlineto(66)
  .print();

export const firstToSecondPart = Path()
  .moveto(22, 65)
  .vlineto(24)
  .smoothcurveto(22, 22, 24, 22)
  .hlineto(47)
  .smoothcurveto(49, 22, 49, 24)
  .vlineto(47)
  .print();

export const patternToParts = Path()
  .moveto(35.5,17)
  .vlineto(22)
  .print();

export const patternWriteToClear = Path()
  .moveto(19, 10)
  .hlineto(3)
  .smoothcurveto(1, 10, 1, 12)
  .vlineto(213)
  .smoothcurveto(1, 215, 3, 215)
  .hlineto(60)
  .print();

export const modeToPatternClear = Path()
  .moveto(28, 103)
  .hlineto(12)
  .smoothcurveto(10, 103, 10, 105)
  .vlineto(173)
  .smoothcurveto(10, 175, 12, 175)
  .hlineto(28)
  .print();

export const composeToTrackClear = Path()
  .moveto(135, 113)
  .vlineto(213)
  .smoothcurveto(135, 215, 133, 215)
  .hlineto(90)
  .print();

export const patternLabelToButton = Path()
  .moveto(75, 183)
  .vlineto(220)
  .print();