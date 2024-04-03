import { fabric } from "fabric";
class TaskCanvas {
  container = null;
  width = 0;
  height = 0;
  isSelected = false;
  constructor({ id, dom }) {
    if (!this.container) {
      this.container = new fabric.Canvas(id, {
        width: dom.getBoundingClientRect().width,
        height: dom.getBoundingClientRect().height,
      });
    }
    this.drawRect();
    this.drawGroupCircle();
  }
  drawRect() {
    let rect = new fabric.Rect({
      top: 20, // 距离画布顶部距离
      left: 30, // 距离画布左侧距离
      width: 60, // 矩形宽度
      height: 40, // 矩形高度
      lockMovementX: true,
      lockMovementY: true,
      // hasBorders:false,
      hasControls: false,
      borderColor: "#00fff3",
      stroke: "#00fff3",
      strokeWidth: 1,
      fill: "#0B5B66",
    });
    // rect.on("selected", () => {
    //   rect.set({
    //     // strokeWidth:2,
    //   });
    //   this.container.renderAll();
    // });
    // rect.on("deselected", () => {
    //   rect.set({
    //   });
    //   console.log('取消选中');
    //   this.container.renderAll();
    // });
    this.container.add(rect);
  }
  drawGroupCircle() {
    let solidCircle = new fabric.Circle({
      name: "solidCircle",
      radius: 30,
      fill: "#00fff3",
      originX: "center",
      originY: "center",
      // borderColor:'#00fff3',
      // stoke:'#00fff3',
      // strokeWidth:1
    });
    let hollowCircle = new fabric.Circle({
      name: "hollowCircle",
      radius: 50,
      // borderColor:'#00fff3',
      stroke: "#00fff3",
      strokeWidth: 2,
      fill: "transparent",
      originX: "center",
      originY: "center",
    });
    let group = new fabric.Group([solidCircle, hollowCircle], {
      left: 150,
      top: 100,
    });
    group.on("mouse:down", ({ e, target }) => {
      this.isSelected=!this.isSelected
      if (this.isSelected) {
        target._objects[0].set({
          fill: "transparent",
        });
      } else {
        target._objects[0].set({
          fill: "#00fff3",
        });
      }

      this.container.renderAll();
    });
    this.container.add(group);
  }
}

export { TaskCanvas };
