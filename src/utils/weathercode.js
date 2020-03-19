const request = require('request')

const weathercode = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bfd32979b3f9a53c5eb5b4066a6ed977/'+latitude+','+longitude+'?lang=en&units=si'

    request({url, json:true}, (error, { body }) => {
        
        if (error) {
            callback('Unable to connect', undefined)
        } else {
            const weather=body.currently
            callback(undefined, {
                
                summary: weather.summary,
                temperature: weather.temperature,
                percipitation: weather.precipProbability,
                timezone: body.timezone
                
            })
        }

    })
}


module.exports = weathercode

