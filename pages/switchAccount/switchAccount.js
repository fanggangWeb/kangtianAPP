//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
  data: {
    errorMessage: "",
    account: "",
    password: "",
    accountList: [
      { url: "../../assets/images/text.jpg", name: "张三丰"}
    ],
    imageURL: imageURL,
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示  0表示不显示
      title: '切换账号', //导航栏 中间的标题
    },
    height: app.globalData.statusBarHeight+app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    
  },
  onReady: function() {
    
  },
  onShow: function() {
    let arr = wx.getStorageSync("accountList");
    this.setData({
      accountList: arr
    })
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  chooseAccount (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    console.log(item)
    wx.showModal({
      title: '提示',
      content: '确认要切换账号吗？',
      success (res) {
        if (res.confirm) {
          let data = {
            username: item.username,
            password: item.password
          }
          fetch({
            url: "/common/login",
            method: "post",
            data: data
          }).then(res => {
            if (res.code == 1) {
              wx.showToast({
                title: "登录成功！",
                icon: 'none',
                image: '',
                duration: 1500,
                mask: true,
              });
              wx.setStorageSync("userInfo", res.data)
              wx.switchTab({
                url: '../home/index'
              });
            } else {
              wx.showModal({
                title: '错误',
                content: res.data.message,
              });
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  delAccount (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(index)
    wx.showModal({
      title: '提示',
      content: '确认要删除账号吗？',
      success (res) {
        if (res.confirm) {
          var arr = that.data.accountList
          arr.splice(index,1)
          console.log(arr)
          that.setData({
            accountList: arr
          })
          wx.setStorageSync("accountList", arr);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  addAccount () {
    wx.navigateTo({
      url: '../addAccount/addAccount',
    });
      
  }
});
  