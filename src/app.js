const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geoCode, forecast } = require("./utils");
const app = express();
console.log(__dirname);
console.log(path.join(__dirname, "../public/index.html"));
// Define path for express config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index.hbs", { title: "Weather App", name: "Andrew Mead" });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "about",
    description: "It is a weather app created for mass people.",
  });
});

app.get("/help", (req, res) => {
  res.render("help.hbs", {
    title: "message",
    message: "This is help page for debugging.",
  });
});
/*
app.get("/weather", (req, res) => {
  res.send({
    temperature: 24,
    location: "chittagong",
  });
});
*/

/*
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  console.log(req.query);
  res.send({ products: [] });
});

*/

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address must be provided" });
  }
  console.log(req.query.address);
  geoCode(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error: error.message });
    }
    console.log(response);
    forecast(response, (error2, response2) => {
      if (error) {
        return res.send({ error: error2.message });
      }
      console.log(response2);
      res.send(response2);
    });
  });
});

app.get("/help/*", (req, res) => {
  //   res.send("Help article not found");
  res.render("404.hbs", {
    title: "404",
    message: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  //   res.send("<h1>No page to render</h1>");
  res.render("404.hbs", {
    title: "404",
    message: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
