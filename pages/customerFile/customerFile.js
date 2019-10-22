//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../utils/fetch'
let userInfo
//Page Object
Page({
  data: {
    searchValue: "",
    customerList: [],
    noDataState: false,
    imageURL: imageURL,
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '客户档案', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20  // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    userInfo = wx.getStorageSync("userInfo");
  },
  onReady: function() {
    
  },
  onShow: function() {
    this.getCoustomerList()
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  toSearch (e) {
    var value = e.detail.value
    this.setData({
      searchValue: value
    })
    // console.log(value)
    this.getCoustomerList()
  },
  detailGo (e) {
    // console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: './detail/detail?id='+item.id,
    });
  },
  getCoustomerList () {
    let data = {
      companyId: userInfo.companyId,
      // flag: 1,
      start: 0,
      num: 10000,
      name: this.data.searchValue
    }
    if (userInfo.role == 1) { //1:置业顾问 2:大堂经理 3:大唐客服 4:茶水间服务员
      data.flag = 0 // 顾问单独查看
      data.userId = userInfo.id
    } else {
      data.flag = 1 // 经理查看
    }
    fetch({
      url: "/document/customerList",
      method: "post",
      data
    }).then(res => {
      if (res.code == 1) {
        // console.log(res)
        this.setData({
          customerList: res.data
        })
        if (res.data&&res.data.length>0) {
          this.setData({
            noDataState: false,
          })
        } else {
          this.setData({
            noDataState: true
          })
        }
      } else {
        wx.showModal({
          title: '错误',
          content: res.message,
        });
      }
    })
  }
});
  