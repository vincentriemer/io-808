import { mixin } from '../helpers';

// webaudio module decorator to add the necessary `connect` function consistently between modules
export default mixin({
  connect(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    }
  },

  disconnect() {
    this.output.disconnect();
  }
});
