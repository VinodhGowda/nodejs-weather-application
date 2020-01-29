const request = require("request")

const geocode = (address, callback) => {
    const mapURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoidmlub2RoZ293ZGEiLCJhIjoiY2sweGdwdHo0MDI1MzNkbjdxeGR1aDFnNSJ9.zR2gRwCXmN8ro-xrOVMjnw"

    request({ url: mapURL, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to location service", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to resolve the location provided.", undefined)
        }
        else {
            const featureData = body.features[0]
            const geometryData = featureData.geometry
            const longitude = geometryData.coordinates[0]
            const latitude = geometryData.coordinates[1]
            const fullName = featureData.place_name
            callback(undefined, {
                location: fullName,
                longitude,
                latitude
            })
        }
    })
}

const forecast = (unit , { latitude:lat, longitude:long }, callback) => {
    const weatherUrl = "https://api.darksky.net/forecast/edfe7831ab95861c69a49ec897c5dca0/" + lat + "," + long + "?units=" + unit

    console.log(weatherUrl)

    console.log(lat)
    console.log(long)

    request({ url: weatherUrl, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Wrong co-ordinates provided, unable to resolve location", undefined)
        } else {
            const dailyData = body.daily
            const weatherSummary = dailyData.data[0].summary
            const maxTemp = dailyData.data[0].temperatureHigh
            const minTemp = dailyData.data[0].temperatureLow
            callback(undefined, {
                summary: weatherSummary,
                maxTemp: maxTemp,
                minTemp: minTemp
            })
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast: forecast
}