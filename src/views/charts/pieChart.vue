<template>
  <div
    ref="pie_chart"
    class="pie_chart"
    :style="{ height: height + 'px', width: width + 'px' }"
  ></div>
</template>

<script>
export default {
  name: 'pieChart',
  props: {
    height: {
      type: String,
      default: '300',
    },
    width: {
      type: String,
      default: '420',
    },
    pieData: {
      type: Array,
      default: () => {
        return [
          {
            name: '城职养老',
            value: 25,
          },
          {
            name: '城居养老',
            value: 24,
          },
          {
            name: '机关养老',
            value: 23,
          },
          {
            name: '工商保险',
            value: 22,
          },
          {
            name: '失业保险',
            value: 21,
          },
        ]
      },
    },
  },
  data() {
    return {
    }
  },
  watch: {
    pieData: {
      handler(val, oldval) {
        if (val) {
          this.getChartOption()
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
      this.getChartOption()
    },
    /**
     * 设置option
     */
    getChartOption() {
      let colorList = [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(36, 177, 216,0.5)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(36, 177, 216,0.99)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0, 150, 255,0.8)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0, 109, 186,1)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },

        {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0, 134, 79,0.4)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(0, 134, 79,0.99)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(17, 60, 189,0.8)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(13, 47, 170,1)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 1,
          y: 1,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#e77e1e', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgb(174, 95, 23)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(254,206,67,0.12)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#FECE4391', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
      ]
      let colorLine = ['#71808f', '#71808f', '#71808f', '#71808f', '#71808f']
      let data = this.pieData.sort((a, b) => {
        return b.value - a.value
      })
      // 如果要设置线条不同颜色可以这样写，只有一个颜色就可以直接写在option内
      data.forEach((v, i) => {
        v.labelLine = {
          length: 30,
          length2: 30,
          lineStyle: {
            width: 1,
            length: 80,
            color: colorLine[i],
          },
        }
      })
      let option = {
        graphic: {
          elements: [
            {
              type: 'image',
              left: '26%',
              top: '12%',
              z: 3,
              style: {
                image: require('../../assets/imgs/bg_pie.png'),
                width: 206,
                height: 206,
              },
            },
          ],
        },
        series: [
          {
            type: 'pie',
            radius: ['20%', '50%'],
            center: ['50%', '47%'],
            clockwise: true,
            avoidLabelOverlap: true,
            label: {
              show: true,
              position: 'outside',
              formatter: function(params) {
                const name = params.name
                return (
                  '{name|' +
                  name +
                  '}' +
                  '\n' +
                  '{val|' +
                  params.value +
                  '}' +
                  '万元'
                )
              },
              textStyle: {
                color: '#9ba6b1',
                rich: {
                  name: {
                    normal: { fontSize: '14px', color: '#9ba6b1' },
                  },
                  val: {
                    fontSize: '16px',
                    color: '#ffffff',
                  },
                },
              },
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex]
                },
              },
            },
            data,
            roseType: 'radius',
          },
        ],
      }
      this.chart.setOption(option)
    },
  },
}
</script>

<style lang="less"></style>
