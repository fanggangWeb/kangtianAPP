/**
 * 封装http 请求方法
 */
export const apiUrl = "" // 服务器api地址
export const uploadUrl = "" // 统一上传文件地址
export const loadCarUrl = ''
export const unloadCarUrl = ''
export const imageURL = '' // 统一图片地址
export const fetch = (params) => {
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: apiUrl + params.url, // 服务器url+参数中携带的接口具体地址
      data: params.data, // 请求参数
      header: {
        "Content-Type": params.ContentType || "application/x-www-form-urlencoded", // 设置默认格式为表单，特殊情况调用的时候单独设置
        // 'Cookie': wx.getStorageSync('sessionid')  // 统一设置请求头
       },
      //  session会话的设置
      // xhrFields: {
      //   withCredentials: true
      // },
      // crossDomain: true,
      method: params.method || 'POST', // 默认为GET,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType, // 返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType, // 响应的数据类型
      success: function (res) {
        if (res.statusCode!= 200) {
          wx.showModal({
            content: "网络连接错误"
          })
        }
        wx.hideLoading()
        // 接口访问正常返回数据
        if (res.statusCode == 200) {
          // console.log(res)
          resolve(res.data)
          if (res.data.state != 200 && res.data.state != 405) {
            wx.showModal({
              content: res.data.message
            })
          }
          // 状态码 401返回登录页面
          if (res.data.state == 401) {
            setTimeout(() => {
              wx.reLaunch({
                url: '../login/login'
              })
            },2000)
          }
        }
      },
      fail: function (error) {
        wx.hideLoading()
        // console.log(error)
        wx.showModal({
          content: "网络连接错误"
        })
      },
      complete: function (res) {
        wx.hideLoading()
        // wx.showModal({
        //   content: '网络连接超时,请稍后重试'
        // })
      }
    })
  })
}

// 上传请求的统一封装
export const uploadFetch = (params) => {
  // 返回promise 对象
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.uploadFile({
      url: params.url || uploadUrl , // 仅为示例，非真实的接口地址
      filePath:  params.filePath,
      name: params.name || 'file', // 设置传参的名称 默认为"file"
      formData: params.data,
      header: {
        // 统一设置请求头
        // 'Cookie': wx.getStorageSync('sessionid')
      },
      success(res) {
        wx.hideLoading()
        res = res.data
        res = JSON.parse(res)
        if (res.state == 200) {
          resolve(res)
        } else {
          wx.showModal({
            content: res.message
          })
        }
        if (res.state == 401) {
          setTimeout(() => {
            wx.reLaunch({
              url: '../login/login'
            })
          },2000)
        }
      },
      fail (error) {
        wx.hideLoading()
        wx.showModal({
          content: "网络连接错误"
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}
// 更改contentType
// ContentType: "application/json; charset=utf-8"