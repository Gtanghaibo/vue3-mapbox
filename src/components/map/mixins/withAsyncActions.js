import promisify from "map-promisified";

export default {
  created() {
    this.actions = {};
  },

  methods: {
    $_registerAsyncActions(map) {
      this.actions = {
        ...promisify(map),
        stop() {
          (this.map || this.root.map).stop();
          const updatedProps = {
            pitch: (this.map || this.root.map).getPitch(),
            zoom: (this.map || this.root.map).getZoom(),
            bearing: (this.map || this.root.map).getBearing(),
            center: (this.map || this.root.map).getCenter()
          };
          Object.entries(updatedProps).forEach(prop => {
            this.$_updateSyncedPropsFabric(prop[0], prop[1])();
          });

          return Promise.resolve(updatedProps);
        }
      };
    }
  }
};
