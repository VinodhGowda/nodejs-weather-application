const express = require('express')
const path = require('path')
const hbs = require('hbs')
const utils = require('../src/utils/utils')

const app = express()

const port = process.env.PORT || 3000

const publicFolderPath = path.join(__dirname, "../public")
const hbsViewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicFolderPath))

app.set("view engine", "hbs")
app.set("views", hbsViewsPath)
hbs.registerPartials(partialsPath)

app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Vinodh'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    utils.geocode(req.query.address, (error, location = {}) => {
        if (error) {
            return res.send({ error });
        }
        utils.forecast(req.query.unit, location, (error, foreCastData) => {
            console.log(req.query.unit)
            if (error) {
                return res.send({ error });
            }

            return res.send({
                location,
                forecast: foreCastData,
                address: req.query.address
            })
        })
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vinodh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Vinodh'
    })
})

app.get('/help/*', (req, res) => {
    // res.send("Help article not found");
    res.render('404', {
        title: '404 Error HELP',
        errorMessage: '404 ERROR page for help article.',
        name: 'Vinodh'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page: Generic',
        errorMessage: '404 ERROR page: Page not found!',
        name: 'Vinodh'
    })
})

app.listen(port, () => {
    console.log("Express JS server started")
})