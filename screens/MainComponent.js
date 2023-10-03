import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import ReservationScreen from './ReservationScreen';
import { Icon } from 'react-native-elements';
import logo from '../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import FavoritesScreen from './FavoritesScreen';
import LoginScreen from './LoginScreen';

// HomeNavigator is where directory navigator is defined.
// createDrawerNavigator - returns an object that contains the navigator and screen components for configuring a drawer navigator.
// screenOptions defines look and feel of nav header

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#5637DD' }
};


// createStackNavigator() is a function that provides a way for your app to transition between screens where each new screen is placed on top of a stack.
// DirectoryNavigator function component created to return our stack navigator code for our direcotry and campsiteinfo screens.
// Stack variable created to hold the object from createStackNavigator method. This method returns an object with 2 properties, screen and navigator, both react components used to configure the stack navigator. createStackNavigator is a function from the React Navigation library that creates a stack navigator, which allows for navigation between screens by stacking them on top of each other. In this code, it is used to create a stack navigator called "Stack" that is used to navigate between the "Directory" screen and the "CampsiteInfo" screen.
// Stack.Navigator, created from using the createStackNavigator function,  wraps all the screens that belong to the stack and provides screens to transition between them. Essentially, it is a container for the screens that are defined within the navigator. It also allows for setting a variety of options for the entire stack of screens, such as the initialRouteName and screenOptions in this code.
// initialRoutName prop = the default name this navigator will use when the navigator first loads.
// screenOptions prop = returns the object above with the variable name screenOptions.
// <Stack.Screen>` is a react component used to define each screen or page of an application that will be rendered inside a stack-based navigation system (where each screen is stacked on the other allowing you to view previous screens.)
// name='Directory' = name of the screen.
// component={DirectoryScreen} = component in charge of displaying the directory screen.
// options={{ title: 'Campsite Directory' }} = what will be displayed in the navigation header, (options prop is equal to an object with a property of title equal to 'Campsite Directory')
// Second <Stack.Screen> is for defining a screen named campsite info.  Options prop = function that returns an ojbect return an object by surrounding the object literal curly brackets with parenthesis so we don't confuse the arrow function, thinking we are creating a function body. In the parameter list we destructure a property called route, availabe from the react navigation library as well as navigation-used later.  In our object, creating a preperty called title and settting it equal to route.params.campsite.name, this will set the title of the campsite info screen to the name of the specific campsite. This will work because when we navigate to the campsite info screen we'll pass it navigation param named campsite and it will have a name property in it with the name of our campsite we're navigating too. 
// Return DirectoryNavigator in the main component
// Options=navigation - options prop set = to a function that returns an object, with all the options in it.  This way you can receive a navigation parameter which we can use. Wrap the object in parenthesis so the program doesn't get confused and think the curly brackets are for the function body.
// styles.stackIcon - custom styles
// navigation.toggleDrawer - navigation prop given from our mainOptions function.  

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerLeft: () => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const AboutNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='About'
                component={AboutScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const ContactNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Contact'
                component={ContactScreen}
                options={({ navigation }) => ({
                    title: 'Contact Us',
                    headerLeft: () => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const ReservationNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Reservation'
                component={ReservationScreen}
                options={({ navigation }) => ({
                    title: 'Reservation Search',
                    headerLeft: () => (
                        <Icon
                            name='tree'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const FavoritesNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Favorites'
                component={FavoritesScreen}
                options={({ navigation }) => ({
                    title: 'Favorite Campsites',
                    headerLeft: () => (
                        <Icon
                            name='heart'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const LoginNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
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
                options={({ navigation }) => ({
                    title: 'Campsite Directory',
                    headerLeft: () => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
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

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={logo} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}>NuCamp</Text>
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
    </DrawerContentScrollView>
);


// Drawer.Navigator provides a way for your app to implement a drawer navigation that can be swiped in from the side of the screen. 
// Drawer.Screen: Used for rendering a screen. Each `Drawer.Screen` component is a screen in the drawer navigation. This defines our screens that will show in the drawer, one for each screen.
// Component=HomeNavigator: component prop = HomeNavigator which is our stack navigator we're nesting inside this drawer as it's own screen.
// options=title: Options prop = to an object with a title property set to the string Home.
// View component to style the UI
// Platform to access the operating system of the device.  Want to have a different padding top depending on OS. (If platform equal ios then top padding = 0, if false, return the height of the device's status bar) Adjust for descrepancies in how code is rendered between different OS's.
// DirectorNavigator returns all our stack navigator code for our directory and campsite info screens.
// Set drawerIcon: property equal to a function with a color value we can destructure inside the parameter list. (Useful for setting the active & inactive color state of the icon we're adding.)
// iconStyle = width: 24 - the outer curly brackets create the `drawerIcon` object, and the inner curly brackets create the `iconStyle` object within the `drawerIcon` object.
// drawerContent=CustomDrawerContent - This tell the Drawer Navigator to use the component we're passing in to render the drawer.
// useDispatch - useDispatch() is a hook provided by the `react-redux` library that gives access to the `dispatch` function of the Redux store. The `dispatch` function is used to update the state of the Redux store by dispatching actions. An action is a plain JavaScript object that describes the type of update and may include additional data. The reducer function then uses the action object to calculate the new state of the store.
// useEffect - The `useEffect` function is a hook provided by React that allows function components to perform side effects, such as modifying the DOM or fetching data, and update the component state based on changes to props or state. The `useEffect` hook takes two parameters: a function to perform the side effect and an array of dependencies that trigger the effect when changed. The effect function is called after the initial render and after each update, unless the dependencies have not changed since the last render.
// useEffect - hook into to dispatch our Thunk action creators. Any changes to the dispatch array will trigger the useEffect function to run the the state will be rerendered.  Other wise useEffect will only run when it's first rendered., thus state will only be changed then.
// fetchCampsite() is a thunk action creator.  action creators are functions that when called return an action. This was created in campsiteSlice.js.
// When our app loads, the Main component will get mounted and the useEffect hook will get called and all of data will be fetched and loaded into the Redux store, making it available for all our components to access and make changes to if needed.

const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCampsites());
        dispatch(fetchPromotions());
        dispatch(fetchPartners());
        dispatch(fetchComments());
    }, [dispatch]);

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
                drawerContent={CustomDrawerContent}
                drawerStyle={{ backgroundColor: '#CEC8FF' }}
            >
                 <Drawer.Screen
                    name='Login'
                    component={LoginNavigator}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        title: 'Home',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{
                        title: 'Campsite Directory',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='list'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='ReserveCampsite'
                    component={ReservationNavigator}
                    options={{
                        title: 'Reserve Campsite',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='tree'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Favorites'
                    component={FavoritesNavigator}
                    options={{
                        title: 'My Favorites',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='heart'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='About'
                    component={AboutNavigator}
                    options={{
                        title: 'About',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='info-circle'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Contact'
                    component={ContactNavigator}
                    options={{
                        title: 'Contact Us',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='address-card'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default Main;