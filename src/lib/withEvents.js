export default {
  methods: {
    /**
     * Emit Vue event with additional data
     *
     * @param {string} name EventName
     * @param {Object} [data={}] Additional data
     */
    $_emitEvent(name, data = {}) {
      this.$emit(name, {
        map: (this.map || this.root.map),
        mapBox: (this.mapBox || this.root.mapBox),
        component: this,
        ...data
      })
      // NOTE: for v-model
      // this.$emit(`update:${name}`, {
      //   map: (this.map || this.root.map),
      //   mapBox: (this.mapBox || this.root.mapBox),
      //   component: this,
      //   ...data
      // });
    },

    /**
     * Emit Vue event with Mapbox event as additional data
     *
     * @param {Object} event
     */
    $_emitMapEvent(event, data = {}) {
      this.$_emitEvent(event.type, { mapBoxEvent: event, ...data });
    }
  }
};
