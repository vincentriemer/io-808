import * as React from "react";
import { unstable_useEvent as useEvent } from "react-dom";

function useTap(ref, onTap, optionalListeners = {}) {
  const [tapped, setTapped] = React.useState(false);

  const click = useEvent("click", { passive: false });
  const pointerdown = useEvent("pointerdown");
  const pointerup = useEvent("pointerup");
  const pointercancel = useEvent("pointercancel");

  const { onPointerDown, onPointerUp } = optionalListeners;

  React.useEffect(() => {
    const node = ref.current;
    if (node != null) {
      if (!tapped) {
        pointerdown.setListener(node, e => {
          node.setPointerCapture(e.pointerId);
          setTapped(true);
          onPointerDown != null && onPointerDown(e);
        });
      } else {
        const releaseTap = e => {
          node.releasePointerCapture(e.pointerId);
          setTapped(false);
          onPointerUp != null && onPointerUp(e);
        };
        pointercancel.setListener(node, releaseTap);
        pointerup.setListener(node, releaseTap);
      }
      // Use the browser's high-level 'click' event to account
      // for activation via accessibility tools, keyboards, ect.,
      // and to allow built-in native behavior to be prevented.
      click.setListener(node, onTap);

      return () => {
        click.setListener(node, null);
        pointerdown.setListener(node, null);
        pointerup.setListener(node, null);
        pointercancel.setListener(node, null);
      };
    }
  }, [
    click,
    onPointerDown,
    onPointerUp,
    onTap,
    optionalListeners,
    pointercancel,
    pointerdown,
    pointerup,
    ref,
    tapped
  ]);

  return tapped;
}

export default useTap;
