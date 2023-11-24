document.addEventListener('DOMContentLoaded', function () {
  const contentSection = document.getElementById('content-section');

  function loadClockSection() {
    console.log("1");
    contentSection.innerHTML = `
      <section id="clock-section">
        <main>
          <div id="time"></div>
          <div id="date"></div>
        </main>
      </section>
    `;

    console.log("2");
    const styleElement = document.createElement('link');
    styleElement.rel = 'stylesheet';
    styleElement.href = './clock.css';
    document.head.appendChild(styleElement);
    console.log("Clock section loaded1");
    
    const scriptElement = document.createElement('script');
    scriptElement.src = './clock.js';
    scriptElement.onload = function () {
      console.log("Clock script loaded2");
    };
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
  
      const styleElement = document.createElement('link');
      styleElement.rel = 'stylesheet';
      styleElement.href = './stopwatch.css';
      document.head.appendChild(styleElement);
  
      const scriptElement = document.createElement('script');
      scriptElement.src = './stopwatch.js'; 
      document.body.appendChild(scriptElement);
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
