
const request = require('request')

const mapboxAccessToken = 'pk.eyJ1IjoicnN0cmVpZ25hcmQiLCJhIjoiY2t0dWt4cWZyMGJqdDMybW12eXhsNHdqcSJ9.Qohxuvlb1MTxStpjDgLkFw'

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + mapboxAccessToken 

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect')
        } else if(body.features.length === 0) {
            callback('Unable to find location')
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lng: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode