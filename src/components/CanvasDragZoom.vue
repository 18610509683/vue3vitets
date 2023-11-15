<template>
  <div class="canvas-box" @click="canvasBoxClick">
    <div style="position: relative">
      <canvas id="dragZoomCanvas" @click="dragZoomCanvasClick"></canvas>
      <div class="iconBtn-box" @click="dragZoomCanvasClick">
        <span
          class="iconfont icon cursor-pointer kr-icon-flip-bottom"
          @click="verticalFlip"
          title="垂直翻转"
        ></span>
      </div>
    </div>
  </div>
</template>
  
<script>
var config = {
  width: 1536 & 0, // 设置canvas的宽
  height: 864 & 0, // 设置canvas的高
  imgSrc: "http://10.30.1.101:9000/video/20220616/Aips_photo/061802.jpg", // 图片路径
  maxScale: 4.0, // 最大放大倍数
  minScale: 1, // 最小放大倍数
  step: 0.1, // 每次放大、缩小 倍数的变化值
};
// 标记是否移动事件
var isMove = false;
var imgStatus = {
  scale: 1,
  rotate: 0,
};
var lastStatus = {
  imgX: 0,
  imgY: 0,
  mouseX: 0,
  mouseY: 0,
  translateX: 0,
  translateY: 0,
  scale: 1.0,
  rotate: 0,
};

/**
 * 计算相对于canvas左上角的坐标值
 */
function windowToCanvas(x, y) {
  var box = canvas.getBoundingClientRect();
  return {
    x: x - box.left,
    y: y - box.top,
  };
}
function drawImgByMove(x, y, drawElse) {
  lastStatus.translateX = lastStatus.translateX + (x - lastStatus.mouseX);
  lastStatus.translateY = lastStatus.translateY + (y - lastStatus.mouseY);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(lastStatus.translateX, lastStatus.translateY);
  ctx.rotate((imgStatus.rotate * Math.PI) / 180);
  ctx.scale(imgStatus.scale, imgStatus.scale);
  // ctx.drawImage(img, lastStatus.imgX, lastStatus.imgY, img.width, img.height);
  ctx.drawImage(
    img,
    lastStatus.imgX,
    lastStatus.imgY,
    canvas.width,
    canvas.height
  );

  if (drawElse) {
    drawElse(lastStatus.imgX, lastStatus.imgY);
  }
  ctx.restore();

  lastStatus.mouseX = x;
  lastStatus.mouseY = y;
}

function drawImgByStatus(x, y, drawElse) {
  var imgX = lastStatus.imgX - (x - lastStatus.translateX) / lastStatus.scale;
  var imgY = lastStatus.imgY - (y - lastStatus.translateY) / lastStatus.scale;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((imgStatus.rotate * Math.PI) / 180);
  ctx.scale(imgStatus.scale, imgStatus.scale);
  // ctx.drawImage(img, imgX, imgY, img.width, img.height);
  ctx.drawImage(img, imgX, imgY, canvas.width, canvas.height);

  if (drawElse) {
    drawElse(imgX, imgY);
  }
  ctx.restore();

  lastStatus = {
    imgX: imgX,
    imgY: imgY,
    translateX: x,
    translateY: y,
    mouseX: x,
    mouseY: y,
    scale: imgStatus.scale,
    rotate: imgStatus.rotate,
  };
}
function trimStr(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
function BytesCount(str) {
  var cnt = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (/^[\u4e00-\u9fa5]+$/i.test(c)) {
      cnt += 2;
    } else {
      cnt++;
    }
  }
  return cnt + 2;
}
function drawElse(imgX, imgY) {
  var drawLine = datas[datas.length - 1];
  if (!drawLine) return;
  //图片上画其他的，全写这里，坐标需要加上转换基准imgX,imgY
  datas.map((v, k) => {
    var temp = v;
    let con = ctx;
    let w0 = temp.picWidth,
      h0 = temp.picHeight;
    let canW = canvas.width,
      canH = canvas.height;
    if (temp.rect && temp.rect.indexOf(",") != -1) {
      temp = temp.rect.split(",");
      let x0 = temp[0],
        y0 = temp[1],
        x1 = temp[2],
        y1 = temp[3];
      let baseX = (x0 / w0) * canW,
        baseY = (y0 / h0) * canH,
        baseW = ((x1 - x0) / w0) * canW,
        baseH = ((y1 - y0) / h0) * canH;
      if (x1 || y1) {
        let titlelen = BytesCount(v.componentTypeName) + 3;
        // let titleW = 8.5 * titlelen <= baseW ? baseW : 8.5 * titlelen;
        let titleW = 8.5 * titlelen;

        con.fillStyle = "rgba(0, 0, 0, 0.5";
        con.fillRect(imgX + baseX, imgY + baseY - 40, titleW, 20);
        con.strokeStyle = "#E2FC00";

        if (v.confirmedNormal == "Y") {
          con.fillStyle = "#48e801";
          con.strokeStyle = "#48e801";
        } else {
          con.fillStyle = "#fe6e28";
          con.strokeStyle = "#fe6e28";
        }

        con.strokeRect(imgX + baseX, imgY + baseY, baseW, baseH);

        con.font = "16px lighter Source Han Sans CN";
        con.font = "16px Sarasa Gothic";
        canvas.style.letterSpacing = "1px";
        // con.fillStyle = "#E2FC00";

        con.textBaseline = "top";
        con.textAlign = "left";
        con.lineWidth = 2;

        con.fillText(
          k + 1 + ". " + v.name || v.componentTypeName,
          imgX + baseX + 2,
          imgY + baseY - 36
        );
        v.componentValue = trimStr(v.componentValue);
        let len = BytesCount(v.componentValue) + 2;
        let resultInfo = v.componentValue;
        if (v.componentUnit) {
          len += BytesCount(v.componentUnit) + 2;
          resultInfo += " " + v.componentUnit;
        }
        con.font = "12px Sarasa Gothic";

        con.fillStyle = "rgba(0, 0, 0, 0.5";
        let textW = 6.1 * len <= baseW ? baseW : 6.1 * len;
        con.fillRect(imgX + baseX, imgY + baseY - 20, textW + 30, 20);
        con.fillStyle = "#48e801";

        con.fillText(resultInfo, imgX + baseX + 2, imgY + baseY - 14);

        if (v.confirmedNormal == "Y") {
          // 正常
          con.fillStyle = "#0f0";
          con.fillText("正常", imgX + baseX + 6.1 * len - 6, imgY + baseY - 14);
        } else {
          con.font = "14px Sarasa Gothic";
          con.fillStyle = "#f2f";
          con.fillStyle = "#fe6e28";
          con.fillText("异常", imgX + baseX + 6.1 * len - 6, imgY + baseY - 14);
        }
      }
    }
  });
}

var datas = null; //传入的数据，图片上要画的文字坐标等
var canvas = null;
var ctx = null;
var img = null;
var winCw = undefined,
  winCh = undefined;
export default {
  data() {
    return {};
  },
  props: {
    fullScreenCanvas: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => config,
    },
  },
  mounted() {
    let scaleSize=0.9;
    canvas = document.getElementById("dragZoomCanvas");
    (winCw = document.body.clientWidth), (winCh = document.body.clientHeight);
    config.height = config.height || winCh * 0.9;
    config.width = (config.height / 9) * 16;
    canvas.width = config.width*scaleSize;
    canvas.height = config.height*scaleSize;
    ctx = canvas.getContext("2d");
    img = new Image();

    canvas.onmousedown = function (e) {
      isMove = true;
      canvas.style.cursor = "move";

      var box = windowToCanvas(e.clientX, e.clientY);
      lastStatus.mouseX = box.x;
      lastStatus.mouseY = box.y;
    };

    canvas.onmouseout = function () {
      isMove = false;
      canvas.style.cursor = "default";
    };

    canvas.onmouseup = function () {
      isMove = false;
      canvas.style.cursor = "default";
    };

    canvas.onmousemove = function (e) {
      if (isMove) {
        var box = windowToCanvas(e.clientX, e.clientY);
        drawImgByMove(box.x, box.y, drawElse);
      }
    };

    canvas.onmousewheel = function (e) {
      if (e.wheelDelta > 0) {
        imgStatus.scale =
          imgStatus.scale >= config.maxScale
            ? config.maxScale
            : imgStatus.scale + config.step;
      } else {
        imgStatus.scale =
          imgStatus.scale <= config.minScale
            ? config.minScale
            : imgStatus.scale - config.step;
      }
      var mXY = windowToCanvas(e.clientX, e.clientY);
      drawImgByStatus(mXY.x, mXY.y, drawElse);
    };
    document.onkeydown = function (event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      e.preventDefault(); //阻止默认事件
      if (e.keyCode == 107) {
        // 键盘加号
        imgStatus.scale =
          imgStatus.scale >= config.maxScale
            ? config.maxScale
            : imgStatus.scale + (config.step / 5) * lastStatus.scale;
        drawImgByStatus(canvas.width / 2, canvas.height / 2, drawElse);
      }
      if (e.keyCode == 109) {
        // 键盘减号
        imgStatus.scale =
          imgStatus.scale <= config.minScale
            ? config.minScale
            : imgStatus.scale - (config.step / 5) * lastStatus.scale;
        drawImgByStatus(canvas.width / 2, canvas.height / 2, drawElse);
      }
      if (e.keyCode == 38) {
        //键盘上箭头
        // drawImgByMove(lastStatus.mouseX, lastStatus.mouseY - 4 * lastStatus.scale)
        drawImgByMove(
          lastStatus.mouseX,
          lastStatus.mouseY + 4 * lastStatus.scale,
          drawElse
        );
      }
      if (e.keyCode == 40) {
        //键盘下箭头
        // drawImgByMove(lastStatus.mouseX, lastStatus.mouseY + 4 * lastStatus.scale)
        drawImgByMove(
          lastStatus.mouseX,
          lastStatus.mouseY - 4 * lastStatus.scale,
          drawElse
        );
      }
      if (e.keyCode == 37) {
        //键盘左箭头
        // drawImgByMove(lastStatus.mouseX - 4 * lastStatus.scale, lastStatus.mouseY)
        drawImgByMove(
          lastStatus.mouseX + 4 * lastStatus.scale,
          lastStatus.mouseY,
          drawElse
        );
      }
      if (e.keyCode == 39) {
        //键盘右箭头
        // drawImgByMove(lastStatus.mouseX + 4 * lastStatus.scale, lastStatus.mouseY)
        drawImgByMove(
          lastStatus.mouseX - 4 * lastStatus.scale,
          lastStatus.mouseY,
          drawElse
        );
      }
    };
    canvas.ondblclick = function () {
      // 双击重置
      canvas = document.getElementById("dragZoomCanvas");
      canvas.width = config.width;
      canvas.height = config.height;
      imgStatus = {
        scale: 1,
        rotate: 0,
      };
      lastStatus = {
        imgX: 0,
        imgY: 0,
        mouseX: 0,
        mouseY: 0,
        translateX: 0,
        translateY: 0,
        scale: 1.0,
        rotate: 0,
      };
      drawImgByStatus(canvas.width / 2, canvas.height / 2, drawElse);
    };
  },
  beforeDestroy() {
    document.onkeydown = null;
  },
  methods: {
    init(data) {
      console.log(data)
      datas = data;
      var drawLine = data[data.length - 1];

      var url = drawLine ? data[0].componentPic : data[0].componentDefaultPic;
      if (!canvas) return;
      img.src = window.baseResources + url || config.imgSrc;
      img.onload = function () {
        imgStatus = {
          scale: 1,
          rotate: 0,
        };
        lastStatus = {
          imgX: 0,
          imgY: 0,
          mouseX: 0,
          mouseY: 0,
          translateX: 0,
          translateY: 0,
          scale: 1.0,
          rotate: 0,
        };
        drawImgByStatus(canvas.width / 2, canvas.height / 2, drawElse);
      };
    },
    canvasBoxClick() {
      this.$emit("update:fullScreenCanvas", false);
    },
    dragZoomCanvasClick(e) {
      e.stopPropagation();
    },
    verticalFlip(e) {
      e.stopPropagation();
      let rotate = parseInt(imgStatus.rotate / 90) * 90 + 180;
      imgStatus.rotate = rotate;
      drawImgByStatus(canvas.width / 2, canvas.height / 2, drawElse);
    },
  },
};
</script>
  
<style scoped>
.canvas-box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.drag-box {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}

#dragZoomCanvas {
  background-color: inherit;
  border: 0.5px solid #888;
}

.iconBtn-box {
  width: 100%;
  position: absolute;
  top: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>