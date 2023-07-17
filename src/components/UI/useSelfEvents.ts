import { useMapEvent, useMapEventParams } from '../../lib/useEvents'

interface useSelfEventsReturnType {
  bindSelfEvents: (events: string[], emitter) => void
  unbindSelfEvents: (events: string[], emitter) => void
}

export const useSelfEvents = (params: useMapEventParams): useSelfEventsReturnType => {
  const { emitMapEvent } = useMapEvent(params)
  const emitSelfEvent = (event, data = {}): void => {
    emitMapEvent(event, data)
  }
  const bindSelfEvents = (events: string[], emitter): void => {
    events.forEach(eventName => {
      emitter.on(eventName, emitSelfEvent)
    })
  }
  const unbindSelfEvents = (events: string[], emitter): void => {
    if (events.length === 0) return
    if (!emitter) return
    events.forEach(eventName => {
      emitter.off(eventName, emitSelfEvent)
    })
  }
  return {
    bindSelfEvents,
    unbindSelfEvents
  }
}
