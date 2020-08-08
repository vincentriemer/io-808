import {
  DOMMatrix as DOMMatrixPolyfill,
  DOMPoint as DOMPointPolyfill
} from "@vincentriemer/geometry-interfaces-polyfill";

export const DOMMatrix =
  "DOMMatrix" in window ? window.DOMMatrix : DOMMatrixPolyfill;
export const DOMPoint =
  "DOMPoint" in window ? window.DOMPoint : DOMPointPolyfill;
