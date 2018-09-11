var now = new Date();                    //当前日期
var nowDayOfWeek = now.getDay();         //今天本周的第几天
var nowDay = now.getDate();              //当前日
var nowMonth = now.getMonth();           //当前月
var nowYear = now.getYear();             //当前年
nowYear += (nowYear < 2000) ? 1900 : 0;  //
function beforeNowDays(date,day) {
  // 先获取当前时间
  var curDate = (date).getTime();
  var days = day * 24 * 3600 * 1000;
  var pastResult = curDate - days;

  // 日期函数，定义起点为半年前
  var pastDate = new Date(pastResult),
    pastYear = pastDate.getFullYear(),
    pastMonth = pastDate.getMonth() + 1,
    pastDay = pastDate.getDate();

  return pastYear + '-' + pastMonth + '-' + pastDay;
}
function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
//获得本周的开始日期
function getWeekStartDate() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek+1);
  return formatDateBase(weekStartDate);
}

//获得本周的结束日期
function getWeekEndDate() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)+1);
  return formatDateBase(weekEndDate);
}
function formatDateBase(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();

  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return (myyear + "-" + mymonth + "-" + myweekday);
}
//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
function getWeekday(type, dates) {
  var now = new Date();
  var nowTime = now.getTime();
  var day = now.getDay();
  var longTime = 24 * 60 * 60 * 1000;
  var n = longTime * 7 * (dates || 0);
  if (type == "s") {
    var dd = nowTime - (day - 1) * longTime + n;
  };
  if (type == "e") {
    var dd = nowTime + (7 - day) * longTime + n;
  };
  dd = new Date(dd);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;
  var d = dd.getDate();
  m = m < 10 ? "0" + m: m;
  d = d < 10 ? "0" + d: d;
  var day = y + "-" + m + "-" + d;
  return day;
};

//type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，months为数字类型，不传或0代表本月，-1代表上月，1代表下月
function getMonth(type, months) {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (Math.abs(months) > 12) {
    months = months % 12;
  };
  if (months != 0) {
    if (month + months > 12) {
      year++;
      month = (month + months) % 12;
    } else if (month + months < 1) {
      year--;
      month = 12 + month + months;
    } else {
      month = month + (months==undefined?0:months);
    };
  };
  month = month < 10 ? "0" + month: month;
  var date = d.getDate();
  var firstday = year + "-" + month + "-" + "01";
  var lastday = "";
  if (month == "01" || month == "03" || month == "05" || month == "07" || month == "08" || month == "10" || month == "12") {
    lastday = year + "-" + month + "-" + 31;
  } else if (month == "02") {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
      lastday = year + "-" + month + "-" + 29;
    } else {
      lastday = year + "-" + month + "-" + 28;
    };
  } else {
    lastday = year + "-" + month + "-" + 30;
  };
  var day = "";
  if (type == "s") {
    day = firstday;
  } else {
    day = lastday;
  };
  return day;
};

export default {
  fd(date) {
    return formatDate(date,"yyyy-MM-dd hh:mm:ss")
  },
  formatDate(date, fmt) {
    return formatDate(date,fmt)
  },
  getWeekFirstDay() {
    return getWeekStartDate();
  },
  getWeekLastDay() {
    return getWeekEndDate();
  },
  getMonthFirstDay() {
    return getMonth("s");
  },
  getMonthLastDay() {
    return getMonth("e");
  },
  beforeNowDays(date,day){
    return beforeNowDays(date,day);
  }
}
