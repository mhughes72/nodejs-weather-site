const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weathercode = require('./utils/weathercode')

// Heroku port definition
const port = process.env.PORT || 3000

// Define paths for Expres config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'The greatest war ever',
        name: 'Matt Hughes'

    })

})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'This is the about page',
        name: 'Michelle Hanson'

    })

})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'HELP ME!',
        message: 'This is the help page',
        image: 'img/ww1-2.jpg'
    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide terms'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'there is an error'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        weathercode(longitude, latitude, (error, { summary, temperature, icon } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            } else {
                res.send({
                    forcast: summary,
                    location: location,
                })
                
            }

        })
    })
})

//     if (!req.query.address) {
//         return res.send({
//             error: 'You must provide an address'
//         })
//     }
//     console.log(req.query.address)
//     res.send({
//         forcast: 'Sunny',
//         location: 'Boston',
//         address: req.query.address
//     })

// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        pageType: 'Help',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        pageType: 'Generic',
    })
})

app.listen(port, () => {
    console.log('Server Up')
})