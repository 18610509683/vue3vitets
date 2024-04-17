import { fabric } from "fabric";
class TaskCanvas {
  container = null;
  width = 0;
  height = 0;
  isSelected = false;
  isSelected2 = false;
  constructor({ id, dom,cpPosition,ctPosition }) {
    if (!this.container) {
      this.container = new fabric.Canvas(id, {
        width: dom.getBoundingClientRect().width,
        height: dom.getBoundingClientRect().height,
        preserveObjectStacking: true,
      });
    }
    this.drawRect(ctPosition);
    this.drawMultipleDevices(ctPosition);
    this.drawSingleDevice(ctPosition);
  }
  drawRect() {
    let rect = new fabric.Rect({
      top: 20, // 距离画布顶部距离
      left: 30, // 距离画布左侧距离
      width: 200, // 矩形宽度
      height: 350, // 矩形高度
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
  drawSingleDevice(ctPosition) {
    let solidCircle = new fabric.Circle({
      name: "solidCircle",
      radius: 30,
      fill: "transparent",
      originX: "center",
      originY: "center",
    });
    let hollowCircle = new fabric.Circle({
      name: "hollowCircle",
      radius: 50,
      stroke: "#fff",
      strokeWidth: 2,
      fill: "#0b5b66",
      originX: "center",
      originY: "center",
    });
    let group = new fabric.Group([hollowCircle, solidCircle], {
      borderColor: "transparent",
      hasControls: false,
      top: 240, // 距离画布顶部距离
      left: 80,
      lockMovementX: true,
      lockMovementY: true,
    });
    group.on("mousedown", ({ e, target }) => {
      this.isSelected = !this.isSelected;
      if (this.isSelected) {
        target._objects[1].set({
          fill: "#00fff3",
        });
        target._objects[0].set({
          stroke: "#00fff3",
        });
      } else {
        target._objects[1].set({
          fill: "transparent",
        });
        target._objects[0].set({
          stroke: "#fff",
        });
      }

      this.container.renderAll();
    });
    group.on("mouseover", ({ e, target }) => {
      ctPosition.show=true
      ctPosition.left=e.offsetX
      ctPosition.top=e.offsetY
      target._objects[0].set({
        stroke: "#00fff3",
      });
      this.container.renderAll();
    });
    group.on("mouseout", ({ e, target }) => {
      ctPosition.show=false
      if (!this.isSelected) {
        target._objects[0].set({
          stroke: "#fff",
        });
      }
      this.container.renderAll();
    });
    this.container.add(group);
  }
  drawMultipleDevices(ctPosition) {
    let solidCircle = new fabric.Circle({
      name: "solidCircle",
      radius: 30,
      fill: "transparent",
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
      stroke: "#fff",
      strokeWidth: 2,
      fill: "#0b5b66",
      originX: "center",
      originY: "center",
    });
    let hollowCircle2 = new fabric.Circle({
      name: "hollowCircle",
      radius: 50,
      // borderColor:'#00fff3',
      stroke: "#fff",
      strokeWidth: 2,
      fill: "#0b5b66",
      originX: "center",
      originY: "center",
      left: 20,
    });
    let group = new fabric.Group([hollowCircle2, hollowCircle, solidCircle], {
      borderColor: "transparent",
      hasControls: false,
      top: 50, // 距离画布顶部距离
      left: 70,
      lockMovementX: true,
      lockMovementY: true,
    });
    group.on("mousedown", ({ e, target }) => {
      this.isSelected2 = !this.isSelected2;
      if (this.isSelected2) {
        target._objects[2].set({
          fill: "#00fff3",
        });
        target._objects[1].set({
          stroke: "#00fff3",
        });
        target._objects[0].set({
          stroke: "#00fff3",
        });
      } else {
        target._objects[2].set({
          fill: "transparent",
        });
        target._objects[1].set({
          stroke: "#fff",
        });
        target._objects[0].set({
          stroke: "#fff",
        });
      }

      this.container.renderAll();
    });
    group.on("mouseover", ({ e, target }) => {
      ctPosition.show=true
      ctPosition.left=e.offsetX
      ctPosition.top=e.offsetY
      target._objects[0].set({
        stroke: "#00fff3",
      });
      target._objects[1].set({
        stroke: "#00fff3",
      });
      this.container.renderAll();
    });
    group.on("mouseout", ({ e, target }) => {
      ctPosition.show=false
      if (!this.isSelected2) {
        target._objects[0].set({
          stroke: "#fff",
        });
        target._objects[1].set({
          stroke: "#fff",
        });
      }
      this.container.renderAll();
    });
    this.container.add(group);
  }
}

export { TaskCanvas };
