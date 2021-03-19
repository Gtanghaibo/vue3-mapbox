<template>
  <mgl-marker
    :coordinates="coordinates"
    :draggable="true"
    :rotation="0"
    color="green"
    @update:coordinates="onUpdate"
  >
    <template #marker>
      <div>
        <span
          class="markerCar"
          :style="{ color: truckColor }"
        >Tusimple Truck{{ coordinates }}</span>
      </div>
    </template>
  </mgl-marker>
</template>
<script>

import { MglMarker } from "../src/main";

export default {
	components: {
		MglMarker,
	},
	// props: {
	// 	rotation: {
	// 		type: [Number, Object, ],
	// 		default: 0,
	// 	},
	// 	position: {
	// 		type: Array,
	// 		required: true,
	// 	},
	// 	size: {
	// 		type: Object,
	// 		required: true,
	// 	},
	// 	latLng: {
	// 		type: Object,
	// 		required: true,
	// 	},
	// 	time: {
	// 		type: Object,
	// 	},
	// },
	emits: ['update:position', ],
	data () {
		return {
			active: true,
			show: true,
			truckColor: 'green',
			coordinates: [118.06442586659097, 39.7783133622499, ],
		}
	},
	computed: {
		draggable () {
			return this.active
		},
		// coordinates: {
		// 	get () {
		// 		return [this.latLng.lng, this.latLng.lat, ]
		// 	},
		// 	set (value) {
		// 		this.$emit('update:position', {
		// 			lng: value[0],
		// 			lat: value[1],
		// 		})
		// 	},
		// },
		sytheticRotation () {
			if (typeof this.rotation === 'object') {
				return this.rotation.z
			} else {
				return this.rotation
			}
		},
	},
	// watch: {
	// 	latLng: {
	// 		handler (value) {
	// 			debugger
	// 			this.coordinates = [value.lng, value.lat, ]
	// 		},
	// 		deep: true,
	// 		immediate: true,
	// 	},
	// },
	mounted () {
		setInterval(() => {
			this.coordinates = [this.coordinates[0] + 0.00001, this.coordinates[1], ]
		}, 100)
	},
	methods: {
		onUpdate (ncoordinates) {
			this.coordinates = ncoordinates
		},
		handleUpdateCoordinates (event) {
			// console.log('coordinates', event)
		},
	},
}
</script>
