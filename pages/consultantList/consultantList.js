//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../utils/fetch'
const SUCCESS_OK = '200'
let userInfo
//Page Object
Page({
  data: {
    dataList: [],
    noDataState: false,
    imageURL: imageURL,
    tabList: [
      {name: "全部", id: 1},
      {name: "个人", id: 0},
      {name: "待办事项", id: 2}
    ],
    viewType: "",
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '职业顾问', //导航栏 中间的标题
    },
    height: app.globalData.statusBarHeight+app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    // console.log(options)
    this.setData({
      viewType: options.type
    })
    userInfo = wx.getStorageSync("userInfo");
  },
  onReady: function() {
    
  },
  onShow: function() {
    this.getList()
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  // toSearch (e) {
  //   var value = e.detail.value
  //   console.log(value)
  // },
  // changeTab (e) {
  //   // console.log(e.currentTarget.dataset.item)
  //   var item = e.currentTarget.dataset.item
  //   this.setData({
  //     tabValue: item.id
  //   })
  //   this.getList()
  // },
  viewOne (e) {
    console.log(e.currentTarget.dataset.item)
    var item = e.currentTarget.dataset.item
    if (this.data.viewType == "today") {
      wx.navigateTo({
        url: "../today/today?id=" + item.propertyConsultantId
      })
    } else if (this.data.viewType == "history") {
      wx.navigateTo({
        url: "../history/history?id=" + item.propertyConsultantId
      })
    } else {
      wx.showModal({
        title: '错误',
        content: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
            
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  },
  getList () {
    let data = {
      companyId: userInfo.companyId
    }
    fetch({
      url: "/manage/getAdviserList",
      method: "post",
      data
    }).then(res => {
      if (res.code == 1) {
        this.setData({
          dataList: res.data
        })
        if (res.data&&res.data.length>0) {
          this.setData({
            noDataState: false
          })
        } else {
          this.setData({
            noDataState: true
          })
        }
      } else {
        wx.showModal({
          title: "错误",
          content: res.message
        })
      }
    })
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
    this.getList()
  },
  // onReachBottom: function () {
  //   console.log(1111)
  // },
});
  