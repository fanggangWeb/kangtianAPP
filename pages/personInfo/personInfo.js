//获取应用实例
const app = getApp()
import { fetch, uploadFetch, imageURL } from '../../utils/fetch'
let userInfo
//Page Object
Page({
  data: {
    imageURL: imageURL,
    avatarUrl: "",
    username: "",
    role: 5,
    statusList: [
      {color: "green", name: "上线", status: "1"},
      {color: "red", name: "忙碌", status: "2"},
      {color: "purple", name: "离开", status: "3"},
      {color: "grey", name: "离线", status: "0"},
      {color: "white", name: "取消", status: "cancel"},
    ],
    statusState: false,
    status: "",
    dialogState: false, // 弹出层状态
    businessStatus: "", // 点击了开始营业或者结束营业后暂存 状态
    // 密码框配置
    focus: false,
    Length: 4,        // 输入框个数  
    isFocus: true,    // 聚焦  
    codeValue: "",    // 输入的内容  
    ispassword: true, // 是否密文显示 true为密文， false为明文。
    // 导航栏组件所需的参数
    navbarData: {
      showCapsule: 0, // 是否显示左上角图标   1表示显示    0表示不显示
      title: '个人信息', // 导航栏 中间的标题
    },
    height: app.globalData.statusBarHeight+app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    // console.log(wx.getStorageSync("userInfo"))
    userInfo = wx.getStorageSync("userInfo")
    this.setData({
      avatarUrl: userInfo.imgPath,
      username: userInfo.username,
      role: userInfo.role
    })
  },
  onReady: function() {
    
  },
  onShow: function() {
    this.getStatus()
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
  // 开始营业
  startBusiness () {
    this.setData({
      businessStatus: 1,
      codeValue: "",
      dialogState: true,
      
    })
  },
  // 结束营业
  endBusiness () {
    this.setData({
      businessStatus: 0,
      codeValue: "",
      dialogState: true,
    })
  },
  closeDialog () {
    this.setData({
      dialogState: false
    })
  },
  changeAvatar () {
    var that = this
    let data = {
      folderName: "folderName",
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        uploadFetch({
          filePath: tempFilePaths[0],
          data:data
        }).then(res => {
          if (res.code == 1) {
            let avatar = res.data
            let data = {
              id: userInfo.id,
              avatar: avatar
            }
            fetch({
              url: "/common/changeAvatar",
              data
            }).then(res => {
              if (res.code == 1) {
                that.getStatus()
              } else {
                wx.showModal({
                  title: "错误",
                  content: res.message,
                });
              }
            })
          } else {
            wx.showModal({
              title: "错误",
              content: "上传头像失败",
            });
          }
          
        })
      }
    })
  },
  quitLogin () {
    wx.showModal({
      title: '提示？',
      content: '确定要退出当前账号吗？',
      success (res) {
        if (res.confirm) {
          // 确定后请求接口退出
          let data = {
            id: userInfo.id,
          }
          fetch({
            url: "/common/logout",
            method: "post",
            data: data
          }).then(res => {
            if (res.code == 1) {
                wx.removeStorageSync('userInfo');
                wx.redirectTo({
                  url: '/pages/login/login'
                });
            } else {
              wx.showModal({
                title: "错误",
                content: res.message,
              });
            }
          })
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
  // 更改当前状态
  chooseStatus (e) {
    // console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    if (item.status == "cancel" || item.status==this.data.status) {
      this.setData({
        statusState: false
      })
      return
    }
    let data = {
      id: userInfo.id,
      status: item.status
    }
    fetch({
      url: "/common/updateStatus",
      method: "post",
      data: data
    }).then(res => {
      if (res.code == 1) {
        this.setData({
          statusState: false
        })
        this.getStatus()
      } else {
        this.setData({
          statusState: false
        })
        wx.showModal({
          title: "错误",
          content: res.message,
        });
      }
    })
    
  },
  // 获取当前用户的登录状态
  getStatus () {
    let data = {
      id: userInfo.id
    }
    fetch({
      url: "/common/getStatus",
      method: "post",
      data: data
    }).then(res => {
      if (res.code == 1) {
        this.setData({
          status: res.data
        })
      } else {
        wx.showModal({
          title: "错误",
          content: res.message,
        });
      }
    })
  },


  // 密码框聚焦失焦操作
  password_input: function (e) {
    var that = this;
    // console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
      codeValue: inputValue
    })
    if (inputValue.length == 4) {
      let data = {
        salesDepartmentId: userInfo.departmentId,
        status: this.data.businessStatus, // 0 未营业 1 营业
        code: inputValue
      }
      fetch({
        url: "/manage/startOrEndBusiness",
        method: "post",
        data
      }).then(res => {
        if (res.code == 1) {
          this.setData({
            dialogState: false
          })
        } else {
          this.setData({
            dialogState: false
          })
          wx.showModal({
            title: '错误',
            content: res.message
          });
        }
      })
    }
  },

  focusTap () {
    var that = this;
    that.setData({
      isFocus: true,
    })
  },

  getFocus: function () {
    this.setData({
      focus: !this.data.focus
    })
  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  