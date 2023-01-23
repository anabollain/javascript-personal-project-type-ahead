'use strict';

//Selectors
const inputCity = document.querySelector('.js-input-city');
const suggestions = document.querySelector('.js-suggestions');

//Variables
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


let cities = [];

//Get data
fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        return cities = data.map(city => 
        { return {'city' : city.city, 'state' : city.state, 'population' : city.population};
        })
    });

//Match input value
function findMatches(wordToMatch, cities){
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
}

//Change number format
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


//Render function
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray
        .map(place => {
            const regex = new RegExp(this.value, 'gi');
            //Replace whatever it matches with a highlighted span
            const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
            const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
            return `
                <li class="list__item">
                    <span class="list__item--name">${cityName}, ${stateName}</span>
                    <span class="list__item--population">${numberWithCommas(place.population)}</span>
                </li>
            `;
        })
        .join('');
        if(this.value === ''){
            return suggestions.innerHTML = '';
        }else{
            return html.length !== 0 ? suggestions.innerHTML = html : suggestions.innerHTML = `<p>Sorry, no results were found for <span class="hl">${this.value}</span></p>`;
        }
    
}


//Event listener
inputCity.addEventListener('change', displayMatches);
inputCity.addEventListener('keyup', displayMatches);
