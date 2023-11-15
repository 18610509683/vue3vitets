<template>
  <div>
    <swiperGroup></swiperGroup>
    <swiperGroup></swiperGroup>
    <swiperGroup :vertical="true"></swiperGroup>

  </div>
</template>

<script>
import swiperGroup from './swiperGroup.vue'
export default {
components:{swiperGroup}
}
</script>

<style>

</style>