<template>
  <div class="legend_box">
    <!-- 第一行 -->
    <span class="first_line">
      <div class="circle_icon" :style="{ backgroundColor: colors }"></div>
      {{ legendData.title }}
    </span>
    <!-- 第二行 -->
    <span class="second_line">{{ legendData.name }}</span>
    <!-- 第三行 -->
    <div class="legend_data">
      <span class="data_num" :style="{ color: colors }">{{
        legendData.val
      }}</span>
      <span class="data_unit">{{ legendData.unit }}</span>
      <span :style="{ color: colors }">{{ legendData.percent }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pieLegend',
  props: {
    legendData: {
      type: Object,
      default: () => {
        return {
          title: '缴费最多险种',
          name: '机关养老',
          val: '393.87',
          unit: '万元',
          percent: '26%',
        }
      },
    },
    colors: {
      type: String,
      default: '#24b1d8',
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less">
.legend_box {
  display: flex;
  flex-direction: column;
  color: #949fa9;
  font-size: 12px;
  margin-left: 43px;
  width: 180px;
  .first_line {
    display: flex;
    flex-direction: row;
    .circle_icon {
      width: 6px;
      height: 6px;

      border-radius: 20px;
      margin-top: 5px;
      margin-right: 10px;
    }
  }
  .second_line {
    font-size: 16px;
    letter-spacing: 0px;
    color: #ffffff;
    margin-left: 16px;
    margin-top: 14px;
  }
  .legend_data {
    font-size: 16px;
    margin-left: 16px;
    margin-top: 9px;
    .data_num {
    }
    .data_unit {
      color: #949fa9;
      font-size: 12px;
    }
  }
}
</style>
