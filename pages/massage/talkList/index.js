//获取应用实例
const app = getApp()
import {
	fetch,
	imageURL
} from '../../../utils/fetch';
const SUCCESS_OK = '200'
var innerAudioContext;
//Page Object
Page({
	data: {
		navTitle: '王祖蓝第一组',
		statusBarHeight: app.globalData.statusBarHeight,
		headerHeight: app.globalData.headerHeight,
		imageUrl: imageURL,
		videoIndex: null,//正在播放视频序列号
	},
	//options(Object)
	onLoad: function(options) {
		innerAudioContext = wx.createInnerAudioContext();
	},
	onReady: function() {

	},
	onShow: function() {

	},
	onHide: function() {

	},
	onUnload: function() {

	},
	// 返回上一页面
	_navback(event) {
		wx.navigateBack({
			delta: 1
		})
	},
	//返回到首页
	_gotoList() {
		// wx.switchTab({
		//   url: '/pages/home/index',
		// })
	},
	// 播放语音
	playVoice(e) {
		// innerAudioContext.autoplay = true;
		// // var index = e.currentTarget.dataset.index;
		// innerAudioContext.src = '播放URL';
		// innerAudioContext.onPlay(() => {
		//   console.log('开始播放')
		//   this.wxAlert('正在播放', 60000)
		// })
		// innerAudioContext.onError((res) => {
		//   this.wxAlert('播放语音失败');
		// })
		// innerAudioContext.onEnded((res) => {
		//   wx.hideToast();
		// })
	},
	// 预览图片
	previewImage(e) {
		var img = e.currentTarget.dataset.img;
		wx.previewImage({
			current: img, // 当前显示图片的http链接
			urls: [img] // 需要预览的图片http链接列表
		})
	},
	// 播放视频--多视频播放
	palyVideo(e) {
		// var id = e.currentTarget.id,
		// 	index = e.currentTarget.dataset.index;
		// if (!this.data.videoIndex) { // 没有播放时播放视频
		// 	this.setData({
		// 		videoIndex: index
		// 	})
		// 	var videoContext = wx.createVideoContext(id);
		// 	videoContext.play()
		// } else {
		// 	var videoContextPrev = wx.createVideoContext('myVideo' + this.data.videoIndex);
		// 	videoContextPrev.stop();
		// 	this.setData({
		// 		videoIndex: index
		// 	})
		// 	var videoContextCurrent = wx.createVideoContext(id);
		// 	videoContextCurrent.play();
		// }
	},
	wxAlert(text, time) {
		wx.showToast({
			title: text,
			duration: time || 2000,
			icon: 'none'
		})
	}
});
