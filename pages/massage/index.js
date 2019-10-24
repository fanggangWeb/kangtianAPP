//获取应用实例
const app = getApp()
import {
	fetch,
	imageURL
} from '../../utils/fetch'
Page({
	data: {
		statusBarHeight: app.globalData.statusBarHeight,
		headerHeight: app.globalData.headerHeight,
	},

	onReady() {

	},
	// 进入聊天
	intoChat() {
		// let index=e.currentTarget.dataset.index;
		wx.navigateTo({
			url:'/pages/massage/talkList/index'
		})
	},
	// 添加群
	addGroup(){
		wx.navigateTo({
			url:'/pages/massage/addGroup/index?title=新建群组'
		})
	}
});
