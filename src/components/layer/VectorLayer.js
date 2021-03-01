import layerEvents from "../../lib/layerEvents";
import mixin from "./layerMixin";

export default {
  name: "VectorLayer",
  mixins: [mixin],

  computed: {
    getSourceFeatures() {
      return filter => {
        if (this.map) {
          return this.root.map.querySourceFeatures(this.sourceId, {
            sourceLayer: this.layer["source-layer"],
            filter
          });
        }
        return null;
      };
    },

    getRenderedFeatures() {
      return (geometry, filter) => {
        if (this.map) {
          return this.root.map.queryRenderedFeatures(geometry, {
            layers: [this.layerId],
            filter
          });
        }
        return null;
      };
    }
  },

  watch: {
    filter(filter) {
      if (this.initial) return;
      this.root.map.setFilter(this.layerId, filter);
    }
  },

  created() {
    this.$_deferredMount();
  },

  methods: {
    $_deferredMount() {
      let source = {
        type: "vector",
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
        source: this.sourceId,
        ...this.layer
      };

      this.root.map.addLayer(layer, this.before);
      this.$_emitEvent("added", { layerId: this.layerId });
    },

    setFeatureState(featureId, state) {
      if (this.map) {
        const params = {
          id: featureId,
          source: this.sourceId,
          "source-layer": this.layer["source-layer"]
        };
        return this.root.map.setFeatureState(params, state);
      }
    },

    getFeatureState(featureId) {
      if (this.map) {
        const params = {
          id: featureId,
          source: this.source,
          "source-layer": this.layer["source-layer"]
        };
        return this.root.map.getFeatureState(params);
      }
    }
  }
};
