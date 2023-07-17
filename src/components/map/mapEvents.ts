export interface EventItem {
  name: string
}

// TODO: focus ego是moveend的事件触发太快

const mapEvents: Record<string, EventItem> = {
  resize: { name: 'resize' },
  webglcontextlost: { name: 'webglcontextlost' },
  webglcontextrestored: { name: 'webglcontextrestored' },
  remove: { name: 'remove' },
  movestart: { name: 'movestart' },
  load: { name: 'load' },
  contextmenu: { name: 'contextmenu' },
  dblclick: { name: 'dblclick' },
  click: { name: 'click' },
  touchcancel: { name: 'touchcancel' },
  touchmove: { name: 'touchmove' },
  touchend: { name: 'touchend' },
  touchstart: { name: 'touchstart' },
  dataloading: { name: 'dataloading' },
  mousemove: { name: 'mousemove' },
  mouseup: { name: 'mouseup' },
  mousedown: { name: 'mousedown' },
  sourcedataloading: { name: 'sourcedataloading' },
  error: { name: 'error' },
  data: { name: 'data' },
  styledata: { name: 'styledata' },
  sourcedata: { name: 'sourcedata' },
  mouseout: { name: 'mouseout' },
  styledataloading: { name: 'styledataloading' },
  moveend: { name: 'moveend' },
  move: { name: 'move' },
  render: { name: 'render' },
  zoom: { name: 'zoom' },
  zoomstart: { name: 'zoomstart' },
  zoomend: { name: 'zoomend' },
  boxzoomstart: { name: 'boxzoomstart' },
  boxzoomcancel: { name: 'boxzoomcancel' },
  boxzoomend: { name: 'boxzoomend' },
  rotate: { name: 'rotate' },
  rotatestart: { name: 'rotatestart' },
  rotateend: { name: 'rotateend' },
  dragend: { name: 'dragend' },
  drag: { name: 'drag' },
  dragstart: { name: 'dragstart' },
  pitch: { name: 'pitch' },
  idle: { name: 'idle' }
}

export default mapEvents
