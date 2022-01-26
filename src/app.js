const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//Define paths for express config
const publicDirPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Harsh Yellare'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Harsh Yellare'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Harsh Yellare',
        message: 'Hey this is help!'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error:"You must provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error)
        {
            return res.send({
                error,
            });
        }    
        forecast(latitude,longitude,(error,forecastData)=> {
            if(error)
            {
                return res.send({ error });
            } 
            return res.send({
                location,
                forecast: forecastData,
                address: req.query.address,
            })
        })    
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products:[],
    })
})

app.get('/help/*',(req,res) => {
    res.render('pagenotfound',{
        title: '404',
        name: 'Harsh Yellare',
        message: 'Help article not found!'
    })
})

app.get('*',(req,res) => {
    res.render('pagenotfound',{
        title: '404',
        name: 'Harsh Yellare',
        message: 'Page not found!'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port: ' + port)
})