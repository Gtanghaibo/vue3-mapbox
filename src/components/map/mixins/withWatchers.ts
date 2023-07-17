import { watch, Ref } from 'vue'
import type Mapboxgl from 'mapbox-gl'
import type { MapProps } from '../mapProps'

export const useMapWatch = (props: MapProps, map: Ref<Mapboxgl.Map | undefined>): void => {
  watch(
    () => props.maxBounds,
    (nextVal, preVal) => {
      if (preVal === nextVal) return
      map.value?.setMaxBounds(nextVal)
    }
  )
  watch(
    () => props.minZoom,
    (nextVal, preVal) => {
      if (preVal === nextVal) return
      map.value?.setMinZoom(nextVal)
    }
  )
  watch(
    () => props.maxZoom,
    (nextVal, preVal) => {
      if (preVal === nextVal) return
      map.value?.setMaxZoom(nextVal)
    }
  )
  watch(
    () => props.mapStyle,
    (nextVal, preVal) => {
      if (preVal === nextVal || !nextVal) return
      map.value?.setStyle(nextVal)
    }
  )
  watch(
    () => props.collisionBoxes,
    (nextVal, preVal) => {
      if (preVal === nextVal || !map.value) return
      map.value.showCollisionBoxes = nextVal
    }
  )
  watch(
    () => props.tileBoundaries,
    (nextVal, preVal) => {
      if (preVal === nextVal || !map.value) return
      map.value.showTileBoundaries = nextVal
    }
  )
  watch(
    () => props.repaint,
    (nextVal, preVal) => {
      if (preVal === nextVal || !map.value) return
      map.value.repaint = nextVal
    }
  )
  watch(
    () => props.zoom,
    (nextVal, preVal) => {
      if (preVal === nextVal) return
      map.value?.setZoom(nextVal)
    }
  )
  watch(
    () => props.center,
    (nextVal, preVal) => {
      if (preVal === nextVal || !nextVal) return
      map.value?.setCenter(nextVal as Mapboxgl.LngLatLike)
    }
  )
  watch(
    () => props.bearing,
    (nextVal, preVal) => {
      if (preVal === nextVal) return
      map.value?.setBearing(nextVal)
    }
  )
  watch(
    () => props.pitch,
    (nextVal, preVal) => {
      if (preVal === nextVal) return
      map.value?.setPitch(nextVal)
    }
  )
}
