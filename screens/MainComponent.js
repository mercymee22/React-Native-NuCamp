import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';

// HomeNavigator is where directory navigator is defined.
// createDrawerNavigator - returns an object that contains the navigator and screen components for configuring a drawer navigator.
const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#5637DD' }
};
// createStackNavigator() is a function that provides a way for your app to transition between screens where each new screen is placed on top of a stack.
// Stack.Navigator is a component provided by the createStackNavigator() function from the React Navigation library that allows the creation of complex navigation structures using a stack-based approach.
// Stack.Screen is another component which represents a screen or a particular component that will be rendered when the user navigates to that specific route. Here, the HomeScreen component will be rendered when the user navigates to the 'Home' route.
// options = title: Home - options prop = an object with title property of the string Home.

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
        </Stack.Navigator>
    );
};

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Directory'
                component={DirectoryScreen}
                options={{ title: 'Campsite Directory' }}
            />
            <Stack.Screen
                name='CampsiteInfo'
                component={CampsiteInfoScreen}
                options={({ route }) => ({
                    title: route.params.campsite.name
                })}
            />
        </Stack.Navigator>
    );
};

// Drawer.Navigator provides a way for your app to implement a drawer navigation that can be swiped in from the side of the screen. 
// Drawer.Screen: Used for rendering a screen. Each `Drawer.Screen` component is a screen in the drawer navigation. This defines our screens that will show in the drawer, one for each screen.
// Component=HomeNavigator: component prop = HomeNavigator which is our stack navigator we're nesting inside this drawer as it's own screen.
// options=title: Options prop = to an object with a title property set to the string Home.

const Main = () => {
    return (
        <View
            style={{
                flex: 1,
                paddingTop:
                    Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}
        >
            <Drawer.Navigator
                initialRouteName='Home'
                drawerStyle={{ backgroundColor: '#CEC8FF' }}
            >
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{ title: 'Home' }}
                />
                <Drawer.Screen
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{ title: 'Directory' }}
                />
            </Drawer.Navigator>
        </View>
    );
};

export default Main;