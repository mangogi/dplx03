<template>
  <div class="ball_combine" :style="{ color: countData.textColor }">
    <span class="ball_num">{{ countData.val }}</span>
    <span>{{ countData.name }}</span>
    <img
      :src="require('../../../assets/imgs/' + icon + '.png')"
      alt=""
      style="height:66px;width:66px;margin-left:17px"
    />
  </div>
</template>
<script>
export default {
  name: 'ball',
  props: {
    countData: {
      type: Object,
      default: () => {
        return {
          name: '补缴金额',
          val: '65.7',
          textColor: '#bbe4ff',
        }
      },
    },
    icon: {
      type: String,
      default: 'ball_money',
    },
  },
}
</script>
<style lang="less">
.ball_combine {
  width: 84px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
  .ball_num {
    font-size: 20px;
  }
}
</style>
