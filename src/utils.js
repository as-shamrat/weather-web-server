const request = require("request");
const WEATHER_KEY = "b8013819820d1f60a25b49388bfb5df0";
const GEO_API = "664493c90a884999895305hjc6ccc35";
const WEATHER_URL = "http://api.weatherstack.com/current";
function geoCode(address, callback) {
  request(
    {
      url: `https://geocode.maps.co/search?q=${address}&api_key=${GEO_API}`,
      json: true,
    },
    (error, response, body) => {
      if (error) callback(error, undefined);
      else if (body.length === 0)
        callback("Invalid locations to fetch.", undefined);
      // console.log(body);
      else {
        const { lat, lon } = body[0];
        callback(undefined, { lat, lon });
      }
    }
  );
}

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

function forecast(center, callback) {
  const { lat, lon } = center;

  request(
    {
      url: `${WEATHER_URL}?access_key=${WEATHER_KEY}&query=${lat},${lon}`,
      json: true,
    },
    (error, response, body) => {
      if (error) {
        callback(error);
      } else if (response.body?.error) callback(response.body.error.info);
      else {
        // callback(undefined, request.body.current);
        // callback(undefined, { ...body.current, ...body.location });
        callback(undefined, body);
      }
    }
  );
}
// forecast({ lat: -75.7088, lon: 44.1545 }, (error, data) => {

function printForecast(data) {
  const {
    name,
    country,
    precip,
    temperature,
    feelslike,
    weather_descriptions: weather,
  } = data;
  console.log(
    `The weather seems ${
      weather[0]
    } in ${name}, ${country}.It is currently ${temperature} degrees out.It feels like ${feelslike} degrees out.It has ${
      precip * 100
    }% chance to rain. `
  );
  //   console.log(data);
}
module.exports = { geoCode, forecast, printForecast };
