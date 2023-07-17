import { watch } from 'vue';
export const useMapWatch = (props, map) => {
    watch(() => props.maxBounds, (nextVal, preVal) => {
        var _a;
        if (preVal === nextVal)
            return;
        (_a = map.value) === null || _a === void 0 ? void 0 : _a.setMaxBounds(nextVal);
    });
    watch(() => props.minZoom, (nextVal, preVal) => {
        var _a;
        if (preVal === nextVal)
            return;
        (_a = map.value) === null || _a === void 0 ? void 0 : _a.setMinZoom(nextVal);
    });
    watch(() => props.maxZoom, (nextVal, preVal) => {
        var _a;
        if (preVal === nextVal)
            return;
        (_a = map.value) === null || _a === void 0 ? void 0 : _a.setMaxZoom(nextVal);
    });
    watch(() => props.mapStyle, (nextVal, preVal) => {
        var _a;
        if (preVal === nextVal || !nextVal)
            return;
        (_a = map.value) === null || _a === void 0 ? void 0 : _a.setStyle(nextVal);
    });
    watch(() => props.collisionBoxes, (nextVal, preVal) => {
        if (preVal === nextVal || !map.value)
            return;
        map.value.showCollisionBoxes = nextVal;
    });
    watch(() => props.tileBoundaries, (nextVal, preVal) => {
        if (preVal === nextVal || !map.value)
            return;
        map.value.showTileBoundaries = nextVal;
    });
    watch(() => props.repaint, (nextVal, preVal) => {
        if (preVal === nextVal || !map.value)
            return;
        map.value.repaint = nextVal;
    });
    watch(() => props.zoom, (nextVal, preVal) => {
        var _a;
        if (preVal === nextVal)
            return;
        (_a = map.value) === null || _a === void 0 ? void 0 : _a.setZoom(nextVal);
    });
    watch(() => props.center, (nextVal, preVal) => {
        var _a;
        if (preVal === nextVal || !nextVal)
            return;
        (_a = map.value) === null || _a === void 0 ? void 0 : _a.setCenter(nextVal);
    });
    watch(() => props.bearing, (nextVal, preVal) => {
        var _a;
        if (preVal === nextVal)
            return;
        (_a = map.value) === null || _a === void 0 ? void 0 : _a.setBearing(nextVal);
    });
    watch(() => props.pitch, (nextVal, preVal) => {
        var _a;
        if (preVal === nextVal)
            return;
        (_a = map.value) === null || _a === void 0 ? void 0 : _a.setPitch(nextVal);
    });
};
