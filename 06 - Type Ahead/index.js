const suggestions = document.querySelector(".suggestions")
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
const places = []

fetch(endpoint)
  .then(res => res.json())
  .then(data => places.push(...data)) // or places.push.apply(places, data)

function filterPlaces(searchText) {
  const regexp = new RegExp(searchText, "i")
  return places.filter(place => regexp.test(place.city) || regexp.test(place.state))
}

// yoinked from solution
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displaySuggestions(items, highlightText) {
  const regexp = new RegExp(highlightText, "gi")
  // for long result lists (e.g. after typing one letter), rendering every item is slow
  // 100 is probably plenty?
  const html = items.slice(0, 100).map(item => {
    const cityName = item.city.replace(regexp, `<span class="hl">${highlightText}</span>`)
    const stateName = item.state.replace(regexp, `<span class="hl">${highlightText}</span>`)
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(item.population)}</span>
      </li>
    `
  }).join('')
  suggestions.innerHTML = html
}

document.querySelector("input").addEventListener("input", function handleInput(e) {
  displaySuggestions(filterPlaces(this.value), this.value)
})
