import { configureStore } from '@reduxjs/toolkit';
import { campsitesReducer } from '../features/campsites/campsitesSlice';
import { commentsReducer } from '../features/comments/commentsSlice';
import { partnersReducer } from '../features/partners/partnersSlice';
import { promotionsReducer } from '../features/promotions/promotionsSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'
const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
}

export const store = configureStore({
    reducer: persistCombineReducers(config, {
        campsites: campsitesReducer,
        comments: commentsReducer,
        partners: partnersReducer,
        promotions: promotionsReducer,
        favorites: favoritesReducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
});

export const persistor = persistStore(store);

// reducers are functions responsible for managing different slices of the application's state. Each reducer is associated with a specific feature or slice of the application's state and defines how that state should be updated in response to dispatched actions.
// reducers continued - For example, the campsitesReducer is responsible for managing the state related to campsites. It handles actions related to campsites, such as adding, updating, or deleting campsite information.
// reducers continued - All of these reducers are combined into a single Redux store using the configureStore function. The reducer property of configureStore is an object that associates each slice of state with its corresponding reducer. This allows Redux to manage and update the state of the application based on the actions dispatched in the application.
// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
// persist combine reducers will handle updating the state to async storage whenever a reducer is used to update the redux store, except the actions we're ignoring.
// export a persistor variable, by calling persistStore, with the redux store as an argument.