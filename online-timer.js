document.addEventListener("DOMContentLoaded", function () {
  const contentSection = document.getElementById("content-section");

  function loadClockSection() {
    contentSection.innerHTML = `
      <section id="clock-section">
        <main>
          <div id="time"></div>
          <div id="date"></div>
        </main>
      </section>
    `;

    const styleElement = document.createElement("link");
    styleElement.rel = "stylesheet";
    styleElement.href = "./clock.css";
    document.head.appendChild(styleElement);

    const scriptElement = document.createElement("script");
    scriptElement.src = "./clock.js";
    document.body.appendChild(scriptElement);
  }

  function loadStopwatchSection() {
    contentSection.innerHTML = `
        <section id="stopwatch-section">
          <main>
            <div id="time-section">
              <span id="Min">00</span>
              <span>:</span>
              <span id="Sec">00</span>
              <span>:</span>
              <span id="Milisec">00</span>
            </div>
            <div id="button-section">
              <button type="button" id="StartBtn">START</button>
              <button type="button" id="StopBtn">STOP</button>
            </div>
            <div>
              <ul id="Records"></ul>
            </div>
          </main>
        </section>
      `;

    const styleElement = document.createElement("link");
    styleElement.rel = "stylesheet";
    styleElement.href = "./stopwatch.css";
    document.head.appendChild(styleElement);

    const scriptElement = document.createElement("script");
    scriptElement.src = "./stopwatch.js";
    document.body.appendChild(scriptElement);
  }

  function loadAlarmSection() {}

  loadClockSection();

  const clockTab = document.getElementById("clock-tab");
  const stopwatchTab = document.getElementById("stopwatch-tab");
  const alarmTab = document.getElementById("alarm-tab");

  clockTab.addEventListener("click", loadClockSection);
  stopwatchTab.addEventListener("click", loadStopwatchSection);
  alarmTab.addEventListener("click", loadAlarmSection);
});
