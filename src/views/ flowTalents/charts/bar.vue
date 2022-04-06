<template>
  <div>
    <div
      class="charts"
      ref="chart"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'bar',
  props: {
    barData: {
      type: Array,
      default: () => {
        return [50000000, 22000000, 10000000, 5000000, 5000000, 5000000]
      },
    },
    textData: {
      type: Array,
      default: () => {
        return ['60岁以上', '50～59', '40～49', '30～39', '20～29', '20及以下']
      },
    },
    backData: {
      // 条形图背景数据
      type: Array,
      default: () => {
        return [50000000, 50000000, 50000000, 50000000, 50000000, 50000000]
      },
    },
    width: {
      type: String,
      default: '517',
    },
    height: {
      type: String,
      default: '200',
    },
  },
  data() {
    return {
      myChart: {},
    }
  },
  mounted() {
    this.createCharts()
  },
  watch: {
    barData: {
      handler(val, oldVal) {
        if (val) {
          this.getOption()
        }
      },
    },
  },
  methods: {
    /**
     * 初始化
     */
    createCharts() {
      const chart = this.$refs.chart
      if (chart) {
        this.myChart = this.$echarts.init(chart)
        this.getOption()
      }
    },
    /**
     * 设置option
     */
    getOption() {
      const option = {
        grid: {
          left: '1%',
          right: '5%',
          bottom: '5%',
          top: '15%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          formatter: function(params) {
            return (
              params[0].name +
              '<br/>' +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
              params[0].seriesName +
              ' : ' +
              Number((params[0].value / 10000).toFixed(2)).toLocaleString() +
              ' 万人<br/>'
            )
          },
        },
        xAxis: {
          show: false,
          type: 'value',
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#58b5f5',
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: this.textData,
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '12',
              },
              formatter: function(value) {
                if (value >= 10000) {
                  return (
                    (value / 10000).toLocaleString() + '万人' + '   ' + '12%'
                  )
                } else {
                  return value.toLocaleString()
                }
              },
            },
            data: this.barData,
          },
        ],
        series: [
          {
            name: '人数',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                // borderRadius: [0,30,30,0],
                barBorderRadius: [0, 30, 30, 0],
                // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                //     offset: 0,
                //     color: 'rgb(57,89,255,1)'
                // }, {
                //     offset: 1,
                //     color: 'rgb(46,200,207,1)'
                // }]),
                color: '#58b5f5',
              },
            },
            barWidth: 12,
            data: this.barData,
          },
          {
            name: '背景',
            type: 'bar',
            barWidth: 12,
            barGap: '-100%',
            data: this.backData,
            itemStyle: {
              normal: {
                color: 'rgba(24,31,68,1)',
                borderRadius: [0, 30, 30, 0],
              },
            },
          },
        ],
      }
      this.myChart.setOption(option)
    },
  },
  /**
   * 销毁实例
   */
  beforeDestory() {
    this.$echarts.dispose(this.myChart)
    this.myChart = null
  },
}
</script>

<style scoped>
.charts {
  margin-left: 40px;
}
</style>
