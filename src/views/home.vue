<template>
  <!-- 入口文件 -->
  <screen-adapter>
    <div class="container">
      <div class="imgs-box">
        <div style="">
          <img
            src="../assets/mainImg/饼图.png"
            alt=""
            class="img"
            @click="toFlowPage"
          />
          <div class="title container-flowtalents-btn" @click="toFlowPage">
            人才流动人口
          </div>
        </div>
        <div style="margin-top:10%">
          <img
            src="../assets/mainImg/建筑.png"
            alt=""
            class="img"
            @click="toFeePage"
          />
          <div class="title container-fee-btn" @click="toFeePage">
            社保缴费分析
          </div>
        </div>

        <div style="margin-top:15%">
          <img src="../assets/mainImg/数据云.png" alt="" class="img" />
          <div class="title container-fee-btn" @click="toFeePage">XXXX</div>
        </div>
        <div style="margin-top:10%">
          <img src="../assets/mainImg/用户.png" alt="" class="img" />
          <div class="title container-fee-btn" @click="toFeePage">XXXX</div>
        </div>
        <div style="margin-top:0%">
          <img src="../assets/mainImg/柱状图.png" alt="" class="img" />
          <div class="title container-fee-btn" @click="toFeePage">XXXX</div>
        </div>
      </div>
      <div class="bottom-container">
        <div class="bottom_img">
          <div class="bg_transform"></div>
        </div>
      </div>
    </div>
  </screen-adapter>
</template>

<script>
// import ds from '../'
import screenAdapter from '../views/ flowTalents/charts/ScreenAdapter.vue'
export default {
  name: 'home',
  components: {
    screenAdapter,
  },
  data() {
    return {
      height: 0,
    }
  },
  mounted() {
    this.height = window.screen.height
    console.log(this.height)
  },
  methods: {
    toFlowPage() {
      this.$router.push({
        path: '/flowTalents',
      })
    },
    toFeePage() {
      this.$router.push({
        path: '/mainPage',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  font-size: 34px;
  color: #fff;
  overflow: hidden;
  background: url('../assets/mainImg/bg.png');
  background-size: 100% 100%;

  .imgs-box {
    display: flex;
    flex-direction: row;
    margin-top: 7%;
    margin-left: 10%;
    .img {
      width: 300px;
      height: 300px;
      margin-left: 0%;
      animation: titleAnimation 4s linear infinite 0.5s;
    }
  }
}
.title {
  width: 300px;
  height: 50px;
  margin-top: -28%;
  margin-left: 40%;
  transform: rotateZ(-25deg);
  font-size: 28px;
  color: #ffffff;
  background: linear-gradient(to bottom, white, blue);
  -webkit-background-clip: text;
  color: transparent;
  // transform: rotateX(0deg);
}
@keyframes titleAnimation {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, 15px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
.bottom-container {
  width: 850px;
  height: 350px;
  position: relative;
  transform-style: preserve-3d;
  background: url('../assets/imgs/bg_bottom.png') no-repeat center;
  margin-left: 27%;
  margin-top: 0%;
  .bottom_img {
    background-size: 100%;
    width: 650px;
    height: 650px;
    position: absolute;
    transform: rotateX(70deg);
    top: -48%;
    left: 12%;
    // text-align: center;
    // margin-top: -190px;
    // animation: rotateds 8s linear infinite 0.5s;
    .bg_transform {
      background: url('../assets/imgs/bg_pie.png') no-repeat center;
      background-size: 95%;
      width: 100%;
      height: 100%;
      animation: rotate 8s linear infinite 0.5s;
      margin-top: -50px;
      // margin-left: 100px;
    }
    // transform: rotateZ(240deg);
  }
  @keyframes rotate {
    from {
      transform: rotateZ(360deg);
    }
    to {
      transform: rotateZ(0deg);
    }
  }
}
</style>
