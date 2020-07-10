Page({
  data: {
    userId: '',
    userPassword: ''
  },

  // 注册用户
  register() {
    wx.navigateTo({
      url: 'register/register'
    })
  },
  // 账号和密码的内容绑定
  idChange(e) {
    this.setData({
      userId: e.detail.value
    })
  },
  pswChange(e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  // 登录
  login() {
    console.log(this.data)
    if (this.data.userId.length == 0) {
      wx.showToast({
        title: '账号不能为空！',
        icon: 'loading',
        duration: 1000
      })
    } else if (this.data.userPassword.length == 0) {
      wx.showToast({
        title: '密码不能为空!',
        icon: 'loading',
        duration: 1000
      })
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
              duration: 1000
            })
          } else {
            wx.showToast({
              title: '提交成功！！！', //这里打印出登录成功
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    }
  }
})