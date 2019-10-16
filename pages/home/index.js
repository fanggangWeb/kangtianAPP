//获取应用实例
const app = getApp()
import { fetch } from '../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
  data: {
    background: [{ url: '../../assets/images/banner.png' }, { url: '../../assets/images/banner.png' }],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3500,
    duration: 300,
    current: 0,
    // 滚动文字
    text: "如果预约时间不能到店则需要提前两个小时取消预约，如不足两个小时可联系技师取消预约",
    marqueePace: 0.5,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marquee_margin: 0,
    size: 28,
    textInterval: 20, // 时间间隔
    // 工作管理菜单
    workMenu: [
      { icon: "../../assets/images/home/liulan.png", name: "客户浏览", path: ""},
      { icon: "../../assets/images/home/fenzu.png", name: "客户分组", path: ""},
      { icon: "../../assets/images/home/daiban.png", name: "顾问代班", path: ""},
      { icon: "../../assets/images/home/guwen.png", name: "更换顾问", path: ""},
      { icon: "../../assets/images/home/dangan.png", name: "客户档案", path: "../customerFile/customerFile"},
      { icon: "../../assets/images/home/kehuqu.png", name: "客户区", path: "../customerArea/customerArea"},
      { icon: "../../assets/images/home/qiatanshi.png", name: "洽谈室", path: ""},
    ],
    // 业绩统计菜单
    yejiMenu: [
      { icon: "../../assets/images/home/jinriyeji.png", name: "今日业绩", path: ""},
      { icon: "../../assets/images/home/lishiyeji.png", name: "历史业绩", path: ""},
    ],
    // 组件所需的参数
    navbarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '康田置业售楼部', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20  // 此页面 页面内容距最顶部的距离
  },
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
    var that = this;
      var length = that.data.text.length * that.data.size;//文字长度
      var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
      //console.log(length,windowWidth);
      that.setData({
        length: length,
        windowWidth: windowWidth
      });
      that.scrolltxt();// 第一个字消失后立即从右边出现
    },
  onHide: function () {

  },
  onUnload: function () {

  },
  switchMenu (e) {
    // console.log(e)
    console.log(e.currentTarget.dataset.item.name)
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: item.path
    });
      
  },
  // 文字滚动
  scrolltxt: function () {
    var that = this;
    var length = that.data.length;//滚动文字的宽度
    var windowWidth = that.data.windowWidth;//屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        } else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.textInterval);
    } else {
      that.setData({ marquee_margin: "1000" });//只显示一条不滚动右边间距加大，防止重复显示
    }
  },
  switchChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  handleClick() {
    // wx.showModal({
    //   content: this.data.current.toString(),
    // });

  },
});