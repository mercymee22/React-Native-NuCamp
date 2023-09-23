import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

// createAsyncThunk simplifies the process of handling asynchronous operations within Redux. function takes 2 arguments: a string that represents the name of the thunk action, and a callback function that returns a promise. ('campsites/fetchCampsites')
// 'campsites/fetchCampsites' - first argument to the createAsyncThunk function, related to campsites and fetching them. Second argument - The callback function passed to createAsyncThunk is an async arrow function that uses the fetch API to make a GET request to the baseUrl + 'campsites' endpoint. The response from the server is then checked to make sure it is okay before extracting the JSON response data and returning it.  
// async - defines the behavior of the 'fetchCampsites' action.  When dispatched this function will be executed.
// if !response.ok - the code checks if the HTTP response status indicates success (status code 200).  If the response status is not okay (e.g., 404 for not found or 500 for server error), it rejects the promise with an error message.
// const data = await response.json();: If the response is okay, this line parses the JSON content of the response body and stores it in the data variable.

export const fetchCampsites = createAsyncThunk(
    'campsites/fetchCampsites',
    async () => {
        const response = await fetch(baseUrl + 'campsites');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const campsitesSlice = createSlice({
    name: 'campsites',
    initialState: { isLoading: true, errMess: null, campsitesArray: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampsites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCampsites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.campsitesArray = action.payload;
            })
            .addCase(fetchCampsites.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const campsitesReducer = campsitesSlice.reducer;