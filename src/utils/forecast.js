const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e4e4f776205c75d0c2ce371c0e5cd788/' + latitude + ',' + longitude+'?units=si'
    request({ url: url, json: true }, (error, response) => {
        if (error)
            callback('Unable to connect to weather services', undefined)
        else if (response.body.error)
            callback('Unable to find location', undefined)
        else {
            callback(undefined, response.body.daily.data[0].summary + 'it is currently ' + response.body.currently.apparentTemperature + ' degrees out there. There is ' + response.body.currently.precipProbability +'% chance of rain. Todays high is '+ response.body.daily.data[0].temperatureHigh+' and todays low is '+ response.body.daily.data[0].temperatureLow +'.' )
        }

    })
}

module.exports=forecast
