//获取应用实例
const app = getApp()
Component({
  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {}
    }
  },
  data: {
	  statusBarHeight:0,//导航的高度
	  headerHeight:0,//头部的高度
    //默认值  默认显示左上角
    navbarData: {
      showCapsule: 1
    }
  },
  attached: function () {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
	  statusBarHeight: app.globalData.statusBarHeight,
	  headerHeight: app.globalData.headerHeight
    })
  },
  methods: {
    // 返回上一页面
    _navback(event) {
      // 当前页面为“某地址时”时，对返回按钮进行劫持
      if(this.data.navbarData.pageName === ''){
        wx.showModal({
          content: '当前页面尚未保存，是否确认返回？',
          cancelColor: '#909399',
          confirmColor: '#3888FF',
          success: function(res){
              if(res.confirm){
                wx.navigateBack()
              }
          }
        })
        return ;
      }
      wx.navigateBack()
    },
    //返回到首页
    _backhome() {
      wx.switchTab({
        url: '/pages/home/index',
      })
    }
  }

}) 