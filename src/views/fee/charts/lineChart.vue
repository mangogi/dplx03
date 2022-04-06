<template>
  <div
    ref="pie_chart"
    class="chart"
    :style="{ height: height + 'px', width: width + 'px' }"
  ></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'lineChart',
  props: {
    height: {
      type: String,
      default: '240',
    },
    width: {
      type: String,
      default: '560',
    },
    xdata: {
      type: Array,
      default: () => {
        return [
          '2101',
          '2102',
          '2103',
          '2104',
          '2105',
          '2106',
          '2107',
          '2108',
          '2109',
          '21010',
          '21011',
          '21012',
        ]
      },
    },
    lineData: {
      type: Array,
      default: () => {
        return [60, 70, 89, 65, 55, 54, 92, 70, 90, 65, 45, 92]
      },
    },
    line2Data: {
      type: Array,
      default: () => {
        return [50, 60, 80, 55, 35, 24, 82, 60, 80, 55, 35, 82]
      },
    },
    line3Data: {
      type: Array,
      default: () => {
        return [30, 40, 39, 45, 55, 54, 32, 40, 30, 45, 35, 32]
      },
    },
    barTitle: {
      type: String,
      default: '征缴总额',
    },
    lineTitle: {
      type: String,
      default: '城职养老',
    },
    line2Title: {
      type: String,
      default: '失业保险',
    },
    line3Title: {
      type: String,
      default: '机关养老',
    },
    barUnit: {
      type: String,
      default: '缴费率(%)',
    },
    lineUnit: {
      type: String,
      default: '同比(%)',
    },
  },
  data() {
    return {
    }
  },
  computed: {
    /**
     * 将要监听的值设为对象
     */
    listenChange() {
      // this 指向的是vuecomponent
      const { line2Data, lineData, line3Data } = this
      // console.log(this)
      return { line2Data, lineData, line3Data }
    },
  },
  watch: {
    listenChange: {
      handler(val, oldval) {
        if (val) {
          this.chartOption()
        }
      },
    },
  },
  mounted() {
    this.initCharts()
  },
  /**
   * 销毁实例
   */
  beforeDestroy() {
    this.$echarts.dispose(this.chart)
    this.chart = null
  },
  methods: {
    /**
     * 初始化实例
     */
    initCharts() {
      this.chart = this.$echarts.init(this.$refs.pie_chart)
      this.chartOption()
    },
    /**
     * 设置option
     */
    chartOption() {
      let option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(7, 23, 55,.6)',
          borderColor: '#2d4581',
          textStyle: {
            color: '#ffffff',
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#20e1e6',
                  },
                  {
                    offset: 0.5,
                    color: '#20e1e6',
                  },
                  {
                    offset: 1,
                    color: '#20e1e6',
                  },
                ],
              },
            },
          },
          formatter: param => {
            return (
              param[0].name +
              '期' +
              '<br>' +
              param[0].seriesName +
              ' : ' +
              param[0].value +
              '%' +
              '<br>' +
              param[1].seriesName +
              ' : ' +
              param[1].value +
              '%' +
              '<br>' +
              param[2].seriesName +
              ' : ' +
              param[2].value +
              '%'
            )
          },
        },
        grid: {
          width: '85%',
          height: '65%',
        },
        legend: {
          show: true,
          itemWidth: 8,
          itemHeight: 8,
          left: 120,
          top: 26,
          textStyle: {
            color: '#9ba6b1',
          },
        },
        xAxis: {
          data: this.xdata,
          // 坐标轴
          axisLine: {
            lineStyle: {
              color: '#3eb2e8',
            },
            show: false,
          },
          axisTick: {
            show: false,
          },
          // 坐标值标注
          axisLabel: {
            show: true,

            textStyle: {
              color: '#9ba6b1',
            },
          },
        },
        yAxis: [
          {
            name: this.barUnit,
            nameTextStyle: {
              color: '#9ba6b1',
            },
            // 坐标轴
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1e3958',
              },
            },
            // 坐标值标注
            axisLabel: {
              show: true,
              textStyle: {
                color: '#9ba6b1',
              },
            },
            // 分格线
            splitLine: {
              show: false,
              lineStyle: {
                color: '#4784e8',
              },
            },
          },
          {
            name: this.lineUnit,
            min: '0',
            max: 100,

            nameTextStyle: {
              color: '#9ba6b1',
            },
            // 坐标轴
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1e3958',
              },
            },
            // 坐标值标注
            axisLabel: {
              show: true,
              // inside: true,
              textStyle: {
                color: '#9ba6b1',
              },
            },
            // 分格线
            splitLine: {
              show: false,
              lineStyle: {
                color: '#4784e8',
              },
            },
          },
        ],
        series: [
          {
            name: this.lineTitle,
            type: 'line',
            yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            // smooth: true, //是否平滑
            lineStyle: {
              normal: {
                color: '#0387fe',
                shadowColor: 'rgba(0, 0, 0, .3)',
                // shadowBlur: 0,
                // shadowOffsetY: 5,
                // shadowOffsetX: 5,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(3, 135, 254,0.5)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(3, 135, 254,0.2)',
                    },
                  ],
                  false
                ),
              },
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#6c50f3',
              },
            },
            tooltip: {
              show: true,
            },

            data: this.lineData,
          },
          {
            name: this.line2Title,
            type: 'line',
            yAxisIndex: 0, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            // smooth: true, //是否平滑
            lineStyle: {
              normal: {
                color: '#3cd4bd',
                shadowColor: 'rgba(0, 0, 0, .3)',
                // shadowBlur: 0,
                // shadowOffsetY: 5,
                // shadowOffsetX: 5,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0, 212, 189,0.5)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(0, 212, 189,0.2)',
                    },
                  ],
                  false
                ),
              },
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#6c50f3',
              },
            },
            tooltip: {
              show: true,
            },

            data: this.line2Data,
          },
          {
            name: this.line3Title,
            type: 'line',
            yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            // smooth: true, //是否平滑
            lineStyle: {
              normal: {
                color: '#d43c58',
                shadowColor: 'rgba(0, 0, 0, .3)',
                // shadowBlur: 0,
                // shadowOffsetY: 5,
                // shadowOffsetX: 5,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(3212, 60, 88,0.5)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(212, 60, 88,0.2)',
                    },
                  ],
                  false
                ),
              },
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#6c50f3',
              },
            },
            tooltip: {
              show: true,
            },

            data: this.line3Data,
          },
        ],
      }
      this.chart.setOption(option)
    },
  },
}
</script>

<style>
.chart {
  background: url('../../../assets/imgs/bg_line.png') no-repeat;
  background-position: 55px 165px;
  background-size: 85%;
}
</style>
