const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b46bb7801b3c6a12b161be25a2fded56&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geolocation services!");
    } else if (body.error) {
      callback("No results matched for given query.");
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees but it feels like " +
          body.current.feelslike +
          " degrees."
      );
    }
  });
};

module.exports = forecast;
