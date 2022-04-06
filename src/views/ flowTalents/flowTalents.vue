<template>
  <screen-adapter>
    <div class="main">
      <!-- 页面顶部 -->
      <div class="top">
        <!-- 地区选择器 -->
        <div class="picker">
          <select
            class="provice_select"
            name="province-choice"
            v-model="couponSelected"
            @change="getCouponSelected"
          >
            <option
              v-for="(coupon, index) in provinceOption"
              :key="index"
              :value="index"
            >
              {{ coupon }}
            </option>
          </select>
        </div>
        <div class="title">流动人员档案情况分析</div>
        <!-- 时间选择器 -->
        <div class="picker">
          <input
            class="date_picker"
            type="date"
            name="start_time"
            value="2020-2-3"
            v-model="selectDay"
            @change="getDay"
          />
        </div>
      </div>
      <!-- <div @click="returnMain" style="color:#fff;font-size:20px;width:55px;">
        返回
      </div> -->
      <!-- 页面中部四个方块部分 -->
      <div class="center">
        <top-box
          :num="dajslArr"
          title="档案总存档"
          :down="down"
          :up="up"
          :imgurl="'档案总存档'"
        >
        </top-box>
        <top-box
          :num="dajslArr"
          title="档案接受量"
          :down="down"
          :up="up"
          :imgurl="'档案接受量'"
        >
        </top-box>
        <top-box
          :num="dajslArr"
          title="档案借阅量"
          :down="down"
          :up="up"
          :imgurl="'档案借阅量'"
        >
        </top-box>
        <top-box
          :num="dajslArr"
          title="档案转出量"
          :down="down"
          :up="up"
          :imgurl="'档案转出量'"
        >
        </top-box>
      </div>
      <!-- 四个方块以下部分 -->
      <div class="bottom">
        <!-- 左边三个图表 -->
        <div class="left">
          <!-- 性别分布饼图 -->
          <div class="leftTop">
            <div class="titlebar pos">
              <div class="titletext">性别分布</div>
            </div>
            <!-- 性别分布饼图 -->
            <pie
              class="chartsSex chartsWidth"
              :pieData="sexData"
              :iconUrl="'xingbietongji'"
              :outColor="sexColorOne"
              :innerColor="sexColorTwo"
              v-if="flag"
            ></pie>
          </div>
          <div class="leftCenter">
            <div class="titlebar pos">
              <div class="titletext">年龄分布</div>
            </div>
            <!-- 年龄分布条形图 -->
            <bar class="chartsAge chartsWidth" :barData="ageData"></bar>
          </div>
          <div class="leftBottom">
            <div class="titlebar pos">
              <div class="titletext">学历分布</div>
            </div>
            <!-- 学历分布漏斗图 -->
            <pyramid :pyData="pyData"></pyramid>
          </div>
        </div>

        <!-- 中间地图部分 -->
        <div class="mapBox">
          <div class="mapTop">
            <br />
            <p class="map_title">劳动转移情况</p>
            <!-- 转入转出两个按钮 -->
            <div class="map_btnbox">
              <button
                class="map_btn"
                :class="{ map_btn_selected: isSelected }"
                @click="changeMap(0)"
              >
                转入
              </button>
              <button
                class="map_btn"
                :class="{ map_btn_selected: !isSelected }"
                @click="changeMap(1)"
              >
                转出
              </button>
            </div>
            <div class="legend_box">
              <div class="legend_gap">
                <div class="lenged_gap_green"></div>
                <span>转入</span>
              </div>
              <div class="legend_gap">
                <div class="lenged_gap_yellow"></div>
                <span>转出</span>
              </div>
            </div>
            <!-- 地图 -->
            <map-chart
              class="map_chart"
              :keys="chartKey"
              :mapData="mapDatas"
            ></map-chart>
          </div>
          <div class="mapBottom">
            <!-- 中下的六个仪表盘 -->
            <p>转移排行</p>
            <div class="panel_box">
              <panel
                :provinceData="provinceData[0]"
                :imgurl="'location-full'"
              ></panel>
              <panel
                :provinceData="provinceData[1]"
                :imgurl="'location-full-2'"
              ></panel>
              <panel
                :provinceData="provinceData[2]"
                :imgurl="'location-full-3'"
              ></panel>
              <panel :provinceData="provinceData[3]" :imgurl="''"></panel>
              <panel :provinceData="provinceData[4]" :imgurl="''"></panel>
              <panel :provinceData="provinceData[5]" :imgurl="''"></panel>
            </div>
          </div>
        </div>
        <!-- 右边三个图表 -->
        <div class="right">
          <div class="rightTop">
            <div class="titlebar pos">
              <div class="titletext">存档性质分析</div>
            </div>
            <!-- 存档性质分析饼图 -->
            <pie
              class="chartsSex chartsWidth"
              :pieData="natureData"
              :iconUrl="'存档性质分析'"
              :outColor="natureColorOne"
              :innerColor="natureColorTwo"
              v-if="flag"
            ></pie>
          </div>
          <div class="rightCenter">
            <div class="titlebar pos">
              <div class="titletext">存档名族分析</div>
            </div>
            <!-- 存档名族分析饼图 -->
            <pie
              class="chartsSex chartsWidth"
              :pieData="nationData"
              :iconUrl="'存档民族分析'"
              :outColor="nationColorOne"
              :innerColor="nationColorTwo"
              v-if="flag"
            ></pie>
          </div>
          <div class="rightBottom">
            <div class="titlebar pos">
              <div class="titletext">近六个月档案接收和转出情况</div>
            </div>
            <!-- 近6个月档案接收和转出情况 -->
            <vertical-bar
              v-if="showBar"
              class="chartsSex chartsWidth"
              :barData="fileData"
            ></vertical-bar>
            <!-- <high-charts></high-charts> -->
          </div>
        </div>
      </div>
    </div>
  </screen-adapter>
</template>

<script>
import Bar from './charts/bar.vue'
import TopBox from './charts/TopBox.vue'
import Pie from './charts/pie.vue'
import VerticalBar from './charts/verticalBar.vue'
import Panel from './charts/panel.vue'
import ScreenAdapter from './charts/ScreenAdapter.vue'
import pyramid from './charts/newPyramid.vue'
import mapChart from './charts/mapChart.vue'
// import highCharts from './charts/highCharts.vue'

// 饮用component组件 用@
export default {
  name: 'MainPage',
  components: {
    Bar,
    TopBox,
    Pie,
    VerticalBar,
    Panel,
    ScreenAdapter,
    pyramid,
    mapChart,
  },
  data() {
    return {
      provinceOption: ['新疆维吾尔自治区', '四川省'],
      selectDay: '', // 选中的时间日期
      dajsl: 4619, // 档案接收量
      dajslArr: [], // 档案接收量数组
      up: '+2.56%', // 增长比例
      down: '-2.56%', // 下降比例
      sexData: [
        { name: '男性', val: '245678', per: '50.00%' },
        { name: '女性', val: '240078', per: '50.00%' },
      ], // 性别饼图数据
      nationData: [
        { name: '汉族', val: '245678', per: '50.00%' },
        { name: '少数名族', val: '240078', per: '50.00%' },
      ], // 民族饼图数据
      natureData: [
        { name: '个人存档', val: '245678', per: '50.00%' },
        { name: '企业存档', val: '180078', per: '50.00%' },
      ], // 性质饼图数据
      sexColorOne: [], // 饼图的颜色
      sexColorTwo: [],
      nationColorOne: [],
      nationColorTwo: [],
      natureColorOne: [],
      natureColorTwo: [],
      flag: false, // 为了解决页面加载完成了 但是数据没有传到子组件的问题
      ageData: [
        { name: '60岁以上', value: '44440000', per: '12%' },
        { name: '50～59', value: '23340000', per: '12%' },
        { name: '40～49', value: '1234000', per: '12%' },
        { name: '30～39', value: '6640000', per: '12%' },
        { name: '20～29', value: '12340000', per: '12%' },
        { name: '20及以下', value: '12340000', per: '12%' },
      ],
      fileData: [],
      showBar: false,
      provinceData: [
        { name: '四川省', value: 0.63, num: '8.8万人' },
        { name: '天津市', value: 0.63, num: '8.8万人' },
        { name: '湖南省', value: 0.63, num: '8.8万人' },
        { name: '北京市', value: 0.63, num: '8.8万人' },
        { name: '上海市', value: 0.63, num: '8.8万人' },
        { name: '江苏省', value: 0.63, num: '8.8万人' },
      ],
      showPanel: false,
      isSelected: true, // 按钮是佛选中
      chartKey: 'in', // 地图 转入还是转出
      outData: [
        // 转出数据
        {
          count: 2,
          sourceLat: '42.50064453125', // 北纬
          sourceLng: '93.28025390625', // 东经
          targetName: '乌鲁木齐',
          targetId: '001',
        },
        {
          count: 2,
          sourceLat: '39.30064453125',
          sourceLng: '75.59025390625',
          targetName: '乌鲁木齐',
          targetId: '001',
        },
      ],
      inData: [
        // 转入数据
        {
          count: 2,
          sourceLat: '42.50064453125', // 北纬
          sourceLng: '93.28025390625', // 东经
          name: '和田地区',
          targetName: '乌鲁木齐',
          targetId: '001',
        },
        {
          count: 6,
          sourceLat: '39.30064453125',
          sourceLng: '75.59025390625',
          targetName: '乌鲁木齐',
          name: '和田地区',
          targetId: '001',
        },
        {
          count: 8,
          sourceLat: '44.57064453125',
          sourceLng: '82.08025390625',
          name: '和田地区',
          targetName: '乌鲁木齐',
          targetId: '001',
        },
        {
          count: 10,
          sourceLat: '37.12064453125',
          sourceLng: '79.94025390625',
          name: '和田地区',
          targetName: '乌鲁木齐',
          targetId: '001',
        },
      ],
      mapDatas: [
        // 地图的数据
        {
          count: 2,
          sourceLat: '42.50064453125', // 北纬
          sourceLng: '93.28025390625', // 东经
          name: '和田地区',
          targetName: '乌鲁木齐',
          targetId: '001',
        },
        {
          count: 6,
          sourceLat: '39.30064453125',
          sourceLng: '75.59025390625',
          targetName: '乌鲁木齐',
          name: '和田地区',
          targetId: '001',
        },
        {
          count: 8,
          sourceLat: '44.57064453125',
          sourceLng: '82.08025390625',
          name: '和田地区',
          targetName: '乌鲁木齐',
          targetId: '001',
        },
        {
          count: 10,
          sourceLat: '37.12064453125',
          sourceLng: '79.94025390625',
          name: '和田地区',
          targetName: '乌鲁木齐',
          targetId: '001',
        },
      ],
      pyData: [
        { value: 20, name: '硕士及以上' },
        { value: 40, name: '本科' },
        { value: 60, name: '高中' },
        { value: 80, name: '中专及以下' },
        { value: 100, name: '专科' },
      ],
    }
  },
  mounted() {
    this.arrSet()
    this.setColor()
    this.setBarData()
  },
  created() {
    this.couponSelected = 0
  },
  methods: {
    returnMain() {
      this.$router.push({
        name: 'home',
      })
    },
    /**
     * 获取选中的省份
     */
    getCouponSelected() {},
    /**
     * 获取选中的日期
     */
    getDay() {},
    /**
     * 点击按钮切换map数据
     * @param {number} key = [0|1] 0是转入 1是转出
     */
    changeMap(key) {
      if (key === 0) {
        this.isSelected = true
        this.chartKey = 'in'
        this.mapDatas = this.inData
        // 测试数据更新 无实际意义
        this.provinceData[2] = {
          name: '湖南省',
          value: 0.63,
          num: '8.8万人',
        }
        this.pyData = [
          { value: 20, name: '硕士及以上' },
          { value: 40, name: '本科' },
          { value: 60, name: '高中' },
          { value: 80, name: '中专及以下' },
          { value: 100, name: '专科' },
        ]
      } else {
        this.isSelected = false
        this.chartKey = 'out'
        this.mapDatas = this.outData
        // 测试数据更新 无实际意义
        this.provinceData[2] = {
          name: '内蒙古',
          value: 0.63,
          num: '10000万人',
        }
        this.pyData = [
          { value: 10, name: '硕士及以上' },
          { value: 40, name: '本科' },
          { value: 60, name: '高中' },
          { value: 80, name: '中专及以下' },
          { value: 100, name: '专科' },
        ]
      }
    },
    /**
     * @description 用于处理数据不满六位，头部添零
     */
    arrSet() {
      const counts = this.dajsl.toString().split('') // 将数字转位数组
      this.dajslArr = counts
      let len = this.dajslArr.length
      for (let i = 0; i < 6 - len; i++) {
        this.dajslArr.unshift('0')
      }
    },

    /**
     * @description 设置饼图的颜色
     */
    setColor() {
      this.sexColorOne = ['rgba(5, 151, 252,1)', 'rgba(255, 43, 133,1)'] // out
      this.sexColorTwo = ['rgba(5, 151, 252, 0.16)', 'rgba(255, 43, 133,0.16)'] // in
      this.natureColorOne = ['rgba(0, 217, 153,1)', 'rgba(255, 228, 0,1)']
      this.natureColorTwo = [
        'rgba(0, 217, 153, 0.16)',
        'rgba(255, 228, 0,0.16)',
      ]
      this.nationColorOne = ['rgba(18, 91, 255, 1)', 'rgba(26, 251, 255,1)']
      this.nationColorTwo = [
        'rgba(18, 91, 255,0.16)',
        'rgba(26, 251, 255,0.16)',
      ]

      this.flag = true
    },
    /**
     * 设置柱状图的数据
     */
    setBarData() {
      this.fileData = [
        {
          name: '20210302',
          in: 565,
          out: 333,
        },
        {
          name: '20210402',
          in: 565,
          out: 333,
        },
        {
          name: '20210402',
          in: 565,
          out: 333,
        },
        {
          name: '20210402',
          in: 565,
          out: 333,
        },
        {
          name: '20210402',
          in: 565,
          out: 333,
        },
        {
          name: '20210402',
          in: 565,
          out: 333,
        },
        {
          name: '20210402',
          in: 565,
          out: 333,
        },
      ]
      this.showBar = true
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/*  页面样式*/
.main {
  width: 1920px;
  height: 1080px;
  background-color: #081c3b;
}
/* 标题部分 */
.top {
  width: 1910px;
  height: 83px;
  background-image: url('../../assets/flowImgs/01.png');
  background-repeat: no-repeat;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.title {
  /* background-image: url("../assets/imgs/titlle01.png");
  background-repeat: no-repeat; */
  z-index: 22;
  width: 300px;
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
}
.picker {
  width: 223px;
  height: 33px;
  text-align: center;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 80px;
  letter-spacing: 1px;
  color: #5db1ff;
  .provice_select {
    background: linear-gradient(
      to bottom,
      rgba(0, 144, 255, 0.22),
      rgba(0, 144, 255, 0)
    );
    color: #5db1ff;
    border: 0px;
    font-size: 18px;
    height: 33px;
  }
  .date_picker {
    background: linear-gradient(
      to bottom,
      rgba(0, 144, 255, 0.22),
      rgba(0, 144, 255, 0)
    );
    color: #5db1ff;
    border: 0px;
    font-size: 18px;
    height: 33px;
    margin-left: -50px;
  }
}
/* 中间四个框部分 */
.center {
  margin-left: 40px;
  margin-top: 24px;
  display: flex;
  flex-direction: row;
}
/* 下面部分 */
.bottom {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 500px;
}
.left {
  width: 540px;
  height: 460px;
}
.titlebar {
  width: 500px;
  height: 51px;
  background: linear-gradient(
    to right,
    rgba(0, 84, 188, 0.34),
    rgba(0, 85, 188, 0)
  );
  background-blend-mode: normal, normal;
}
.pos {
  margin-left: 40px;
  margin-top: 13px;
}
.titletext {
  width: 500px;
  height: 16px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: 1px;
  color: #aee0ff;
  margin-left: 20px;
}
.chartsSex {
  margin-left: 40px;
}

.chartsWidth {
  width: 500px;
}
/* 地图部分 */
.mapBox {
  width: 756px;
  margin-left: 31px;
  color: #5ebdff;
  font-size: 16px;
}
.mapTop {
  height: 640px;
  .map_btnbox {
    display: flex;
    flex-direction: row;
    width: 200px;
    .map_btn {
      width: 64px;
      height: 30px;
      background-color: #081c3b;
      border-radius: 2px;
      border: solid 1px rgba(39, 123, 237);
      color: #ffffff;
      margin-right: 10px;
      cursor: pointer;
      z-index: 222;
    }
    .map_btn_selected {
      background-color: #002b97;
    }
  }
  .legend_box {
    display: flex;
    flex-direction: row;
    width: 300px;
    color: #ffffff;
    margin-top: 10px;
    font-size: 14px;
    .legend_gap {
      width: 60px;
      margin-right: 10px;
      display: flex;
      flex-direction: row;
      .lenged_gap_green {
        width: 8px;
        height: 8px;
        background-color: #1be7d4;
        margin-top: 8px;
        margin-right: 10px;
      }
      .lenged_gap_yellow {
        width: 8px;
        height: 8px;
        background-color: #e7db1b;
        margin-top: 8px; //可以写成maxin
        margin-right: 10px;
      }
    }
  }
  .map_chart {
    margin-top: -70px;
  }
}
.mapBottom {
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: -40px;
  .panel_box {
    height: 176px;
    display: flex;
    flex-direction: row;
  }
}

/* 右边三个图表 */
.right {
  width: 540px;
  margin-left: 31px;
}
</style>
