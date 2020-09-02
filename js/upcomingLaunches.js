const url = "https://api.spacexdata.com/v3/launches/upcoming";
const resultsContainer = document.querySelector(".results");

async function getUpcomingLaunches() {

  try {
    const response = await fetch(url);
    const results = await response.json();

    // console.log(results)
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

    const launchDate = results[i].launch_date_utc;
    const getDate = new Date(launchDate);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(getDate);
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(getDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(getDate);

    const missionName = results[i].mission_name
    const flightNumber = results[i].flight_number;
    const date = `${mo} ${da}, ${ye}`;
    const launchSite = results[i].launch_site.site_name_long;
    const rocketName = results[i].rocket.rocket_name;
    
    const details = results[i].details;
    function detailsDescription() {
      return details ? `<p class="details_description">${details}</p>` 
                      : `<p>No details provided</p>`;
    }

    resultsContainer.innerHTML +=  `<div class="result">
    <h2 class="mission__name">${missionName}</h2>
    <p><b>Flight Number:</b> ${flightNumber}</p>
    <p><b>Launch Date:</b> ${date}</p>
    <p><b>Launch Site:</b> ${launchSite}</p>
    <p><b>Rocket Name:</b> ${rocketName}</p>
    <div class="upcoming_launch_details">${detailsDescription()}</div
    </div>`
  }
}