const path = require('path')

// nodemon src/app.js -e js,hbs

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const log = console.log

// Init Express
const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Homepage'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Address is required'
        })
    }

    geocode(address, (error, { lat, lng, location } = {}) => {

        if (error) return res.send({ error })
        
        forecast(lat, lng, (error, forecastData) => {
    
            if (error) return res.send({ error })

            res.send({
                forecast: forecastData,
                location,
                address
            })
        }) 
    }) 
})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'General 404'
    })
})

app.listen(3000, () => {
    log('Server is up and running')
})