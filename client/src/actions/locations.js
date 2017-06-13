import 'isomorphic-fetch';

import {
    FETCH_LOCATIONS_DATA_SUCCESS,
    FETCH_LOCATIONS_DATA_FAILURE
}
from './types';

export function fetchLocationsDataSuccess(data) {
    return {
        type: FETCH_LOCATIONS_DATA_SUCCESS,
        data
    };
}

export function fetchLocationsDataFailure(error) {
    return {
        type: FETCH_LOCATIONS_DATA_FAILURE,
        error
    };
}


export function fetchLocationsData(form) {
    return (dispatch) => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
        });
        const options = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(form)
        };

        return fetch('/api/itinerary/start', options)
            .then(responseChecker)
            .then(parseToJSON)
            .then((data) => {
                console.log("got data from server", data);
                //update the reducer
                dispatch(fetchLocationsDataSuccess(data));
            })
            .catch(err => {
                dispatch(fetchLocationsDataFailure(err));
            });

    };
}



function responseChecker(response) {
    if (!response.ok) {
        return new Error(response.status);
    }
    return response;
}

function parseToJSON(response) {
    return response.json();
}
