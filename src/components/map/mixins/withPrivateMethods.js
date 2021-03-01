export default {
  methods: {
    $_updateSyncedPropsFabric(prop, data) {
      return () => {
        debugger
        this.propsIsUpdating[prop] = true;
      
        let info = typeof data === "function" ? data() : data;
        return this.$emit(`update:${prop}`, info);
      };
    },

    $_bindPropsUpdateEvents() {
      const syncedProps = [
        {
          events: ["moveend"],
          prop: "center",
          getter: this.map.getCenter.bind(this.map)
        },
        {
          events: ["zoomend"],
          prop: "zoom",
          getter: this.map.getZoom.bind(this.map)
        },
        {
          events: ["rotate"],
          prop: "bearing",
          getter: this.map.getBearing.bind(this.map)
        },
        {
          events: ["pitch"],
          prop: "pitch",
          getter: this.map.getPitch.bind(this.map)
        },
        {
          events: ["moveend", "zoomend", "rotate", "pitch"],
          prop: "bounds",
          getter: () => {
            let newBounds = this.map.getBounds();
            if (this.$props.bounds instanceof Array) {
              newBounds = newBounds.toArray();
            }
            return newBounds;
          }
        }
      ];
      syncedProps.forEach(({ events, prop, getter }) => {
        events.forEach(event => {
          if (this.$attrs[`onUpdate:${prop}`]) {
            this.map.on(event, this.$_updateSyncedPropsFabric(prop, getter));
          }
        });
      });
    },

    $_loadMap() {
      return this.mapboxPromise.then(mapbox => {
        this.mapbox = mapbox.default ? mapbox.default : mapbox;
        return new Promise(resolve => {
          if (this.accessToken) this.mapbox.accessToken = this.accessToken;
          const map = new this.mapbox.Map({
            ...this.$props,
            container: this.$refs.container,
            style: this.mapStyle
          });
          map.on("load", () => resolve(map));
        });
      });
    },

    $_RTLTextPluginError(error) {
      this.$emit("rtl-plugin-error", { map: this.map, error: error });
    },

    $_filterPropsEvents() {
      let propsEvents = Object.keys(this.$attrs).filter(key => key.indexOf('on') > -1)
      propsEvents = propsEvents.map(onEvent => {
        const withoutOnEvent = onEvent.slice(2)
        return withoutOnEvent.toLowerCase()
      })
      return propsEvents
    },

    $_bindMapEvents(events) {
      const propsEvents = this.$_filterPropsEvents()
      propsEvents.forEach(eventName => {
        if (events.includes(eventName)) {
          this.map.on(eventName, this.$_emitMapEvent);
        }
      });
    },

    $_unbindEvents(events) {
      events.forEach(eventName => {
        this.map.off(eventName, this.$_emitMapEvent);
      });
    }
  }
};
