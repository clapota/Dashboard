const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'f1c2359583253af4b56ab54379447b58';

function getTemp(city, unit = 'celsius') {

    return new Promise( function(resolve, reject) {
    fetch(url + city + '&APPID=' + apiKey)
    .then(response => response.json())
    .then(data => {
        if (unit === 'celsius') {
            console.log('zizi de meteo');
            console.log(data.main.temp - 273);
            resolve(data.main.temp - 273);
        } else {
            resolve((data.main.temp - 273.15) * (9/5) + 32);
        }
    })
    .catch(error => reject(error))
    });
}

export default getTemp;