<template>
  <div class="page full_wh flex">
    <div
      class="model-left h100"
      style="
        width: 100%;
        height: 100%;
        position: relative;
        padding: 60px 0px 6px 20px;
      "
    >
    <slot name="left"></slot>
      <canvas
        id="canvas"
        style="border: 1px solid white; pointer-events: all"
      ></canvas>
    </div>
    <div class="model-right h100 flex flex-direction">
      <slot name="swd"></slot>
      <div class="model-form h100 flex-1">
        <slot name="right"></slot>
        <el-collapse>
          <el-collapse-item name="1">
            <template #title>表计参数</template>
            <div>
              <el-form :model="form" label-width="80px" label-position="left">
                <el-form-item label="识别对象">
                  <div class="flex align-center w100 mix-select">
                    <el-input
                      v-model="form.name"
                      placeholder="请输入识别对象的名称"
                      class="input"
                      clearable
                      @change="setName"
                      @focus="edit = true"
                      @blur="edit = false"
                    >
                      <template #suffix>
                        <i class="iconfont iconfont-shanchu-01"></i>
                      </template>
                    </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="区域标记">
                  <div class="flex align-center w100 mix-select">
                    <el-input
                      v-model="form.area"
                      placeholder="区域标记"
                      class="input"
                    >
                    </el-input>
                    <div class="flex align-center right-btn-opera">
                      <i class="iconfont iconfont-bianji-01 font-14-vw"></i>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="表计类型">
                  <div class="w100 h100 flex align-center flex-sub mix-select">
                    <el-select
                      v-model="form.meterType"
                      style="width:7.7vw"
                      suffix-icon=""
                      class="edit-type select-color"
                      popper-class="edit-type-popper"
                      @visible-change="handleSelectChange"
                    >
                      <el-option
                        v-for="item in meterTypeList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                    <div class="line"></div>
                    <el-select
                      class="edit-type"
                      v-model="form.meterOptions"
                      placeholder="请选择表计类型"
                      @visible-change="handleSelectChange"
                      @click="drawer = true"
                    >
                      <el-option
                        v-for="item in meterOptionsList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="数据模版">
                  <div class="w100 h100 flex align-center flex-sub mix-select">
                    <el-select
                      v-model="selectName"
                      placeholder=""
                      style="width: 3.2vw"
                      suffix-icon=""
                      class="edit-type"
                      popper-class="edit-type-popper"
                      @visible-change="handleSelectChange"
                    >
                      <el-option label="新增" value="1" />
                      <el-option label="更新" value="2" />
                    </el-select>
                    <div class="line"></div>
                    <el-select
                      class="edit-type"
                      v-model="selectName"
                      placeholder=""
                      @visible-change="handleSelectChange"
                    >
                      <el-option label="正面点位" value="1" />
                      <el-option label="背面点位" value="2" />
                    </el-select>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <el-drawer v-model="drawer" destroy-on-close class="drawer">
        <el-form-item label="表计类型">
          <div class="w100 h100 flex align-center flex-sub mix-select">
            <el-select
              disabled
              v-model="form.meterType"
              style="width: 8vw"
              class="edit-type"
              popper-class="edit-type-popper"
              @visible-change="handleSelectChange"
            >
              <el-option
                v-for="item in meterTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              class="hide-dropdown"
              v-model="form.meterOptions"
              placeholder="请选择表计类型"
              @visible-change="handleSelectChange"
              @click="drawer = true"
            >
              <!-- <el-option
                v-for="item in meterOptionsList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option> -->
            </el-select>
          </div>
        </el-form-item>
        <div>
          <div style="display: flex; background-color: #0d323f">
            <div style="width: 88px; height: 88px; border: 1px solid red">
              <img src="" alt="" />
            </div>
            <div
              style="
                flex: 1;
                border: 1px solid green;
                display: flex;
                flex-direction: column;
                padding: 8px 24px;
              "
            >
              <div style="height: 1.8229vw; line-height: 1.8229vw">
                &nbsp;指针表
              </div>
              <div
                style="
                  background: linear-gradient(
                    to right,
                    rgba(0, 255, 243, 0.1),
                    rgba(0, 255, 243, 0)
                  );
                  height: 1.8229vw;
                  line-height: 1.8229vw;
                "
              >
                &nbsp;电流指针表
              </div>
            </div>
          </div>
        </div>
      </el-drawer>
      <div class="model-btn-sty flex justify-end">
        <el-button class="el-btn-cancel" @click="cancelClick">取 消</el-button>
        <el-button type="primary" @click="confirmClick">保 存</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, initCustomFormatter, onMounted } from "vue";
import { ref } from "vue";
import { fabric } from "fabric";
import { isWhiteSpaceLike } from "typescript";

const { proxy } = getCurrentInstance();
let meterTypeList = ref([
  { name: "复合器件", value: 1 },
  { name: "手柄开关", value: 2 },
  { name: "数显表", value: 3 },
  { name: "液位表", value: 4 },
  { name: "指示灯组", value: 5 },
  { name: "指针表", value: 6 },
  { name: "转换开关", value: 7 },
]);
let meterOptionsList = ref([
  { name: "合闸电流指针表", value: 1 },
  { name: "千伏电压表", value: 2 },
  { name: "电压表", value: 3 },
  { name: "电流表", value: 4 },
]);
let form = ref({
  name: "",
  area: 888,
  meterType: 6,
  meterOptions: 3,
});
const drawer = ref(false);
const tempTop = ref(450);
const props = defineProps({
  publicData: {
    type: Object,
  },
});
const cancelClick = () => {};
const confirmClick = () => {};
onMounted(() => {
  init();
  // initCanvas();
  proxy.$bus.on("updateTop", (data) => {
    tempTop.value = data;
  });
});

let currentType = ref("rect"); // 当前操作模式（默认 || 创建矩形）
let downPoint = ref(null); // 按下鼠标时的坐标
let upPoint = ref(null); //
let canvas = ref(null);
let idList = ref([]);
let selectItem = ref(null);
let edit = ref(false);
// let selectItem = ref(null);

const init = () => {
  canvas = new fabric.Canvas("canvas", {
    width: 1400,
    height: 780,
  });

  canvas.on("mouse:down", canvasMouseDown); // 鼠标在画布上按下
  canvas.on("mouse:up", canvasMouseUp);
  canvas.on("selection:created", selectChangne);

  window.addEventListener("keydown", function (event) {
    // backspace 键删除
    switch (event.key) {
      case "Backspace":
        if (selectItem && !edit.value) {
          // 并删除id
          idList.value = idList.value.filter(
            (i) => i !== selectItem[selectItem.length - 1].id
          );
          canvas.remove(...selectItem);
          canvas.renderAll();
          selectItem = null;
        }
        break;
    }
  });
};
const selectChangne = (e) => {
  let activeList = canvas.getActiveObjects()[0].canvas._objects;
  let active = canvas.getActiveObject();
  activeList.forEach((i) => {
    if (i.id === active.id) {
      i.set("stroke", "#03e0d7");
    }
  });
  canvas.renderAll();
  selectItem = activeList.map((i) => {
    if (i.id === active.id) return i;
  });

  activeList.forEach((i) => {
    if (i.id !== active.id) {
      i.set("stroke", "#FFF");
    }
  });
};
const canvasMouseDown = (e) => {
  // 鼠标左键按下时，将当前坐标 赋值给 downPoint。{x: xxx, y: xxx} 的格式
  downPoint = e.absolutePointer;
};
const canvasMouseUp = (e) => {
  // 绘制矩形的模式下，才执行下面的代码
  // if (currentType === "rect") {
  // 松开鼠标左键时，将当前坐标 赋值给 upPoint
  upPoint = e.absolutePointer;
  // 调用 创建矩形 的方法
  createRect();
  // }
};
// 创建矩形
const createRect = () => {
  // 如果点击和松开鼠标，都是在同一个坐标点，不会生成矩形
  if (JSON.stringify(downPoint) === JSON.stringify(upPoint)) {
    return;
  }
  // 创建矩形
  // 矩形参数计算（前面总结的4条公式）
  let top = Math.min(downPoint.y, upPoint.y);
  let left = Math.min(downPoint.x, upPoint.x);
  let width = Math.abs(downPoint.x - upPoint.x);
  let height = Math.abs(downPoint.y - upPoint.y);
  let id = Date.now();
  form.value.area = `(${left},${top})~(${left + width}, ${top + height})`;
  // 矩形对象
  const rect = new fabric.Rect({
    type: "rect",
    id,
    top,
    left,
    width,
    height,
    fill: "transparent", // 填充色：透明
    stroke: "#fff", // 边框颜色：黑色
  });
  idList.value.push(id);

  const indexNumber = idList.value.findIndex((item) => item == id);
  const index = new fabric.Text((indexNumber + 1).toString(), {
    id,
    fontSize: 15,
    fontWeight: 100,
    fill: "#fff",
    top: top - 29,
    left: left + 6,
  });

  const circle = new fabric.Circle({
    id,
    top: top - 30,
    left,
    radius: 10, // 半径
    fill: "transparent", // 填充色：透明
    stroke: "#fff", // 边框颜色：黑色
  });

  const text = new fabric.Text(id.toString(), {
    type: "name",
    id,
    fontSize: 15,
    fontWeight: 100,
    fill: "#fff",
    top: top - 30,
    left: left + 30,
  });
  const lineStyle = {
    type: "line",
    id,
    stroke: "#fff", // 线的颜色
    strokeWidth: 1, // 线的宽度
    strokeDashArray: [10, 5],
  };
  const leftLine = new fabric.Line(
    [
      left,
      top, // 起始点坐标
      left + width,
      top + height, // 结束点坐标
    ],
    lineStyle
  );
  const rightLine = new fabric.Line(
    [
      left + width,
      top, // 起始点坐标
      left,
      top + height, // 结束点坐标
    ],
    { ...lineStyle, stroke: "#8c8987" }
  );
  // 将对角线添加到画布中
  canvas.add(leftLine, rightLine, index, circle, rect, text);
  // 创建完矩形，清空 downPoint 和 upPoint。当然，你也可以不做这步。
  downPoint = null;
  upPoint = null;
};
const setName = (value) => {
  const obj = selectItem[selectItem.length - 1];
  const index = idList.value.findIndex((item) => item == obj.id);
  obj.set("text", value);
  canvas.renderAll();
};

// const setArea = (value) => {
//   console.log("🚀 ~ setArea ~ value:", value);
// };
</script>

<style lang="scss" scoped>
@import "../../css/typeBaseStyle.scss";

.page {
  .model-right {
    .right-btn-opera {
      width: 3.54vw;
      height: 3.8vh;
      // border: 1px solid rgb(2, 156, 157);
      // border-left: none;
      // border-left: 0;
      i {
        width: 100%;
        text-align: center;
      }
    }
    .mix-select {
      border: 1px solid #029c9d;
      .line {
        height: 20px;
        width: 1px;
        background: linear-gradient(
          243deg,
          #002627 0%,
          white 51%,
          #002627 100%
        );
      }
    }
    .mix-select:hover {
      border: 1px solid rgba(0, 255, 243, 1);
    }
  }
}
:deep(.el-form) {
  padding-left: 0.52vw;
  .edit-type {
    .el-select__wrapper {
      box-shadow: none;
    }
  }
  .select-color {
    .el-select__wrapper {
      .el-select__selected-item {
        span:first-child {
          color: rgba(0, 255, 243, 1) !important;
        }
      }
    }
  }
  .input {
    .el-input__wrapper {
      border: none !important;
    }
    :hover {
      border: none !important;
      box-shadow: none;
    }
  }
}

:deep(.el-drawer) {
  width: 390px !important;
  margin-top: 10vh;
  background-color: #0b3743;
  // .el-select__popper.el-popper  {
  //   display: none !important;
  // }
}
// .edit-type {
// :deep(.el-popper-container-3318) {
//   display: none !important;
// }
.hide-dropdown {
  ::v-deep .el-select-dropdown {
    display: none !important;
  }
}
</style>
