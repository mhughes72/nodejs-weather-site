
const request = require('request')
const geocode = (address, callback) => {

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWh1Z2hlczcyIiwiYSI6ImNrN25seWh1aDBkM3gzbnQzbGptOGNzeDUifQ.ZWDzyL6t0aWGQ8s_MLEUEA'
    request({url, json:true}, (error, { body }) => {
        const geoData=''
        if (error) {
            callback('Unable to connect', undefined)
        } else {
        
            callback(undefined, {

                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                
            })
        }

    })
}

module.exports = geocode
