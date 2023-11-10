document.addEventListener('DOMContentLoaded', function () {
  let contentSection = document.getElementById('content-section');

  function loadClockSection() {
    fetch('clock/clock.html')
      .then(response => response.text())
      .then(html => {
        contentSection.innerHTML = html;
        const scriptElement = document.createElement('script');
        scriptElement.src = 'clock/clock.js';
        document.head.appendChild(scriptElement);
      })
      .catch(error => console.error('Error fetching clock.html:', error));
  }

  function loadStopwatchSection() {
    
  }

  function loadAlarmSection() {
    
  }

  loadClockSection();

  const clockTab = document.getElementById("clock-tab");
  const stopwatchTab = document.getElementById("stopwatch-tab");
  const alarmTab = document.getElementById("alarm-tab");

  clockTab.addEventListener("click", loadClockSection);
  stopwatchTab.addEventListener("click", loadStopwatchSection);
  alarmTab.addEventListener("click", loadAlarmSection);
});