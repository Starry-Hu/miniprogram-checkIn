var util = require('../../../utils/util.js');

Page({
  data: {
    userId: '',
    userPassword1: '',
    userPassword2: '',
    userBirthday: '1990-12-01',
    endDate: '',
    sexColumns: ["未知", "男", "女"],
    userGender: 0 || wx.getStorageSync("userGender") * 1,
  },

  /**
   * 生命周期函数--监听页面加载
   * 加载时初始化时间
   */
  onLoad: function (options) {
    // 设置今天为最大的出生日期
    var now = new Date();
    this.setData({
      endDate: util.formatDate(now) + ''
    })
  },

  // 账号、密码、性别、出生日期的内容绑定
  idChange(e) {
    this.setData({
      userId: e.detail.value
    })
  },
  pswChange1(e) {
    this.setData({
      userPassword1: e.detail.value
    })
  },
  pswChange2(e) {
    this.setData({
      userPassword2: e.detail.value
    })
  },
  genderChange: function (e) {
    this.setData({
      userGender: e.detail.value
    });
  },
  birthdayChange(e) {
    this.setData({
      userBirthday: e.detail.value,
      userAge: age
    })
  },
  // 登录
  register() {
    // 判断数据输入的合法性
    if (this.data.userId.length == 0) {
      wx.showToast({
        title: '账号不能为空！',
        icon: 'none',
        duration: 1000
      })
    } else if (!/^[a-zA-Z0-9]{6,32}$/.test(this.data.userId)) { // 要求账号为数字字母的6~32位
      wx.showToast({
        title: '账号需为6~32位的数字字母组合!',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.userPassword1.length == 0 || this.data.userPassword2.length == 0) {
      wx.showModal({
        title: '密码不能为空!',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.userPassword1 != this.data.userPassword2) {
      wx.showToast({
        title: '两次密码不同!',
        icon: 'none',
        duration: 1000
      })
    }
    // 提交到服务器
    else {
      console.log(this.data)
      wx.request({
        url: 'https://www.xxxxx.com/wx/form.php',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          userId: this.data.username,
          userPassword: this.data.userPassword1,
          userGender: this.data.userGender,
          userAge: this.getAge(this.data.userBirthday)
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
  },
  // 根据出生日期计算出年龄
  getAge(strAge) {
    var birArr = strAge.split("-");
    var birYear = birArr[0];
    var birMonth = birArr[1];
    var birDay = birArr[2];

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1; //记得加1
    var nowDay = d.getDate();
    var returnAge;

    if (birArr == null) {
      return false
    };
    var d = new Date(birYear, birMonth - 1, birDay);
    if (d.getFullYear() == birYear && (d.getMonth() + 1) == birMonth && d.getDate() == birDay) {
      if (nowYear == birYear) {
        returnAge = 0; // 
      } else {
        var ageDiff = nowYear - birYear; // 
        if (ageDiff > 0) {
          if (nowMonth == birMonth) {
            var dayDiff = nowDay - birDay; // 
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            var monthDiff = nowMonth - birMonth; // 
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          return "出生日期晚于今天，数据有误"; //返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge;
    } else {
      return ("输入的日期格式错误！");
    }
  }
})