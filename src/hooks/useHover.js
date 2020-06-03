import * as React from "react";

function useHover(ref) {
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (node != null) {
      if (!hovered) {
        const handleEnter = () => {
          setHovered(true);
        };
        node.addEventListener("pointerenter", handleEnter, false);
        return () => {
          node.removeEventListener("pointerenter", handleEnter, false);
        };
      } else {
        const handleLeave = () => {
          setHovered(false);
        };
        node.addEventListener("pointerleave", handleLeave, false);
        return () => {
          node.removeEventListener("pointerleave", handleLeave, false);
        };
      }
    }
  }, [hovered, ref]);

  return hovered;
}

export default useHover;
