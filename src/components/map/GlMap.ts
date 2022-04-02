import '../../styles/index.css'
import mapEvents from './mapEvents'
import mapProps from './mapProps'
import { useMapWatch } from './mixins/withWatchers'
import { useMapEvent } from '../../lib/useEvents'
import { h, ref, defineComponent, provide, onUnmounted, onMounted } from 'vue'
import { mapKey, initializedKey } from './types'
import type Mapboxgl from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'

export default defineComponent({
  name: 'GlMap',
  inheritAttrs: false,

  props: mapProps,
  emits: ['update:center', 'update:bounds', 'update:zoom', 'update:zoomend', 'update:rotate', 'update:pitch', 'load'],
  setup(props, { emit, attrs }) {
    const map = ref<Mapboxgl.Map>()
    useMapWatch(props, map)
    const { emitMapEvent, filterPropsEvents } = useMapEvent({
      emit,
      map: map.value!,
      attrs
    })
    const initial = ref(true)
    const initialized = ref(false)

    // provide
    provide(mapKey, map)
    provide(initializedKey, initialized)

    const eventNames = Object.keys(mapEvents)
    // methods
    function bindMapEvents(events: string[]): void {
      filterPropsEvents().forEach(eventName => {
        if (events.includes(eventName)) {
          map.value?.on(eventName, () => emitMapEvent)
        }
      })
    }
    function bindPropsUpdateEvents(): void {
      const syncedProps = [
        {
          events: ['moveend'],
          prop: 'center',
          getter: map.value?.getCenter()
        },
        {
          events: ['zoomend'],
          prop: 'zoomend',
          getter: map.value?.getZoom()
        },
        {
          events: ['zoom'],
          prop: 'zoom',
          getter: map.value?.getZoom()
        },
        {
          events: ['rotate'],
          prop: 'bearing',
          getter: map.value?.getBearing()
        },
        {
          events: ['pitch'],
          prop: 'pitch',
          getter: map.value?.getPitch()
        },
        {
          events: ['moveend', 'zoomend', 'rotate', 'pitch'],
          prop: 'bounds',
          getter: map.value?.getBounds()
        }
      ]
      syncedProps.forEach(({ events, prop, getter }) => {
        events.forEach(event => {
          if (attrs[`onUpdate:${prop}`] || prop in props) {
            // @ts-expect-error
            map.value?.on(event, () => emit(`update:${prop}`, getter))
          }
        })
      })
    }
    onMounted(() => {
      map.value = new mapboxgl.Map({
        ...props,
        container: props.container,
        center: props.center as Mapboxgl.MapboxOptions['center'],
        style: props.mapStyle
      })
      bindMapEvents(eventNames)
      bindPropsUpdateEvents()
      initial.value = false
      initialized.value = true
      emit('load', { map: map.value })
    })
    // onUnmounted
    onUnmounted(() => {
      if (map.value) map.value.remove()
    })
    return {
      initialized
    }
  },
  render() {
    return h('div', { class: 'mgl-map-wrapper' }, [h('div', { id: this.container }, this.$slots.default?.())])
  }
})
