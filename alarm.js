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

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHours * 60 + currentMinutes;

  const [hours, minutes] = alarmTime.split(":").map(Number);
  const alarmTimeInMinutes = hours * 60 + minutes;

  let timeDifference = alarmTimeInMinutes - currentTime;
  if (timeDifference < 0) {

    timeDifference += 24 * 60;
  }

  const alarmContainer = document.createElement("div");
  alarmContainer.id = "alarmContainer";

  const alarmTimeDisplay = document.createElement("div");
  alarmTimeDisplay.textContent = `알람 시간: ${alarmTime}`;
  alarmContainer.appendChild(alarmTimeDisplay);

  const timeRemainingDisplay = document.createElement("div");
  timeRemainingDisplay.textContent = `남은 시간: ${formatTimeDifference(timeDifference)}`;
  alarmContainer.appendChild(timeRemainingDisplay);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "취소";
  cancelButton.addEventListener("click", cancelAlarm);
  alarmContainer.appendChild(cancelButton);

  const setAlarmDiv = document.getElementById("setAlarm");
  setAlarmDiv.replaceWith(alarmContainer);

  function formatTimeDifference(timeDifference) {
    const hoursLeft = Math.floor(timeDifference / 60);
    const minutesLeft = timeDifference % 60;
    return `${hoursLeft}시간 ${minutesLeft}분`;
  }

  function cancelAlarm() {
    alarmContainer.replaceWith(setAlarmDiv);
  }
}
