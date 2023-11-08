const dpTime = function () {
  const now = new Date()
  var hours = now.getHours()
  var minutes = now.getMinutes()
  var seconds = now.getSeconds()
  var ampm = ''

  if (hours > 12) {
    hours -= 12
    ampm = '오후'
  } else {
    ampm = '오전'
  }

  if (minutes < 10) {
    minutes = '0' + minutes
  }

  if (seconds < 10) {
    seconds = '0' + seconds
  }

  document.getElementById('time').innerHTML = ampm + " " + hours + ":" + minutes + ":" + seconds
}
setInterval(dpTime, 1000)  

const dpDate = function () {
  const now = new Date()
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var dayIndex  = now.getDay();
  var week = ['일', '월', '화', '수', '목', '금', '토'];
  var day = week[dayIndex];

  document.getElementById('date').innerHTML = year + "년 " + month + "월 " + date + "일 " + day + "요일" 
}
setInterval(dpDate, 1000);