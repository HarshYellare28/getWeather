const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d5bbae2a0fdf5c8221d7f58c48392b10&query=' + latitude + ',' + longitude

    request({ url, json:true },(error, {body}) => {
    if(error)
    {
        callback('Unable to connect to weather service! Please check your internet connection.',undefined);
    }
    else if(body.error)
    {
        callback('Unable to find location. Please make sure you enter a correct location.',undefined);
    }
    else
    {
        callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. And, it feels like " + body.current.feelslike + " degrees. The humidity level is " + body.current.humidity + ".");
    }    
})
}


module.exports = forecast;