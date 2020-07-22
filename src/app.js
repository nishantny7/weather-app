const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define path for express config
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nishant Yadav",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Nishant Yadav",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "This is the help page.",
    name: "Nishant Yadav",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecast_data) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          forecast: forecast_data,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "404",
    name: "Nishant Yadav",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    title: "404",
    name: "Nishant Yadav",
    message: "My 404 page",
  });
});
app.listen(3000, () => {
  console.log("Server is up and running at port 3000.");
});