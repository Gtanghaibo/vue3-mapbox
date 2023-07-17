import { InjectionKey, Ref } from 'vue'
import type Mapboxgl from 'mapbox-gl'

export const mapKey: InjectionKey<Ref<Mapboxgl.Map>> = Symbol('map')

export const initializedKey: InjectionKey<Ref<boolean>> = Symbol('initialized')

export const markerKey: InjectionKey<Ref<Mapboxgl.Marker>> = Symbol('marker')
