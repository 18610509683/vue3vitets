<template>
  <div>
    <canvas id="c" width="500" height="400" style="border: 1px solid #ccc;"></canvas>
  </div>
</template>

<script setup lang="ts">
import { fabric } from "fabric";
import { onMounted } from "vue";
console.log(fabric)
onMounted(() => {
  // 初始化
  const canvas = new fabric.Canvas('c', {
    isDrawingMode: true
  })
  // 创建一个圆形对象
  let circle = new fabric.Circle({
    left: 0, //距离左边的距离
    top: 0, //距离上边的距离
    fill: "red", //填充的颜色
    radius: 50, //圆的半径
  });
  // 创建一个三角形对象
  let triangle = new fabric.Triangle({
    left: 200, //距离左边的距离
    top: 0, //距离上边的距离
    fill: "blue", //填充的颜色
    width: 100, //宽度
    height: 100, //高度
    shadow: "green 10px 10px 10px", //文字阴影,颜色，水平偏移，垂直偏移和模糊大小
  });
  // 将图形形添加到canvas画布上
  canvas.add(circle, triangle);

  let customPath = new fabric.Path("M 0 0 L 300 100 L 170 100  z");
  customPath.set({
    left: 100,
    top: 100,
    fill: "green",
  });
  canvas.add(customPath);
})
</script>

<style lang="scss" scoped></style>