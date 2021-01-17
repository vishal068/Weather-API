const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app  = express()
const port = process.env.PORT || 3000
//Define paths for Express Config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('',(req,res)=>{
    res.render('index',{
        name:'Vishal agrawal',
        title:'Weather'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Vishal agrawal',
        title:'Help'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'VA'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'The address is mandatory'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error)
        {
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastdata)=>
        {
            if(error)
            {
                return res.send({
                    error:error
                })
            }
            res.send({forecast:forecastdata,location:location,address:req.query.address})
        })
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'The search atribute is requires'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{errorMessage:'Help Article Not found',name:'Vishal Agrawal',title:'Error'})
})
app.get('*',(req,res)=>{
    res.render('404',{errorMessage:'Page not found',name:'Vishal Agrawal',title:'Error'})
})

app.listen(port,()=>{
    console.log('Our app started on port'+port)
})