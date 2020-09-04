const url = "https://api.spacexdata.com/v3/launches/upcoming";
const nextLaunchUrl = "https://api.spacexdata.com/v3/launches/next";
const resultsContainer = document.querySelector(".results");
const nextLaunchResult = document.querySelector(".next_launch_container");

async function getNextLaunch() {
  try {
    const response = await fetch(nextLaunchUrl);
    const result = await response.json();

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
    </div>`
  }
  catch(error) {
    resultsContainer.innerHTML = displayError("An error occured when calling API")
  }

}
getNextLaunch()



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