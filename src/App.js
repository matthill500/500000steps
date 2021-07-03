
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
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import ProgressBar from './ProgressBar';
import Steps from './Steps';
import Loading from './Loading';

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
      axios.get('https://api.fitbit.com/1/user/-/activities/steps/date/2021-07-01/2021-07-31.json', {
        headers: {
          'Authorization': 'Bearer ' + process.env.REACT_APP_API_KEY,
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
      height: "100%",  
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
      
        <Grid item container justify="center" style={{padding: matchesXS ? "40px" : "100px", paddingBottom:"-40px"}}>
          <Grid item container justify="center" alignItems="center" sm={matchesMD ? 12 : matchesSM ? 5 : 5}>
            <Typography variant="body1" align="left"><b>My Goal</b> <br /><br />
            To fundraise for Irish Cancer Society I have set myself a challenge to achieve half a million steps in July. Everyone in some shape or form has been affected by Cancer and
            this is why I have chosen Irish Cancer Society.<br />
            In conjuction with Fitbit I have setup this website to track my progress over the month. If you are feeling
            charitable and want to support my fundraiser any donation would be greatly appreciated, you can donate
            through my <a href="https://ie.gofundme.com/f/500000-steps-for-irish-cancer-society" target="_blank" rel="noopener noreferrer" style={{ color:"white"}}>GoFundMe page.</a>
           </Typography>
     
          </Grid>
          <Grid item container sm={matchesMD ? 12 : matchesSM ? 7 : 7 } justify="center">
          <Lottie animationData={groovyWalkAnimation} style={{height:"400px", width:"400px", marginTop: matchesXS ? "-3em" : "2em"}} />
          </Grid>
          <Grid item container direction="column" justify="center">
            <Grid item>
            <Typography variant="body2" style={{fontSize:"0.75rem"}}>keep scrolling for more info</Typography>
            </Grid>
            <Grid item>
            <ArrowDownwardIcon style={{fill: "white"}} fontSize="small" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="column" style={{height: matchesMD ? "120vh" : matchesXS ? "30vh" : "100vh"}} alignItems="center" justify="center">
            <img src={Logo} alt="irish cancer society logo" height="200" width="200" style={{marginTop:"3.33em"}}/>
            <Typography variant="h5">Steps for Irish Cancer Society</Typography>
            <a href="https://ie.gofundme.com/f/500000-steps-for-irish-cancer-society" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", padding:"25px"}}><Button variant="contained">Donate</Button></a>
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
            For each step I make in July I will personally be donating to Irish Cancer Society, 
            you can track my donation progress through the progress bar above. You can also view contributions
            by supporters on my <a href="https://ie.gofundme.com/f/500000-steps-for-irish-cancer-society" target="_blank" rel="noopener noreferrer" style={{ color:"white"}}>GoFundMe page.</a></Typography>
          </Grid>
        </Grid>

        <Grid item container justify={matchesMD ? "space-around" : "center"} style={{padding: matchesXS ? "20px" : matchesMD ? "80px" : "140px", marginTop: matchesXS ? "10em" : undefined}}>
          <Grid item container sm={12} justify="center" style={{padding:"20px", textAlign:"center"}}>
            <Typography variant="body1"><b>Daily Step Progress</b></Typography>
          </Grid>
          {/* Steps */}
          <Steps steps={steps} />
        </Grid>
        <Grid item container justify="center" direction="column" style={{paddingTop: "120px"}}>
          <Grid item>
        <Typography variant="body1"><b>© Matt Hill</b></Typography>
        </Grid>
        <Grid item style={{padding:"15px"}}>
          <a href="https://www.facebook.com/matty.hill.500" rel="noreferrer" target="_blank"><FacebookIcon style={{fill: "white"}} fontSize="large" /></a>
          <a href="https://www.linkedin.com/in/matthew-hill-28b823132/" rel="noreferrer" target="_blank"><LinkedInIcon style={{fill: "white"}} fontSize="large"  /></a>
          <a href="https://www.instagram.com/mattyhill500/" rel="noreferrer" target="_blank"><InstagramIcon style={{fill: "white"}} fontSize="large" /></a>
        </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
