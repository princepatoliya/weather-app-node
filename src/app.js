const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geodata");
const forecast = require("./utils/forecast");

const app = express();
// define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");
const partialsPath = path.join(__dirname, "../templates/partials");

const port = process.env.port || 3000;

// Setup handlebars engine app views and location
app.set("view engine", "hbs"); // register template engine
app.set("views", viewsPath); // specify the views directory
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Prince Patoliya",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        contact: "Contact: 9776557758",
        name: "Prince Patoliya",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 - Page Not Found",
        errorMessage: "Help artical not found!!!",
        name: "Prince Patoliya",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        username: "Mr. Weather",
        name: "Prince Patoliya",
        age: 21,
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must provide an address",
        });
    }
    // console.log(address);

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error: error });

        // if( !(latitude && longitude && location) ) return res.send({'error' : 'Invalid address'})

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: "Not able to find weather data :(",
                });
            }

            if (forecastData) {
                return res.send({
                    temp_info: `In ${location}, Current temperature is ${forecastData.temp_info.temp}, But it's feels like ${forecastData.temp_info.feels_like}`,
                });
            }
        });
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 - Page Not Found",
        errorMessage: "Nothing here !",
        name: "Prince Patoliya",
    });
});

app.listen(port, () => {
    console.log("Server is up on port 3000");
});
