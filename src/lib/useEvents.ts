import type Mapboxgl from 'mapbox-gl'
import { SetupContext } from 'vue'

export interface MapEventsType {
  emitEvent: (name: string, data?: any) => void
  emitMapEvent: (event: Mapboxgl.MapboxEvent, data?: any) => void
  filterPropsEvents: () => string[]
}

export interface useMapEventParams {
  emit: any
  attrs: SetupContext['attrs']
  map: Mapboxgl.Map
}

export const useMapEvent = (params: useMapEventParams): MapEventsType => {
  const { map, emit, attrs } = params
  const emitEvent = (name: string, data = {}): void => {
    emit(name, {
      map: map,
      ...data
    })
  }
  const emitMapEvent = (event: Mapboxgl.MapboxEvent, data = {}): void => {
    emit(event.type, {
      mapBoxEvent: event,
      ...data
    })
  }
  function filterPropsEvents(): string[] {
    return Object.keys(attrs)
      .filter(key => key.includes('on'))
      .map(onEvent => {
        return onEvent.slice(2).toLowerCase()
      })
  }
  return {
    emitEvent,
    emitMapEvent,
    filterPropsEvents
  }
}
