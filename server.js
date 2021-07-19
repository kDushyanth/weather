const path = require('path');
const express = require('express');
const app = express();
const axios = require('axios');

require('dotenv').config({path:__dirname+'/config/.env'});
app.use(express.static(path.resolve(__dirname,'./client/build')));


const PORT = process.env.PORT || 3000;

app.get('/api/v',async(request,response)=>{
    console.log(request.query);
    let lat = request.query.lat;let resp;
    let long = request.query.long;
    currenturl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=hourly,daily,minutely,alerts&appid=${process.env.API_KEY}`;
    dailyurl= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=current,hourly,minutely,alerts&appid=${process.env.API_KEY}`;
    hourlyurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=current,daily,minutely,alerts&appid=${process.env.API_KEY}`;
    air_pollurl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${process.env.API_KEY}`;

    let data = {
        currentdata:"",
        dailydata:"",
        hourlydata:"",
        air_polldata:""
    }

    try {

        resp = await axios.get(currenturl);
        data.currentdata = resp.data;
        resp = await axios({
            method:'GET',
            url:dailyurl
        });
        data.dailydata = resp.data;
        resp = await axios.get(air_pollurl);
        data.air_polldata = resp.data;
        resp = await axios({
            method:'GET',
            url:hourlyurl
        });
        data.hourlydata = resp.data;
        response.json(data).status(200);
    } catch (error) {
        console.log(error);
    }
})
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
app.listen(PORT,()=>{console.log('listening on port:',PORT)});