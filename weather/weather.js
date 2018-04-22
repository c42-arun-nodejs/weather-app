const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/a4432e9c79f94a1f101b28c6cfdaaf48/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback(`Unable to reach DarkSky servers: ${error}`);
        } else if (body.code) {
            callback(`Invalid request: Error code '${body.code}', message '${body.error}'`);
        } else if (response.statusCode != 200 ) {
            callback(`Invalid request (server error): Status code ${response.statusCode}`);
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                feelsLike: body.currently.apparentTemperature
            });
        }
    });    
}

module.exports.getWeather = getWeather;
