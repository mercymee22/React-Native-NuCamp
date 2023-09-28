import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleFavorite } from '../features/favorites/favoritesSlice'

// navigation - destructuring the navigation prop. This navigation prop is given to this component by react navigation when we add it as a screen in the stack navigator.
// useSelector hook - getting state data from redux store. deconstruct those 3 from the return value of useSelector, returning the state.campsites portion of our state.
// useSelector passing in as an agrument to useSelector function, we know state.campsites property will return an object, so we're using object destructuring to create individual variables from the properties of that object.
// useSelector: The state for campsitesArray, isLoading, and errMess is being pulled from state.campsites.
// const favorites - get our favorites state data, returns the state.favorites, which is an array.
// errMess - the error message.
// data= - The array of campsites to be rendered, then filter out the campsites where the ID of the campsite matches one of the ID's in the list of favorites, which we access via the favorites variable.
// campsitesArray.filter - using the filter method on the array of campsites, (the favorites array is an array of campsite ID's).
// favorites.includes - for every campsite, check if favorites array includes the ID of the current campsite in the filter. Then the filter method will return a new array that consists of all the campsites with ID's that found a match in the favorites array.
// filter((campsite) - campsite refers to each item within the `campsitesArray` array as it iterates through it.
// renderItem prop passses in a function
// The `keyExtractor` prop is used with lists and is a function that tells the list to use a particular property from the data source for the purpose of using keys. Usually, it generates a key from the unique ID associated with each data item. Keys are important because they help React optimize its rendering process in the best way possible. The key for each item would be its `id` property converted to a string
// item: campsite - destructure the current item from the data array and give item a new name of campsite.
// onPress - in the onPress prop event handler, call the navigations props navigate method.
// navigate - Need to tell the navigate method, what navigator to use (Directory) and what screen to show within that navigator (CampsiteInfo), don't have to do this if navigating in the same navigator like from directory screen to campsiteInfo screen.
// Directory (first argument) - name of top level navigator we want to navigate to. (this is the name prop we set in drawer navigators drawer.screen tag for the directory navigator).
// second argument - configuration object, params - set to an object with a key of campsites = our campsite object, object property shortand.
// dispatch - for updating the redux store
// SwipeRow - let us make the ListItem component swipeable. It expects 2 view components. 1st view - hidden view (after you swipe), 2nd view - default view before you swipe.
// rightOpenValue - SwipeRow will open on the right side.  Requires a negative integer who value represents the amount of pixels the user will have to swipe for the row to open (from right to left). so the ListItem goes into the second view.
// TouchableOpacity - our hidden delete options
// onPress - when the onPress eventListener prop is pressed, then the dispatch function passes a call to toggleFavorite action creator, passing in campsite.id as the payload.

const FavoritesScreen = ({ navigation }) => {
    const { campsitesArray, isLoading, errMess } = useSelector(
        (state) => state.campsites
    );
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const renderFavoriteItem = ({ item: campsite }) => {
        return (
            <SwipeRow rightOpenValue={-100}>
                <View style={styles.deleteView}>
                    <TouchableOpacity
                        style={styles.deleteTouchable}
                        onPress={() => dispatch(toggleFavorite(campsite.id))}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ListItem
                        onPress={() =>
                            navigation.navigate('Directory', {
                                screen: 'CampsiteInfo',
                                params: { campsite }
                            })
                        }
                    >
                        <Avatar
                            rounded
                            source={{ uri: baseUrl + campsite.image }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{campsite.name}</ListItem.Title>
                            <ListItem.Subtitle>
                                {campsite.description}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        );
    };

    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    }
    return (
        <FlatList
            data={campsitesArray.filter((campsite) =>
                favorites.includes(campsite.id)
            )}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default FavoritesScreen;