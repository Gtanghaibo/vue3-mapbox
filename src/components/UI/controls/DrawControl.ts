import MapboxDraw from '@mapbox/mapbox-gl-draw'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { defineComponent, PropType, inject, onUnmounted, ref, unref, nextTick } from 'vue'
import type Mapboxgl from 'mapbox-gl'
import { mapKey } from '../../map/types'
import { useMapEvent } from '../../../lib/useEvents'

export default defineComponent({
  name: 'DrawControl',
  props: {
    modes: {
      type: Object,
      default: () => ({})
    },
    drawType: {
      type: String,
      default: 'draw_polygon'
    },
    theme: {
      type: Array,
      default: null
    },
    position: {
      type: String as PropType<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>,
      default: 'top-right'
    }
  },
  setup(props, { emit, attrs }) {
    const drawControl = ref<Mapboxgl.IControl>()
    const map = inject(mapKey)!
    const { emitEvent } = useMapEvent({ emit, attrs, map: map?.value })
    const drawConfig = Object.assign({}, props)
    if (props.theme) {
      // @ts-expect-error
      drawConfig.styles = unref(props.theme)
    }
    // @ts-expect-error
    delete drawConfig.theme
    // @ts-expect-error
    delete drawConfig.modes
    drawControl.value = new MapboxDraw(drawConfig)
    nextTick(() => {
      addControl()
    })
    // method
    function addControl(): void {
      if (!drawControl.value) return
      try {
        map.value?.addControl(drawControl.value, props.position)
      } catch (err) {
        console.error('[drawControl error]: ' + err)
        emitEvent('error', { error: err })
        return
      }
      emitEvent('added', { control: drawControl.value, drawType: props.drawType || '' })
    }
    onUnmounted(() => {
      // if (map.value && drawControl.value) {
      //   map.value.removeControl(drawControl.value)
      // }
    })
    return () => {
      return null
    }
  }
})
