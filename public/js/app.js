console.log("Client side javascript file loaded.");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const units = document.querySelector('unit');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loc = search.value;
    const unitValue = units.value;

    messageOne.textContent = "Loading Weather...";
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address=' + loc).then((response) => {
        response.json().then((jsonResp) => {

            if (jsonResp.error) {

                messageOne.textContent = jsonResp.error;
            } else {
                messageOne.textContent = "LOCATION: " + jsonResp.location.location + " with latitude '" + jsonResp.location.latitude + "' and longitude '" + jsonResp.location.longitude + "'.";
                messageTwo.textContent = "Weather forecast: " + jsonResp.forecast.summary + "with maximum of " + jsonResp.forecast.maxTemp + " and a minimum of " + jsonResp.forecast.minTemp;
            }
        })
    });

});