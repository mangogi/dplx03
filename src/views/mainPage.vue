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
        <list-box
          :imgUrl="'01_70'"
          :title="listData[0].title"
          :val="listData[0].val"
          :percent="listData[0].percent"
        ></list-box>
        <list-box
          :imgUrl="'01_38'"
          :title="listData[1].title"
          :val="listData[1].val"
          :percent="listData[1].percent"
        ></list-box>
        <list-box
          :imgUrl="'01_7'"
          :title="listData[2].title"
          :val="listData[2].val"
          :percent="listData[2].percent"
        ></list-box>
        <list-box
          :imgUrl="'01_75'"
          :title="listData[3].title"
          :val="listData[3].val"
          :percent="listData[3].percent"
        ></list-box>
        <list-box
          :imgUrl="'01_44'"
          :title="listData[4].title"
          :val="listData[4].val"
          :unit="listData[4].unit"
          :percent="listData[4].percent"
        ></list-box>
        <list-box
          :imgUrl="'01_62'"
          :title="listData[5].title"
          :val="listData[5].val"
          :percent="listData[5].percent"
        ></list-box>
        <list-box
          :imgUrl="'01'"
          :title="listData[6].title"
          :val="listData[6].val"
          :percent="listData[6].percent"
          :showLine="false"
        ></list-box>
      </div>
      <!-- 中间三个图 -->
      <div class="center_box">
        <!--  各险种缴费分析饼图 -->
        <box-container
          class="pie_charts"
          :boxWidth="'420'"
          :titleWidth="'400'"
          :title="'各险种缴费分析'"
          @getOption="getPieOption"
        >
          <pie-chart></pie-chart>
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
          :boxWidth="'960'"
          :title="'各险种缴费明细'"
          :titleWidth="'936'"
          :showSelect="false"
          :showList="true"
          @getTheme="getTheme"
        >
          <circle-box :boxTitle="boxTitle"></circle-box>
        </box-container>
        <!-- 各险种补缴/退缴情况雷达图 -->
        <box-container
          class="radar_chart"
          :title="'各险种补缴/退缴情况'"
          :boxWidth="'420'"
          :titleWidth="'400'"
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
          :boxWidth="'600'"
          :titleWidth="'574'"
          :boxHeight="'320'"
          :title="'缴费趋势分析'"
        >
          <pay-fee></pay-fee>
        </box-container>
        <!-- 征缴趋势分析 -->
        <box-container
          :boxWidth="'600'"
          :titleWidth="'574'"
          :boxHeight="'320'"
          :title="'征缴趋势分析'"
          :showSelect="false"
        >
          <line-chart></line-chart>
        </box-container>
        <!-- 补缴/退缴趋势分析 -->
        <box-container
          :boxWidth="'600'"
          :titleWidth="'574'"
          :boxHeight="'320'"
          :title="'补缴/退缴趋势分析'"
        >
          <return-fee></return-fee
        ></box-container>
      </div>
    </div>
  </screen-adapter>
</template>
<script>
import screenAdapter from './charts/ScreenAdapter.vue'
import listBox from './charts/listBox.vue'
import boxContainer from './charts/boxContainer.vue'
import pieChart from './charts/pieChart.vue'
import pieLegend from './charts/pieLegend.vue'
import radarChart from './charts/radarChart.vue'
import circleBox from './charts/circleBox.vue'
import payFee from './charts/payFee.vue'
import returnFee from './charts/returnFee.vue'
import lineChart from './charts/lineChart.vue'

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
      radarSecondData: [90, 20, 45, 30, 75],
    }
  },
  mounted() {
    this.getNowTime()
  },
  methods: {
    /**
     * @description 日期选择器绑定的方法
     */
    getDay() {},
    /**
     * @description 获取当前时间转化为yy-mm-dd hh:mm格式
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
     * @param item {string} = ['城职养老','城居养老']等
     */
    getTheme(item) {
      this.boxTitle = item
    },
    /**
     * @description 获取各险种缴费分析的option选项
     *@param item {number} 0、1、2
     */
    getPieOption(item) {
      this.pieOption = item
      this.radarSecondData = [44, 44, 44, 44, 44]
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
    background: url('../assets/imgs/bg.png') no-repeat;
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
