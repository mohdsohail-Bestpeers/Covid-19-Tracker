import React, {useState, useEffect} from 'react'
import {fetchSummary, searchfilter} from "../actions/ActionApi"
import {connect} from "react-redux"
import './MyComponent.css'
import moment from 'moment'
import Global from './Global'
//Navbar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
//Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//Router
import {Link} from "react-router-dom";

import Image from '../img/table_bg.jpg'


const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

  table: {
    minWidth: 650
  },
}));

//backgroud color
const styles = {
  bgtable: {
      backgroundImage: `url(${Image})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
  }
};



function MyComponent({summaryData, fetchSummary, searchfilter}) {
   const [search, setSearch] = useState("")
    useEffect( () => {  
        fetchSummary()
      }, []) 

   const handleClick = () => {
       console.log("btn clicked")
       searchfilter(search)        
   }
  
   const handleKeypress = e => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

    //it triggers by pressing the enter key
  // if (e.charCode === 13) {      //you can also use this code
  //   handleClick();
  // }

  const classes = useStyles();

 
  return (
    summaryData.loading ? (
        <h2>Loading</h2>
        ) : summaryData.error ? (
        <h2>{summaryData.error}</h2>
        ) : (
              <div className={classes.root}>
                  <AppBar position="static" style={{backgroundColor:"#b71c1c"}}>
                      <Toolbar>
                          <IconButton edge="start" className={classes.menuButton} color="inherit"
                              aria-label="open drawer">
                              <MenuIcon />
                          </IconButton>
                          <Typography className={classes.title} variant="h6" noWrap>
                              COVID-19 TRACKER
                          </Typography>
                          <Typography style={{marginRight:'280px', fontSize: 27 }}>DASHBOARD</Typography>
                            <div className={classes.search}>
                              <div className={classes.searchIcon}>
                                <SearchIcon />
                              </div>
                              <InputBase 
                                placeholder="Search Country"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                value = {search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyPress={handleKeypress}/>
                              <Button  variant="contained" onClick={handleClick}>
                                  Search
                              </Button>
                            </div>
                      </Toolbar>
                  </AppBar>
        
                    
                  <h2 className="countrydata">Global Data</h2>

                  {summaryData.summary.Global && (
                  <Global total={summaryData.summary.Global}/>
                  )}

            
                <h2 className="countrydata">Country Data</h2>
              
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead >
                                <TableRow style={{ backgroundColor: "#d32f2f" }} >
                                    <TableCell>Country</TableCell>
                                    <TableCell align="right">CountryCode</TableCell>
                                    <TableCell align="right">NewConfirmed</TableCell>
                                    <TableCell align="right">TotalConfirmed</TableCell>
                                    <TableCell align="right">NewDeaths</TableCell>
                                    <TableCell align="right">TotalDeaths</TableCell>
                                    <TableCell align="right">NewRecovered</TableCell>
                                    <TableCell align="right">TotalRecovered</TableCell>
                                    <TableCell align="right">Date</TableCell>       
                                </TableRow>
                            </TableHead>
                            <TableBody  style={styles.bgtable}>
                                {summaryData.filterCountry && summaryData.filterCountry.map( country =>  {
                                    return  (
                                  <TableRow key={country.ID} >
                                  <TableCell align="right"><Link to={country.Country}>{country.Country}</Link></TableCell>
                                    <TableCell align="right">{country.CountryCode}</TableCell>
                                    <TableCell align="right">{country.NewConfirmed}</TableCell>
                                    <TableCell align="right">{country.TotalConfirmed}</TableCell>
                                    <TableCell align="right">{country.NewDeaths}</TableCell>
                                    <TableCell align="right">{country.TotalDeaths}</TableCell>
                                    <TableCell align="right">{country.NewRecovered}</TableCell>
                                    <TableCell align="right">{country.TotalRecovered}</TableCell>
                                    <TableCell align="right">{moment(country.Date).format('MMM DD YYYY')}</TableCell>  
                                        
                                </TableRow>
                                    )
                                })}                  
                            </TableBody>
                        </Table>              
                </div>                 
            )
        )
    }

const mapStateToProps = state => {
    return {
        summaryData: state
    }
}

const mapDispatchToProps = {
    fetchSummary: fetchSummary,
    searchfilter: searchfilter
}

export default connect(mapStateToProps,mapDispatchToProps)(MyComponent)