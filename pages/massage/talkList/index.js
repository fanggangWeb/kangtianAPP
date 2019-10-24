//获取应用实例
const app = getApp()
import {
	fetch,
	imageURL
} from '../../../utils/fetch';
const SUCCESS_OK = '200'
var recorderManager, innerAudioContext;
//Page Object
Page({
	data: {
		navTitle: '王祖蓝第一组',
		statusBarHeight: app.globalData.statusBarHeight,
		headerHeight: app.globalData.headerHeight,
		imageUrl: imageURL,
		videoIndex: null, //正在播放视频序列号
		commentBottom: 0, //input弹起距离
		content: '', //input 内容
		showMore: false, //是否显示发送图片
		showVoice: false, //显示语音按钮
		voiceText: '按住说话',
	},
	//options(Object)
	onLoad: function(options) {
		innerAudioContext = wx.createInnerAudioContext();
		// 注册录音
		recorderManager = wx.getRecorderManager();
		// 停止录音
		recorderManager.onStop(res => {
			console.log(res)
			res.duration = Math.round((res.duration / 1000));
			this.setData({
				voiceText: '按住说话'
			})
		});
	},
	onReady: function() {
		this.pageScrollToBottom()
	},
	onShow: function() {

	},
	onHide: function() {

	},
	onUnload: function() {
		// 销毁语音
		innerAudioContext.destroy()
	},
	// 返回上一页面
	_navback(event) {
		wx.navigateBack({
			delta: 1
		})
	},
	//到列表页
	_gotoList() {
		wx.navigateTo({
		  url: '/pages/massage/talkData/index',
		})
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
	// 获得焦点
	bindfocus(e) {
		this.setData({
			commentBottom: e.detail.height
		})
	},
	// 失去焦点
	bindblur(e) {
		this.setData({
			commentBottom: 0
		})
	},
	// 点击发送-文字
	sendMassage(e) {
		console.log(e)
		this.setData({
			content: e.detail.value
		})
	},
	// 点击加号
	changeMoreShow() {
		this.setData({
			showMore: !this.data.showMore
		})
		this.pageScrollToBottom();
	},
	// 语言与文字切换
	changeVoiceShow() {
		this.setData({
			showVoice: !this.data.showVoice,
			voiceText: '按住说话'
		})
	},
	// 开始录音
	handleRecordStart(e) {
		let that = this;
		wx.getSetting({
			success(res) {
				if (!res.authSetting['scope.record']) {
					wx.showModal({
						title: '是否授权录音功能',
						content: '需要授权录音功能，请确认授权，否则麦克风功能将无法使用',
						success: function(tip) {
							if (tip.confirm) {
								wx.openSetting({
									success: function(data) {
										if (data.authSetting["scope.record"] === true) {
											that.wxAlert("授权成功", 1000);
										} else {
											that.wxAlert("授权失败", 1000);
										}
									}
								})
							}
						}
					})
				} else {
					//开始录音
					recorderManager.start({
						duration: 60000,
						format: 'mp3'
					});
				}
			},
			fail: function(res) {
				that.wxAlert("调用授权窗口失败", 1000);
			}
		})
		//开始录音
		recorderManager.onStart(() => {
			wx.showToast({
				title: "正在录音",
				icon: "none",
				duration: 60000
			});
			that.setData({
				voiceText: '正在说话'
			})
		});
		recorderManager.onError((res) => {
			that.wxAlert('录音失败')
		})
	},
	// 停止录音
	handleRecordStop() {
		wx.hideToast();
		recorderManager.stop(); //结束录音
	},
	// 获取手机图片
	addImage() {
		var that = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				console.log(res)
			}
		})
	},
	//点击选择视频
	chooesVideo() {
		var that = this;
		wx.chooseVideo({
			sourceType: ['album', 'camera'],
			maxDuration: 60,
			success(res) {
				console.log(res.tempFilePath)
			}
		})
	},
	// 刷新
	refresh(){
		console.log('刷新')
	},
	// 获取容器高度，使页面滚动到容器底部
	pageScrollToBottom: function() {
		wx.createSelectorQuery().select('.container').boundingClientRect(function(rect) {
			// 使页面滚动到底部
			wx.pageScrollTo({
				scrollTop: rect.bottom
			})
		}).exec()
	},
	wxAlert(text, time) {
		wx.showToast({
			title: text,
			duration: time || 2000,
			icon: 'none'
		})
	}
});
