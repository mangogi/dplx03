<template>
  <div id="topbox">
    <div class="boxs">
      <!-- 左侧图标 -->
      <img
        :src="require('../../../assets/flowImgs/' + imgurl + '.png')"
        class="imgs"
      />
      <!-- 中间数字部分 -->
      <div class="numberBox">
        <p class="title">{{ title }}</p>
        <div class="counts">
          <div class="numbers" v-for="(item, index) in num" :key="index">
            <span class="font">{{ item }}</span>
          </div>
          <span class="units">家</span>
        </div>
      </div>
      <!-- 右边比例部分 -->
      <div class="percent">
        <div>
          <span>同比</span>
          <span class="down">{{ down }}</span>
        </div>
        <div>
          <span>同比</span>
          <span class="up">{{ up }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBox',
  props: {
    num: {
      type: Array,
      default: () => {
        return ['0']
      },
    },
    imgurl: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    up: {
      type: String,
      default: '',
    },
    down: {
      type: String,
      default: '',
    },
    keys: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style>
.boxs {
  width: 447px;
  height: 111px;
  background-image: url('../../../assets/flowImgs/box01.png');
  margin-right: 20px;
  display: flex;
  flex-direction: row;
}
.imgs {
  margin-top: 31px;
  margin-left: 33px;
  width: 48px;
  height: 56px;
}
.numberBox {
  margin-left: 17px;
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
}
.numbers {
  width: 30px;
  height: 40px;
  background-color: #022559;
  border-radius: 2px;
  border: solid 1px #274d8e;
  margin-right: 3px;
  text-align: center;
  animation-name: numbers;
  animation-duration: 6s;
}
@keyframes numbers {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(150deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
.font {
  font-family: Impact;
  font-size: 28px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  line-height: 40px;
  /* margin-left: 8px; */
  background: linear-gradient(to bottom, #ffffff, #44a5eb);
  -webkit-background-clip: text;
  color: transparent;
}
.title {
  width: 70px;
  height: 14px;
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #ffffff;
}
.units {
  width: 14px;
  height: 12px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 70px;
  letter-spacing: 0px;
  color: #a5a7b1;
  margin-left: 9px;
}
.counts {
  display: flex;
  flex-direction: row;
}
.percent {
  width: 100px;
  height: 38px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  color: #a5a7b1;
  margin-top: 46px;
  margin-left: 24px;
}
.up {
  color: #ff2639;
  /* margin-left: 1px; */
}
.down {
  color: #3ef9bf;
  margin-left: 0px;
}
</style>
