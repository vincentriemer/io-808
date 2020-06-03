import * as React from "react";

function useContinuousHover(
  ref,
  { onHoverStart, onHoverEnd, onHoverMove } = {}
) {
  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    const node = ref.current;
    if (node != null) {
      if (!hovered) {
        const handleEnter = e => {
          setHovered(true);
          onHoverStart && onHoverStart(e);
        };
        node.addEventListener("pointerenter", handleEnter, false);
        return () => {
          node.removeEventListener("pointerenter", handleEnter, false);
        };
      } else {
        const handleLeave = e => {
          setHovered(false);
          onHoverEnd && onHoverEnd(e);
        };
        node.addEventListener("pointerleave", handleLeave, false);

        if (onHoverMove != null) {
          window.addEventListener("pointermove", onHoverMove, false);
          return () => {
            node.removeEventListener("pointerleave", handleLeave, false);
            window.removeEventListener("pointermove", onHoverMove, false);
          };
        }

        return () => {
          node.removeEventListener("pointerleave", handleLeave, false);
        };
      }
    }
  }, [hovered, onHoverEnd, onHoverMove, onHoverStart, ref]);
}

export default useContinuousHover;
