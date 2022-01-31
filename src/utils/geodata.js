const request = require('request');

const getGeoData = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoibm9tYWQtMTE3IiwiYSI6ImNrNnl6ODZ2ejA2dmozbHVmeDMxOTU2d3oifQ.a6RMEPppL6wVeIDZC33dYw&limit=1`;

    // console.log("GeoUrl: ", url);

    request({ url, json: true}, (error, { body })=>{
        // console.log("Error and body: ", error, body);
        if(error){
            callback("unable to connect with network", undefined);
        }
        else if(body.message){
            callback(body.message, undefined);
        }
        else{
            if(body.features.length === 0) return callback("Not able to find weather data", undefined);
            callback(undefined, {
                "longitude": body.features[0].center[0],
                "latitude" : body.features[0].center[1],
                "location" : body.features[0].place_name
            });
        }
    })
}

module.exports = getGeoData