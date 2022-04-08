<template>
  <screen-adapter>
    <div class="main-page">
      <!-- 标题部分 -->
      <div class="main-title">
        <div class="top_box">
          <input
            class="date_picker"
            type="date"
            name="start_time"
            value="2020-2-3"
            v-model="selectDay"
            @change="getDay"
          />
          <div class="title_text">社保缴费分析</div>
          <div class="day_time">{{ todyTime }}</div>
        </div>
      </div>
      <!-- 七个列表部分 -->
      <div class="list_box">
        <div
          v-for="(item, index) in listData"
          :key="item.title"
          style="margin-left:2px"
        >
          <list-box
            :imgUrl="imgUrlData[index]"
            :title="listData[index].title"
            :val="listData[index].val"
            :percent="listData[index].percent"
            :showLine="index"
          ></list-box>
          <!-- <div class="split_line"></div> -->
        </div>
      </div>
      <!-- 中间三个图 -->
      <div class="center_box">
        <!--  各险种缴费分析饼图 -->
        <box-container
          class="pie_charts"
          boxWidth="420"
          titleWidth="400"
          title="各险种缴费分析"
          @getOption="getPieOption"
        >
          <pie-chart :pieData="pieData"></pie-chart>
          <!-- 图例 -->
          <div class="legend_contain">
            <pie-legend :legendData="mostData"></pie-legend>
            <pie-legend
              :legendData="lessData"
              :colors="colors"
              style="margin-left:53px"
            ></pie-legend>
          </div>
        </box-container>
        <!-- 中间大图 -->
        <box-container
          boxWidth="960"
          title="各险种缴费明细"
          titleWidth="936"
          :showSelect="false"
          showList
          @getTheme="getTheme"
        >
          <circle-box :boxTitle="boxTitle"></circle-box>
        </box-container>
        <!-- 各险种补缴/退缴情况雷达图 -->
        <box-container
          class="radar_chart"
          title="各险种补缴/退缴情况"
          boxWidth="420"
          titleWidth="400"
          :showSelect="false"
        >
          <radar-chart :radarSecondData="radarSecondData"></radar-chart>
          <!-- 图例 -->
          <div style="display:flex">
            <pie-legend :legendData="mostData"></pie-legend>
            <pie-legend
              :legendData="lessData"
              :colors="colors"
              style="margin-left:53px"
            ></pie-legend>
          </div>
        </box-container>
      </div>
      <!-- 下面三个echarts图 -->
      <div class="bottom_box">
        <!-- 缴费趋势分析 -->
        <box-container
          class="pie_charts"
          boxWidth="600"
          titleWidth="574"
          boxHeight="320"
          title="缴费趋势分析"
          @getOption="getPayFeeData"
        >
          <pay-fee :barData="barData" :lineData="lineData"></pay-fee>
        </box-container>
        <!-- 征缴趋势分析 -->
        <box-container
          boxWidth="600"
          titleWidth="574"
          boxHeight="320"
          title="征缴趋势分析"
          :showSelect="false"
        >
          <line-chart></line-chart>
        </box-container>
        <!-- 补缴/退缴趋势分析 -->
        <box-container
          boxWidth="600"
          titleWidth="574"
          boxHeight="320"
          title="补缴/退缴趋势分析"
          @getOption="getReturnFeeData"
        >
          <return-fee
            :bar2Data="barData2"
            :barData="barData1"
            :line2Data="lineData2"
            :lineData="lineData1"
          ></return-fee
        ></box-container>
      </div>
    </div>
  </screen-adapter>
</template>
<script>
import screenAdapter from '../fee/charts/ScreenAdapter.vue'
import listBox from '../fee/charts/listBox.vue'
import boxContainer from '../fee/charts/boxContainer.vue'
import pieChart from '../fee/charts/pieChart.vue'
import pieLegend from '../fee/charts/pieLegend.vue'
import radarChart from '../fee/charts/radarChart.vue'
import circleBox from '../fee/charts/circleBox.vue'
import payFee from '../fee/charts/payFee.vue'
import returnFee from '../fee/charts/returnFee.vue'
import lineChart from '../fee/charts/lineChart.vue'
import './api/mainApi.js'
// const Mock = require('mockjs')
// const axios = require('axios')
export default {
  name: 'mainPage',
  components: {
    screenAdapter,
    listBox,
    boxContainer,
    pieChart,
    pieLegend,
    radarChart,
    circleBox,
    payFee,
    returnFee,
    lineChart,
  },
  data() {
    return {
      selectDay: '', // 日期选择器
      todyTime: '', // 当前日期
      imgUrlData: ['01_70', '01_38', '01_7', '01_75', '01_44', '01_62', '01'],
      listData: [
        { title: '个人缴费金额', unit: '万元', percent: '+2.3%', val: '34.89' },
        { title: '单位缴费金额', unit: '万元', percent: '+2.3%', val: '86.89' },
        { title: '征缴总金额', unit: '万元', percent: '+2.3%', val: '987.8' },
        { title: '缴费总人数', unit: '万元', percent: '-2.3%', val: '34.89' },
        { title: '征缴率', unit: '%', percent: '+2.3%', val: '96' },
        { title: '补缴金额', unit: '万元', percent: '+2.3%', val: '234.9' },
        { title: '退费金额', unit: '万元', percent: '-2.3%', val: '56.89' },
      ],
      mostData: {
        title: '缴费最多险种',
        name: '机关养老',
        val: '393.87',
        unit: '万元',
        percent: '26%',
      },
      lessData: {
        title: '缴费最少险种',
        name: '城居养老',
        val: '334.87',
        unit: '万元',
        percent: '16%',
      },
      colors: '#ec903d',
      boxTitle: '城职养老', // 中间大框选中的title
      pieOption: '',
      radarSecondData: [30, 40, 50, 60, 40, 60],
      lineData: [], // 缴费条形图数据
      barData: [], // 缴费柱状图数据
      lineData1: [], // 补缴退缴的数据
      lineData2: [],
      barData1: [],
      barData2: [],
      pieData: [],
    }
  },
  mounted() {
    this.getNowTime()
    // this.getDay() // 测试axios
    this.getPayFeeData()
    this.getReturnFeeData()
    this.getPieOption()
  },
  methods: {
    /**
     * 获取缴费趋势分析的值
     */
    getPayFeeData() {
      this.axios
        .get('/main/payFee1')
        .then(response => {
          let data = response.data.data
          this.barData = []
          this.lineData = []
          for (let item of data) {
            this.lineData.push(item.line)
            this.barData.push(item.bar)
          }
        })
        .catch(res => {
          console.log(res)
        })
    },
    /**
     * 补缴/退缴的数据
     */
    getReturnFeeData() {
      this.axios
        .get('/main/returnFee') // get('url',{参数})
        .then(response => {
          let data = response.data.data
          console.log(data)
          this.barData1 = []
          this.lineData1 = []
          this.barData2 = []
          this.lineData2 = []
          for (let item of data) {
            this.barData1.push(item.bar1)
            this.lineData1.push(item.line1)
            this.barData2.push(item.bar2)
            this.lineData2.push(item.line2)
          }
        })
        .catch(res => {
          console.log(res)
        })
    },
    /**
     * 日期选择器绑定的方法
     */
    getDay() {
      // get 请求传入参数
      this.axios
        .get('/mode1/tableDataOne')
        .then(response => {
          this.newsList = response.data.data
          console.log(response)
        })
        .catch(response => {
          console.log(response)
        })
    },
    /**
     * 获取当前时间转化为yy-mm-dd hh:mm格式
     */
    getNowTime() {
      let startDate = new Date()
      let data = startDate
        .toLocaleDateString()
        .split('/')
        .join('-')
      let hours = startDate.getHours()
      let mins = startDate.getMinutes()
      this.todyTime = data.concat(' ' + hours, ':', mins)
    },
    /**
     * 获取主题
     * @param item {string}  ['城职养老','城居养老']等
     */
    getTheme(item) {
      this.boxTitle = item
    },
    /**
     * 获取各险种缴费分析的option选项
     * @param item {number} 0、1、2
     */
    getPieOption(item) {
      this.pieOption = item
      this.pieData = []
      this.axios
        .get('/main/pieData')
        .then(response => {
          this.pieData = response.data.data
        })
        .catch(res => {
          console.log(res)
        })
    },
  },
}
</script>
<style scoped lang="less">
.bgcorner {
  // background:bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;;
  background: linear-gradient(to top, #2383ed, #2383ed) left top no-repeat,
    // 上左
      linear-gradient(to right, #2383ed, #2383ed) left top no-repeat,
    //坐上
      linear-gradient(to left, #2383ed, #2383ed) right top no-repeat,
    //上右
      linear-gradient(to bottom, #2383ed, #2383ed) right top no-repeat,
    //上右
      linear-gradient(to left, #2383ed, #2383ed) left bottom no-repeat,
    // 下左
      linear-gradient(to bottom, #2383ed, #2383ed) left bottom no-repeat,
    // 左下
      linear-gradient(to top, #2383ed, #2383ed) right bottom no-repeat,
    // 下右
      linear-gradient(to left, #2383ed, #2383ed) right bottom no-repeat; //右下

  background-size: 3px 16px, 16px 3px, 3px 16px, 16px 3px;
}
.split_line {
  // margin-top: 17px;
  // margin-left: 21px;
  width: 1px;
  height: 69px;
  background: linear-gradient(180deg, #1e6dc3, #0c2541);
}
.legend_contain-flex {
  display: flex;
  flex-direction: row;
}
.main-page {
  width: 100%;
  height: 100%;
  background-color: #04090e;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  .main-title {
    width: 99%;
    height: 60px;
    background: url('../../assets/imgs/bg.png') no-repeat;
    margin-left: 0.5%;
    .top_box {
      width: 97%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-left: 1.5%;
      .date_picker {
        background-color: #061524;
        color: #ffffff;
        border: solid 1px #134086;
        font-size: 18px;
        height: 33px;
        margin-left: 0px;
        margin-top: 15px;
      }
      .title_text {
        z-index: 22;
        width: 200px;
        height: auto;
        font-family: SourceHanSansCN-Bold;
        font-size: 28px;
        line-height: 30px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #ffffff;
        background: linear-gradient(to bottom, white, #44a5eb);
        -webkit-background-clip: text;
        color: transparent;
        margin-top: 14px;
        text-align: right;
      }
      .day_time {
        width: 149px;
        height: 13px;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 40px;
        letter-spacing: 0px;
        color: #1b67de;
        margin-top: 15px;
      }
    }
  }
  .list_box {
    width: 1840px;
    height: 100px;
    background-color: rgba(7, 16, 24, 0.4);
    border: solid 1px #2564ae;
    margin-top: 30px;
    margin-left: 40px;
    display: flex;
    flex-direction: row;
    .bgcorner();
  }
  .center_box {
    width: 1840px;
    height: 489px;
    margin-top: 20px;
    margin-left: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .pie_charts {
      margin-left: 0px;
      .legend_contain {
        .legend_contain-flex();
      }
      .radar_chart {
        .radar_contain {
          display: flex;
          flex-direction: row;
        }
      }
    }
  }
  .bottom_box {
    width: 1840px;
    height: 320px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    margin-left: 40px;
    .pie_charts {
      margin-left: 0px;
    }
  }
}
</style>
