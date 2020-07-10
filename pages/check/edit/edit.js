var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: -1
  },

  /**
   * 生命周期函数--监听页面加载
   * 加载时初始化时间
   */
  onLoad: function (options) {
    var id = options.id;
    var state = options.state;
    var arr = wx.getStorageSync('activity');

    if (arr.length) {
      var i = 0,
        len = arr.length,
        item;

      for (i = 0; i < len; i++) {
        item = arr[i];
        if (item.id == id) {
          this.setData({
            title: item.title,
            content: item.content,
            sumDays: item.sumDays,
            beginDate: item.beginDate,
            endDate: item.endDate,
            index: i,
            id: id,
            state: state // 进行状态：1进行中、0未开始
          })
          break;
        }
      }
    }
  },

  // 结束时间支持修改
  bindEndDateChange: function(e) {
    var endDate = e.detail.value;
    var beginDate = this.data.beginDate;
    var state = this.data.state;
    var now = new Date();

     // 进行中 1 结束时间不得小于今天
    if (state == 1) {
      if (util.compareDate(endDate, now) >= 0) {
        this.setData({
          endDate: endDate
        })
      } else {
        wx.showModal({
          content: '结束时间不得早于今天',
          showCancel: false
        })
      }
    } 
    // 未开始 0 结束时间不得小于开始时间
    else {
      if (util.compareDate(endDate, beginDate) >= 0) {
        this.setData({
          endDate: endDate
        })
      } else {
        wx.showModal({
          content: '结束时间不得早于起始时间',
          showCancel: false
        })
      }
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

  // 编辑提交
  editActivity() {
    var data = this.data;
    if (data.title.length == 0) {
      wx.showModal({
        content: '计划名称不得为空',
        showCancel: false
      })
      return;
    }

    // 数据保存
    // 缓存中的数据类型是string  console.log(typeof(arr))
    var arr = wx.getStorageSync('activity'),
      index = this.data.index,
      editItem = arr[index];
    editItem.title = data.title;
    editItem.content = data.content;
    editItem.endDate = data.endDate;
    arr[index] = editItem
    wx.setStorageSync('activity', arr);
    // 页面跳转  关闭当前页面
    wx.redirectTo({
      url: '../detail/detail?id=' + data.id
    })
  }
})