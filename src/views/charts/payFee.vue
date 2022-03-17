<template>
  <div
    ref="pie_chart"
    class="pie_chart"
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
  },
  data() {
    return {}
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      let chart = this.$echarts.init(this.$refs.pie_chart)
      const data = [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
      const sideData = data.map(item => item + 9.5)
      let option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b} : {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          width: '100%',
          height: '65%',
        },
        legend: {
          show: true,
        },
        xAxis: {
          data: [
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
          ],
          // 坐标轴
          axisLine: {
            lineStyle: {
              color: '#3eb2e8',
            },
          },
          // 坐标值标注
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
            },
          },
        },
        yAxis: {
          name: '金额（万元）',
          // 坐标轴
          axisLine: {
            show: false,
          },
          // 坐标值标注
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
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
        series: [
          {
            name: '征缴总额',
            tooltip: {
              show: false,
            },
            type: 'bar',
            barWidth: 12,
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
                      color: '#0B4EC3', // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#138CEB', // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#17AAFE', // 100% 处的颜色
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
            barWidth: 9,
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
                      color: '#09337C', // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#0761C0', // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#0575DE', // 100% 处的颜色
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
            symbolSize: ['22', '5'],
            symbolOffset: ['0', '-5'],
            // symbolRotate: -5,
            symbolPosition: 'end',
            data: data,
            z: 3,
          },
        ],
      }
      chart.setOption(option)
    },
  },
}
</script>

<style lang="less">
.pie_chart {
  // background: url('../../assets/imgs/bg_line.png') no-repeat;
  // background-position: 100px 50px;
}
</style>
