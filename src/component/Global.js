import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

//table
import Paper from "@material-ui/core/Paper";
import { red, green} from "@material-ui/core/colors";
import {Container} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import Image from '../img/white_global_bg.jpg'

const useStyles = makeStyles((theme) => ({


root1: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(20),
      height: theme.spacing(16),
      padding: theme.spacing(5),
      marginRight:'50px',     
      borderRadius:'9em', 
    //   textAlign: 'center',
    }
  },

  globaltypo: {
    fontWeight: 500,
    fontSize: 20,
    alignContent:'center',
  }

}));

//background color
const styles = {
    bgtable: {
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    }
 };


function Global({total}) {

    const classes = useStyles();
    console.log(total)
    return (
        <div>
   
                  <Container className={classes.root1} >       
                      <Paper elevation={24} style={styles.bgtable}>
                          <Typography variant="h5" >CONFORM</Typography>
                          <Typography className={classes.globaltypo} style={{marginTop:12}}>{total.TotalConfirmed - total.NewConfirmed}</Typography>                  
                          <Typography className={classes.globaltypo}>{` + ${total.NewConfirmed}`}
                          <ArrowUpwardIcon style={{color:red.A700, fontSize: '30px'}}/>
                          </Typography>          
                      </Paper>

                      <Paper elevation={24} style={styles.bgtable}>
                          <Typography variant="h5" style={{color:red[900]}}>DEATH</Typography>
                          <Typography className={classes.globaltypo} style={{marginTop:12}}>{total.TotalDeaths-total.NewDeaths} </Typography>
                          <Typography className={classes.globaltypo}>{`+ ${total.NewDeaths}`}
                          <ArrowUpwardIcon style={{color:red.A700, fontSize: '30px'}}/>
                          </Typography>
                      </Paper>

                      <Paper elevation={24} style={styles.bgtable}>
                          <Typography variant="h5" style={{color:green[900]}}>RECOVER</Typography>
                          <Typography className={classes.globaltypo} style={{marginTop:12}}>{total.TotalRecovered- total.NewRecovered}</Typography>
                          <Typography className={classes.globaltypo}>{`+ ${total.NewRecovered}`}
                          <ArrowUpwardIcon style={{color:green[900], fontSize: '30px'}}/>
                          </Typography>
                      </Paper>                 
                  </Container>
                
                
        </div>
    )
}

export default Global 