import controlMixin from "./controlMixin";
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { render } from "vue";

export default {
  name: "DrawControl",
  mixins: [controlMixin],
  props: {

  },
  beforeUnmount() {
    this.control.onRemove()
  },
  created() {
    this.control = new MapboxDraw(this.$props);
    this.$_addControl();
  },
};
