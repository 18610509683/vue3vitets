<template>
	<div @click="requestFullScreen">
		<canvas :id="ids" :width="canvasW" :height="canvasH" :imgSrc="imgSrc"></canvas>
	</div>
</template>

<script>
var cacheData = undefined;
var cacheRect = undefined;
import { fabric } from "fabric"

export default {
	data() {
		return {
			canvas: null,
			rect: null,
		}
	},
	props: {
		ids: {
			type: String
		},
		imgSrc: {
			type: String,
			default: ""
		},
		canvasW: {
			type: Number,
			default: 424
		},
		pointsData: {
			type: Object,
			default: () => ({})
		},
		drawLine: {
			type: Boolean,
			default: true
		},
		fullScreenData: {
			type: Array,
			default: () => [{}]
		}
	},
	computed: {
		canvasH() {
			let w = this.canvasW;
			let w0 = this.pointsData.picWidth, h0 = this.pointsData.picHeight;
			if (w0 && h0) {
				return Math.floor(h0 / w0 * w)

			} else {
				return w * 9 / 16
			}
		}
	},
	mounted() {
		var _this = this;
		let tmpTimeout = setTimeout(() => {
			_this.drawImg();
			clearTimeout(tmpTimeout)
		})
		
		_this.$buses.$on('resultOver', data => {
			if (_this.drawLine&&_this.ids==data.id) {
				cacheData = data;
				_this.refreshRect(data)
			}
		})
	},
	methods: {
		drawImg(data) {
			var _this = this;
			let id = this.ids;
			var ctx = document.getElementById(id);
			if (!ctx) return;
			var con = ctx.getContext('2d');
			con.strokeStyle = '#f00';
			var img = new Image();
			let w = this.canvasW, h = this.canvasH;
			img.src = this.imgSrc;
			var temp = data || this.pointsData;
			let w0 = temp.picWidth, h0 = temp.picHeight;

			if (temp.rect) {
				temp = temp.rect.split(',');
				let x0 = temp[0], y0 = temp[1], x1 = temp[2], y1 = temp[3];
				let rectX = x0 / w0 * w, rectY = y0 / h0 * h, rectW = (x1 - x0) / w0 * w, rectH = (y1 - y0) / h0 * h;
				if (cacheRect) {
					con.strokeStyle = '#aaa';
					con.strokeRect(rectX, rectY, rectW, rectH);
				}
			}

			this.canvas = new fabric.Canvas(id, {
				backgroundColor: "rgb(100,100,200)", // 画布背景色
				selectionColor: "rgba(255,255,255,0.3)", // 画布中鼠标框选背景色
				selectionLineWidth: 1, // 画布中鼠标框选边框
				selection: false, // 在画布中鼠标是否可以框选 默认为true
			});
			img.onload = function () {
				let shape = new fabric.Image(img, {
					// 通过scale来设置图片大小，这里设置和画布一样大
					scaleX: w / w0,
					scaleY: h / h0,
				});
				_this.canvas.setBackgroundImage(shape, _this.canvas.renderAll.bind(_this.canvas));
				if (_this.drawLine) {
					_this.refreshRect(data)

				}
			}
			this.canvas.renderAll();


			// if (document.getElementById(id)) {
			// 	// IE9, Chrome, Safari, Opera
			// 	document.addEventListener("mousewheel", function (event) {
			// 		console.log(event)
			// 		if (event.target.className == "upper-canvas ") {
			// 			var zoom = (event.deltaY > 0 ? -0.1 : 0.1) + _this.canvas.getZoom();
			// 			console.log(zoom)
			// 			zoom = Math.max(0.1, zoom); //最小为原来的1/10
			// 			zoom = Math.min(3, zoom); //最大是原来的3倍
			// 			var zoomPoint = new fabric.Point(event.pageX, event.pageY);
			// 			console.log(zoomPoint)
			// 			_this.canvas.zoomToPoint(zoomPoint, zoom);
			// 		}
			// 	});
			// }
		},
		clearDraw() {
			if (this.rect) {
				if (this.canvas) {
					this.canvas.remove(this.rect)
				}
				this.rect = null
			}
		},
		refreshRect(data) {
			this.clearDraw();
			// let id = this.ids;
			// var ctx = document.getElementById(id);
			// var con = ctx.getContext('2d');
			let w = this.canvasW, h = this.canvasH;
			var temp = data || this.pointsData;
			let w0 = temp.picWidth, h0 = temp.picHeight;
			if (!temp.rect) return;
			// if (cacheRect) {
			// 	con.strokeStyle = '#aaa';
			// 	con.strokeRect(rectX, rectY, rectW, rectH);
			// }
			temp = temp.rect.split(',');
			let x0 = temp[0], y0 = temp[1], x1 = temp[2], y1 = temp[3];
			let rectX = x0 / w0 * w, rectY = y0 / h0 * h, rectW = (x1 - x0) / w0 * w, rectH = (y1 - y0) / h0 * h;
			if (x1 || y1) {

				this.rect = new fabric.Rect({
					top: rectY,
					left: rectX,
					width: rectW,
					height: rectH,
					fill: "rgba(255, 255, 255, 0)",
					stroke: 'red', // 边框原色
					strokeWidth: 2, // 边框大小
					// angle: 15,
					// selectable: false, // 是否允许当前对象被选中
					// hasRotatingPoint: false, // 取消旋转按钮？ 貌似不生效
					// mtr: false,  // 取消旋转按钮？ 貌似不生效
					lockRotation: true, // 不允许旋转
				});
				this.canvas.add(this.rect);

				// con.strokeStyle = '#f00';

				// cacheRect = [rectX, rectY, rectW, rectH];
				// con.strokeRect(rectX, rectY, rectW, rectH);
			}
		},
		requestFullScreen(val) {
			var datas = this.fullScreenData.slice();
			var type = this.drawLine;
			datas.push(type)
			this.$buses.$emit('fullScreenCanvas', datas);
		}
	}
}
</script>

<style scoped>
</style>