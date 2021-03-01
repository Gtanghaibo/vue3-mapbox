import withEvents from "../../../lib/withEvents";
import withSelfEvents from "../withSelfEvents";

export default {
  mixins: [withEvents, withSelfEvents],

  inject: ["mapbox", "map", "actions", "root"],

  props: {
    position: {
      type: String,
      default: "top-right"
    }
  },

  beforeDestroy() {
    if (this.map && this.control) {
      this.root.map.removeControl(this.control);
    }
  },

  methods: {
    $_addControl() {
      try {
        this.root.map.addControl(this.control, this.position);
      } catch (err) {
        this.$_emitEvent("error", { error: err });
        return;
      }
      this.$_emitEvent("added", { control: this.control });
    }
  },

  render() {}
};
