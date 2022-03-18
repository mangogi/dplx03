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
  },
  data() {
    return {
      chart: {},
    }
  },
  mounted() {
    this.initCharts()
  },
  beforeDestroy() {
    this.$echarts.dispose(this.chart)
    this.chart = null
  },
  methods: {
    initCharts() {
      this.chart = this.$echarts.init(this.$refs.pie_chart)
      this.getChartOption()
    },
    getChartOption() {
      let option = {
        color: ['#39baff', '#ec903d'], // 数据蛛网线条的颜色，示例中为红黄绿
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: 'rgba(7, 23, 55,.6)',
          borderColor: '#2d4581',
          textStyle: {
            color: '#ffffff',
          },
        },
        legend: {
          // 图例的设置
          show: true, // 是否显示图例
          icon: 'circle', // 图例形状，示例为原型
          top: 10, // 图例离底部的距离
          left: 10,
          itemWidth: 6, // 图例标记的图形宽度。
          itemHeight: 6, // 图例标记的图形高度。
          itemGap: 20, // 图例每项之间的间隔。
          textStyle: {
            // 图例文字的样式设置
            fontSize: 14,
            color: '#9ba6b1',
          },
          data: ['补缴', '退缴'], // 图例的名称数据
        },
        radar: [
          {
            // 每个网格的指数名称，类似于X轴或Y轴上的数据的值大小
            indicator: [
              {
                text: '机关养老',
                max: 100,
              },
              {
                text: '工商保险',
                max: 100,
              },
              {
                text: '失业保险',
                max: 100,
              },
              {
                text: '城居养老',
                max: 100,
              },
              {
                text: '城职养老',
                max: 100,
              },
            ],
            center: ['50%', '52%'], // 统计图位置，示例是居中
            radius: '70%', // 统计图大小
            startAngle: 90, // 统计图起始的角度
            splitNumber: 5, // 统计图蛛网的网格分段，示例分为三段
            // shape: 'circle',//蛛网是圆角还是尖角
            name: {
              formatter: '{value}', // 蛛网轴尖的数据名称
              textStyle: {
                // 蛛网轴尖的文字样式
                fontSize: 14, // 外圈标签字体大小
                color: '#9ba6b1', // 外圈标签字体颜色
              },
            },
            splitArea: {
              // 蛛网在 grid 区域中的分隔区域，默认不显示。
              show: true,
              areaStyle: {
                // 分隔区域的样式设置。
                color: [
                  'rgba(76, 140, 200, 0.05)',
                  'rgba(12, 31, 69, 0.1)',
                  'rgba(6, 23, 51,.2)',
                ], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
              },
            },
            axisLine: {
              // 蛛网轴线上的颜色，由内向外发散的那条
              lineStyle: {
                color: '#1d3d7a',
              },
            },
            splitLine: {
              // 蛛网环形的线条颜色
              lineStyle: {
                color: '#113865', // 分隔线颜色
                width: 1, // 分隔线线宽
              },
            },
          },
        ],
        series: [
          {
            name: '',
            type: 'radar', // 统计图专业名称为雷达图，这里叫做蛛网图
            itemStyle: {
              // 数据样式设置
              emphasis: {
                // 鼠标悬浮效果
                lineStyle: {
                  width: 4, // 线条粗细变成4
                },
              },
            },
            data: [
              {
                name: '补缴', // 数据名称
                value: [85, 65, 55, 40, 72],
                areaStyle: {
                  normal: {
                    // 单项区域填充样式
                    color: {
                      x: 0, // 右
                      y: 0, // 下
                      x2: 1, // 左
                      y2: 1, // 上
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(57, 186, 255,1)',
                        },
                        {
                          offset: 0.5,
                          color: 'rgba(57, 186, 255,0.3)',
                        },
                        {
                          offset: 1,
                          color: 'rgba(57, 186, 255,1)',
                        },
                      ],
                    },
                    opacity: 1, // 区域透明度
                  },
                },
                symbolSize: 4.5, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                label: {
                  // 单个拐点文本的样式设置
                  normal: {
                    // 单个拐点文本的样式设置。[ default: false ]
                    position: 'top', // 标签的位置。[ default: top ]
                    distance: 4, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
                    color: '#39baff', // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
                    fontSize: 14, // 文字的字体大小
                  },
                  emphasis: {
                    show: true,
                    formatter: '{c}', // 显示分析的数字值，a为统计图名称，b为学生姓名,c为学生这项能力的值
                  },
                },
                itemStyle: {
                  normal: {
                    // 图形悬浮效果
                    borderColor: '#39baff', // 单个数据标记描边的颜色
                    borderWidth: 4.5, // 单个数据标记描边的大小
                  },
                },
              },
              {
                name: '退缴',
                value: [90, 20, 45, 30, 75],
                symbolSize: 4.5,
                itemStyle: {
                  normal: {
                    borderColor: '#ec903d',
                    borderWidth: 2.5,
                  },
                },
                areaStyle: {
                  normal: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(236, 144, 61,1)',
                        },
                        {
                          offset: 0.5,
                          color: 'rgba(236, 144, 61,0.3)',
                        },
                        {
                          offset: 1,
                          color: 'rgba(236, 144, 61,1)',
                        },
                      ],
                    },
                    opacity: 1,
                  },
                },
                label: {
                  normal: {
                    position: 'top',
                    distance: 4,
                    color: '#39baff',
                    fontSize: 14,
                  },
                  emphasis: {
                    show: true,
                    formatter: '{c}',
                  },
                },
              },
            ],
          },
        ],
      }
      this.chart.setOption(option)
    },
  },
}
</script>

<style lang="less"></style>
