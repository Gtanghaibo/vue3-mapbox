import DrawLineString from '@mapbox/mapbox-gl-draw/src/modes/draw_line_string'

const originalOnMouseMove = DrawLineString.onMouseMove

DrawLineString.onMouseMove = function (state, e) {
	console.log('mouse move', state, e)
	originalOnMouseMove.call(DrawLineString, state, e)
}

export default DrawLineString