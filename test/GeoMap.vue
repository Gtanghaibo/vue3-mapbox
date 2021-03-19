<template>
  <div id="map-wrapper">
    <!-- <canvas id="myCanvas" width="100" height="100">

    </canvas> -->
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
      <MglDrawControl  @added="handleAddControl" v-if="activeDrawRegion" ></MglDrawControl>
    <!-- <template v-for="i in 1" >
      <mgl-marker
      :key="i"
        v-if="markerShowed"
        v-model:coordinates="markerCoordinates"
        :draggable="true"
        color="green"
        @added="onMarkerAdd"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        :rotation="rotation"
        :scale="5"
        
      >
      <template v-slot:marker>
        <div>
       <span style="display: inline-block;width: 100px; height: 20px; color: white; background: green" :style="{color: truckColor}">Tusimple Truck</span>
       </div>
      </template>
      </mgl-marker>
    <mgl-marker :coordinates="markerCoordinates" :offset="[50,50]">
      <template v-slot:marker>
        <h2> the marker text</h2>
      </template>
    </mgl-marker>
    </template> -->

     <npc
        v-model:coordinates="markerCoordinates"
      />
    </mgl-map>
  </div>
</template>


<script>
import Mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PopupWrapper from "./PopupWrapper.vue"
// import MglGeocoderControl from "vue-mapbox-geocoder";
import Npc from './Npc.vue'

import {
  MglMap,
  MglAttributionControl,
  MglFullscreenControl,
  MglNavigationControl,
  MglGeolocateControl,
  MglScaleControl,
  MglMarker,
  MglPopup,
  MglGeojsonLayer,
  MglVectorLayer,
  MglCanvasLayer,
  MglRasterLayer,
  MglImageLayer,
  MglDrawControl,
} from "../src/main";
// import MglGeocoderControl from "vue-mapbox-geocoder";
import circle from "@turf/circle";
import promisify from "map-promisified";

import temp from './temp.vue'

export default {
  name: "GeoMap",

  components: {
    MglMap,
    MglAttributionControl,
    MglFullscreenControl,
    MglGeolocateControl,
    MglNavigationControl,
    // MglGeocoderControl,
    MglScaleControl,
    MglDrawControl,
    MglMarker,
    MglPopup,
    MglGeojsonLayer,
    MglCanvasLayer,
    MglImageLayer,
    MglVectorLayer,
    MglRasterLayer,
    PopupWrapper,
    Npc,
    temp
  },
  watch: {
    center(value) {
      console.log('center', value)
    }
  },

  data() {
    return {
      accessToken:
        "pk.eyJ1Ijoia2luZ29mc2Fuam9zZSIsImEiOiJja2M1NHpzcTkwOTVmMnFwY2pmbWJoNXB5In0.bsMrsTi_pZxRe8yDkqYg4A",
      // mapStyle: 'mapbox://styles/soal/cimlxnm0d006yzpmccqs5dg01',
      mapStyle: "mapbox://styles/kingofsanjose/ckc6l34tl079y1immcvrdfvmr",
      defaultSearch: "Bodhgaya",
      truckColor: 'red',
      rotation: 0,
      visible: 'visible',
      markerCoordinates: [116.46494, 39.95402, ],
      markerCoordinates2: [60, 60],
      center: [116.46494, 39.95402, ],
      // center: [-75.465, 38.476],
      zoom: 12.5,
      geojsonSource: {
        data: circle([50, 50], 20)
      },
      geojsonLayer: {
        type: "fill",
        paint: {
          "fill-color": "blue",
          "fill-opacity": 0.6
        },
        layout: {
          visibility: 'visible',
        }
      },
      canvasSource: {
        type: "canvas",
        canvas: "idOfMyHTMLCanvas",
        animate: true
      },
      markerShowed: true,
      bounds: [[-79, 43], [-73, 45]],
      popopShowed: false,

      activeDrawRegion: true,
    };
  },

  created() {
    this.mapbox = Mapbox;
    setInterval(() => {
        this.activeDrawRegion = !this.activeDrawRegion
        console.log('on remove')
        // e.control.onRemove()
      }, 10000)
  },

  mounted() {
    window.promisify = promisify;
    // setTimeout(() => {
    //   this.defaultSearch = 'Moscow'
    // }, 10000),

    // setTimeout(() => {
    //   this.center = [20, 20]
    // }, 10000)

    // setTimeout(() => {
    //   // console.log('SHOW MAERKER!!!')
    //   this.markerShowed = true
    // }, 5000)
    let count = 0
    setInterval(() => {
      this.markerCoordinates = [this.markerCoordinates[0] + 0.00001,this.markerCoordinates[1] ]
      count++
      if(count === 100) {
        this.truckColor = this.truckColor === 'white' ? 'red' : 'white'
        if(this.rotation > 60) {
          this.rotation = 0
        }
        this.rotation = this.rotation + 6
        count = 0
      }
    },100)
  },

  updated() {
    // console.log('PARENT UPDATED!')
  },

  methods: {
    handleAddControl(e) {
      console.log('control', e.control)
      e.control.changeMode('draw_polygon')
      this.map.on('draw.create', (e) => {
        console.log('draw.create', e)
      })
      this.map.on("draw.update", (e) => {
        console.log('draw update', e)
      })
      
      // e.control.onAdd(this.map)
    }, 
    handleClick(e) {
      console.log('click', e)
    },
    handleMove(event) {
      console.log(event)
      
    },
    handleSearch(event) {
      // console.log(event)
    },
    handleZoom(event) {
      console.log(this.zoom)
    },

    catchLayerAdded(event) {
      // console.log(event)
    },

    catchLayerExists(event) {
      // console.log('Exists!')
      // console.logk(event)
      event.component.remove();
    },

    catchLayerRemoved(event) {
      // console.log('Removed!')
      // console.log(event)
    },

    async handleLoad({map,mapBox}) {
      console.log("MAP: ", map, mapBox);
      this.map = map

      // const actions = event.component.actions
      // const actions = promisify(event.map);
      // this.checkAsyncActions(actions, event.map)

      // event.map.addSource('cluster', this.geojsonEartchQuakesSource)

      // event.map.addSource('myImage', {
      //   type: 'image',
      //   url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2952178077,1217254625&fm=26&gp=0.jpg',
      //   coordinates: [
      //     [-76, 39],
      //     [-75, 39],
      //     [-75, 38],
      //     [-76, 38]
      //   ]
      // })
      // event.map.addLayer(
      //   {
      //     id: "cluster-count",
      //     type: "symbol",
      //     source: "cluster",
      //     filter: ["has", "point_count"],
      //     layout: {
      //       "text-field": "{point_count_abbreviated}",
      //       "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      //       "text-size": 12
      //     }
      // }, undefined)
    },

    async layerClickHandler(event) {
      if(this.geojsonLayer.layout.visibility === 'visible') {
        this.geojsonLayer.layout.visibility = 'none'
      } else {
        this.geojsonLayer.layout.visibility = 'visible'
      }
      console.log(this.geojsonLayer.layout.visibility)
      console.log("Evant: ", event)
      console.log("Evant features: ", event.mapboxEvent.features)
    },

    async checkAsyncActions(actions, map) {
      console.log(actions);
    },

    handleEvent(event) {
      console.log('EVENT: ',event, event.features)
    },
    onDragStart(event) {
      console.log('MARKER DRAG!', event)
    },
    onDragEnd(event) {
      console.log('MARKER DRAG END!', event)
    },
    onMarkerAdd(event) {
      console.log('Marker Added!', event)
    },
    handleGeolocate(event) {
      console.log('geolocate event!')
      console.log(event)
    }
  }
};
</script>

<style>
/* #map-wrapper {
  justify-content: center;
  height: 100vh;
  width: 100vw;
} */
#map-wrapper {
  height: 100vh;
  width: 100vw;
}
</style>
