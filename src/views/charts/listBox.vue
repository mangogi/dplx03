<template>
  <div class="list_container">
    <img :src="require('../../assets/imgs/' + imgUrl + '.png')" alt="" />
    <div class="text_part">
      <span class="list_title">{{ title }}</span>
      <div class="list_data">
        <span class="data_num">{{ val }}</span>
        <span class="data_unit">{{ unit }}</span>
        <span class="data_percent" :class="{ greenColor: percent[0] == '-' }">{{
          percent
        }}</span>
      </div>
    </div>
    <div class="split_line" v-show="showLine"></div>
  </div>
</template>

<script>
export default {
  name: 'listBox',
  props: {
    title: {
      type: String,
      default: '个人缴费金额',
    },
    val: {
      type: String,
      default: '32.45',
    },
    unit: {
      type: String,
      default: '万元',
    },
    percent: {
      type: String,
      default: '+2.6%',
    },
    imgUrl: {
      type: String,
      default: '01_70',
    },
    showLine: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="less">
.list_container {
  width: 242px;
  height: 71px;
  font-size: 12px;
  margin-left: 21px;
  margin-top: 15px;
  // border-right: 1px linear-gradient(180deg, #1e6dc3, #0c2541) solid;
  color: white;
  display: flex;
  flex-direction: row;
  .text_part {
    display: flex;
    flex-direction: column;
    margin-left: 9px;
    .list_title {
      margin-top: 11px;
      font-size: 14px;
    }
    .list_data {
      .data_num {
        font-size: 24px;
      }
      .data_unit {
        margin-left: 2px;
      }
      .data_percent {
        color: #f32424;
        margin-left: 4px;
      }
      .greenColor {
        color: #22d6a6;
      }
    }
  }
  .split_line {
    // margin-top: 17px;
    margin-left: 21px;
    width: 1px;
    height: 69px;
    background: linear-gradient(180deg, #1e6dc3, #0c2541);
  }
}
</style>
