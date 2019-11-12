const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'f1c2359583253af4b56ab54379447b58';

function getTemp(city, unit = 'celsius') {

    return new Promise( function(resolve, reject) {
    fetch(url + city + '&APPID=' + apiKey)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.cod == 404)
            reject(new Error('Invalid city name'));
        if (unit === 'celsius') {
            console.log('zizi de meteo');
            resolve(data.main.temp - 273);
        } else {
            resolve((data.main.temp - 273.15) * (9/5) + 32);
        }
    })
    .catch(error => reject(error))
    });
}

export default getTemp;