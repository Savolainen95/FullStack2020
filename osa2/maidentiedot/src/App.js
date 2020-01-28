import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
    return (
        <>
            Find countries <input
                value={props.finder}
                onChange={props.handleChange}
            />
        </>
    )
}

const ShowCountries = (props) => {

    if (props.countries.filter(country => country.name.toLowerCase().includes(props.filter.toLowerCase())).length === 0) {
        return (
            <h2>No matching countries</h2>
        )
    } else if (props.countries.filter(country => country.name.toLowerCase().includes(props.filter.toLowerCase())).length === 1) {
        return (
            <>
                {props.countries.filter(country => country.name.toLowerCase().includes(props.filter.toLowerCase())).map((country, i) =>
                    <Country key={i} country={country} />
                )}
            </>
        )
    } else if (props.countries.filter(country => country.name.toLowerCase().includes(props.filter.toLowerCase())).length > 10) {
        return (
            <h2>Too many options</h2>
        )
    }
    return (
        <>
            <h2>Matching countries</h2>
            <div>
                {props.countries.filter(country => country.name.toLowerCase().includes(props.filter.toLowerCase())).map((country) =>
                    <Countries key={country.numericCode} country={country} setFilter={props.setFilter} />
                )}
            </div>
        </>
    )
}
const Countries = ({country, setFilter}) => {
    return (
        <div>
            {country.name}
            <Button country = {country} setFilter={setFilter}/>
        </div>
    )
}
const Country = (props) => {
    return (
        <>
            <h2>{props.country.name}</h2>
            <p>capital {props.country.capital}</p>
            <p>population {props.country.population}</p>
            <h3>Languages</h3>
            <ul>
                {props.country.languages.map((language) => 
                    <li key = {Math.random()}>
                        {language.name}
                    </li>
                )}
            </ul>
            <img src= {props.country.flag} height= '192'/>
        </>
    )
}
const Button = ({country, setFilter}) => {
    return (
        <>
            <button onClick= {() => setFilter(country.name)}>
                Tämä
            </button>
        </>
    )
}


const App = () => {

    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }
    if(countries.length > 1) {
        console.log(countries[0])
    }
    useEffect(hook, [])

    const handleChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <Filter
                filter={filter}
                handleChange={handleChange}
            />
            <ShowCountries
                countries={countries}
                filter={filter}
                setFilter={setFilter}
            />
        </div>
    )

}

export default App