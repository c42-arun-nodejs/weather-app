const yargs = require('yargs');
const axios = require('axios');
// const geocode = require('./geocode/geocode')
// const weather = require('./weather/weather')

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//console.log(argv.address);

// geocode.geocodeAddress(argv.address, (error, addressResult) => {
//     if (error) {
//         console.log(`Error occured: ${error}`);
//     } else {
//         weather.getWeather(addressResult.latitude, addressResult.longitude, (error, weatherResults) => {
//             if (error) {
//                 console.log(`Error occured: ${error}`);
//             } else {
//                 console.log(`Weather for ${addressResult.address}`)
//                 console.log(JSON.stringify(weatherResults, undefined, 2));
//             }
//         });
//     }
// });

const encodedAddress = encodeURIComponent(argv.address);
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBRrp9h2nTcfiVnSTi-ZWj5edSXtB_IwNs`;
console.log(url);

axios.get(url)
    .then(addressResult => {
        if (addressResult.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find the address');
        }

        var results =  {
            address: addressResult.data.results[0].formatted_address,
            latitude: addressResult.data.results[0].geometry.location.lat,
            longitude: addressResult.data.results[0].geometry.location.lng
        }

        console.log(results);

        const weatherUrl = `https://api.darksky.net/forecast/a4432e9c79f94a1f101b28c6cfdaaf48/${results.latitude},${results.longitude}`
        return axios.get(weatherUrl);
    })
    .then(weatherResult => {
        console.log(`The temperature now is ${weatherResult.data.currently.temperature} 
            and feels like ${weatherResult.data.currently.apparentTemperature}`);
    })
    .catch(err => {
        console.log(err.message);
    });