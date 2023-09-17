import { useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

// The renderDirectoryItem function we passed to the FlatLists renderItem prop will get passed an object with specific fields when it's called by FlatList. One of the fields is "item", which contains the current item in the array we want to render. When function gets called with an object, we can grab certain fields from the object using destructuring (in the parameter list). We're destructuring item and renaming it to campsite since our items we're rendering are campsite data.
// render a ListItem, similar to the html listitem element.  Using it to render each campsite from the FlatList. Other components inside ListItem configure how ListItem renders.
// Avatar component for displaying campsite image data. rounded prop makes image appear as a circle.
// The ListItem.Content component defines our main content display in the ListItem
// Title set equal to the campsite name
// onPress is a built in prop for the ListItem component. Whenever the the screen is pressed, the function gets invoked and passes the id of the campsite, telling the main componeot what campsite Id was clicked on.
// navigation.navigate: In React Navigation, the `navigate` function is provided to screen components via the `navigation` prop. So we can access it by destructuring `navigation` from the props passed to our component. This function can be used to navigate among different screens.

const DirectoryScreen = ({ navigation }) => {
    const [campsites, setCampsites] = useState(CAMPSITES);

    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <ListItem
                onPress={() =>
                    navigation.navigate('CampsiteInfo', { campsite })
                }
            >
                <Avatar source={campsite.image} rounded />
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>
                        {campsite.description}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };
    return (
        <FlatList
            data={campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;

//Passing 3 props to the FlatList component being returned
//data prop must be in the form of an array that the FlatList will use to render items from. Passing it the Array of campsite data that we're getting from prop.campsites passed in from the MAIN component in MainComponent.js. (campsites being the state variable named campsites)
//renderItem prop: a rendering function as defined in FlatList Documentation. For clarity we won't write function here, setting it to a variable name renderDirectoryFunction, function defined above.
//keyExtractor prop also needs to be set equal to a function. Function returns a unique value that FlatList will use to add a key to each item in the list. Return the ID of each campsite as a string. (item) represents each individual item in your data array as the keyExtractor function processes them one by one. It's a way of iterating through your data and generating unique keys for each item.