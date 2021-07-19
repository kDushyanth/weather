import { Typography,LinearProgress, Grid, Box, Paper } from '@material-ui/core';
import {Row,Col,Container, Jumbotron} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Forecast from './components/Forecasts/Forecast';
import Form from './components/Form/Form';
import { FormProvider } from './components/Form/FormContext';
import React,{useEffect, useRef, useState} from 'react';
import Axios from 'axios';
import Loader from './components/Loader';
import Key from './components/KeyVal/Key';
import Value from './components/KeyVal/Value';
import PieChart from './components/Charts/PieChart';
import DailyForecast from './components/Forecasts/DailyForecast';
import {findTime} from './utils/dateUtils'
import {fillDailyF,fillHourlyF,fillOverview} from './utils/fills'
import { bodyContainerStyle, jumbotronStyle,weatherIconStyle } from './styles';
function App() {
  let [globalData,setGlobalData] = useState();
  let [isLoading,setIsLoading] = useState(true);
  const latRef = useRef(51.5085);
  const longRef = useRef(-0.1257);
  
  useEffect(()=>{
    async function util(){
      try{
        let {data}= await Axios.get(`/api/v?lat=${51.085}&long=${-0.1257}`);   
        setGlobalData(data);
        setIsLoading(false);
      }catch(error){
        console.log(error);
      }
    }
    util();
  },[])
  
  const onClickHandler=async(e)=>{
    e.preventDefault();
    
    const lat = latRef.current.value;
    const long = longRef.current.value;
    const IsNumeric = (num) => /^-{0,1}\d*\.{0,1}\d+$/.test(num);
    if(IsNumeric(lat) && IsNumeric(long)){
      setIsLoading(true);
      try{
        let {data} = await Axios.get(`/api/v?lat=${lat}&long=${long}`);
        setGlobalData(data);
        setIsLoading(false);
      }catch(err){
        console.log(err);
      }
    }else{
      alert("lat & long should be numbers")
    }
    
  }
  
  return (
    <>
    <Jumbotron fluid style={jumbotronStyle}>
           <Box ml={3}>
             <Typography variant="h3" color="secondary">Weather Report</Typography>
             <Typography variant="h6" color="secondary">Provides weather report for different locations</Typography>
           </Box>
    </Jumbotron>
    <Container style={bodyContainerStyle}>
      <Box mt={5}>
      {/*form*/}
      <FormProvider value={{latRef,longRef}}>
          <Form onClickHandler = {onClickHandler}/>
      </FormProvider>
      {/*weather*/}
      <Box mt={2}><Typography color="secondary" variant="h5">Weather</Typography></Box>
      <hr/>
      <Container>
                  <Row>
                    <Col>
                      <Paper elevation={5} style={weatherIconStyle}><img src={isLoading? undefined:`https://openweathermap.org/img/wn/${globalData.currentdata.current.weather[0].icon}@2x.png`} alt="weather"/></Paper>
                    </Col>
                    <Col>
                      <Grid container direction="column" alignItems="flex-start" style={{height:'100%'}} justifyContent='center'>
                         <Grid item><Box ><Key>TimeZone</Key>{isLoading? <Loader/>:<Value>{globalData.currentdata.timezone}</Value>}</Box></Grid>
                         <Grid item><Box ><Key>Description</Key>{isLoading? <Loader/>:<Value>{globalData.currentdata.current.weather[0].description}</Value>}</Box></Grid>
                      </Grid>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}><Box ><Key>Date</Key><Value>{(new Date()).toString().substr(0,15)}</Value></Box></Col>
                    <Col xs={6}><Box ><Key>Time</Key><Value>{(new Date()).toString().substr(16,8)}</Value></Box></Col>
                  </Row>
                  <Row>
                      <Col xs={6}><Box ><Key>Temperature</Key>{isLoading? <Loader/> :<Value>{globalData.currentdata.current.temp}<span>{'\u00b0'}C</span></Value>}</Box></Col>
                      <Col xs={6}><Box ><Key>Pressure</Key>{isLoading? <Loader/> :<Value>{globalData.currentdata.current.pressure}hPa</Value>}</Box></Col>
                  </Row>
                  <Row>
                      <Col xs={6}><Box ><Key>Sunrise</Key>{isLoading? <Loader/> :<Value>{findTime(globalData.currentdata.current.sunrise-19800+globalData.currentdata.timezone_offset)}</Value>}</Box></Col>
                      <Col xs={6}><Box ><Key>Sunset</Key>{isLoading? <Loader/> :<Value>{findTime(globalData.currentdata.current.sunset-19800+globalData.currentdata.timezone_offset)}</Value>}</Box></Col>
                  </Row>
                  <Row> 
                    <Col>
                        {!isLoading && <Box maxWidth={200}><PieChart _text={'Humidity'} _labels={['humidity','aridity']} _bg={['deeppink','violet']} data_v = {[globalData.currentdata.current.humidity,100-globalData.currentdata.current.humidity]} ></PieChart></Box>}
                    </Col>
                    <Col>
                        {!isLoading && <Box maxWidth={200}><PieChart _text={'Cloudiness'} _labels={['cloudy','clear']} _bg={['deeppink','violet']} data_v = {[globalData.currentdata.current.clouds,100-globalData.currentdata.current.clouds]} ></PieChart></Box>}
                    </Col>  
                  </Row> 
      </Container> 
      {/*air pollution*/}
      <Box mt={2}><Typography color="secondary" variant="h5">Air Pollution</Typography></Box>
      <hr/>
      <Container>
                  <Row>
                    <Col xs={6}><Key>Air Quality Index</Key>{isLoading? <Loader/> :<Value>{globalData.air_polldata.list[0].main.aqi}</Value>}</Col>
                    <Col xs={4}>
                        <Grid container direction="row" justifyContent="space-between">
                         <Grid item><Typography component="span">good</Typography></Grid>
                         <Grid item><Typography component="span">poor</Typography></Grid>
                        </Grid>
                        <LinearProgress color="secondary" variant="determinate" value={isLoading? 100:globalData.air_polldata.list[0].main.aqi*20}></LinearProgress>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}><Box ><Key>PM<sub>2.5</sub></Key>{isLoading? <Loader/> :<Value>{globalData.air_polldata.list[0].components.pm2_5}&#181;g/m<sup>3</sup></Value>}</Box></Col>
                    <Col xs={6}><Box ><Key>PM<sub>10</sub></Key>{isLoading? <Loader/> :<Value>{globalData.air_polldata.list[0].components.pm10}&#181;g/m<sup>3</sup></Value>}</Box></Col>
                  </Row>
      </Container> 
      <Typography color="secondary" variant="h6">Concentrations:</Typography>
      <Container>
                    <Row>
                      <Col xs={6} lg={4}><Box ><Key>CO</Key>{isLoading? <Loader/> :<Value>{globalData.air_polldata.list[0].components.co}&#181;g/m<sup>3</sup></Value>}</Box></Col>
                      <Col xs={6} lg={4}><Box ><Key>NO</Key>{isLoading? <Loader/> :<Value>{globalData.air_polldata.list[0].components.no}&#181;g/m<sup>3</sup></Value>}</Box></Col>
                      <Col xs={6} lg={4}><Box ><Key>NO<sub>2</sub></Key>{isLoading? <Loader/> :<Value>{globalData.air_polldata.list[0].components.no2}&#181;g/m<sup>3</sup></Value>}</Box></Col>
                      <Col xs={6} lg={4}><Box ><Key>O<sub>3</sub></Key>{isLoading? <Loader/> :<Value>{globalData.air_polldata.list[0].components.o3}&#181;g/m<sup>3</sup></Value>}</Box></Col>
                      <Col xs={6} lg={4}><Box ><Key>SO<sub>2</sub></Key>{isLoading? <Loader/> :<Value>{globalData.air_polldata.list[0].components.so2}&#181;g/m<sup>3</sup></Value>}</Box></Col>
                      <Col xs={6} lg={4}><Box ><Key>NH<sub>3</sub></Key>{isLoading? <Loader/> :<Value>{globalData.air_polldata.list[0].components.nh3}&#181;g/m<sup>3</sup></Value>}</Box></Col>
                    </Row>
      </Container> 
      {/*hourly forecast*/}
      <Box maxWidth={700}><Forecast title="Hourly Forecast"  data = {isLoading? {temp:[],labels:[],humidity:[],wind:[]}:fillHourlyF(globalData.hourlydata)} loading = {isLoading} desc="48 hours"></Forecast></Box>
      {/*daily forecastr*/}
      <Box maxWidth={700}><Forecast title="Daily Forecast"   data = {isLoading? {temp:[],labels:[],humidity:[],wind:[]}:fillDailyF(globalData.dailydata)} loading = {isLoading} desc="7 days"></Forecast></Box>
      {/*overview*/}
      <Typography color="secondary" variant="h5">Overview</Typography>
      <hr></hr>
      {!isLoading && <DailyForecast data = {fillOverview(globalData.dailydata)}/>}
     </Box>
    </Container>
    {/*footer*/}
    <footer style={{flexShrink: 0, textAlign: 'center', backgroundColor: 'black',paddingTop:30,paddingBottom:30,marginTop:40 }}>
        <Typography  color="secondary">Designed by: Dushyanth</Typography>
        <Typography  color="secondary" display="inline">mail: </Typography><Typography href="mailto:kd13@iitbbs.ac.in" component="a">kd13@iitbbs.ac.in</Typography>
    </footer>
    </>
  );
}

export default App;
