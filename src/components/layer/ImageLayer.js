import mixin from "./layerMixin";
import layerEvents from "../../lib/layerEvents";

export default {
  name: "ImageLayer",
  mixins: [mixin],

  created() {
    if (this.source) {
      if (this.source.coordinates) {
        this.$watch(
          "source.coordinates",
          function(next) {
            if (this.initial) return;
            if (next) {
              this.mapSource.setCoordinates(next);
            }
          },
          { deep: true }
        );
      }

      if (this.source.url) {
        this.$watch(
          "source.url",
          function(next) {
            if (this.initial) return;
            if (next) {
              this.mapSource.updateImage({
                url: next,
                coordinates: this.source.coordinates
              });
            }
          },
          { deep: true }
        );
      }
    }
    this.$_deferredMount();
  },

  methods: {
    $_deferredMount() {
      const source = {
        type: "image",
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
      const layer = {
        id: this.layerId,
        source: this.sourceId,
        type: "raster",
        ...this.layer
      };

      this.root.map.addLayer(layer, this.before);
      this.$_emitEvent("added", { layerId: this.layerId });
    }
  }
};
