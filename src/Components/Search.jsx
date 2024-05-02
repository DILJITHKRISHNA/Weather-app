import React, { useState } from 'react';
import axios from 'axios';
import { geoApiOptions, GEO_API_URL } from '../api';
import { AsyncPaginate } from 'react-select-async-paginate';

function Search({ onSearchChange }) {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        try {
            const response = await axios.request({
                method: 'GET',
                url: `${GEO_API_URL}/cities`, 
                headers: geoApiOptions.headers,
                params: {
                    minPopulation: 1000000,
                    namePrefix: inputValue,
                },
            });
            console.log('Response:', response.data); 
        } catch (error) {
            if (error.response) {
                console.error(`Error ${error.response.status}: ${error.response}`);
                if (error.response.status === 429) {
                    console.warn('Rate limit exceeded. Try again later.');
                } else if (error.response.status === 403) {
                    console.error('Forbidden. Check your RapidAPI key.');
                }
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    const handleOnchange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnchange}
            loadOptions={loadOptions} 
        />
    );
}

export default Search; 
