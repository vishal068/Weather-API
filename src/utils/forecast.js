const request = require('postman-request')
const forecast = (longitude,latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=f6cf57657e2e406621629cd23bdb0fb9&query='+latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            callback('There is a connectivity issue',undefined)
        }
        else if(body.error)
        {
            callback('The loaction is invalid',undefined)
        }
        else
        {
            callback(undefined,'The weather is '+body.current.weather_descriptions[0]+' The temperature is '+body.current.temperature)
        }
    })
}

module.exports = forecast