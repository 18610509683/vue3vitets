<script setup lang="ts">

</script>

<template>
  <router-link to="task">task</router-link>
  <router-link to="remote">remote</router-link>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <div>
        <keep-alive max="15">
          <component :is="Component" v-if="route.meta.keepalive" :key="route.path" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepalive" :key="route.path" />
      </div>
    </transition>
  </router-view>
</template>
<style lang="scss"></style>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app{
  padding-top: 9.4444vh;
  background: url("../src/assets/img/bg.jpg") no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;  
}
</style>
