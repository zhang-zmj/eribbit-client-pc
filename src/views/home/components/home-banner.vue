<template>
  <div class="home-banner">
    <XtxCarousel :sliders="sliders" :autoPlay="true" />
  </div>
</template>
<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
import XtxCarousel from '@/components/library/xtx-carousel'
export default {
  name: 'HomeBanner',
  components: {
    XtxCarousel
  },
  setup() {
    const sliders = ref([])
    findBanner().then((data) => {
      sliders.value = data.result
    })
    return { sliders }
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
