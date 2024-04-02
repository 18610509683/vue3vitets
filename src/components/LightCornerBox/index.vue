<template>
  <div
    class="corner-box flex flex-direction"
    :style="{
      '--b':$props.boxBorderWidth,
      backgroundColor:$props.backgroundColor
    }"
  >
    <span
      v-for="corner in ['top-left', 'top-right', 'bottom-left', 'bottom-right']"
      :key="corner"
      :class="['corner',corner]"
      :style="{
        width: $props.width,
        height: $props.width,
        borderWidth: $props.borderWidth,
        borderColor: $props.color,
      }"
    ></span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "LightCornerBox",
  props: {
    width: {
      type: String,
      default: "10px",
    },
    borderWidth: {
      type: String,
      default: "2px",
    },
    color: {
      type: String,
      default: "", //variable["primaryColor--light-30"],
    },
    boxBorderWidth:{
      type:String,
      default:"1px"
    },
    backgroundColor:{
      type:String,
      default:'transparent'
    }
  },
};
</script>

<style scoped lang="less">
@import "../../assets/css/variable.less";
.corner-box {
  height: 100%;
  position: relative;
  // display: flex;
  border: var(--b) solid @border;
  .corner {
    display: block;
    position: absolute;
    border: 1px solid rgba(0,255,243,.5);
    border-style: solid;
    &.top-left {
      left: 0;
      top: 0;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
    }
    &.top-right {
      right: 0;
      top: 0;
      border-left-color: transparent !important;
      border-bottom-color: transparent !important;
    }
    &.bottom-left {
      left: 0;
      bottom: 0;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
    }
    &.bottom-right {
      right: 0;
      bottom: 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
    }
  }
}
</style>
