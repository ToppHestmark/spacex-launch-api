const url = "https://api.spacexdata.com/v3/launches/upcoming";
const nextLaunchUrl = "https://api.spacexdata.com/v3/launches/next";
const resultsContainer = document.querySelector(".results");
const nextLaunchResult = document.querySelector(".next_launch_container");

// Next launch
async function getNextLaunch() {
  try {
    const response = await fetch(nextLaunchUrl);
    const result = await response.json();

    nextLaunchHtml(result)
  }
  catch(error) {
    resultsContainer.innerHTML = displayError("An error occured when calling API")
  }
}
getNextLaunch()


function nextLaunchHtml(result) {
  const missionName = result.mission_name
    const flightNumber = result.flight_number
    const launchSite = result.launch_site.site_name_long
    const rocketName = result.rocket.rocket_name
    const launchDateUTC = result.launch_date_utc
    const getDate = new Date(launchDateUTC);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(getDate);
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(getDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(getDate);
    const date = `${mo} ${da}, ${ye}`;

    nextLaunchResult.innerHTML = `<div class="next_launch_result">
    <h2>${missionName}</h2>
    <p><b>Flight Number:</b> ${flightNumber}</p>
    <p><b>Launch Date:</b> ${date}</p>
    <p><b>Launch Site:</b> ${launchSite}</p>
    <p><b>Rocket Name:</b> ${rocketName}</p>
    </div>`;

    // Timer countdown
    function getTimeRemaining(endtime){
      const total = Date.parse(endtime) - Date.parse(new Date());
      const seconds = Math.floor( (total/1000) % 60 );
      const minutes = Math.floor( (total/1000/60) % 60 );
      const hours = Math.floor( (total/(1000*60*60)) % 24 );
      const days = Math.floor( total/(1000*60*60*24) );
    
      return { total, days, hours, minutes, seconds };

    }
    getTimeRemaining(launchDateUTC)
    
    function initializeClock(id, endtime) {
      const clock = document.getElementById(id);
      const timeinterval = setInterval(() => {
        const t = getTimeRemaining(endtime);
        clock.innerHTML = `<div class="countdown_result">
        <div><p class="countdown_numbers">${t.days}</p> <p class="time_unit">DAYS</p></div>
        <div><p class="countdown_numbers">${t.hours}</p> <p class="time_unit">HOURS</p></div>
        <div><p class="countdown_numbers">${t.minutes}</p> <p class="time_unit">MINUTES</p></div>
        <div><p class="countdown_numbers">${t.seconds}</p> <p class="time_unit">SECONDS</p></div>
        </div>`

        // Stop counting when passing the deadline
        if (t.total <= 0) {
          // clearInterval(timeinterval);
        }
      },1000);
    }
    initializeClock('countdown_container', launchDateUTC);
} 


// --- Upcoming launches ---
async function getUpcomingLaunches() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    creareUpcomingMissionHtml(results)
  }
  catch(error) {
    resultsContainer.innerHTML = displayError("An error occured when calling API")
  }
}
getUpcomingLaunches();


function creareUpcomingMissionHtml(results) {
  resultsContainer.innerHTML = "";

  for (let i = 0; i < results.length; i++) {

    if (i === 10) {
      break;
    } 
    const launchDate = results[i].launch_date_utc;
    const getDate = new Date(launchDate);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(getDate);
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(getDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(getDate);
    if (getDate < Date.now()) {
      continue;
    }

    const missionName = results[i].mission_name
    const flightNumber = results[i].flight_number;
    const date = `${mo} ${da}, ${ye}`;
    const launchSite = results[i].launch_site.site_name_long;
    const rocketName = results[i].rocket.rocket_name;

    resultsContainer.innerHTML +=  `<div class="result">
    <h2 class="mission__name">${missionName}</h2>
    <p><b>Flight Number:</b> ${flightNumber}</p>
    <p><b>Launch Date:</b> ${date}</p>
    <p><b>Launch Site:</b> ${launchSite}</p>
    <p><b>Rocket Name:</b> ${rocketName}</p>
    </div>`
  }
}