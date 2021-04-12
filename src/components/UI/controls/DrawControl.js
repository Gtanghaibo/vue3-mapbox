import controlMixin from "./controlMixin";
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { render } from "vue";

export default {
  name: "DrawControl",
  mixins: [controlMixin],
  props: {
    modes: {
      type: Object,
      default: null
    },
    drawType: {
      type: String,
      default: 'draw_polygon'
    }
  },
  beforeUnmount() {
    this.control.onRemove()
  },
  created() {
    let drawConfig = Object.assign({}, this.$props)
    if(!this.modes) {
      delete drawConfig.modes 
    }
    delete drawConfig.drawType
    this.control = new MapboxDraw(drawConfig);
    this.$_addControl();
  },
};
