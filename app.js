const url = "https://api.spacexdata.com/v3/launches/past";
const resultsContainer = document.querySelector(".results");

async function getPastLaunches() {

  const response = await fetch(url)
  const results = await response.json()

  resultsContainer.innerHTML = "";

  for (let i = 0; i < results.length; i++) {

    // console.log(results[i].launch_success);

    const launchDate = results[i].launch_date_utc;
    let unformattedDate = new Date(launchDate);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(unformattedDate);
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(unformattedDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(unformattedDate);

    const rocketBadge = results[i].links.mission_patch_small;
    const name = results[i].mission_name
    const flightNumber = results[i].flight_number;
    const date = `${mo} ${da}, ${ye}`;
    const launchSite = results[i].launch_site.site_name_long;
    const launchSuccess = results[i].launch_success;
    function successFactor() {
      return launchSuccess ? `<p class="successful_message">SUCCESSFUL</p>` : `<p class="unsuccessful_message">UNSUCCESSFUL</p>`;
    }
    

    resultsContainer.innerHTML +=  `<div class="result">
    <img class="badge" src="${rocketBadge}" alt="">
    <h2 class="rocket__name">${name}</h2>
    <p><b>Flight Number:</b> ${flightNumber}</p>
    <p><b>Launch Date:</b> ${date}</p>
    <p><b>Launch Site:</b> ${launchSite}</p>
    ${successFactor()}
    </div>`
  }
}

getPastLaunches()