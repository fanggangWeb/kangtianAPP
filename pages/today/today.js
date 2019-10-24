//获取应用实例
const app = getApp()
import { fetch, apiUrl } from '../../utils/fetch'
import * as echarts from '../../ec-canvas/echarts';
let chart = null;

let that, userInfo, ID;
var option ={
  title: {
    text: '今日销售业绩',
    subtext: "单位/个",
    textStyle:{
      color: '#333333',//京东红
      fontStyle: 'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
      fontWeight: "bold",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
      fontFamily: "san-serif",//主题文字字体，默认微软雅黑
      // fontSize: 18//主题文字字体大小，默认为18px
    },
    subtextStyle: {
      color: "#333333",
      fontSize: 12
    }
  },
  //设置柱子的宽度
  barWidth: 20,
  xAxis: {
    data: ["老客户","新客户","代班","指派"]
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value}"
    },
    splitLine: {
      show: true,
      lineStyle:{
        color: ['#ECEFF4'],
        width: 1,
        type: 'solid'
      }
　　}
  },
  series: [
    {
      name: "数量",
      type: "bar",
      data: [0, 0, 0, 0],
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: "{c}个"
        }
      },
      itemStyle: {
        normal: {
          //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
          color: function(params) {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#396BEA"},
              { offset: 1, color: "#8363EA" }
            ]);
          },
          barBorderRadius:[10, 10, 0, 0],
          label: {
            show: false
          }
        }
      }
    }
  ]
}
function initChart (canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.setOption(option);
  return chart;
}
//Page Object
Page({
  data: {
    errorMessage: "",
    account: "",
    password: "",
    ec: {
      onInit: initChart
    },
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '今日业绩', //导航栏 中间的标题
    },
    height: app.globalData.statusBarHeight+app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    that = this
    ID = options.id
    userInfo = wx.getStorageSync("userInfo");
    // console.log(options)
    
  },
  onReady: function() {
  },
  onShow: function() {
    this.getData()
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  getData () {
    let data = {
      type: 1
    }
    if (userInfo.role == 1) {
      data.propertyConsultantId = userInfo.id
    } else {
      data.salesAgencyId = userInfo.companyId
    }
    fetch({
      url: "/adviser/getSalesPerformance",
      method: "post",
      data: data
    }).then(res => {
      if (res.code == 1) {
        let arr = [res.data.oldCustomerCount, res.data.newCustomerCount, res.data.selinaCount, res.data.assignCount]
        console.log(arr)
        option.series[0].data = arr
        chart.setOption(option);
      } else {
        wx.showModal({
          title: '错误',
          content: res.message,
        });
      }
    })
  },
  
});


  