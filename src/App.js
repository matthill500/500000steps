
import React, {useEffect, useState} from 'react';

import background from './assets/background.png';
import Logo from './assets/logo.png';

import theme1 from './themes/theme';

import Lottie from "lottie-react";
import groovyWalkAnimation from "./lottie/49011-walking.json";
import date from "./lottie/date.json";

import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/button';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider} from '@material-ui/core';

import ProgressBar from './ProgressBar';
import Steps from './Steps';
import Loading from './Loading';

// get total steps 20000
// times by 0.002
// = 40
//goal is 1000
//40 / 1000 x 100 === 4


function App() {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(null);

  let totalSteps = 0;
  if(!loading){
    const values = steps.map(step => parseInt(step.value));
    totalSteps = values.reduce(function(total,num){
      return total+num;
    })
  }

  useEffect(() => {
    init()
   }, [])

   const init = () => {
    setLoading(true)
    //import api_key from env
      axios.get('https://api.fitbit.com/1/user/-/activities/steps/date/2021-06-01/2021-06-30.json', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM0IyQjIiLCJzdWIiOiI2S1pNQzUiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNjIzNjA3NDkzLCJpYXQiOjE2MjMwMDI2OTN9.0OKGlrESHV_pCk2XN4ZVXtUvBMVhe-y0nAYXgbfHgXo',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function(response){
        setSteps(response.data['activities-steps']);
        setLoading(false);
      });  
    }
  

  if(loading) return <Loading />;
 

  return (
    <ThemeProvider theme={theme1}>
      <Grid style={{
      backgroundImage: `url(${background})`, 
      height:"1200vh",  
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "absolute",
      backgroundRepeat: "no-repeat",
      textAlign:"center",
      }}>

        <AppBar position="static">
          <Toolbar>
            <Grid item container justify="flex-end">
            <a href="https://ie.gofundme.com/f/500000-steps-for-irish-cancer-society" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none"}}><Button variant="contained">Donate</Button></a>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid container direction="column" style={{height: matchesXS ? "85vh" : "100vh"}} alignItems="center" justify="center">
            <img src={Logo} alt="irish cancer society logo" height="200" width="200" style={{marginTop:"3.33em"}}/>
            <Typography variant="h5">Irish Cancer Society</Typography>
        </Grid>
      
        <Grid item container justify="center" style={{padding: matchesXS ? "40px" : "140px"}}>
          <Grid item container justify="center" alignItems="center" sm={5}>
            <Typography variant="body1"><b>The Goal</b> <br /><br />
            <Grid item align="left">
            To fundraise for Irish Cancer Society I have set myself a challenge to achieve 500,000 steps in July. Everyone in some shape or form has been affected by Cancer and
            this is why I have chosen Irish Cancer Society.<br />
            In conjuction with Fitbit I have setup this website to track my progress over the month. If you are feeling
            charitable and want to support my fundraiser any donation would be greatly appreciated, you can donate
            through my <a href="https://ie.gofundme.com/f/500000-steps-for-irish-cancer-society" target="_blank" rel="noopener noreferrer" style={{ color:"white"}}>GoFundMe page.</a>
            </Grid>
           </Typography>
          </Grid>
          <Grid item container sm={7} justify="center">
          <Lottie animationData={groovyWalkAnimation} style={{height:"400px", width:"400px", marginTop: matchesXS ? "-3em" : "2em"}} />
          </Grid>
        </Grid>

        <Grid item container justify="center" style={{padding: matchesXS ? "0px" : "140px", height: matchesXS ? "70vh" : undefined}}>
          <Grid item container justify="center" alignItems="center" >
            <Typography variant="body1"><b>Personal Donation Progress Bar</b> <br /><br /></Typography>
          </Grid>
          <Grid item container justify="center" alignItems="center" >
            <ProgressBar bgcolor={"#ef6c00"} steps={steps} />
          </Grid>
          <Grid item container justify="center" alignItems="center" >
            <Typography variant="body1"><b>Total Steps: {totalSteps}</b></Typography>
          </Grid>
        </Grid>

        <Grid item container justify="center" style={{padding: matchesSM ? "40px" : "140px"}}>
          <Grid item container sm={6} justify={matchesXS ? "center" : undefined}>
          <Lottie animationData={date} style={{height:"300px", width:"300px", marginTop:"2em"}} />
          </Grid>
          <Grid item container sm={6} justify="center" alignItems="center">
          <Typography variant="body1"><b>July</b> <br /><br />
            For each step I make in July I will personally be donating to Irish Cancer Society with a goal 
            of €1000, you can track my donation progress through the progress bar above. You can also view contributions
            by supporters on my <a href="https://ie.gofundme.com/f/500000-steps-for-irish-cancer-society" target="_blank" rel="noopener noreferrer" style={{ color:"white"}}>GoFundMe page.</a></Typography>
          </Grid>
        </Grid>

        <Grid item container justify={matchesMD ? "space-between" : "center"} style={{padding: matchesXS ? "20px" : matchesMD ? "80px" : "140px", marginTop: matchesXS ? "10em" : undefined}}>
          {/* Steps */}
          <Steps steps={steps} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
