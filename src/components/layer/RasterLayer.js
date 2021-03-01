import layerEvents from "../../lib/layerEvents";
import mixin from "./layerMixin";

export default {
  name: "RasterLayer",
  mixins: [mixin],

  created() {
    this.$_deferredMount();
  },

  methods: {
    $_deferredMount() {
      let source = {
        type: "raster",
        ...this.source
      };

      this.root.map.on("dataloading", this.$_watchSourceLoading);
      try {
        this.root.map.addSource(this.sourceId, source);
      } catch (err) {
        if (this.replaceSource) {
          this.root.map.removeSource(this.sourceId);
          this.root.map.addSource(this.sourceId, source);
        }
      }
      this.$_addLayer();
      this.$_bindLayerEvents(layerEvents);
      this.root.map.off("dataloading", this.$_watchSourceLoading);
      this.initial = false;
    },

    $_addLayer() {
      let existed = this.root.map.getLayer(this.layerId);
      if (existed) {
        if (this.replace) {
          this.root.map.removeLayer(this.layerId);
        } else {
          this.$_emitEvent("layer-exists", { layerId: this.layerId });
          return existed;
        }
      }
      let layer = {
        id: this.layerId,
        type: "raster",
        source: this.sourceId,
        ...this.layer
      };

      this.root.map.addLayer(layer, this.before);
      this.$_emitEvent("added", { layerId: this.layerId });
    }
  }
};
