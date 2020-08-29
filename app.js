const url = "https://api.spacexdata.com/v4/launches";
const resultsContainer = document.querySelector(".results");

async function getLaunches() {

  const response = await fetch(url)
  const results = await response.json()

  resultsContainer.innerHTML = "";

  for (let i = 0; i < results.length; i++) {
    // console.log(results[i].name);
    const rocketBadge = results[i].links.patch.small
    const name = results[i].name
    const flightNumber = results[i].flight_number;

    resultsContainer.innerHTML +=  `<div class="result">
    <img class="badge" src="${rocketBadge}" alt="">
    <h2 class="rocket__name">${name}</h2>
    <p><b>Flight Number:</b> ${flightNumber} </p>
    </div>`
  }
}

getLaunches()