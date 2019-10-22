//获取应用实例
const app = getApp()
import {
	fetch,
	imageURL
} from '../../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
	data: {
		// 组件所需的参数
		navbarData: {
			showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
			title: '小组信息', //导航栏 中间的标题
		},
		height: app.globalData.height * 2 + 20, // 此页面 页面内容距最顶部的距离
		visitorRecordId: '', //访客记录ID
		groupId: '', //小组id
		memberData: {}, //当前成员信息
		notEentered: [], //未录入
		memberList:[],//成员列表--页面显示成员
		visitorList: [], //成员列表--组件成员
		userId: 0, //当前登录人ID
		companyId: '', //所属机构ID
		nowCounselor: {}, //当前置业顾问id
		counselorList: [], //职业顾问
		componentText: {
			title: '小组成员',
			buttonText: '确定拆分',
			type: 1, //type 1 为拆分 2为关联，3为顾问带班，4为更换顾问
			adviserIndex: 0, //顾问序列号
		}, //组件名字
		showModal: false, //是否显示模太框
		imageUrl: imageURL,
		reason:'',//更换原因
		showModalWay:false,//显示原因模态框
		modalData:{},//模态框数据
	},
	//options(Object)
	onLoad: function(options) {
		this.setData({
			visitorRecordId: options.visitorRecordId,
			userId: wx.getStorageSync("userInfo").id,
			companyId: wx.getStorageSync("userInfo").companyId
		})
		this.getData();
		this.queryGroupMemberById();
	},
	onReady: function() {
		this.getAdviserList();
	},
	onShow: function() {

	},
	onHide: function() {

	},
	onUnload: function() {

	},
	// 点击-选择
	checkItem(e) {
		let index = e.currentTarget.dataset.index;
		let name = e.currentTarget.dataset.name;
		let checkName = name + '[' + index + '].check';
		this.setData({
			[checkName]: !this.data[name][index].check
		})
	},
	// 点击关联顾问
	associateConsultant() {
		// 选中的人
		let list = [];
		this.data.notEentered.forEach((v, i) => {
			if (v.check) {
				list.push(v);
			}
		})
		if (list.length == 0) {
			this.wxAlert('请选择人员');
			return;
		}
		this.setData({
			showModal: true,
			componentText: {
				title: '成员',
				buttonText: '确定绑定',
				type: 2
			}, //组件名字
			visitorList: list
		})
		// [...[this.data.memberData],...this.data.memberList,...list]
	},
	// 客户分组--代班--更换顾问
	handleGroup(e){
		let adviserIndex=0;
		this.data.counselorList.forEach((v,i)=>{
			if(v.propertyConsultantId==this.data.nowCounselor.id){
				adviserIndex=i;
			}
		})
		let type = parseInt(e.currentTarget.dataset.type);
		let buttonText=type==1?'确定拆分':type==3?'确定代班':'输入更换原因';
		this.setData({
			showModal: true,
			componentText: {
				title: '小组成员',
				buttonText: buttonText,
				type: type,
				adviserIndex:adviserIndex
			}, //组件名字
			visitorList:[...[this.data.memberData],...this.data.memberList]
		})
	},
	// 模态框点击确认
	modalSubmit(e) {
		let data=e.detail;
		if(data.type==1){//拆分
			this.splitGroupMember(data.checkedList,data.counselorId);
		}
		if(data.type==2){//关联
			this.bindGroupMember(data.checkedList,data.counselorId)
		}
		if(data.type==3){//带班
			this.replaceRequest(data.recordIds,data.counselorId,data.type)
		}
		if(data.type==4){//更换
			this.setData({
				showModal: false,
				showModalWay:true,
				modalData:data,
				reason:''
			})
		}
	},
	// 关闭模态框
	closeModal() {
		this.setData({
			showModal: false
		})
	},
	// 关闭原因模态
	closeWayModal(){
		this.setData({
			showModalWay: false
		})
	},
	// 获取新的访客数据
	getData() {
		let data = {
			startPosition: 0,
			maxLength: 9000,
			visitorState: 1
		}
		fetch({
			url: "/lobby/getVisitorList",
			method: "post",
			data: data
		}).then(res => {
			if (res.code == 1) {
				res.data.forEach((v, i) => {
					v.check = false;
				})
				this.setData({
					notEentered: res.data
				})
			} else {
				wx.showModal({
					title: '错误',
					content: res.data.message,
					showCancel: false
				});
			}
		})
	},
	// 获取置业顾问
	getAdviserList() {
		let data = {
			companyId: this.data.companyId
		}
		fetch({
			url: "/manage/getAdviserList",
			method: "post",
			data: data
		}).then(res => {
			if (res.code == 1) {
				this.setData({
					counselorList: res.data
				})
			} else {
				wx.showModal({
					title: '错误',
					content: res.data.message,
					showCancel: false
				});
			}
		})
	},
	// 绑定成员 
	bindGroupMember(visitorIds, sysUserId) {
		let data = {
			visitorIds: visitorIds,
			sysUserId: this.data.userId,
			groupId:this.data.groupId
		}
		fetch({
			url: "/lobby/bindGroupMember",
			method: "post",
			data: data
		}).then(res => {
			if (res.code == 1) {
				this.wxAlert('绑定成功');
				setTimeout(()=>{
					this.queryGroupMemberById();
					this.getData();
					this.setData({
						showModal: false
					})
				}, 2000);
			} else {
				wx.showModal({
					title: '错误',
					content: res.data.message,
					showCancel: false
				});
			}
		})
	},
	// 根据客户到访记录ID 查询群组成员
	queryGroupMemberById() {
		fetch({
			url: "/lobby/queryGroupMemberById",
			method: "post",
			data: {
				visitorRecordId: this.data.visitorRecordId
			}
		}).then(res => {
			if (res.code == 1) {
				let data = res.data[0],
					memberData = {},
					visitorList = [];
				data.groupMemberInfos.forEach((v, i) => {
					let obj = {
						id:v.visitorRecordid,
						level: v.visitorLevel,
						state: null,
						status: data.status,
						sysUserId: data.sysUserId,
						username: data.userName,
						visitCnt: v.visitCount,
						visitorId: v.visitorId,
						visitorImg: v.visitorImg,
						visitorNm: v.visitorName,
						check:false,
					}
					if (obj.id == this.data.visitorRecordId) {
						memberData = obj;
					} else {
						visitorList.push(obj);
					}
				})
				let nowCounselor = {
					realName: data.realName,
					status: data.status,
					id: data.sysUserId,
					userName: data.userName,
				};
				this.setData({
					memberData: memberData,
					nowCounselor: nowCounselor, //顾问数据
					memberList: visitorList, //成员列表
					groupId: data.groupId
				})
			} else {
				wx.showModal({
					title: '错误',
					content: res.data.message,
					showCancel: false
				});
			}
		})
	},
	// 拆分成员 
	splitGroupMember(visitorIds, sysUserId) {
		let data = {
			visitorIds: visitorIds,
			sysUserId: sysUserId
		}
		fetch({
			url: "/lobby/splitGroupMember",
			method: "post",
			data: data
		}).then(res => {
			if (res.code == 1) {
				this.wxAlert('拆分成功');
				setTimeout(()=>{
					this.queryGroupMemberById();
					this.setData({
						showModal: false
					})
				}, 2000);
				
			} else {
				wx.showModal({
					title: '错误',
					content: res.data.message,
					showCancel: false
				});
			}
		})
	},
	//更换或者带班请求
	replaceRequest(recordIds, sysUserId,type) {
		let data = {
			recordIds : recordIds,
			sysUserId : sysUserId,
			isOperate :type==3?2:1,
			reason:type==4?this.data.reason:''
		}
		fetch({
			url: "/lobby/replaceRequest",
			method: "post",
			data: data
		}).then(res => {
			if (res.code == 1) {
				let text=type==4?'更换请求成功':'代班请求成功'
				this.wxAlert(text);
				setTimeout(()=>{
					this.queryGroupMemberById();
					this.setData({
						showModal: false,
						showModalWay:false,
						modalData:{},
						reason:''
					})
				}, 2000);
			} else {
				wx.showModal({
					title: '错误',
					content: res.data.message,
					showCancel: false
				});
			}
		})
	},
	// 确定更换
	submitChange(){
		if(!this.data.reason){
			this.wxAlert('请输入更换原因');
			return;
		}
		let data=this.data.modalData;
		this.replaceRequest(data.recordIds,data.counselorId,data.type);
	},
	// 更换切换原因
	getChangeWay(e){
		this.setData({
			reason:e.detail.value
		})
	},
	// 弹框静止滑动
	preventTouchMove(){
		
	},
	wxAlert(text, time) {
		wx.showToast({
			title: text,
			duration: time || 2000,
			icon: 'none'
		})
	}
});
