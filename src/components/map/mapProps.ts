import { ExtractPropTypes, PropType } from 'vue'
import type Mapboxgl from 'mapbox-gl'
const mapProps = {
  container: {
    type: String,
    default: () => `map-${('' + Math.random()).split('.')[1]}`
  },
  accessToken: {
    type: String,
    default: undefined
  },
  minZoom: {
    type: Number,
    default: 0
  },
  maxZoom: {
    type: Number,
    default: 22
  },
  mapStyle: {
    type: [String, Object] as PropType<string | Mapboxgl.Style>,
    required: true
  },
  hash: {
    type: [Boolean, String],
    default: false
  },
  interactive: {
    type: Boolean,
    default: true
  },
  bearingSnap: {
    type: Number,
    default: 7
  },
  pitchWithRotate: {
    type: Boolean,
    default: true
  },
  clickTolerance: {
    type: Number,
    default: 3
  },
  attributionControl: {
    type: Boolean,
    default: true
  },
  customAttribution: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined
  },
  logoPosition: {
    type: String as PropType<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>,
    default: 'bottom-left'
  },
  failIfMajorPerformanceCaveat: {
    type: Boolean,
    default: false
  },
  preserveDrawingBuffer: {
    type: Boolean,
    default: false
  },
  refreshExpiredTiles: {
    type: Boolean,
    default: true
  },
  maxBounds: {
    type: [Array, Object] as PropType<Mapboxgl.MapboxOptions['maxBounds']>,
    default: undefined
  },
  scrollZoom: {
    type: [Boolean, Object] as PropType<Mapboxgl.MapboxOptions['scrollZoom']>,
    default: true
  },
  boxZoom: {
    type: Boolean,
    default: true
  },
  dragRotate: {
    type: Boolean,
    default: true
  },
  dragPan: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  doubleClickZoom: {
    type: Boolean,
    default: true
  },
  touchZoomRotate: {
    type: [Boolean, Object] as PropType<Mapboxgl.MapboxOptions['touchZoomRotate']>,
    default: true
  },
  trackResize: {
    type: Boolean,
    default: true
  },
  center: {
    type: [Object, Array] as PropType<Mapboxgl.MapboxOptions['center'] | number[]>,
    default: undefined
  },
  zoom: {
    type: Number,
    default: 0
  },
  zoomend: {
    type: Number,
    default: 0
  },
  bearing: {
    type: Number,
    default: 0
  },
  pitch: {
    type: Number,
    default: 0
  },
  bounds: {
    type: [Object, Array] as PropType<Mapboxgl.MapboxOptions['bounds']>,
    default: undefined
  },
  fitBoundsOptions: {
    type: Object as PropType<Mapboxgl.MapboxOptions['fitBoundsOptions']>,
    default: undefined
  },
  renderWorldCopies: {
    type: Boolean,
    default: true
  },
  tileBoundaries: {
    type: Boolean,
    default: false
  },
  collisionBoxes: {
    type: Boolean,
    default: false
  },
  repaint: {
    type: Boolean,
    default: false
  },
  transformRequest: {
    type: Function as PropType<Mapboxgl.MapboxOptions['transformRequest']>,
    default: undefined
  },
  maxTileCacheSize: {
    type: Number,
    default: undefined
  },
  localIdeographFontFamily: {
    type: String,
    default: null
  },
  collectResourceTiming: {
    type: Boolean,
    default: false
  },
  fadeDuration: {
    type: Number,
    default: 300
  },
  crossSourceCollisions: {
    type: Boolean,
    default: true
  },
  focusLazy: Boolean
}

export type MapProps = ExtractPropTypes<typeof mapProps>
export default mapProps
