var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '坚持打卡~',
    beginDate: '2020-07-08',
    endDate: '2020-07-08',
  },

  /**
   * 生命周期函数--监听页面加载
   * 加载时初始化时间
   */
  onLoad: function (options) {
    // 通过默认开始和结束都是今天来初始化起止时间
    var now = new Date();
    this.setData({
      beginDate: util.formatDate(now),
      endDate: util.formatDate(now)
    })
  },

  // 起止时间picker控件的绑定
  bindBeginDateChange(e) {
    var beginDate = e.detail.value,
      now = new Date();
    if (util.compareDate(beginDate, now) >= 0) {
      this.setData({
        beginDate: beginDate,
      })
    } else {
      wx.showModal({
        title: 'Hey, 别急',
        content: '开始时间不得早于今天',
        showCancel: false
      })
    }
  },
  bindEndDateChange: function(e) {
    var endDate = e.detail.value,
      beginDate = this.data.beginDate,
      now = new Date();
    console.log(endDate + "12312321");
    console.log(beginDate);
    console.log(util.compareDate(endDate, beginDate));
    if (util.compareDate(endDate, beginDate) >= 0 && util.compareDate(endDate, now) >= 0) {
      this.setData({
        endDate: endDate
      })
    } else {
      wx.showModal({
        title: 'Hey, 别急',
        content: '结束时间不得早于开始时间和今天',
        showCancel: false
      })
    }
  },
  // 任务的标题和描述内容绑定
  titleChange(e) {
    this.setData({
      title: e.detail.value
    })
  },
  contentChange(e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 提交创建新打卡任务，成功后跳转至创建成功页
  createCheckTask() {
    // 检查名称是否填写
    if (this.data.title.length == 0) {
      wx.showModal({
        content: '任务名称不能为空',
        showCancel: false,
      })
      return;
    }
    // 数据保存
    // 缓存中的数据类型是string  console.log(typeof(arr))
    var arr = wx.getStorageSync('activity');
    var data = [];
    var maxID = -1;
    if (arr.length) {
      arr.forEach((item, i) => {
        if (item.id > maxID)
          maxID = item.id;
        data.push(item);
      })
    }
    // 新增数据跟在尾巴上
    var id = maxID + 1;
    this.setData({
      id: id
    })
    data.push(this.data);
    wx.setStorageSync('activity', data);
    // 页面跳转  关闭当前页面
    wx.redirectTo({
      url: '../detail/detail?id=' + id
    })
  }
})