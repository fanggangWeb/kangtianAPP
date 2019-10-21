//获取应用实例
const app = getApp()
import { fetch, apiUrl } from '../../utils/fetch'
import * as echarts from '../../ec-canvas/echarts';
let chart = null;
let that;
let userInfo
var option ={
  //设置柱子的宽度
  barWidth: 20,
  xAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value}",
      show: false
    },
    
    splitLine: {
      show: true,
      lineStyle:{
        color: ['#ECEFF4'],
        width: 0,
        type: 'solid'
      }
　　},
    axisLine: {
      lineStyle: {
        width: 0
      }
    },
    axisTick:{ // y轴刻度线
      "show":false
    },
  },
  grid: {
    // left: 60,
    bottom: 30,
    top: 20,
    containLabel: true
  },
  yAxis: {
    type: 'category',
    data: ["指派", "代班", "新客户", "老客户"],
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        width: 0
      }
    },
    axisLabel: {
      show: true,
      // fontSize: 30,//字体大小
    },
    nameTextStyle: {
      // fontSize: 30
    },
    axisTick:{ // y轴刻度线
      show: false
    },
  },
  
  series: [
    {
      name: "数量",
      type: "bar",
      data: [3, 4, 6, 8],
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: "{c}个",
          rich: {}
        }
      },
      itemStyle: {
        normal: {
          // 每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
          color: function(params) {
            // 两个柱子，大体就两个柱子颜色渐变，所以数组只有两个值，多个颜色就多个值
            var colorList = [ 
              ["#F26262", "#F29551"],
              ["#EA8439", "#E4C933"],
              ["#56CEF6", "#4CD49F"],
              ["#8363EA", "#396BEA"]
            ];
            var index = params.dataIndex;
            if (params.dataIndex >= colorList.length) {
              index = params.dataIndex - colorList.length;
            }
            // return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: colorList[index][0] },
            //   { offset: 1, color: colorList[index][1] }
            // ]);
            return {
              colorStops: [{
                offset: 0,   //颜色的开始位置
                color: colorList[index][0] // 0% 处的颜色
              },{
                offset:0.6,    //颜色的结束位置
                color: colorList[index][1] // 100% 处的颜色
              }]
            }
          },
          barBorderRadius:[10, 10, 10, 10],
          label: {
            show: false,
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
      title: '历史业绩', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20  // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    that = this
    userInfo = wx.getStorageSync("userInfo");
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
        // console.log(arr)
        // option.series[0].data = arr
        // chart.setOption(option)
      } else {
        wx.showModal({
          title: '错误',
          content: res.message,
        });
      }
    })
  },
  
});


  