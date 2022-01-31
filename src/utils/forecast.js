const request = require('request');

const forecastData = (lat, lon, callback) =>{
    
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=7ee94466fd174b803df5de26ec53a1a2&units=matric`;

    request({url: weatherApi, json: true}, (error, { body }) => {
        if(error){
            callback("unable to connect with network", undefined)
        }
        else if (body.message){
            callback(body.message, undefined);
        }
        else{
            callback(undefined, {
                "location": body.name,
                "temp_info": body.main,
            })
        }
    })

}


module.exports = forecastData;