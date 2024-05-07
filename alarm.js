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

  if (!alarmTime) {
    alert("알람 시간을 설정해주세요.");
    return;
  }

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime =
    currentHours * 3600 + currentMinutes * 60 + now.getSeconds();

  const [hours, minutes] = alarmTime.split(":").map(Number);
  let alarmTimeInSeconds = hours * 3600 + minutes * 60;

  let timeDifference = alarmTimeInSeconds - currentTime;
  if (timeDifference < 0) {
    timeDifference += 24 * 3600;
  }

  const alarmContainer = document.createElement("div");
  alarmContainer.id = "alarmContainer";

  const alarmTimeDisplay = document.createElement("div");
  alarmTimeDisplay.id = "showAlarmset";
  alarmTimeDisplay.textContent = `알람 시간 : ${formatAlarmTime(alarmTime)}`;
  alarmContainer.appendChild(alarmTimeDisplay);

  const timeRemainingDisplay = document.createElement("div");
  timeRemainingDisplay.id = "timeRemaining";
  alarmContainer.appendChild(timeRemainingDisplay);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "취소";
  cancelButton.id = "cancelButton";
  cancelButton.addEventListener("click", cancelAlarm);
  alarmContainer.appendChild(cancelButton);

  const setAlarmButton = document.getElementById("setAlarmButton");
  setAlarmButton.style.display = "none";

  const setAlarmDiv = document.getElementById("setAlarm");
  setAlarmDiv.replaceWith(alarmContainer);

  updateRemainingTime();
  interval = setInterval(updateRemainingTime, 1000);

  function formatAlarmTime(alarmTime) {
    const [hours, minutes] = alarmTime.split(":").map(Number);
    let ampm = "오전";
    let formattedHours = hours;
    if (hours >= 12) {
      ampm = "오후";
      formattedHours = hours > 12 ? hours - 12 : hours;
    }
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${ampm} ${formattedHours} : ${formattedMinutes}`;
  }

  function updateRemainingTime() {
    const hoursLeft = Math.floor(timeDifference / 3600);
    const minutesLeft = Math.floor((timeDifference % 3600) / 60);
    const secondsLeft = timeDifference % 60;

    const timeRemainingDisplay = document.getElementById("timeRemaining");

    timeRemainingDisplay.textContent = `남은 시간 : ${hoursLeft
      .toString()
      .padStart(2, "0")} : ${minutesLeft
      .toString()
      .padStart(2, "0")} : ${secondsLeft.toString().padStart(2, "0")}`;

    timeDifference--;
    if (timeDifference < 0) {
      clearInterval(interval);
      timeRemainingDisplay.textContent = "시간 종료";
      if (confirm("시간이 다 되었습니다.")) {
        location.reload();
      }
    }
  }

  function cancelAlarm() {
    clearInterval(interval);
    alarmContainer.replaceWith(setAlarmDiv);
    setAlarmButton.style.display = "block";
  }
}
