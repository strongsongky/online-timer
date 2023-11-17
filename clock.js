console.log("ddd1");
document.addEventListener('DOMContentLoaded', function () {
  console.log("ddd2");
  let timeElement = document.getElementById('time');
  let dateElement = document.getElementById('date');
  
  function dpTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let ampm = '오전';

    if (hours > 12) {
      hours -= 12;
      ampm = '오후';
    }

    const formattedMinutes = (minutes < 10) ? '0' + minutes : minutes;
    const formattedSeconds = (seconds < 10) ? '0' + seconds : seconds;

    timeElement.innerHTML = ampm + " " + hours + ":" + formattedMinutes + ":" + formattedSeconds;
  }

  function dpDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const dayIndex = now.getDay();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const day = week[dayIndex];

    dateElement.innerHTML = year + "년 " + month + "월 " + date + "일 " + day + "요일";
  }

  dpTime();
  dpDate();

    setInterval(function () {
      dpTime();
      dpDate();
    }, 1000);
});