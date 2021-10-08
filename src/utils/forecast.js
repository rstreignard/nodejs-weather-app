
const request = require('request')

const wsAccessToken = '0c1dc87d0e219a5f3d451279a161b735'

const forecast = (lat, lng, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=' + wsAccessToken + '&query=' + lat + ',' + lng

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect')
        } else if(body.error !== undefined) {
            callback(body.error.info)
        } else {
            

            callback(undefined, {
                temperature: body.current.temperature,
                feels_like: body.current.feelslike,
                weather_description: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast