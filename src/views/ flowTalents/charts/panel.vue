<template>
  <div>
    <span class="title_body" :class="{ marginLeft: !showPic }">
      <img :src="img" class="img" v-if="showPic" /> {{ provinceData.name }}
    </span>
    <div
      class="charts"
      ref="chart"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></div>
    <span class="number_tip">{{ provinceData.num }}</span>
  </div>
</template>

<script>
export default {
  name: 'verticalBar',
  props: {
    provinceData: {
      type: Object,
      default: () => {
        return { name: '四川省', value: 0.63, num: '8.8万人' }
      },
    },
    colors: {
      type: Array,
      default: () => {
        return ['rgb(252, 86, 50)', 'rgba(252, 86, 50, 0.1)']
      },
    },
    imgurl: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '130',
    },
    height: {
      type: String,
      default: '150',
    },
  },
  data() {
    return {
      showPic: true,
      img: '',
      myChart: {},
    }
  },
  watch: {
    provinceData: {
      handler(val, oldVal) {
        if (val) {
          this.getOption()
        }
      },
    },
  },
  mounted() {
    this.chartsInit()
    this.getUrl()
  },
  /**
   * 在销毁之前销毁echarts示例，防止内存泄漏
   */
  beforeDestory() {
    this.$echarts.dispose(this.myChart)
    this.myChart = null
  },
  methods: {
    /**
     * 获取父组件传入的图片数据并进行处理
     */
    getUrl() {
      if (this.imgurl === '') {
        this.showPic = false
        this.img = ''
      } else {
        this.img = require('../../../assets/flowImgs/' + this.imgurl + '.png')
        this.showPic = true
      }
    },
    /**
     * 设置option
     */
    getOption() {
      let Green = {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(252, 86, 50, 0.1)', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgb(252, 86, 50)', // 100% 处的颜色
          },
        ],
        globalCoord: false, // 缺省为 false
      }
      const option = {
        graphic: {
          elements: [
            {
              type: 'image',
              left: '32.5%',
              top: '35.8%',
              z: 3,
              style: {
                image: require('../../../assets/flowImgs/sichuansheng.png'),
                width: 48,
                height: 48,
              },
            },
          ],
        },
        grid: {
          top: '-30%',
        },
        series: [
          {
            type: 'gauge',
            radius: '65%',
            clockwise: false,
            startAngle: '90',
            endAngle: '-269.9999',
            // 调整间隔距离
            splitNumber: 80,
            detail: {
              offsetCenter: [0, -20],
              formatter: ' ',
            },
            pointer: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, '#E6EBF8']],
                width: 30,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              length: 2,
              splitNumber: 100,
              lineStyle: {
                color: 'rgba(255,255,255,0.7)',
                width: 1,
              },
            },
            axisLabel: {
              show: false,
            },
          },
          {
            // 进度圆环
            name: 'Line 1',
            type: 'pie',
            startAngle: 90,
            clockWise: false,
            radius: ['58%', '63%'],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,

            data: [
              {
                value: Math.round(this.provinceData.value * 100),
                itemStyle: {
                  normal: {
                    color: Green,
                  },
                },
              },
              {
                // 画中间的图标
                name: '',
                value: 0,
                label: {
                  position: 'inside',
                  // backgroundColor: {
                  //   image: require("../../../assets/imgs/sichuansheng.png"),
                  // },
                  width: 16,
                  height: 16,
                  borderRadius: 20,
                  padding: 11,
                },
              },
              {
                value: 100 - Math.round(this.provinceData.value * 100),
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: 'transparent', // 未完成的圆环的颜色
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
            ],
          },
        ],
      }

      this.myChart.setOption(option)
    },
    /**
     * 初始化图表
     */
    chartsInit() {
      const chart = this.$refs.chart
      if (chart) {
        this.myChart = this.$echarts.init(chart)
        this.getOption()
      }
    },
  },
}
</script>

<style scoped lang="less">
.charts {
  margin-top: -20px;
}
.title_body {
  font-size: 14px;
  margin-left: 30px;
  color: #fff;
  .img {
    width: 16px;
    height: 16px;
  }
}
.number_tip {
  font-size: 16px;
  color: #5afff1;
  margin-left: 40px;
  position: relative;
  top: -30px;
}
.marginLeft {
  margin-left: 46px;
}
</style>
