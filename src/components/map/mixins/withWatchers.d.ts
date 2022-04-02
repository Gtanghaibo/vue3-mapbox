import { Ref } from 'vue';
import type Mapboxgl from 'mapbox-gl';
import type { MapProps } from '../mapProps';
export declare const useMapWatch: (props: MapProps, map: Ref<Mapboxgl.Map | undefined>) => void;
