const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)   gives the absolute path

const app=express()  

//define paths for express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewPath= path.join(__dirname, '../templates/views')
//partials path
const partialsPath= path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
//handlebars are used to serve dynamic content. like if we want to have the same page template for all our files
app.set('view engine','hbs')      //set key value pairs. key is the setting and set a value for that setting

//setup static directory to serve
app.use(express.static(publicDirectoryPath))    //static takes the path to file we want to serve

//since we are serving a static page above on the root url, the below code is not going to execute
// app.get('', (req, res) => {           // takes 2 params. first is the url to visit. 2nd a function that fires when someones visits that url
//     res.send('<h1> Home page</h1> <p>This is a new paragraph</p>')                      // allows us to send something back to the requester
// }) 

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Pranab Pradhan'
    })     //using render goes to the views folder and convert index file to html

})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Pranab Pradhan'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        name: 'Pranab Pradhan',
        title: 'Help'
    })
})

// app.get('/help', (req, res)=>{
//     res.send('help')
// })

// app.get('/about', (req,res)=>{
//     res.send('<h2>This is the about page</h2>')
// })

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Provide an address'
        })
    }

    // use default values for the object as empty object to avoid errors
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{     
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search item'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//if inside the help page the user goes to another page that doesnt exist
app.get('/help/*', (req, res)=>{
    res.render('errorPage',{
        error: 'The help page does not exist',
        title: '404',
        name: 'Pranab Pradhan'
    })
})

//if the entered url is anything other than the ones specified above, use '*' in the url. this has to be at last so that express knows what to match
app.get('*',(req, res)=>{
    res.render('errorPage',{
        error:'The Page does not exist. Check URL again',
        title: '404',
        name: 'Pranab Pradhan'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})            //starts the server on port 3000, 2nd argument is optional function that runs when the server starts
//server stays up and running until we shut it

