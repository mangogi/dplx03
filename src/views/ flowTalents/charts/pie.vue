<template>
  <div
    class="charts"
    ref="chart"
    :style="{ width: width + 'px', height: height + 'px' }"
  ></div>
</template>

<script>
export default {
  name: 'bar',
  props: {
    pieData: {
      type: Array,
      default: () => {
        return []
      },
    },
    bgUrl: {
      type: String,
      default: '',
    },
    iconUrl: {
      type: String,
      default: '',
    },
    outColor: {
      type: Array,
      default: () => {
        return []
      },
    },
    innerColor: {
      type: Array,
      default: () => {
        return []
      },
    },
    width: {
      type: String,
      default: '500',
    },
    height: {
      type: String,
      default: '188',
    },
  },
  data() {
    return {
      myChart: {},
    }
  },
  mounted() {
    this.setPie()
  },
  watch: {
    pieData: {
      handler(val, oldVal) {
        if (val) {
          this.getOption()
        }
      },
    },
  },
  methods: {
    /**
     * 设置option
     */
    getOption() {
      const pieData = this.pieData
      let imgurl = require('../../../assets/flowImgs/' + this.iconUrl + '.png')
      const option = {
        graphic: {
          elements: [
            {
              type: 'image',
              left: '41.6%',
              top: '39%',
              z: 3,
              style: {
                image: imgurl,
                width: 36,
                height: 36,
              },
            },
            {
              type: 'image',
              left: '32.5%',
              top: '15.8%',
              z: 3,
              style: {
                image: require('../../../assets/flowImgs/bg.png'),
                width: 130,
                height: 130,
              },
            },
          ],
        },
        legend: {
          show: true,
          top: '-18%',
          left: '4%',
          orient: 'horizontal',
          itemGap: 170,
          itemWidth: 56,
          itemHeight: 5,
          textStyle: {
            color: '#fff',
          },
          align: 'left',
          formatter: params => {
            let data = Object.assign([],pieData)
            let pieDataReverse = data.reverse()
            console.log('pie',pieDataReverse)
            for (let i = 0; i < pieDataReverse.length; i++) {
              if (pieDataReverse[i].name === params) {
                console.log('param',params)
                return (
                  '\n\n\n\n\n\n\n\n\n' +
                  '{sex|' +
                  params +
                  '}' +
                  '\n' +
                  '{num|' +
                  pieDataReverse[i].val +
                  '}' +
                  '{person|' +
                  '人' +
                  '}' +
                  '\n' +
                  '{pecent|' +
                  pieDataReverse[i].per +
                  '}'
                )
              }
            }
          },
          // eslint-disable-next-line no-dupe-keys
          textStyle: {
            color: 'white',
            padding: [0, -60],
            rich: {
              sex: {
                color: 'white',
                fontSize: 16,
                padding: [10, 0, 0, 0], // 上 右 下 左
              },
              num: {
                color: 'white',
                fontSize: 28,
                padding: [5, 0],
              },
              person: {
                fontSize: 14,
                padding: [-9, 0, 0, 10],
              },
              percent: {
                fontSize: 14,
              },
            },
          },
        },
        series: [
          {
            name: 'title',
            type: 'pie',
            zlevel: 3,
            startAngle: 270, // 起始角度
            // hoverAnimation: false,
            // legendHoverLink: false,
            radius: ['52%', '60%'],
            center: ['45%', '50%'],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
              // showAbove:true,
              length: 30,
              length2: 50,
            },
            data: [
              {
                value: pieData[0].val,
                name: pieData[0].name,
                itemStyle: {
                  color: this.outColor[0],
                },
              },
              {
                value: pieData[1].val,
                name: pieData[1].name,
                itemStyle: {
                  color: this.outColor[1],
                },
              },
            ],
          },
          {
            name: '',
            type: 'pie',
            zlevel: 1,
            cursor: 'default',
            startAngle: 270, // 起始角度
            // hoverAnimation: false,
            // legendHoverLink: false,
            radius: ['40%', '60%'],
            center: ['45%', '50%'],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            tooltip: {
              show: false,
            },
            data: [
              {
                value: pieData[0].val,
                name: pieData[0].name,
                itemStyle: {
                  color: this.innerColor[0],
                },
              },
              {
                value: pieData[1].val,
                name: pieData[1].name,
                itemStyle: {
                  color: this.innerColor[1],
                },
              },
            ],
          },
        ],
      }

      this.myChart.setOption(option)
    },
    /**
     * @description 初始化
     */
    setPie() {
      const chart = this.$refs.chart
      if (chart) {
        this.myChart = this.$echarts.init(chart)
        this.getOption()
      }
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

<style scoped></style>
