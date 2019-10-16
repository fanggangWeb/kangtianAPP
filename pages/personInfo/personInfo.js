//获取应用实例
const app = getApp()
import { fetch } from '../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
  data: {
    avatarUrl: "../../assets/images/text.jpg",
    statusList: [
      {color: "green", name: "上线"},
      {color: "red", name: "忙碌"},
      {color: "purple", name: "离开"},
      {color: "grey", name: "离线"},
      {color: "white", name: "取消"},
    ],
    statusState: false,
    // 导航栏组件所需的参数
    navbarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '个人信息', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20  // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  showList () {
    this.setData({
      statusState: !this.data.statusState
    })
  },
  chooseStatus (e) {
    console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    if (item.color == "white") {
      this.setData({
        statusState: false
      })
    }
  },
  changeAvatar () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // uploadFetch({
        //   filePath: tempFilePaths[0]
        // }).then(res => {
        //   that.setData({
        //     positiveUrl: res.data,
        //     positiveShow: false
        //   })
        // })
      }
    })
  },
  quitLogin () {
    wx.showModal({
      title: '提示？',
      content: '确定要退出当前账号吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 修改密码
  editPassword () {
    wx.navigateTo({
      url: '../editPassword/editPassword'
    });
  },
  // 切换账号
  switchAccount () {
    wx.navigateTo({
      url: "../switchAccount/switchAccount"
    })
  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  