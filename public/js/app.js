console.log("Client side javascript file loaded.");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
// const units = document.querySelector('#scale');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loc = search.value;
    // const unitValue = units.value;
    // console.log(units)
    // const unitValue = weatherForm
    // console.log(unitValue)

    messageOne.textContent = "Loading Weather...";
    messageTwo.textContent = '';
    fetch('/weather?address=' + loc).then((response) => {
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