var request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        // run the logic and call resolve when happy path or reject with any errors
        const encodedAddress = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBRrp9h2nTcfiVnSTi-ZWj5edSXtB_IwNs`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to contact google servers');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find the address');
            } else if (body.status === 'OK') {
                resolve ({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        })
    })
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});