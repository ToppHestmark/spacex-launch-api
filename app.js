const url = "https://api.spacexdata.com/v3/launches/past";
const resultsContainer = document.querySelector(".results");

async function getPastLaunches() {

  try {
  
    const response = await fetch(url);
    const results = await response.json();

    resultsContainer.innerHTML = "";

    for (let i = 0; i < results.length; i++) {

    const launchDate = results[i].launch_date_utc;
    let unformattedDate = new Date(launchDate);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(unformattedDate);
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(unformattedDate);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(unformattedDate);

    const rocketBadge = results[i].links.mission_patch_small;
    const missionName = results[i].mission_name
    const flightNumber = results[i].flight_number;
    const date = `${mo} ${da}, ${ye}`;
    const launchSite = results[i].launch_site.site_name_long;
    const rocketName = results[i].rocket.rocket_name;
    const launchSuccess = results[i].launch_success;
    const videoLink = results[i].links.video_link;
    const articleLink = results[i].links.article_link;
    function successFactor() {
      return launchSuccess ? `<p class="successful_message">SUCCESSFUL</p>` : `<p class="unsuccessful_message">UNSUCCESSFUL</p>`;
    }
    const details = results[i].details;
    function detailsDescription() {
      return details ? `<p class="details_description">${details}</p>` : "";
    }

    // console.log(results[i].links.article_link);

    resultsContainer.innerHTML +=  `<div class="result">
    <img class="badge" src="${rocketBadge}" alt="">
    <h2 class="mission__name">${missionName}</h2>
    <p><b>Flight Number:</b> ${flightNumber}</p>
    <p><b>Launch Date:</b> ${date}</p>
    <p><b>Launch Site:</b> ${launchSite}</p>
    <p><b>Rocket Name:</b> ${rocketName}</p>
    ${successFactor()}
    ${detailsDescription()}
    <div class="links">
    <a class="external_link" href="${videoLink}">WATCH VIDEO</a>
    <a class="external_link article_link" href="${articleLink}">ARTICLE</a>
    </div>
    </div>`
  }
  }
  catch(error) {
    resultsContainer.innerHTML = displayError("An error occured when calling API")
  }
  
}

getPastLaunches()