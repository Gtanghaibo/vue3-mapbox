<template>
  <div id="map-wrapper">
    <!-- <canvas id="myCanvas" width="100" height="100">

    </canvas> -->
    <mgl-map
      v-model:center="center"
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      v-model:zoom="zoom"
      :hash="true"
      @zoomend="handleEvent"
      @load="handleLoad"
      :lazy="true"
    >
      <mgl-marker
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
       <mgl-popup>
          <span>I'am POPUP!</span>
          <!-- <popup-comp /> -->
        </mgl-popup>
        <!-- TODO multi elements -->
       <!-- <h2>Marker!</h2> -->
       <!-- <div style="" >Tusimple Truck</div> -->
      </template>
      </mgl-marker>
    <mgl-marker :coordinates="markerCoordinates" :offset="[50,50]">
      <template v-slot:marker>
        <h2> the marker text</h2>
      </template>
    </mgl-marker>
    </mgl-map>
  </div>
</template>


<script>
import Mapbox from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PopupWrapper from "./PopupWrapper.vue"
// import MglGeocoderControl from "vue-mapbox-geocoder";

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
  MglImageLayer
} from "../src/main";
// import MglGeocoderControl from "vue-mapbox-geocoder";
import circle from "@turf/circle";
import promisify from "map-promisified";

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
    MglMarker,
    MglPopup,
    MglGeojsonLayer,
    MglCanvasLayer,
    MglImageLayer,
    MglVectorLayer,
    MglRasterLayer,
    PopupWrapper
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

      geojsonEartchQuakesSource: {
        data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 ,// Radius of each cluster when clustering points (
          type: 'geojson',
      },

      clusterLayers: [
        {
          id: "clusters",
          type: "circle",
          source: "earthquakes",
          filter: ["has", "point_count"],
          paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1"
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40
            ]
          }
        },
        {
          id: "cluster-count",
          type: "symbol",
          source: "earthquakes",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
          }
        },
        {
          id: "unclustered-point",
          type: "circle",
          source: "earthquakes",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
          }
        }
      ],

      vectorLayer: {
        id: "terrain-data",
        type: "line",
        "source-layer": "contour",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: { "line-color": "#ff69b4", "line-width": 1 }
      },
      vectorSource: {
        url: "mapbox://mapbox.mapbox-terrain-v2"
      },
      imageSource: {
        coordinates: [
            [-76, 39],
            [-75, 39],
            [-75, 38],
            [-76, 38]
        ],
        url: "https://vignette.wikia.nocookie.net/mariofanon/images/a/af/Tux.png/revision/latest?cb=20170823022812"
      },
      imageLayer: {
        type: "raster"
      },
      rasterSource: {
        url: "mapbox://mapbox.streets"
      },
      rasterLayer: {
        type: "raster"
      }
    };
  },

  created() {
    this.mapbox = Mapbox;
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
    },17)
  },

  updated() {
    // console.log('PARENT UPDATED!')
  },

  methods: {
    handleSearch(event) {
      // console.log(event)
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

    async handleLoad(event) {
      console.log("MAP: ", event);

      const actions = event.component.actions
      // const actions = promisify(event.map);
      this.checkAsyncActions(actions, event.map)

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
