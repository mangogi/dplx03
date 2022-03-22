<template>
  <div class="box_contain">
    <p>单位：{{ unit }}</p>
    <div class="main_context">
      <div class="bg_contain">
        <div class="bg_transform"></div>
        <!-- <img src="../../assets/imgs/bg_pie.png" alt="" class="bg_transform" /> -->
      </div>
      <p class="main_title">{{ boxTitle }}</p>
      <!-- 蓝色 -->
      <ball class="ball_bjje"></ball>
      <ball
        class="ball_grjfje"
        :icon="'ball_money2'"
        :countData="ballData[0]"
      ></ball>
      <ball
        class="ball_dwjfje"
        :icon="'ball_per'"
        :countData="ballData[1]"
      ></ball>
      <ball
        class="ball_tjje"
        :icon="'ball_company'"
        :countData="ballData[2]"
      ></ball>
      <!-- 中间橘色大球 -->
      <div class="orange_ball">
        <span class="orange_ball_val">{{ ballData[5].val }}</span>
        <span class="orange_ball_name">{{ ballData[5].name }}</span>
      </div>
      <!-- 橘色小球 -->
      <ball
        class="ball_jfzrs"
        :icon="'ball_percent'"
        :countData="ballData[3]"
      ></ball>
      <ball
        class="ball_zjl"
        :icon="'ball_team'"
        :countData="ballData[4]"
      ></ball>

      <!-- 蓝色小球 -->
      <img
        class="blue_left"
        src="../../assets/imgs/ball_blue.png"
        alt=""
        style="width:50px;height:50px;"
      />
      <img
        class="blue_right"
        src="../../assets/imgs/ball_blue.png"
        alt=""
        style="width:50px;height:50px"
      />
    </div>
  </div>
</template>

<script>
import ball from './ball.vue'
export default {
  name: 'circleBox',
  components: {
    ball,
  },
  props: {
    unit: {
      type: String,
      default: '万元/万人',
    },
    countData: {
      type: Array,
      default: () => {
        return [{}]
      },
    },
    boxTitle: {
      type: String,
      default: '城职养老',
    },
  },
  data() {
    return {
      ballData: [
        {
          name: '个人缴费金额',
          val: '65.7',
          textColor: '#bbe4ff',
        },
        {
          name: '单位缴费金额',
          val: '65.7',
          textColor: '#bbe4ff',
        },
        {
          name: '退缴金额',
          val: '65.7',
          textColor: '#bbe4ff',
        },
        {
          name: '缴费总人数',
          val: '65.7',
          textColor: '#f7caa3',
        },
        {
          name: '征缴率',
          val: '95.7%',
          textColor: '#f7caa3',
        },
        {
          name: '征缴总金额',
          val: '466.7',
          textColor: '#f7caa3',
        },
      ],
    }
  },
}
</script>

<style lang="less">
.box_contain {
  width: 892px;
  height: 417px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #a9b5c0;
  margin-left: 39px;
  margin-top: 25px;
  .main_context {
    width: 847px;
    height: 321px;
    margin-top: 33px;
    background: url('../../assets/imgs/bg_bottom.png');
    display: flex;
    flex-direction: row;
    position: relative;

    .bg_contain {
      width: 650px;
      height: 650px;
      position: relative;
      transform-style: preserve-3d;
      transform: rotateX(70deg);
      // 旋转的动画效果
      .bg_transform {
        background: url('../../assets/imgs/bg_pie.png') no-repeat center;
        background-size: 100%;
        width: 100%;
        height: 100%;
        animation: rotate 8s linear infinite 0.5s;
        margin-top: -550px;
        margin-left: 100px;
      }
    }
    @keyframes rotate {
      from {
        transform: rotateZ(360deg);
      }
      to {
        transform: rotateZ(0deg);
      }
    }

    .main_title {
      width: 100%;
      height: 30px;
      text-align: center;
      margin-top: -30px;
      margin-left: -650px;
      font-size: 20px;
      background: linear-gradient(to bottom, white, #ffa460);
      -webkit-background-clip: text;
      color: transparent;
      animation: titlefloat 2s linear infinite 0.5s;
    }
    @keyframes ballfloat {
      0% {
        transform: translate(0px, 0px);
      }
      50% {
        transform: translate(0px, 3px);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
    @keyframes titlefloat {
      0% {
        transform: translate(0px, 0px);
      }
      50% {
        transform: translate(0px, 5px);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
    .floatAnimation {
      position: absolute;
      animation: ballfloat 2s linear infinite 0.5s;
    }
    .ball_bjje {
      top: 68px;
      left: 27px;
      .floatAnimation();
    }
    .ball_grjfje {
      top: 170px;
      left: 170px;
     .floatAnimation();
    }
    .ball_dwjfje {
      top: 170px;
      left: 600px;
     .floatAnimation();
    }
    .ball_tjje {
      top: 68px;
      left: 740px;
      .floatAnimation();
    }
    .ball_jfzrs {
      top: 100px;
      left: 297px;
     .floatAnimation();
    }
    .ball_zjl {
      top: 100px;
      left: 477px;
      .floatAnimation();
    }
    .blue_left {
      top: 19px;
      left: 193px;
      .floatAnimation();
    }
    .blue_right {
      top: 19px;
      left: 603px;
      .floatAnimation();
    }
    .orange_ball {
      width: 258px;
      height: 258px;
      background: url('../../assets/imgs/ball_orange.png') no-repeat;
      top: -71px;
      left: 296px;
      position: absolute;
      text-align: center;
      display: flex;
      flex-direction: column;
      font-family: DINPro-Bold;
      font-weight: 600;
      color: #8a2500;
      font-size: 24px;
      .orange_ball_val {
        margin-top: 110px;
      }
      .orange_ball_name {
        font-size: 16px;
        font-weight: normal;
      }
    }
  }
}
</style>
