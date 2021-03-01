export default {
  methods: {
    $_emitSelfEvent(event, data = {}) {
      debugger
      this.$_emitMapEvent(event, { control: this.control, ...data });
    },
    /** Bind events for markers, popups and controls.
     * MapboxGL JS emits this events on popup or marker object,
     * so we treat them as 'self' events of these objects
     */
    $_filterPropsEvents() {
      let propsEvents = Object.keys(this.$attrs).filter(key => key.indexOf('on') > -1)
      propsEvents = propsEvents.map(onEvent => {
        const withoutOnEvent = onEvent.slice(2)
        return withoutOnEvent.toLowerCase()
      })
      return propsEvents
    },
    $_bindSelfEvents(events, emitter) {
      const propsEvents = this.$_filterPropsEvents()
      propsEvents.forEach(eventName => {
        if (events.includes(eventName)) {
          emitter.on(eventName, this.$_emitSelfEvent);
        }
      });
    },

    $_unbindSelfEvents(events, emitter) {
      if (events.length === 0) return;
      if (!emitter) return;
      events.forEach(eventName => {
        emitter.off(eventName, this.$_emitSelfEvent);
      });
    }
  }
};
