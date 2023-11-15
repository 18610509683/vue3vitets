<template>
  <div class="margin-4r" :style="bigStyle">
    <swiper :options="bigImgOption" class="img-big" :ref="`swiperTop${idRan}`">
      <swiper-slide v-for="(item, k) in bigImgAr" :key="k">
        <!-- <img
          :style="bigStyle"
          :src="item"
          alt="暂无图片"
          @click="requestFullScreenMore(k, true)"
        /> -->
        <el-image class="el_empty_box" :src="item">
          <div slot="error">
            <emptyResult
              text="暂无图片"
              img="./images/no_pictures.png"
              :special='true'
            />
          </div>
        </el-image>
      </swiper-slide>
    </swiper>
    <swiper
      :options="thumbsOption"
      :id="`img-thumbs${idRan}`"
      class="img-thumbs"
      :ref="`swiperThumbs${idRan}`"
      :style="thumbsBoxStyle"
    >
      <swiper-slide
        :class="['result-img', vertical ? 'verClass' : 'horClass']"
        v-for="(item, k) in thumbsImgAr"
        :key="k"
        :style="thumbsStyle"
      >
        <el-image class="el_empty_box" :src="item">
          <div slot="error">
            <emptyResult
              :style="thumbsStyle"
              :vertical="vertical"
              :emptyWH="emptyWH"
              text="暂无图片"
              img="/images/no_picture.png"
            />
          </div>
        </el-image>
        <!-- <img :style="thumbsStyle" :src="item" alt="" /> -->
        <!-- <emptyResult  :style="thumbsStyle" :vertical="vertical" :emptyWH="emptyWH" text="暂无图片" img="/images/no_picture.png"/> -->
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import emptyResult from "./emptyResult.vue";

function getRan(n) {
  return Math.floor(Math.random() * n);
}
export default {
  components: {
    emptyResult,
  },
  props: {
    vo: {
      default: () => ({
        defaultPic: ",,",
        results: [
          {
            value: ",,",
          },
        ],
      }),
    },
    width: {
      default: "424px",
    },
    height: {
      default: "288px",
    },
    vertical: {
      default: false, //缩率图水平或垂直
    },
    bigImgAr: {
      default: () => [
        "http://10.30.1.135:9000/video/20220823/Hcnet_photo/033048.jpeg",
        "http://10.30.1.135:9000/video/20220823/Hcnet_photo/033048.jpeg",
        "http://10.30.1.135:9000/video/20220823/Hcnet_photo/033048.jpeg",
      ],
    },
    thumbsImgAr: {
      default: () => [
        "http://10.30.1.135:9000/video/20220823/Hcnet_photo/033048.jpeg",
        "http://10.30.1.135:9000/video/20220823/Hcnet_photo/033048.jpeg",
        "http://10.30.1.135:9000/video/20220823/Hcnet_photo/033048.jpeg",
      ],
    },
  },
  computed: {
    emptyWH() {
      let v = this.vertical;
      let w = this.width;
      let h = this.height;
      let wN = parseInt(w); //bigStyle宽度
      let hN = parseInt(h); //bigStyle高度
      let len = this.thumbsImgAr.length;
      var res;
      if (v) {
        //垂直
        res = (hN - 20) / len - 2 + "px";
      } else {
        //水平
        res = (wN - 20) / len - 2 + "px";
      }
      return res;
    },
    bigStyle() {
      return {
        width: this.width,
        height: this.height,
      };
    },
    thumbsStyle() {
      let v = this.vertical;
      let w = this.width;
      let h = this.height;
      let wN = parseInt(w); //bigStyle宽度
      let hN = parseInt(h); //bigStyle高度
      let len = this.thumbsImgAr.length;
      var obj;
      if (v) {
        //垂直
        obj = {
          height: (hN - 20) / len - 2 + "px",
        };
      } else {
        //水平
        obj = {
          width: (wN - 20) / len - 2 + "px",
        };
      }
      console.log(obj);
      return obj;
    },
    thumbsBoxStyle() {
      let v = this.vertical;
      var obj;
      if (v) {
        //垂直
        obj = {
          top: 0,
        };
      } else {
        //水平
        obj = {
          bottom: 0,
        };
      }
      return obj;
    },
    bigImgOption() {
      var idRan = this.idRan;
      return {
        thumbs: {
          swiper: {
            el: "#img-thumbs" + idRan,
          },
        },
      };
    },
    thumbsOption() {
      let num = this.thumbsImgAr.length;
      let ver = this.vertical;
      var obj = {
        slidesPerView: num,
        spaceBetween: 5,
        watchSlidesVisibility: true,
        touchRatio: 0.2,
      };
      if (ver) {
        obj.direction = "vertical";
      }
      return obj;
    },
  },
  data() {
    return {
      idRan: getRan(10000) + "" + getRan(10000),
      // 横向对照
    };
  },
  created() {},
  mounted() {
    console.log(this.thumbsImgAr,this.bigImgAr)
    // console.log(this.$refs.swiperTop);
    // this.$nextTick(() => {
    //   var bigImg = "swiperTop" + idRan;
    //   var smallImg = "swiperThumbs" + idRan;
    //   console.log(this.$refs[bigImg]);
    //   const swiperTop = this.$refs[bigImg].swiper;
    //   console.log(this.$refs[smallImg])
    //   const swiperThumbs = this.$refs[smallImg].swiper;
    //   swiperTop.controller.control = swiperThumbs;
    //   swiperThumbs.controller.control = swiperTop;
    // });
  },
  methods: {
    requestFullScreenMore(k, drawLine) {
      let vo = this.vo;
      try {
        let datas = [
          {
            componentDefaultPic: vo.defaultPic.split(",")[k],
            componentPic: vo.results[0]
              ? vo.results[0].value.split(",")[k]
              : "",
          },
          drawLine,
        ];
        this.$buses.$emit("fullScreenCanvas", datas);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.margin-4r {
  margin-right: 20px;
  position: relative;
  border: 1px solid rgba(0, 255, 243, 0.3);

}
.img-thumbs {
  position: absolute;
  left: 0;
}

.verClass {
  width: auto !important;
  height: auto !important;
  border: 1px solid rgba(0, 255, 243, 0.3);
}
.horClass {
  width: auto !important;
  height: auto !important;
  border: 1px solid rgba(0, 255, 243, 0.3);
}
</style>
<style lang="less" scoped>
.result-img {
  ::v-deep {
    .el-image {
      // width: 384px;
      width: auto !important;
      height: auto !important;
      margin-right: 0 !important;
      max-width: 122px !important;
      max-height: 80px !important;
    }
  }
}
</style>