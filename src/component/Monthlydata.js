import React, {useEffect} from 'react'
import {fetchcountry, fetchSummary} from '../actions/ActionApi'
import {connect} from "react-redux"
import './MyComponent.css'
import moment from 'moment'
import Global from './Global'
//table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


import Image from '../img/table_bg.jpg'

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

function Monthlydata({summaryData, match, fetchcountry, fetchSummary}) {
    console.log(match.params.id)
    
    const id = match.params.id.toLowerCase()
    useEffect( () => {
        fetchcountry(id)
        fetchSummary()
    }, [])

    console.log(summaryData)
    //console.log(summaryData.summary.Countries.filter(data => data.Country.includes(id)));
    return ( 
            summaryData.loading ? (
                <h2>Loading</h2>
                ) : summaryData.error ? (
                <h2>{summaryData.error}</h2>
                ) : (
                    <div>
                        <h2 className="countrydata">Global Data</h2>

                       {summaryData.summary.Countries && 
                        summaryData.summary.Countries.map(country1 => 
                      country1.Country.toLowerCase()=== id ?
                       <Global total={country1}/>  : null)} 

                <h2 className="countrydata">Monthly Data</h2>
                <Table  size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: "#d32f2f"}}>
                                    <TableCell>Country</TableCell>
                                    <TableCell align="right">CountryCode</TableCell>
                                   
                                    <TableCell align="right">Lat</TableCell>
                                    <TableCell align="right">Lon</TableCell>
                                    <TableCell align="right">Cases</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Date</TableCell>       
                                </TableRow>
                            </TableHead>

                    <TableBody style={styles.bgtable}>
                        {summaryData.history && summaryData.history.map( country =>  {
                            return  (
                            <TableRow key={country.index} >
                            <TableCell align="right">{country.Country}</TableCell>
                            <TableCell align="right">{country.CountryCode}</TableCell>
                          
                            <TableCell align="right">{country.Lat}</TableCell>
                            <TableCell align="right">{country.Lon}</TableCell>
                            <TableCell align="right">{country.Cases}</TableCell>
                            <TableCell align="right">{country.Status}</TableCell>
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
    fetchcountry: fetchcountry,
    fetchSummary:fetchSummary
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Monthlydata)