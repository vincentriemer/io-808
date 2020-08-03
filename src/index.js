// import offline runtime
if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install();
}

// URL cheat code to immediately transition to the drum machine's original color
// Example: https://io808.com/?forceColor
setTimeout(() => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("forceColor")) {
    document.documentElement.style.animationDelay = "0s";
  }
}, 0);

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

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Loadable from "react-loadable";

import store from "store";
import AppLayout from "layouts/app";

// TODO: Figure out what to do with react-redux's decpricated lifecyles usage
const AsyncMode = React.unstable_AsyncMode;

const Sequencer = Loadable({
  loader: () => import("./sequencer"),
  loading: () => null
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{ width: "100%", height: "100%" }}>
          <Sequencer />
          <AppLayout />
        </div>
      </Provider>
    );
  }
}

// __optimizeReactComponentTree is only known to Prepack
// so we wrap it in a conditional so the code still works
// for local development testing without Prpeack
if (global.__optimizeReactComponentTree) {
  __optimizeReactComponentTree(App);
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
