<template>
  <div id="map-wrapper">
    <mgl-map 
      v-model:center="center"
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :zoom="zoom"
      v-model:zoomend="zoom"
      @zoomend="handleZoom"
      @zoom="handleZoom"
      @load="handleLoad"
      @click="handleClick"
      :lazy="true"
    >
      <MglDrawControl  @added="handleAddControl" :draw-type="'draw_line_string'" :theme="theme" ></MglDrawControl>
     <npc
        v-model:coordinates="markerCoordinates"
      />
    </mgl-map>
  </div>
</template>


<script setup lang="ts">
import DrawLineString from './drawLineMode'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import "mapbox-gl/dist/mapbox-gl.css";
import Npc from './Npc.vue'
import theme from './theme'
import { ref } from 'vue'


import {
  MglMap,
  MglDrawControl,
} from "../src/main";
import type Mapboxgl from 'mapbox-gl';
const drawControlConfig = {
	modes: Object.assign(MapboxDraw.modes, {
		draw_line_string: DrawLineString,
	}),
}

const accessToken = "pk.eyJ1Ijoia2luZ29mc2Fuam9zZSIsImEiOiJja2M1NHpzcTkwOTVmMnFwY2pmbWJoNXB5In0.bsMrsTi_pZxRe8yDkqYg4A"
const mapStyle ="mapbox://styles/kingofsanjose/ckc6l34tl079y1immcvrdfvmr"
const center = ref([116.46494, 39.95402, ])
const zoom = ref(12.5)
const markerCoordinates = ref([116.46494, 39.95402, ])
const map = ref<Mapboxgl.Map>()

const handleZoom = () => {
  console.log(zoom.value)
}

const handleLoad = ({ map }) => {
  console.log("MAP: ", map);
  map.value = map
}


const handleClick = (e) => {
  console.log('click', e)
}

const handleAddControl = (e) => {
  const control = e.control
  control.changeMode('simple_select')
  map.value?.on('draw.create', (e) => {
    console.log('draw.create', e)
  })
  map.value?.on("draw.update", (e) => {
    console.log('draw update', e)
  })
}
</script>

<style>
#map-wrapper {
  height: 100vh;
  width: 100vw;
}
</style>
