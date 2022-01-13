

import withEvents from "../../lib/withEvents";
import withSelfEvents from "./withSelfEvents";
import {h} from 'vue'

const markerEvents = {
  drag: "drag",
  dragstart: "dragstart",
  dragend: "dragend"
};

const markerDOMEvents = {
  click: "click",
  mouseenter: "mouseenter",
  mouseleave: "mouseleave"
};

export default {
  name: "MapMarker",
  mixins: [withEvents, withSelfEvents],

  inject: ["mapbox", "map", "root"],

  provide() {
    const self = this;
    return {
      get marker() {
        return self.marker;
      }
    };
  },

  props: {
    // mapbox marker options
    offset: {
      type: [Object, Array],
      default: () => [0, 0]
    },
    coordinates: {
      type: Array,
      required: true
    },
    color: {
      type: String
    },
    anchor: {
      type: String,
      default: "center"
    },
    draggable: {
      type: Boolean,
      default: false
    },
    rotation: {
      type: [String, Number],
      default: 0
    },
    scale: {
      type: Number,
      default: 0,
    }
  },

  data() {
    return {
      initial: true,
      marker: undefined
    };
  },

  watch: {
    coordinates(lngLat) {
      if (this.initial) return;
      this.marker.setLngLat(lngLat);
    },
    draggable(next) {
      if (this.initial) return;
      this.marker.setDraggable(next);
    },
    rotation(next) {
      this.marker.setRotation(next)
    },
    offset(value) {
      this.marker.setOffset(value)
    }
  },

  mounted() {
    const markerOptions = {
      ...this.$props
    };
    // let isVNode = false
    const marker = this.$slots.marker()[0]
    debugger
    this.$nextTick(() => {
      if (this.$slots.marker) {
        markerOptions.element = this.$el.children[0]
      }
      debugger
      this.marker = new this.root.mapBox.Marker(markerOptions);
  
      if (this.$attrs["onUpdate:coordinates"]) {
        this.marker.on("dragend", event => {
          let newCoordinates;
          if (this.coordinates instanceof Array) {
            newCoordinates = [event.target._lngLat.lng, event.target._lngLat.lat];
          } else {
            newCoordinates = event.target._lngLat;
          }
          this.$emit("update:coordinates", newCoordinates);
        });
      }
  
      const eventNames = Object.keys(markerEvents);
      this.$_bindSelfEvents(eventNames, this.marker);
  
      this.initial = false;
      this.$_addMarker();
    })
    
  },

  beforeUnmount() {
    if (this.map !== undefined && this.marker !== undefined) {
      this.marker.remove();
    }
  },

  methods: {
    $_addMarker() {
      console.log('marker',this.marker)
      this.marker.setLngLat(this.coordinates).setRotation(this.rotation).addTo(this.root.map);
      this.$_bindMarkerDOMEvents();
      this.$_emitEvent("added", { marker: this.marker });
    },

    $_emitSelfEvent(event) {
      this.$_emitMapEvent(event, { marker: this.marker });
    },
    $_filterPropsEvents() {
      let propsEvents = Object.keys(this.$attrs).filter(key => key.indexOf('on') > -1)
      propsEvents = propsEvents.map(onEvent => {
        const withoutOnEvent = onEvent.slice(2)
        return withoutOnEvent.toLowerCase()
      })
      return propsEvents
    },

    $_bindMarkerDOMEvents() {
      let propsEvents = this.$_filterPropsEvents()
      propsEvents.forEach(key => {
        if (Object.values(markerDOMEvents).includes(key)) {
          this.marker._element.addEventListener(key, event => {
            this.$_emitSelfEvent(event);
          });
        }
      });
    },

    remove() {
      this.marker.remove();
      this.$_emitEvent("removed");
    },

    togglePopup() {
      return this.marker.togglePopup();
    }
  },
  render() {
    return h(
      "div",
      {
        style: {
          display: "none"
        }
      },
      [this.$slots.marker ? this.$slots.marker() : null, this.marker ? (this.$slots.default ? this.$slots.default() : null) : null]
    );
  }
};
