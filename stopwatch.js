var stTime = 0;
var endTime = 0;
var timerStart;

var min;
var sec;
var milisec;

var startBtn = document.getElementById('StartBtn');
var stopBtn = document.getElementById('StopBtn');
var recordList = document.getElementById('Records');

startBtn.addEventListener('click', function() {
  if (this.innerText == 'RECORD' && milisec) {
    var li = document.createElement('li');
    li.style.color = "#fff";
    li.innerText = min + ' : ' + sec + ' : ' + milisec;

    if (!recordList.firstChild) {
      recordList.append(li);
    } else {
      recordList.insertBefore(li, recordList.firstChild);
    }

    return false;
  }

  if (!stTime || this.innerText == 'RESET') {
    stTime = Date.now();
  } else {
    stopBtn.innerText = 'STOP';
    stTime = Date.now() - (endTime - stTime); 
  }

  this.innerText = 'RECORD';

  timerStart = setInterval(function() {
    var nowTime = new Date(Date.now() - stTime);

    min = addZero(nowTime.getMinutes());
    sec = addZero(nowTime.getSeconds());
    milisec = addZero(Math.floor(nowTime.getMilliseconds() / 10));

    document.getElementById('Min').innerText = min;
    document.getElementById('Sec').innerText = sec;
    document.getElementById('Milisec').innerText = milisec;
  }, 1);
});

stopBtn.addEventListener('click', function() {
  if (timerStart) {
    clearInterval(timerStart);

    if (this.innerText == 'STOP') {
      endTime = Date.now();
      this.innerText = 'RESET';
      startBtn.innerText = 'RESTART';
    } else {
      stTime = 0;
      min = 0;
      sec = 0;
      milisec = 0;
      document.getElementById('Min').innerText = '00';
      document.getElementById('Sec').innerText = '00';
      document.getElementById('Milisec').innerText = '00';

      startBtn.innerText = 'START';
      this.innerText = 'STOP';
      timerStart = null;
      recordList.innerHTML = '';
    }
  }
});

function addZero(num) {
  return (num < 10 ? '0' + num : '' + num);
}
