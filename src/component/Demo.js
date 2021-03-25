import React, {useState, useEffect} from 'react'
import {fetchSummary, searchfilter} from "../actions/ActionApi"
import {connect} from "react-redux"
import './Table.css'
import moment from 'moment'


function MyComponent({summaryData, fetchSummary, searchfilter}) {
    const [search, setSearch] = useState("")
    useEffect( () => {
        fetchSummary()
    }, [])


   const handleClick = () => {
       console.log("btn clicked")
       searchfilter(search)
   }

    
    return (
        
        summaryData.loading ? (
        <h2>Loading</h2>
        ) : summaryData.error ? (
        <h2>{summaryData.error}</h2>
        ) : (
            
                <div>
                    <h2 className="countrydata">Global Data</h2>

                    {summaryData.summary.Global && (
                        <table className="myOtherTable">
                        <thead>
                            <tr>
                                <th>NewConfirmed</th><th>TotalConfirmed</th>
                                <th>NewDeaths</th><th>TotalDeaths</th>
                                <th>NewRecovered</th><th>TotalRecovered</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{summaryData.summary.Global.NewConfirmed}</td>
                                    <td>{summaryData.summary.Global.TotalConfirmed}</td>
                                    <td>{summaryData.summary.Global.NewDeaths}</td>
                                    <td>{summaryData.summary.Global.TotalDeaths}</td>
                                    <td>{summaryData.summary.Global.NewRecovered}</td>
                                    <td>{summaryData.summary.Global.TotalRecovered}</td>
                                    <td>{moment(summaryData.summary.Global.Date).format('MMM DD YYYY')}</td>
                                </tr>
                            </tbody>

                        </table>
                    )}
                

                
                    <h2 className="countrydata">Country Data</h2>
                        
                                        
                            
        
                        <input type="text" name="userInput" placeholder="Enter Country" onChange={e => setSearch(e.target.value)} />
                        <button onClick={handleClick}>Search</button>         




                        <table className="myOtherTable">  
                            <thead>              
                            <tr>
                                <th>Country</th><th>CountryCode</th><th>NewConfirmed</th>
                                <th>TotalConfirmed</th><th>NewDeaths</th><th>TotalDeaths</th>
                                <th>NewRecovered</th><th>TotalRecovered</th><th>Date</th>
                            </tr>
                            </thead>

                            <tbody>
                                {summaryData.filterCountry && summaryData.filterCountry.map( country =>  {
                                    return <tr key={country.ID}>
                                        
                                        <td>{country.Country}</td><td>{country.CountryCode}</td>
                                        <td>{country.NewConfirmed}</td><td>{country.TotalConfirmed}</td>
                                        <td>{country.NewDeaths}</td><td>{country.TotalDeaths}</td>
                                        <td>{country.NewRecovered}</td><td>{country.TotalRecovered}</td>
                                        <td>{moment(country.Date).format('MMM DD YYYY')}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>           
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
