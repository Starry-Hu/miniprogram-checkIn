const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 格式化未来时间：当前date n天之后的时间
function formatFutureTime(date, n) {
  n = parseInt(n);
  var newD = retDateObj(date);
  var dd = newD.getTime();
  dd += n * (1000 * 60 * 60 * 24);
  newD.setTime(dd);
  return formatDate(newD);
}

// 比较两个时间的先后关系：2 大于  1 等于  0 小于
// 用于判断选择时间的合法性
function compareDate(begin, end) {
  var state = -1;
  begin = retDateObj(begin);
  end = retDateObj(end);
  if (begin && end) {
    begin = begin.getTime();
    end = end.getTime();
    if (begin > end) {
      state = 2;
    } else if (begin === end) {
      state = 1;
    } else {
      state = 0;
    }
  }
  return state;
}

module.exports = {
  formatTime: formatTime,
  formatFutureTime: formatFutureTime,
  compareDate: compareDate
}
