//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World2',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    items: [
      { name: '1', value: '男', checked: 'true'},
      { name: '2', value: '女'},
    ],
    sex: '男'
  },
  radioChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit: function (e) {
    console.log(e.detail.value);
    if (e.detail.value.username.length == 0 || e.detail.value.username.length >= 8) {
      wx.showToast({
        title: '姓名不能为空或过长!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.sex.length == 0) {
      wx.showToast({
        title: '性别不能为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.age.length == 0) {
      wx.showToast({
        title: '年龄不能为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
        url: 'https://www.xxxxx.com/wx/form.php',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: { 
          username: e.detail.value.username, 
          userSex: e.detail.value.userSex, 
          userSex: e.detail.value.userSex 
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.status == 0) {
            wx.showToast({
              title: '提交失败！！！',
              icon: 'loading',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '提交成功！！！',//这里打印出登录成功
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    }
  }
})