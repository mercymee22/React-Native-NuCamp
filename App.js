import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/LoadingComponent';

// Provider - connects Redux store to root component, app.js, gives the Main component and all its' child components access to the Redux store.
// PersistGate is provided by Redux persist to help integrate it with react and react native. It prevents the application from loading until the redux store has been fully rehydrated in the client side storage.
// loading - whatever we pass to the loading prop is what will show while the redux store is rehydrating.

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <NavigationContainer>
                    <Main />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}