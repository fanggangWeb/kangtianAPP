//获取应用实例
const app = getApp()
import { fetch, apiUrl } from '../../utils/fetch'
import * as echarts from '../../ec-canvas/echarts';
let chart = null;
let that, userInfo, ID
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
      stack: '总量',
      data: [0, 4, 6, 8],
      label: {
        normal: {
          show: true,
          position: 'bottom',
          formatter: "{c}个",
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
          barBorderRadius:[10, 0, 0, 10],
          label: {
            show: false,
          }
        }
      }
    },
    {
      name: '总量',
      type: 'bar',
      stack: '总量',
      data: [10,12,13,14],
      label: {
        normal: {
          show: true,
          position: 'right',
          color: "#666666",
          formatter: "{c}个",
        }
      },
      itemStyle: {
        normal: {
          color: "#ECEFF4",
          barBorderRadius:[0, 10, 10, 0],
          label: {
            show: false,
          },
        },
      },
      
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
    dateIndex: 0,
    dateName: "今日",
    dateList: ["今日", "本周", "本月", "本季度", "今年"], // 分别对应1,2,3,4,5
    ec: {
      onInit: initChart
    },
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '历史业绩', //导航栏 中间的标题
    },
    height: app.globalData.statusBarHeight+app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    that = this
    ID = options.id
    userInfo = wx.getStorageSync("userInfo");
    console.log(ID)
  },
  onReady: function() {
  },
  onShow: function() {
    // this.getData()
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  dateChange (e) {
    // console.log(e.detail.value)
    this.setData({
      dateIndex: parseInt(e.detail.value),
      dateName: this.data.dateList[e.detail.value]
    })
    this.getData()
    // console.log(this.data.dateList[this.data.dataIndex])
  },
  getData () {
    let data = {
      type: this.data.dateIndex + 1
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
        let arr = [res.data.assignCount, res.data.selinaCount, res.data.newCustomerCount, res.data.oldCustomerCount]
        // console.log(arr)
        option.series[0].data = arr
        chart.setOption(option)
      } else {
        wx.showModal({
          title: '错误',
          content: res.message,
        });
      }
    })
  },
  
});


  