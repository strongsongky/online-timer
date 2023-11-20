var stTime
var timerStart

document.getElementById('StartBtn').addEventListener('click', function() {
  if(!stTime) {
    stTime = new Date().getTime()
  }

  timerStart = setInterval(function() {
    var nowTime = new Date().getTime()
    var newTime = new Date(nowTime - stTime)
    var min = newTime.getMinutes()
    var sec = newTime.getSeconds()
    var milisec = Math.floor(newTime.getMilliseconds() / 10)

    document.getElementById('Min').innerText = addZero(min)
    document.getElementById('Sec').innerText = addZero(sec)
    document.getElementById('Milisec').innerText = addZero(milisec)
  },1)
})

document.getElementById('StopBtn').addEventListener('click', function() {
  if(timerStart) {
    clearInterval(timerStart)
  }
})

function addZero(num) {
  return (num < 10 ? '0'+num : ''+num)
}