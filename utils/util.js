// 年-月-日 时:分:秒
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 年-月-日
const formatDate= date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 比较两个时间的先后关系：1 大于  0 等于  -1 小于
// 用于判断选择时间的合法性
function compareDate(begin, end) {
  var state = -1;
  begin = retDateObj(begin);
  end = retDateObj(end);

  if (begin && end) {
    begin = begin.getTime();
    end = end.getTime();
    if (begin > end) {
      state = 1;
    } else if (begin === end) {
      state = 0;
    }
  }
  return state;
}

// 返回时间对象：str -> object(Date)
function retDateObj(date) {
  console.log(date);
  if (typeof date == 'object') {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  } else {
    if (date.length > 0) {
      var date2 = date.replace(/-/g,"/")
      return new Date(date2);
    }
    return null;
  }
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  compareDate: compareDate
}
