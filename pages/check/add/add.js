var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '坚持打卡~',
    sumDays: 21,
    beginDate: '',
    endDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   * 加载时初始化时间
   */
  onLoad: function (options) {
    // 通过默认的21天来初始化起止时间
    var now = new Date();
    this.setData({
      createTime: util.formatTime(now),
      beginDate: util.formatTime(now),
      endDate: util.formatFutureTime(beginDate, this.data.sumDays - 1)
    })
  },

  // 起止时间picker控件的绑定
  bindBeginDateChange(e) {
    var beginDate = e.detail.value,
      now = new Date();
    if (util.compareDate(beginDate, now) > 0) {
      var endDate = util.formatFutureTime(beginDate, this.data.sumDays - 1);
      this.setData({
        beginDate: beginDate,
        endDate: endDate
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
    if (util.compareDate(endDate, beginDate) > 0 && util.compareDate(endDate, now) > 0) {
      var sumDays = util.getSumDays(beginDate, endDate);
      this.setData({
        sumDays: sumDays,
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
})