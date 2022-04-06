// api.js
import Mock from 'mockjs'

const url = {
  tableDataOne: '/mode1/tableDataOne',
  tableDataTwo: '/main/payFee',
  retruenFee: '/main/returnFee',
  pieData:'/main/pieData'
}
// 测试用例
Mock.mock(url.tableDataOne, {
  'dataSource|5': [
    {
      'key|+1': 1,
      'mockTitle|1': ['哑巴', 'Butter-fly', '肆无忌惮', '摩天大楼', '初学者'],
      'mockContent|1': [
        '你翻译不了我的声响',
        '数码宝贝主题曲',
        '摩天大楼太稀有',
        '像海浪撞破了山丘',
      ],
      'mockAction|1': ['下载', '试听', '喜欢'],
    },
  ],
})

// 缴费趋势分析

Mock.mock(url.tableDataTwo, {
  'data|12':[
    {
      'line|1-100':1,
      'bar|1-1000':1
    }
  ]
})

// 补缴/退缴趋势分析
Mock.mock(url.retruenFee, {
  'data|12':[
    {
      'line1|1-100':1,
      'bar1|1-1000':1,
      'line2|1-100':1,
      'bar2|1-1000':1
    }
  ]
})

// 各种缴费分析
Mock.mock(url.pieData,{
  'data|5':[
    {
      'name|+1':['失业保险','城职养老','城居养老','工商保险','机关养老'],
      'value|1-100':1
    }
  ]
})
