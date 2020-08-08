// import offline runtime
if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install();
}

// import global styles
require("globalStyles/reset.css");
require("globalStyles/main.css");

import * as React from "react";
import { createRoot } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "store";
import AppLayout from "layouts/app";
import { KnobOverlayManager } from "components/knob/overlay";

const Sequencer = React.lazy(() => import("./sequencer"));

const App = () => {
  React.useLayoutEffect(() => {
    // Custom performance marker
    if ("performance" in window && "mark" in window.performance)
      performance.mark("first_layout_render");

    // Hide loading spinner and reveal the app layout
    var loaderElement = document.getElementById("loader");
    loaderElement.addEventListener("transitionend", () => {
      loaderElement.parentNode.removeChild(loaderElement);
    });
    loaderElement.className = "loader-wrapper done";
    document.getElementById("root").className = "";
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <KnobOverlayManager>
          <div style={{ width: "100%", height: "100%" }}>
            <React.Suspense fallback={null}>
              <Sequencer />
            </React.Suspense>
            <AppLayout />
          </div>
        </KnobOverlayManager>
      </PersistGate>
    </Provider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
