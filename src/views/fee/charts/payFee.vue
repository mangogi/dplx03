<template>
  <!-- 缴费趋势分析 -->
  <div
    ref="pie_chart"
    class="chart"
    :style="{ height: height + 'px', width: width + 'px' }"
  ></div>
</template>

<script>
export default {
  name: 'payFee',
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
          '2110',
          '2111',
          '2112',
        ]
      },
    },
    barData: {
      type: Array,
      default: () => {
        return [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
      },
    },
    lineData: {
      type: Array,
      default: () => {
        return [50, 60, 80, 55, 35, 24, 82, 60, 80, 55, 35, 82]
      },
    },
    barTitle: {
      type: String,
      default: '征缴总额',
    },
    lineTitle: {
      type: String,
      default: '同比',
    },
    barUnit: {
      type: String,
      default: '金额(万元)',
    },
    lineUnit: {
      type: String,
      default: '同比(%)',
    },
  },
  data() {
    return {}
  },
  computed: {
    /**
     * 将要监听的值设置为对象
     */
    listenChange() {
      const { barData, lineData } = this
      return { barData, lineData }
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
      const data = this.barData
      const sideData = data.map(item => item + 9.5)
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
              '万元' +
              '<br>' +
              param[1].seriesName +
              ' : ' +
              param[1].value +
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
            name: this.barTitle,
            tooltip: {
              show: true,
            },
            type: 'bar',
            barWidth: 8,
            itemStyle: {
              normal: {
                color: this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: '#147ade', // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#00c8c6', // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#147ade', // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            data: data,
            barGap: 0,
          },
          {
            type: 'bar',
            barWidth: 4,
            tooltip: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: '#147ade', // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#00c8c6', // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#3cecfe', // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            barGap: 0,
            data: sideData,
          },
          {
            name: '',
            tooltip: {
              show: false,
            },
            type: 'pictorialBar',
            itemStyle: {
              borderWidth: 2,
              borderColor: '#0571D5',
              color: '#1779E0',
            },
            symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
            symbolSize: ['12', '4'],
            symbolOffset: ['0', '-5'],
            // symbolRotate: -5,
            symbolPosition: 'end',
            data: data,
            z: 3,
          },
          {
            name: this.lineTitle,
            type: 'line',
            yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            // smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: 'image://' + require('../../../assets/imgs/6.png'),
            // symbol: 'circle',
            symbolSize: 20,
            lineStyle: {
              normal: {
                color: '#4d95ff',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#6c50f3',
              },
            },
            itemStyle: {
              color: '#6c50f3',
              borderColor: '#fff',
              borderWidth: 3,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            tooltip: {
              show: true,
            },

            data: this.lineData,
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
