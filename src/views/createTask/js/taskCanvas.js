import { fabric } from "fabric";
class TaskCanvas {
  container = null;
  width = 0;
  height = 0;
  constructor({ id, dom }) {
    if (!this.container) {
      this.container = new fabric.Canvas(id, {
        width: dom.getBoundingClientRect().width,
        height: dom.getBoundingClientRect().height,
      });
    }
    this.drawRect();
  }
  drawRect() {
    let rect = new fabric.Rect({
      top: 20, // 距离画布顶部距离
      left: 30, // 距离画布左侧距离
      width: 60, // 矩形宽度
      height: 40, // 矩形高度
      lockMovementX: true,
      lockMovementY: true,
    });
    rect.on('mouseover',()=>{
       rect.set({
        stroke: '#95e1d3'
       })
       this.container.renderAll()
    })
    rect.on('mouseout',()=>{
        rect.set({
         stroke: 'red'
        })
        this.container.renderAll()
     })
    this.container.add(rect);
  }
}

export { TaskCanvas };
