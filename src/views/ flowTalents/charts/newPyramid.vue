<template>
  <div
    class="pyramid"
    ref="pyramid"
    :style="{ width: width + 'px', height: height + 'px' }"
  ></div>
</template>

<script>
export default {
  name: 'newPyramid',
  props: {
    pyData: {
      type: Array,
      default: () => {
        return [
          { value: 20, name: '硕士及以上' },
          { value: 40, name: '本科' },
          { value: 60, name: '高中' },
          { value: 80, name: '中专及以下' },
          { value: 100, name: '专科' },
        ]
      },
    },
    colors: {
      type: Array,
      default: () => {
        return ['#8bfffd', '#3de6e3', '#3bbcd9', '#378acc', '#345ec0']
      },
    },
    width: {
      type: String,
      default: '500',
    },
    height: {
      type: String,
      default: '270',
    },
  },
  data() {
    return {
      chart: {},
    }
  },
  watch: {
    pyData: {
      handler(val, oldVal) {
        if (val) {
          this.getOption()
        }
      },
    },
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    /**
     * 初始化
     */
    initCharts() {
      const pyramid = this.$refs.pyramid
      this.chart = this.$echarts.init(pyramid)
      this.getOption()
    },
    /**
     * 设置option
     */
    getOption() {
      let datas = this.pyData
      let all = 0
      datas.forEach(item => {
        return (all = all + item.value)
      })
      let colorList = this.colors
      let option = {
        color: colorList,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },

        series: [
          {
            name: '',
            type: 'funnel',
            left: '19%',
            width: '35%',
            sort: 'ascending',
            gap: 0,
            label: {
              normal: {
                hight: 30,
                fontSize: 14,
                color: '#fff',
                formatter: function(params) {
                  return (
                    '{name|' +
                    params.name +
                    '}' +
                    '\n' +
                    '{val|' +
                    params.value +
                    '   ' +
                    ((params.value / all) * 100).toFixed(2) +
                    '%' +
                    '}'
                  )
                },
                rich: {
                  name: {
                    color: '#5cbcff',
                    fontSize: 14,
                    padding: [0, 0, 0, 0],
                  },
                  val: {
                    color: '#ffffff',
                    fontSize: 14,
                    padding: [1, 0, 0, 0],
                  },
                },
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 70,
              },
            },
            itemStyle: {
              normal: {
                opacity: 1,
                borderColor: 'rgba(9,20,36,0)',
              },
              rotate: -32,
            },
            data: datas,
          },
          {
            name: '',
            type: 'funnel',
            left: '19%',
            width: '35%',
            maxSize: '70%',
            sort: 'ascending',
            gap: 0,
            label: {
              show: false,
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                opacity: 1,
                borderColor: 'rgba(9,20,36,0)',
                borderWidth: 0,
                shadowBlur: 5,
                shadowOffsetX: 5,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 1)',
              },
            },

            data: datas,
          },
        ],
      }

      this.chart.setOption(option)
    },
  },
  /**
   * 销毁实例
   */
  beforeDestroy() {
    this.$echarts.dispose(this.chart)
    this.chart = null
  },
}
</script>

<style lang="less" scoped></style>
