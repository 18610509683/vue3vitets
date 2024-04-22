<template>
  <div class="w100 h100 p10-vw">
    <div class="w100 h100 flex align-center">
      <div class="Con-Left h100 flex flex-direction">
        <div class="event-Box flex align-center justify-between">
          <LightCornerBox
            width="10px"
            border-width="1px"
            class="flex event-line primary10-Bg"
            v-for="{ name, value, unit } in sensorsArr"
          >
            <p class="name">{{ name }}</p>
            <p class="value PMZD scrollbar-abnormal-nobar">
              {{ value }}<span class="unit SR">{{ unit }}</span>
            </p>
          </LightCornerBox>
        </div>
        <LightCornerBox
          width="10px"
          border-width="1px"
          class="flex video-Box margin-top-20"
        >
        </LightCornerBox>
        <LightCornerBox
          width="10px"
          border-width="1px"
          class="flex task-Box margin-top-20 flex-1"
        >
        </LightCornerBox>
      </div>
      <div class="Con-Right h100">
        <RightSide></RightSide>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import RightSide from "@/views/remote/components/RightSide.vue";

let sensorsArr = ref([
  { name: "氧气", value: 20, unit: "m" },
  { name: "氧气", value: 20, unit: "m" },
  { name: "氧气", value: 20, unit: "m" },
  { name: "氧气", value: 20, unit: "m" },
  { name: "氧气", value: 20, unit: "m" },
  { name: "氧气", value: 20, unit: "m" },
  { name: "氧气", value: 20, unit: "m" },
  { name: "氧气", value: 20, unit: "m" },
]);

</script>

<style scoped lang="less">
.Con-Left {
  flex: 1;
  .event-Box {
    .event-line {
      flex-direction: column;
      display: flex;
      padding-left: 15px;
      justify-content: center;
      width: 127px;
      height: 56px;
    }
  }
  .video-Box {
    height: 53.7vh;
    background: rgba(15, 75, 84, 0.5);
  }
  .task-Box {
    background: rgba(15, 75, 84, 0.5);
  }
}
.Con-Right {
  width: 19.84vw;
  margin-left: 20px;
}
</style>
