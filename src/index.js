// import offline runtime
if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install();
}

// import global styles
require("globalStyles/reset.css");
require("globalStyles/main.css");

// Add a warning to Firefox users due to a buggy AudioParam implementation
import browser from "bowser";
if (browser.gecko) {
  window.alert(
    "WARNING: Firefox currently has a buggy Web Audio API implementation which causes loud pops and clicks, continue at your own risk"
  );
}

import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "store";
import AppLayout from "layouts/app";

const Sequencer = React.lazy(() => import("./sequencer"));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div style={{ width: "100%", height: "100%" }}>
            <React.Suspense fallback={null}>
              <Sequencer />
            </React.Suspense>
            <AppLayout />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

function onMount() {
  // Custom performance marker
  if ("performance" in window && "mark" in window.performance)
    performance.mark("first_layout_render");

  // Hide loading spinner and reveal the app layout
  var loaderElement = document.getElementById("loader");
  loaderElement.className = "loader-wrapper done";
  document.getElementById("root").className = "";
}

render(<App />, document.getElementById("root"), onMount);
