import { createSlice } from '@reduxjs/toolkit';

// Call to createSlice, passing in an object as the parameter. slice name = favorites, initialState is an empty array so when the app first loads, our list of favorite campsites will be empty.
// toggleFavorite - handles adding and removing a favorite based on if the id we're trying to add or remove is already present in the array.
// toggleFavorite case reducer receives 2 parameters: state, action. Naming the state parameter - favorites.
// toggleFavorite body - 2 ways to update our favorites array in redux: 1. directly mutate array using (push, pop, sort, reverse, etc)-Redux converts it to non mutating. 2.Return a completely new value for what we want the array to be. 
// favorites.includes(action.payload) - if this is true, the campsite is already in the array and we want to remove it.
// if favorites.includes - if statement to check if our action.payload (action.payload = a campsite id) is included in the favorites array.  if true, then the campsite is already in the array and we want to remove it.
// return favorites.filter - filter the array of favorites to keep only the ones that don't equal the id we're trying to remove, which is action.payload.
// favorite - return the results of the filter method (a new array), and that becomes the new favorites array data.
// else condition - handles when the action.payload is not in the favorites array (this will involve array mutation with push)
// push - mutates our existing array and adds a new item to it.

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        toggleFavorite: (favorites, action) => {
            if (favorites.includes(action.payload)) {
                return favorites.filter(
                    (favorite) => favorite !== action.payload
                );
            } else {
                favorites.push(action.payload);
            }
        }
    }
});

// toggleFavorite - This line is exporting an object with a property named toggleFavorite from the favoritesSlice.actions object. In Redux Toolkit, when you create a slice using createSlice, it automatically generates an object called actions that contains all the action creators defined in your slice.
// toggleFavorite continued - the toggleFavorite action creator is defined within the reducers object of favoritesSlice. It is a function that accepts two parameters: favorites and action. This action creator toggles a favorite item by either adding or removing it from the favorites array based on whether it's already present in the array.
// toggleFavorite continued - By exporting toggleFavorite here, you make it available for other parts of your application, such as React components, to dispatch this action and interact with your Redux store.
// The toggleFavorie action creator object is being exported from the favoritesSlice.actions object, created and defined within the createSlice function.

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;