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
    visitorList: [], //成员列表
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
    imageUrl: imageURL
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
  checkItem(e){
  	let index = e.currentTarget.dataset.index;
  	let name = e.currentTarget.dataset.name;
  	let checkName=name+'['+index+'].check';
  	this.setData({
  		[checkName]:!this.data[name][index].check
  	})
  },
  // 模态框点击确认
  modalSubmit(e) {
    console.log(e)
    this.setData({
      showModal: false
    })
  },
  // 关闭模态框
  closeModal() {
    this.setData({
      showModal: false
    })
  },
  // 获取新的访客数据
  getData() {
    let data = {
      startPosition: 1,
      maxLength: 100,
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
      sysUserId: this.data.userId
    }
    fetch({
      url: "/lobby/bindGroupMember",
      method: "post",
      data: data
    }).then(res => {
      if (res.code == 1) {
        this.wxAlert('绑定成功');
        this.setData({
          showModal: false
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
  // 根据客户到访记录ID 查询群组成员
  queryGroupMemberById(id) {
    fetch({
      url: "/lobby/queryGroupMemberById",
      method: "post",
      data: {
        visitorRecordId: this.data.visitorRecordId
      }
    }).then(res => {
      if (res.code == 1) {
        let data = res.data[0],
          obj = {},
          visitorList = [];
        data.groupMemberInfos.forEach((v, i) => {
          if (v.visitorRecordid == this.data.visitorRecordId) {
            obj = v;
          } else {
			  v.check=false;
            visitorList.push(v);
          }
        })
        let nowCounselor = {
          realName: data.realName,
          status: data.status,
          id: data.sysUserId,
          userName: data.userName,
        };
        this.setData({
          memberData: obj,
          nowCounselor: nowCounselor, //顾问数据
          visitorList: visitorList, //成员列表
          groupId: data.groupId
        })
        // let adviserIndex=0;
        // if(res.data[0].sysUserId){
        // 	this.data.counselorList.forEach((v,i)=>{
        // 		if(v.propertyConsultantId==res.data[0].sysUserId){
        // 			adviserIndex=i;
        // 		}
        // 	})
        // }
        // this.setData({
        // 	showModal: true,
        // 	componentText: {
        // 		title: '小组成员',
        // 		buttonText: '确定拆分',
        // 		type: 1,
        // 		adviserIndex:adviserIndex
        // 	}, //组件名字
        // 	visitorList:res.data[0].groupMemberInfos
        // })
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
        this.setData({
          showModal: false
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
  wxAlert(text, time) {
    wx.showToast({
      title: text,
      duration: time || 2000,
      icon: 'none'
    })
  }
});