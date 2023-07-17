import type { Feature, FeatureCollection, GeoJsonProperties, Geometry, GeometryCollection } from 'geojson'
import type Mapboxgl from 'mapbox-gl'

export type AngleSource = 'degree' | 'radian'

export type ExcludeGeometryCollectionOfCoordinates = Exclude<Geometry, GeometryCollection>

export function meterToPixel(meters: number, lat: number, zoom: number) {
  const factor = 0.01866138 * Math.cos(lat * (Math.PI / 180))
  return meters / factor / Math.pow(2, 22 - zoom)
}

export function angleConverter(value: number, from: AngleSource, to: AngleSource, toFixed: number) {
  if (from === 'degree' && to === 'radian') {
    const newValue = (90 - value) / 57.2958
    return toFixed === undefined ? newValue : window.parseFloat(newValue.toFixed(toFixed))
  } else if (from === 'radian' && to === 'degree') {
    const newValue = 90 - value * 57.2958
    return toFixed === undefined ? newValue : window.parseFloat(newValue.toFixed(toFixed))
  }
  return toFixed === undefined ? value : window.parseFloat(value.toFixed(toFixed))
}

export function createFeatureCollection(features: Feature[]): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: features
  }
}

export const createFeature = (
  data: ExcludeGeometryCollectionOfCoordinates['coordinates'],
  type: ExcludeGeometryCollectionOfCoordinates['type'],
  properties: GeoJsonProperties = {}
): Feature => {
  const geometry = {
    type,
    coordinates: data
  } as ExcludeGeometryCollectionOfCoordinates
  return {
    type: 'Feature',
    properties: properties,
    geometry
  }
}

export const changeSource = (map: Mapboxgl.Map, id: string, data: Feature | FeatureCollection) => {
  // 特指GeoJSONSource，只有GeoJSONSource上有setData方法
  const source = map.getSource(id) as Mapboxgl.GeoJSONSource
  source.setData(data)
}

export const changeVisibility = (map: Mapboxgl.Map, id: string, visible: boolean) => {
  map.setLayoutProperty(id, 'visibility', visible ? 'visible' : 'none')
}

export const addSource = (map: Mapboxgl.Map, id: string, source: Feature) => {
  map.addSource(id, {
    type: 'geojson',
    data: source
  })
}

export const addLayer = (
  map: Mapboxgl.Map,
  type: Mapboxgl.AnyLayer['type'],
  config: Omit<Mapboxgl.AnyLayer, 'type'>
) => {
  const layerConfig = {
    type: type,
    ...config
  } as Mapboxgl.AnyLayer
  map.addLayer(layerConfig)
}

export const changeLayerLayoutProperty = (map: Mapboxgl.Map, id: string, attribute: string, value) => {
  map.setLayoutProperty(id, attribute, value)
}

export const changeLayerColor = (map: Mapboxgl.Map, id: string, color: string) => {
  map.setPaintProperty(id, 'line-color', color)
}

export const removeLayer = (map: Mapboxgl.Map, id: string) => {
  map.removeLayer(id)
}

export const removeSource = (map: Mapboxgl.Map, id: string) => {
  map.removeSource(id)
}
