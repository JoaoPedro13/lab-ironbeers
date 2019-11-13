const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res, next) => {
  res.render("index");
});
app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(punkApiBeers => {
      res.render("beers", { bottles: punkApiBeers });
    })
    .catch(error => {
      console.log(error);
    });
});
app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      const beer = beers[0];
      res.render("random-beers", beer);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/beers/:id", (req, res, next) => {
  punkAPI
    .getBeers(req.params.id)
    .then(punkApiBeers => {
      const beer = punkApiBeers[0];
      res.render("random-beers", beer);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000);
