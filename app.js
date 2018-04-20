const yargs = require('yargs');
const geocode = require('./geocode/geocode')

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

console.log(argv.address);

geocode.geocodeAddress(argv.address, (error, result) => {
    if (error)
    {
        console.log(`Error occured: ${error}`);
    } else {
        console.log(JSON.stringify(result));
    }
});
