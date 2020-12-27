import { DOMMatrix, DOMPoint } from "./geometry";

const IdentityMatrix = new DOMMatrix();

function getTransformationMatrix(element) {
  let transformationMatrix = IdentityMatrix;
  let currentElement = element;

  while (
    currentElement != null &&
    currentElement !== currentElement.ownerDocument.documentElement
  ) {
    const computedStyle = window.getComputedStyle(currentElement, undefined);
    const transform = computedStyle.transform || "none";
    const c = transform === "none" ? IdentityMatrix : new DOMMatrix(transform);
    transformationMatrix = c.multiply(transformationMatrix);
    currentElement = currentElement.parentNode;
  }

  const w = element.offsetWidth;
  const h = element.offsetHeight;
  const p0 = new DOMPoint(0, 0, 0).matrixTransform(transformationMatrix);
  const p1 = new DOMPoint(w, 0, 0).matrixTransform(transformationMatrix);
  const p2 = new DOMPoint(w, h, 0).matrixTransform(transformationMatrix);
  const p3 = new DOMPoint(0, h, 0).matrixTransform(transformationMatrix);
  const left = Math.min(p0.x, p1.x, p2.x, p3.x);
  const top = Math.min(p0.y, p1.y, p2.y, p3.y);

  const rect = element.getBoundingClientRect();
  transformationMatrix = IdentityMatrix.translate(
    window.pageXOffset + rect.left - left,
    window.pageYOffset + rect.top - top,
    0
  ).multiply(transformationMatrix);

  return transformationMatrix;
}

export function convertPointFromPageToNode(node, pagePoint) {
  const nodePoint = new DOMPoint(pagePoint.x, pagePoint.y, 0).matrixTransform(
    getTransformationMatrix(node).inverse()
  );
  return nodePoint;
}

export function convertPointFromNodeToPage(node, nodePoint) {
  const pagePoint = new DOMPoint(nodePoint.x, nodePoint.y, 0).matrixTransform(
    getTransformationMatrix(node)
  );
  return pagePoint;
}
