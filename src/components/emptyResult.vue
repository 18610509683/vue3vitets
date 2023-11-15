<template>
  <div class="empty_box">
    <div class="empty_box2" v-show="loaded">
      <div class="flex">
      <img :src="img" alt="" :style="imgStyle"/>
      <p class="text" :style="{marginTop:special?'-22px':'0px'}">{{ text }}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      default: "100px",
    },
    img: {
      default: "./images/no_datas.png",
    },
    text: {
      default: "暂无数据",
    },
    width:{
      default:"352px"
    },
    top:{
      default:''
    },
    scale:{
      default:'100%'
    },
    vertical:{
      default:false
    },
    emptyWH:{
      default:''
    },
    special:{
      default:false
    }
  },
  computed:{
    imgStyle(){
      let emptyWH=parseFloat(this.emptyWH)
      let scale=parseFloat(this.scale)/100;
      let vertical=this.vertical;
      if(this.special){
        return {
          width:'auto',
          height:'288px'
        }
      }
      if(vertical){
        var obj={
          height:emptyWH*scale+'px',
          width:'auto'
        }
      }else{
        var obj={
          width:emptyWH*scale+'px',
          height:'auto'
        }
      }
      return obj
    }
  },
  data(){
    return {
      loaded:false
    }
  },
  mounted(){
    setTimeout(() => {
      this.loaded=true;
    }, 0);
  }
};
</script>

<style scoped>
.empty_box {
  height: 100%!important;
  width: 100%!important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty_box2{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;  
  position: relative;
}
.text{
  position: absolute;
  top: 75%;
  text-align: center;
  width: 100%;
  color: #2dc9cb;
}
.flex{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>