const request = require('request');

var geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBRrp9h2nTcfiVnSTi-ZWj5edSXtB_IwNs`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to contact google servers');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find the address');
        } else if (body.status === 'OK') {
            callback (undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    })
};

module.exports.geocodeAddress = geocodeAddress;