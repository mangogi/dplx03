<template>
  <div
    class="box_container"
    :style="{ height: boxHeight + 'px', width: boxWidth + 'px' }"
  >
    <div class="box_title" :style="{ width: titleWidth + 'px' }">
      <div class="box_title_flex">
        <span
          ><img
            src="../../assets/imgs/triangle.png"
            alt=""
            width="16px"
            height="16px"
            style="margin-left:10px"
          />
          {{ title }}</span
        >
        <select
          class="provice_select"
          name="province-choice"
          v-model="couponSelected"
          @change="getCouponSelected"
          v-show="showSelect"
        >
          <option
            v-for="(coupon, index) in optionData"
            :key="index"
            :value="index"
          >
            {{ coupon }}
          </option>
        </select>
        <div class="line_list" v-if="showList">
          <div
            class="list_data"
            v-for="(item, index) in listsData"
            :key="index"
            :class="{ bottomBorder: index == keyNum }"
            @click="changeList(index, item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'boxContainer',
  props: {
    title: {
      type: String,
      default: '各险种缴费分布',
    },
    optionData: {
      type: Array,
      default: () => {
        return ['征缴总金额', '全部']
      },
    },
    showSelect: {
      type: Boolean,
      default: true,
    },
    boxWidth: {
      type: String,
      default: '',
    },
    boxHeight: {
      type: String,
      default: '',
    },
    titleWidth: {
      type: String,
      default: '',
    },
    listsData: {
      type: Array,
      default: () => {
        return ['城职养老', '城居养老', '机关养老', '失业保险', '工伤保险']
      },
    },
    showList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      couponSelected: 0,
      keyNum: 0, // 选中的index
    }
  },
  created() {
    this.couponSelected = 0
  },
  methods: {
    getCouponSelected() {},
    changeList(key, item) {
      this.keyNum = key
      console.log(key, item)
      this.$emit('getTheme', item)
    },
  },
}
</script>

<style lang="less">
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
.box_container {
  margin-left: 20px;
  background-color: rgba(7, 16, 24, 0.4);
  border: solid 1px #2564ae;
  .bgcorner();
  .box_title {
    height: 40px;
    background-image: linear-gradient(
      to right,
      rgba(7, 40, 84, 0.4),
      rgba(54, 152, 255, 0.2)
    );
    background-blend-mode: normal, normal;
    margin-left: 9px;
    margin-top: 9px;
    color: #fefefe;
    font-size: 18px;
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    .box_title_flex {
      width: 97%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: -33px;
      margin-left: 15px;
      .provice_select {
        background-color: #061524;
        border: solid 1px #134086;
        border: 0px;
        font-size: 18px;
        height: 33px;
        color: #ffffff;
        font-size: 16px;
        margin-top: -3px;
      }
    }
    .line_list {
      display: flex;
      flex-direction: row;
      .list_data {
        height: 30px;
        margin-left: 40px;
        color: #a9b5c0;
        font-size: 14px;
        cursor: pointer;
      }
      .bottomBorder {
        color: white;
        border-bottom: 2px solid #2383ed;
      }
    }
  }
  .box_title::before {
    content: '1';
    line-height: 40px;
    width: 6px;
    font-size: 28px;
    height: 40px;
    color: #2383ed;
    background-color: #2383ed;
    border-right: 2px solid #04090e;
  }
}
</style>
