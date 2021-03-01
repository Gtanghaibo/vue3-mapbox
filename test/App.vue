<template>
  <div id="app">
    <geo-map />
  </div>
</template>
<script>
import GeoMap from './GeoMap.vue'
export default {
  components: {
    GeoMap
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  /* height: 100vh;
  width: 100vw; */
}
</style>
