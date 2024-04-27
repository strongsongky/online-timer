var DOMReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete"
    ? callback()
    : document.addEventListener("DOMContentLoaded", callback);
};

DOMReady(function () {
  let timeElement = document.getElementById("time");

  function dpTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let ampm = "AM";

    if (hours > 12) {
      hours -= 12;
      ampm = "PM";
    }

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    timeElement.innerHTML =
      ampm + " " + hours + ":" + formattedMinutes + ":" + formattedSeconds;
  }

  dpTime();

  setInterval(function () {
    dpTime();
  }, 1000);

  const setAlarmButton = document.getElementById("setAlarmButton");
  setAlarmButton.addEventListener("click", handleSetAlarm);
});

function handleSetAlarm() {
  const alarmTimeInput = document.getElementById("alarmTime");
  const alarmTime = alarmTimeInput.value;

  // 알람 시간이 설정되어 있는지 확인
  if (!alarmTime) {
    alert("알람 시간을 설정해주세요.");
    return;
  }

  // 현재 시간 가져오기
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHours * 60 + currentMinutes;

  // 알람 시간 파싱하기
  const [hours, minutes] = alarmTime.split(":").map(Number);
  const alarmTimeInMinutes = hours * 60 + minutes;

  // 현재 시간과 알람 시간의 차이 계산
  let timeDifference = alarmTimeInMinutes - currentTime;
  if (timeDifference < 0) {
    // 만약 설정한 알람 시간이 현재 시간보다 이전이면 다음날로 설정
    timeDifference += 24 * 60;
  }

  // 알람 설정 결과 표시할 요소 생성
  const alarmContainer = document.createElement("div");
  alarmContainer.id = "alarmContainer";

  const alarmTimeDisplay = document.createElement("div");
  alarmTimeDisplay.textContent = `알람 시간: ${formatAlarmTime(alarmTime)}`;
  alarmContainer.appendChild(alarmTimeDisplay);

  const timeRemainingDisplay = document.createElement("div");
  timeRemainingDisplay.textContent = `남은 시간: ${formatTimeDifference(
    timeDifference
  )}`;
  alarmContainer.appendChild(timeRemainingDisplay);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "취소";
  cancelButton.addEventListener("click", cancelAlarm);
  alarmContainer.appendChild(cancelButton);

  // 알람 시작 버튼 숨기기
  const setAlarmButton = document.getElementById("setAlarmButton");
  setAlarmButton.style.display = "none";

  // 기존 알람 설정 요소 대체
  const setAlarmDiv = document.getElementById("setAlarm");
  setAlarmDiv.replaceWith(alarmContainer);

  // 알람 시간까지 남은 시간 계산 함수
  function formatTimeDifference(timeDifference) {
    const hoursLeft = Math.floor(timeDifference / 60 / 60);
    const minutesLeft = Math.floor((timeDifference / 60) % 60);
    const secondsLeft = Math.floor(timeDifference % 60);
    return `${hoursLeft < 10 ? "0" : ""}${hoursLeft}:${
      minutesLeft < 10 ? "0" : ""
    }${minutesLeft}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  }

  // 알람 취소 함수
  function cancelAlarm() {
    alarmContainer.replaceWith(setAlarmDiv);
    setAlarmButton.style.display = "block"; // 취소할 때 다시 알람 시작 버튼 보이기
  }

  function formatAlarmTime(alarmTime) {
    const [hours, minutes] = alarmTime.split(":").map(Number);
    let ampm = hours >= 12 ? "오후" : "오전";
    let formattedHours = hours % 12 || 12;
    return `${ampm} ${formattedHours}:${minutes}`;
  }
}
