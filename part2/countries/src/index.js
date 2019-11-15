import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { weatherstack, restcountries } from './config';

const WeatherDetail = ({ country }) => {
    const [weather, setWeather] = useState(null);

    useEffect(()=>{
        const url = `${weatherstack.baseURL}/current?access_key=${weatherstack.apiKEY}&query=${country.name}`;
        axios.get(url)
            .then(result => {
                console.log(result.data);
                setWeather(result.data);
            })
            .catch(err => {
                console.error(err);

            });
    },[country.name])

    return (weather)?(
        <div>
            <h3>Weather in {weather.location.country}</h3>
            <p>
                <b>Temperature:</b> {weather.current.temperature}° Celsius
        </p>
            <img alt={weather.current.weather_descriptions[0]} src={weather.current.weather_icons[0]} />
            <p>
                <b>Wind:</b>{weather.current.wind_speed} kph direction {weather.current.wind_dir}
            </p>
        </div>
    ):<br/>
};

const CountryDetail = ({ country }) => {
    return (
        <div>
            <h1>
                {country.name}
            </h1>
            <p>
                <b>Capital:</b> {country.capital}
            </p>
            <p>
                <b>Population:</b> {country.population}
            </p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(lang => (
                    <li key={lang.iso639_1}>{lang.name}</li>
                ))}
            </ul>
            <img alt={country.name} width={200} src={country.flag} />
            <WeatherDetail country={country} />
        </div>
    );
}

const Countries = ({ coutries, showHandler }) => {

    if (coutries.length === 1) {
        return <CountryDetail country={coutries[0]} />
    }

    return (coutries.length > 10) ?
        <p>To many matches, specify another filter...</p> :
        <div>
            {coutries.map((country) =>
                <p key={country.alpha2Code}>
                    {country.name} <button onClick={() => showHandler(country.name)}>show</button>
                </p>)}
        </div>;
}

const App = () => {
    const [filter, setFilter] = useState('bra');
    const [countries, setCountries] = useState([]);

    const handleInputChange = (ev) => {
        setFilter(ev.target.value);
    }

    const showHandler = (name) => {
        setFilter(name);
    }

    useEffect(() => {
        const url = `${restcountries.baseURL}/rest/v2/all`;
        axios
            .get(url)
            .then(result => {
                console.log(result.data);
                setCountries(result.data);
            })
            .catch(err => {
                console.error(err);
                setCountries([]);
            })
    }, [])

    const callBackFilter = (country) => {
        return country.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    }

    return (
        <div>
            <h1>Countries</h1>
            <hr />
            <div>
                <label htmlFor="inputCountries">Find countries: </label>
                <input id="inputCountries" value={filter} onChange={handleInputChange} autoFocus={true} />
            </div>
            <hr />
            <Countries
                coutries={
                    countries.filter(callBackFilter)
                }
                showHandler={showHandler}
            />
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'))