import controlMixin from "./controlMixin";

export default {
  name: "FullscreenControl",
  mixins: [controlMixin],

  props: {
    container: {
      type: HTMLElement,
      default: undefined
    }
  },

  created() {
    this.control = new this.root.mapbox.FullscreenControl(this.$props);
    this.$_addControl();
  }
};
