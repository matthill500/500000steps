import React, {useState} from 'react';
import {Waypoint} from 'react-waypoint';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Lottie from "lottie-react";
import star from "./lottie/star.json";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      [theme.breakpoints.down("xs")]: {
        maxWidth: 137
      }
    },
    media: {
      height: 140,
      [theme.breakpoints.down("xs")]: {
        height: 40
      }
    },
  }));

const Steps = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    let [renderLottie, setRenderLottie] = useState(false);
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <React.Fragment>
            {props.steps.map((step, i) => 
            <Grid key={i} item style={{marginLeft: matchesXS ? "0px" : "10px", marginBottom: "10px"}}>
                <Card className={classes.root}>
                    <CardMedia>
                    <Waypoint onEnter={()=>setRenderLottie(true)} />
                        { renderLottie && <Lottie animationData={star} autoplay={step.value > 0 ? true : false} loop={false} style={{marginTop:"25px",height:matchesXS ? "80px" : "150px", width: matchesXS ? "145px" : "250px"}} /> }
                    </CardMedia>
                    <CardContent>
                    <Typography variant="body2" style={{color:"black"}}>
                        {step.value < 1 ? <br /> : `${step.value} steps`}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        July {step.dateTime.substr(8,9)}
                        {step.value < 1 && matchesXS ? <br /> : null}
                    </Typography>
                    </CardContent>
                </Card>
            </Grid>
            )}
        </ React.Fragment>
    );
}

export default Steps;