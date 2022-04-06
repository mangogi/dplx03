<template>
  <!-- 切图实现棱锥体 -->
  <div class="pyramid" ref="pyramid"></div>
</template>
<script>
export default {
  name: 'pyramid',
  data() {
    return {
      loadingFunnel: { arrData: [20, 40, 60, 80, 100], title: {} },
    }
  },
  mounted() {
    this.test()
  },
  beforeDestory() {
    this.$echarts.dispose(this.myChart)
    this.myChart = null
  },
  methods: {
    setTitle(text, top, left, color, fontStyle, fontFamily, fontSize) {
      this.loadingFunnel.title = {
        text: text,
        top: top,
        left: left,
        textStyle: {
          color: color,
          fontStyle: fontStyle,
          fontFamily: fontFamily,
          fontSize: fontSize,
        },
      }
      return this.loadingFunnel.title
    },
    test() {
      let chart1 = this.$echarts.init(this.$refs.pyramid)
      let option1 = {
        title: [
          this.setTitle(
            '指标二',
            '25%',
            '21%',
            '#d1ecff',
            'normal',
            'sans-serif',
            '14'
          ),
          this.setTitle(
            '40',
            '32%',
            '21%',
            '#EFC302',
            'normal',
            'Digital',
            '20'
          ),
          this.setTitle(
            '指标一',
            '18%',
            '52%',
            '#d1ecff',
            'normal',
            'sans-serif',
            '14'
          ),
          this.setTitle(
            '20',
            '24%',
            '55%',
            '#A5E104',
            'normal',
            'Digital',
            '20'
          ),
          this.setTitle(
            '指标四',
            '43%',
            '16%',
            '#d1ecff',
            'normal',
            'sans-serif',
            '14'
          ),
          this.setTitle(
            '80',
            '50%',
            '16%',
            '#0FE6BE',
            'normal',
            'Digital',
            '20'
          ),
          this.setTitle(
            '指标三',
            '33%',
            '65%',
            '#d1ecff',
            'normal',
            'sans-serif',
            '14'
          ),
          this.setTitle(
            '60',
            '39%',
            '68%',
            '#FF5A00',
            'normal',
            'Digital',
            '20'
          ),
          this.setTitle(
            '指标五',
            '56%',
            '75%',
            '#d1ecff',
            'normal',
            'sans-serif',
            '14'
          ),
          this.setTitle(
            '100',
            '62%',
            '78%',
            '#0078FF',
            'normal',
            'Digital',
            '20'
          ),
        ],
        color: ['#bb0004', '#FFD48A'],
        tooltip: {
          show: true,
          formatter: function(params, ticket, callback) {
            switch (params.name) {
              case '指标一':
                return '指标一 :&emsp;' + 20
              case '指标二':
                return '指标二 :&emsp;' + 40
              case '指标三':
                return '指标三 :&emsp;' + 60
              case '指标四':
                return '指标四 :&emsp;' + 80
              default:
                return '指标五 :&emsp;' + 100
            }
          },
        },
        grid: {
          // containLabel: true,
          left: '10%',
          top: '19%',
          bottom: '15%',
        },
        xAxis: {
          show: false,
          data: ['一季度', '二季度', '三季度', '四季度'],
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#5EA2ED',
            interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: '#1B5BBA',
            },
          },
        },
        yAxis: {
          show: false,
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#1B5BBA',
            },
          },
          axisLabel: {
            color: '#5EA2ED',
            interval: 0,
          },
        },
        series: [
          {
            type: 'pictorialBar',
            // name: '案件归类',
            // z: 10,
            // label: {
            //     normal: {
            //         show: true,
            //         position: "top",
            //         formatter: "{c}",
            //         color: "#fff",
            //         fontSize: 13
            //     }
            // },
            data: [
              {
                name: '指标一',
                z: 100,
                value: 20,
                symbolSize: ['80%', '68%'], // 宽和高
                symbolPosition: 'center',
                symbolOffset: [152, '-600%'],
                symbol:
                  'image://' + require('../../../assets/flowImgs/yuanzhuiti.png'),
                //    symbol:'image://../static/img/ylsrgc/02.png',
                // symbol:'triangle'
              },
              {
                name: '指标二',
                z: 90,
                value: 40,
                symbolSize: ['100%', '33%'],
                symbolPosition: 'center',
                symbolOffset: [50.5, '-400%'],
                symbol:
                  'image://' +
                  require('../../../assets/flowImgs/yuanxingweixuanzhong.png'),
              },
              {
                name: '指标三',
                z: 80,
                value: 60,
                symbolSize: ['150%', '33%'],
                symbolPosition: 'center',
                symbolOffset: [-50, '-145%'],
                symbol:
                  'image://' +
                  require('../../../assets/flowImgs/yuanxingweixuanzhong.png'),
              },
              {
                name: '指标四',
                z: 70,
                value: 80,
                symbolSize: ['205%', '33%'],
                symbolPosition: 'center',
                symbolOffset: [-149, '-10%'],
                symbol:
                  'image://' +
                  require('../../../assets/flowImgs/yuanxingweixuanzhong.png'),
              },
              {
                name: '指标五',
                z: 60,
                value: 100,
                symbolSize: ['245%', '33%'],
                symbolPosition: 'center',
                symbolOffset: [-245, '75%'],
                symbol:
                  'image://' +
                  require('../../../assets/flowImgs/yuanxingweixuanzhong.png'),
              },
            ],
          },
        ],
      }
      chart1.setOption(option1)
    },
  },
}
</script>

<style scoped lang="less">
.pyramid {
  width: 500px;
  height: 200px;
}
</style>
