import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const CountrieDetail = ({ country }) => (
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
        <img width={200} src={country.flag} />
    </div>
)

const Countries = ({ coutries }) => {
    if (coutries.length == 1)
        return <CountrieDetail country={coutries[0]} />

    return (coutries.length > 10) ?
        <p>To many matches, specify another filter...</p> :
        <div>{coutries.map((country) => <p key={country.alpha2Code}>{country.name}</p>)}</div>;
}

const App = () => {
    const url = "https://restcountries.eu/rest/v2/all";
    const [filter, setFilter] = useState('');
    const [countries, setCountries] = useState([]);

    const handleInputChange = (ev) => {
        setFilter(ev.target.value);
    }

    useEffect(() => {
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


    return (
        <div>
            <h1>Countries</h1>
            <hr />
            <div>
                <label htmlFor="inputCountries">Find countries: </label>
                <input id="inputCountries" value={filter} onChange={handleInputChange} autoFocus={true} />
            </div>
            <hr />
            <Countries coutries={
                countries.filter((country) => country.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
            } />
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'))