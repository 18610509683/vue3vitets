<template>
  <div class="pos_abs">
    <router-link to="task">task</router-link>
    <router-link to="remote">remote</router-link>
    <router-link to="test">test</router-link>
  </div>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <div class="full_wh">
        <keep-alive max="15">
          <component :is="Component" v-if="route.meta.keepalive" :key="route.path" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepalive" :key="route.path" />
      </div>
    </transition>
  </router-view>
</template>
<script setup lang="ts">

</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #fff;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

#app {
  padding-top: 9.4444vh;
  background: url("../src/assets/img/bg.jpg") no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;
}
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 16px;
  background-color: inherit;
}

/* 内阴影+圆角 */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

/* 滑块内阴影+圆角 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #3D5D65;
}
</style>
<style lang="scss">
#app {
  overflow: hidden;

  a {
    display: inline-block;
    padding: 0 10px;
  }
}
.pos_abs{
  position: absolute;
  top:5vh;
}
.full_wh {
  width: 100%;
  height: 100%;
}
</style>