<template>
  <div class="popup-wrapper">
    <mgl-popup>
      <span>I'am POPUP2 inside wrapper!</span>
          <!-- <popup-comp /> -->
    </mgl-popup>
  </div>
</template>

<script>
import { MglPopup } from '../src/main';

export default {
  name: 'PopupWrapper',
  components: {
    MglPopup
  }
}
</script>
