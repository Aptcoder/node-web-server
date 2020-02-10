const express = require('express')
const hbs = require('hbs');
const fs = require('fs')


var app = express()
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
})
app.set('view engine' , 'hbs')

app.use((req,res,next) => {
    var date = new Date().toString();
    var log = `${date} : ${req.method} ${req.url}`
    fs.appendFile('server.log',log,(err) => {
        if(err){
            console.log("can not append to file")
        }
    })
    next();
})

app.use((req,res,next) => {
    res.render('maintenance.hbs')
})

//home page route
app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle : "Home Page",
        welcomeMessage : "welcome to my first render" ,
    })
})



app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle : "About Page",
    })
})



app.get('/back',(req,res) => {
    res.send({
        errorMessage : "can not handle request"
    })
})


//set up server here
app.listen(3000,() => {
    console.log('listening in port 3000')
})