<template>
  <div id="map-wrapper">
<!--     <canvas id="myCanvas" width="100" height="100">

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
      v-model:bounds="bounds"
    >
      <mgl-navigation-control position="top-left" />
      <mgl-geolocate-control
        position="top-left"
        @geolocate="handleGeolocate"
      />
      <mgl-attribution-control position="top-right" />
      <mgl-scale-control />
      <mgl-fullscreen-control />
      <MglGeocoderControl
        :accessToken="accessToken"
        @results="handleEvent"
        @result="handleEvent"
        @loading="handleEvent"
        @clear="handleEvent"
      />
      <mgl-marker
        v-if="markerShowed"
        v-model:coordinates="markerCoordinates"
        :draggable="true"
        color="green"
        @added="onMarkerAdd"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
      >
      <template slot:marker>
        <h2 >Marker!</h2>
        <mgl-popup>
          <span>I'am POPUP!</span>
          <popup-comp />
        </mgl-popup>
      </template>
      </mgl-marker>
      <!-- <mgl-marker
        v-if="markerShowed"
        :coordinates="markerCoordinates2"
        :draggable="true"
        color="red"
        @added="onMarkerAdd"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
      >
        <h2 slot="marker">Marker!</h2>
        <PopupWrapper />
          <span>I'am POPUP2!</span>
        </mgl-popup>
      </mgl-marker> -->
      <mgl-geojson-layer
        sourceId="radius"
        layerId="radius"
        :layer="geojsonLayer"
        v-model:source="geojsonSource"
        @click="layerClickHandler"
      />
      <!-- <mgl-geojson-layer
        v-for="layer in clusterLayers"
        :key="layer.id"
        :layerId="layer.id"
        :layer="layer"
        sourceId="earthquakes"
        :source="geojsonEartchQuakesSource"
        @click="layerClickHandler"
      /> -->
      <!-- <mgl-vector-layer
        sourceId="terrain-data"
        :source="vectorSource"
        :layer="vectorLayer"
        layerId="terrain"
      >
      </mgl-vector-layer> -->
<!--       <mgl-canvas-layer
        :source="{
          canvas: 'myCanvas',
          coordinates:[
            [-76, 39],
            [-75, 39],
            [-75, 38],
            [-76, 38]
          ]}"
        sourceId="myCanvas"
        :layer="{
          type: 'raster'
        }"
        layerId="myCanvas"
      /> -->

      <!-- <mgl-image-layer
        sourceId="myImage"
        layerId="myImage"
        :source="imageSource"
        :layer="imageLayer"
      /> -->
<!--       <MglRasterLayer
        layerId="rasterTest"
        before="myImage"
        sourceId="rasterTestSource"
        :source="rasterSource"
        :layer="rasterLayer"
      /> -->
    </mgl-map>
  </div>
</template>


<script>
import Mapbox from "mapbox-gl";
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
} from "../src_old/main";
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

  data() {
    return {
      accessToken:
        "pk.eyJ1Ijoic29hbCIsImEiOiJjaW1qZndnMmwwMDEzdzBtNHRxcGFrampqIn0.bpwowsJ4GLBdsPnnXuZboA",
      // mapStyle: 'mapbox://styles/soal/cimlxnm0d006yzpmccqs5dg01',
      mapStyle: "mapbox://styles/soal/cimlxnm0d006yzpmccqs5dg01",
      defaultSearch: "Bodhgaya",
      markerCoordinates: [50, 50],
      markerCoordinates2: [60, 60],
      // center: [30, 30],
      center: [-75.465, 38.476],
      zoom: 5,
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

      const actions = event.component.actions
      // const actions = promisify(event.map);
      this.checkAsyncActions(actions, event.map)

      event.map.addSource('cluster', this.geojsonEartchQuakesSource)

      event.map.addSource('myImage', {
        type: 'image',
        url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2952178077,1217254625&fm=26&gp=0.jpg',
        coordinates: [
          [-76, 39],
          [-75, 39],
          [-75, 38],
          [-76, 38]
        ]
      })
      event.map.addLayer(
        {
          id: "cluster-count",
          type: "symbol",
          source: "cluster",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
          }
      }, undefined)
    },

    async layerClickHandler(event) {
      // const { component, mapboxEvent } = event;
      // const features = component.getRenderedFeatures(mapboxEvent.point);

      // const clusterId = features[0].properties.cluster_id;

      // const zoom = await component.getClusterExpansionZoom(clusterId);
      // console.log("ZOOM!", zoom);
    },

    async checkAsyncActions(actions, map) {
      
      // const panByRes = await actions.panBy([30, 40]);
      // console.log("panBy result: ", panByRes);

      // const setCenterRes = await actions.setCenter([60, 60]);
      // console.log("setCenter result: ", setCenterRes);

      // const panToRes = await actions.panTo([10, 10])
      // console.log('panTo result: ', panToRes)

      // const setZoomRes = await actions.setZoom(5)
      // console.log('setZoom result: ', setZoomRes)

      // const zoomToRes = await actions.zoomTo(2)
      // console.log('zoomTo result: ', zoomToRes)

      // const zoomInRes = await actions.zoomIn()
      // console.log('zoomIn result: ', zoomInRes)

      // const zoomOutRes = await actions.zoomOut()
      // console.log('zoomOut result: ', zoomOutRes)

      // const setBearingRes = await actions.setBearing(20)
      // console.log('setBearing result: ', setBearingRes)

      // const rotateToRes = await actions.rotateTo(40)
      // console.log('rotateTo result: ', rotateToRes)

      // const resetNorthRes = await actions.resetNorth()
      // console.log('resetNorth result: ', resetNorthRes)

      // const snapToNorthRes = await actions.snapToNorth()
      // console.log('snapToNorth result: ', snapToNorthRes)

      // const setPitchRes = await actions.setPitch(7)
      // console.log('setPitch result: ', setPitchRes)

      // const jumpToRes = await actions.jumpTo({ center: [0, 0], zoom: 9 })
      // console.log('jumpTo result: ', jumpToRes)

      // const easeToRes = await actions.easeTo({
      //   center: [66, 66],
      //   zoom: 9,
      //   speed: 0.2
      // })
      // console.log('easeTo result: ', easeToRes)

      // const flyToRes = await actions.flyTo({
      //   center: [30, 30],
      //   zoom: 9,
      //   speed: 1,
      //   curve: 1,
      //   easing(t) {
      //     return t;
      //   }
      // });
      // console.log("flyTo result: ", flyToRes);

      // const bbox = [[-79, 43], [-73, 45]];
      // const fitBoundsRes = await actions.fitBounds(bbox, {
      //   padding: { top: 10, bottom: 25, left: 15, right: 5 }
      // })
      // console.log('fitBounds result: ', fitBoundsRes)

      // const p0 = [220, 400];
      // const p1 = [500, 900];
      // const fitScreenCoordinatesRes = await actions.fitScreenCoordinates(p0, p1, map.getBearing(), {
      //   padding: {top: 10, bottom:25, left: 15, right: 5}
      // })
      // console.log('fitScreenCoordinates result: ', fitScreenCoordinatesRes)
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
