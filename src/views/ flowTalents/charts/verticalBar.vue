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
import * as echarts from 'echarts'
export default {
  name: 'verticalBar',
  props: {
    barData: {
      type: Array,
      default: () => {
        return [
          {
            name: '20210302',
            in: 565,
            out: 333,
          },
          {
            name: '20210402',
            in: 565,
            out: 333,
          },
          {
            name: '20210402',
            in: 565,
            out: 333,
          },
          {
            name: '20210402',
            in: 565,
            out: 333,
          },
          {
            name: '20210402',
            in: 565,
            out: 333,
          },
          {
            name: '20210402',
            in: 565,
            out: 333,
          },
          {
            name: '20210402',
            in: 565,
            out: 333,
          },
        ]
      },
    },
    width: {
      type: String,
      default: '500',
    },
    height: {
      type: String,
      default: '228',
    },
  },
  data() {
    return {
      myChart: {},
    }
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
  mounted() {
    this.chartsInit()
  },
  methods: {
    /**
     * @description 创建实例
     */
    chartsInit() {
      const chart = this.$refs.chart
      if (chart) {
        this.myChart = this.$echarts.init(chart)
        this.getOption()
      }
    },
    /**
     * @description 获取option
     */
    getOption() {
      var xData = []
      var firstData = []
      var secondData = []

      var min = 0 // 最小值的定义
      for (let i = 0; i < this.barData.length; i++) {
        xData.push(this.barData[i].name)
        firstData.push(this.barData[i].in)
        secondData.push(this.barData[i].out)
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              opacity: 0,
            },
          },
          formatter: function(prams) {
            return (
              '接受量：' +
              prams[0].data +
              '%' +
              '<br>' +
              '转出率：' +
              prams[1].data +
              '%'
            )
          },
        },
        legend: {
          data: ['接收量', '转出量'],
          top: '4%',
          show: true,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#ffffff',
          },
        },
        grid: {
          left: '0%',
          right: '10%',
          bottom: '5%',
          top: '20%',
          height: '80%',
          width: '90%',
          containLabel: true,
          z: 22,
        },
        xAxis: [
          {
            type: 'category',
            gridIndex: 0,
            data: xData,
            axisTick: {
              alignWithLabel: true,
            },
            splitNumber: 9,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#1C4666',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#0c3b71',
              },
            },
            axisLabel: {
              show: true,
              color: 'rgb(170,170,170)',
              fontSize: 12,
              rotate: 20,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位（万次）',
            nameTextStyle: {
              color: 'rgb(170,170,170)',
            },
            gridIndex: 0,
            splitNumber: 6,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#1C4666',
              },
            },
            axisTick: {
              show: false,
            },
            min: min,
            max: 1200,
            axisLine: {
              lineStyle: {
                color: '#0c3b71',
              },
            },
            axisLabel: {
              color: 'rgb(170,170,170)',
              formatter: '{value}',
            },
          },
        ],
        series: [
          {
            name: '接收量',
            type: 'bar',
            barWidth: 8,
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                barBorderRadius: [30, 30, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(76,215,255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,101,214,1)',
                  },
                ]),
              },
            },
            data: firstData,
            zlevel: 11,
          },
          {
            name: '转出量',
            type: 'bar',
            barWidth: 8,
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                barBorderRadius: [30, 30, 0, 0],
                // 版本4.9 要使用这个来设置渐变色
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: '#fff82e',
                  },
                  {
                    offset: 1,
                    color: '#deac00',
                  },
                ]),
                // color: {
                //   //好像不能够同时使用this.$echarts.graphic ,后设置的颜色会把前面的覆盖掉
                //   type: "linear",
                //   x: 0,
                //   y: 0,
                //   x2: 0,
                //   y2: 1,
                //   colorStops: [
                //     {
                //       offset: 0,
                //       color: "#fff82e",
                //     },
                //     {
                //       offset: 1,
                //       color: "#deac00",
                //     },
                //   ],
                // },
              },
            },
            data: secondData,
            zlevel: 11,
          },
        ],
      }

      this.myChart.setOption(option)
    },
  },
  beforeDestory() {
    this.$echarts.dispose(this.myChart)
    this.myChart = null
  },
}
</script>

<style scoped></style>
