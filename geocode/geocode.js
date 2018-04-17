const request = require('request');

var geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBRrp9h2nTcfiVnSTi-ZWj5edSXtB_IwNs`,
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log('Unable to contact google servers');
            callback({});
        } else if (body.status === 'ZERO_RESULTS') {
            console.log('Unable to find the address')
            callback({});
        } else if (body.status === 'OK') {
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`);

            callback ( {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    })
};

module.exports = {
    geocodeAddress
};