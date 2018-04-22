const yargs = require('yargs');
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

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

geocode.geocodeAddress(argv.address, (error, addressResult) => {
    if (error) {
        console.log(`Error occured: ${error}`);
    } else {
        weather.getWeather(addressResult.latitude, addressResult.longitude, (error, weatherResults) => {
            if (error) {
                console.log(`Error occured: ${error}`);
            } else {
                console.log(`Weather for ${addressResult.address}`)
                console.log(JSON.stringify(weatherResults, undefined, 2));
            }
        });
    }
});