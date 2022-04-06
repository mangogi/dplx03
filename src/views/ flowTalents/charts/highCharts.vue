<template>
  <div>
    <div
      id="Charts"
      :style="'width: ' + width + 'px; height:' + height + 'px;'"
    ></div>
  </div>
</template>

<script>
import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
Vue.use(HighchartsVue)
highcharts3d(highcharts)
export default {
  data() {
    return {}
  },
  props: {
    tableData: {
      // 数据列表
      type: Array,
      default() {
        return [
          {
            name: '60岁以上',
            y: 52,
            h: 100,
          },
          {
            name: '40-60岁',
            y: 28,
            h: 20,
          },
          {
            name: '18-40岁',
            y: 20,
            h: 20,
          },
        ]
      },
    },
    width: {
      type: String,
      default: '329',
    },
    height: {
      type: String,
      default: '141',
    },
  },
  methods: {
    // 3d饼状图组件配置
    highChartsOptions() {
      let dataList = this.tableData
      if (dataList.length > 0) {
        dataList[1]['sliced'] = true
      }
      let colorList = ['#5A60FF', '#F3C92D', '#9D34EC', '#8742dd']
      for (let i = 0; i < colorList.length; i++) {
        colorList[i] = this.colorRadialGradient(colorList[i])
      }
      highcharts.chart('Charts', {
        chart: {
          type: 'pie',
          backgroundColor: 'transparent',
          options3d: {
            enabled: true,
            alpha: 60,
            beta: 0,
          },
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            allowPointSelect: false,
            cursor: 'pointer',
            depth: 30,
            states: {
              hover: {
                enabled: true,
                halo: {
                  opacity: 1,
                },
              },
            },
            dataLabels: {
              enabled: false,
              format: '{point.name}',
            },
            size: 120,
          },
        },
        series: [
          {
            type: 'pie',
            name: '培训占比',
            data: dataList,
            center: ['22%', '40%'], // 调整左右位置
            colors: colorList,
            // colors:['#f2714c','#21afd3','#4b66ec'],
            // startAngle:80-Math.round((data[0].y/all)*360/2),
            zIndex: 1,
            events: {
              click: function(event) {
                /* var dataMap = {name:event.point.options.name,value:event.point.options.y,percent:event.point.percentage};
                         getPxrsPieChange(dataMap); */
              },
            },
          },
        ],
      })
      // 添加饼图legend位置
      let legendDom = document.createElement('div')
      document.getElementById('Charts').appendChild(legendDom)
      legendDom.style.position = 'absolute'
      legendDom.style.top = '0px'
      legendDom.style.right = '0px'
      legendDom.style.width = '200px'
      legendDom.style.height = '100%'
      legendDom.style.display = 'flex'
      legendDom.style.flexDirection = 'column'
      legendDom.style.justifyContent = 'center'
      for (let i = 0; i < dataList.length; i++) {
        let currLegendDom = document.createElement('div')
        currLegendDom.style.height = '24px'
        currLegendDom.style.width = '150px'
        currLegendDom.style.marginLeft = '80px'
        currLegendDom.style.marginTop = '15px'
        currLegendDom.style.position = 'relate'
        currLegendDom.innerHTML =
          '<div style="float:left ;border-radius:50%;width:8px;height:8px;margin:8px 5px 0 0; background: ' +
          colorList[i % colorList.length]['stops'][0][1] +
          '"></div>\n' +
          '        <div style="font-size: 14px;color: #fff;float: left;line-height: 24px">' +
          dataList[i]['name'] +
          ' |&nbsp;' +
          dataList[i]['y'] +
          '%</div>'
        legendDom.appendChild(currLegendDom)
      }
    },
    /**
     * 获取颜色渐变
     * @param color
     * @constructor
     */
    colorRadialGradient(color) {
      return {
        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
        stops: [
          [0, color],
          [
            0.5,
            highcharts
              .Color(color)
              .brighten(-0.2)
              .get('rgba'),
          ], // darken
          [
            1,
            highcharts
              .Color(color)
              .brighten(-0.5)
              .get('rgba'),
          ], // darken
        ],
      }
    },
  },
  mounted() {
    this.highChartsOptions()
  },
}
</script>

<style lang="less" scoped>
//3d组件样式
#Charts {
  // background: url("../static/img/mxjb/pieBG.png") no-repeat 2% 33%;
  background-size: 53%;
  // border: 1px solid red;
  box-sizing: border-box;
  position: relative;
}

.highcharts-credits {
  display: none;
}
</style>
