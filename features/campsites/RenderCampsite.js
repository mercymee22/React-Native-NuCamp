import { useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PanResponder,
    Alert,
    Share
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

// Card - returns a card component
// Double Curly Braces for style=margin:20 mean; Outer cruly braces denote javascript being used in JSX, inner curly braces deonte a JS object.
// Icon with icon sets (name, type, etc) raised prop = subtle shadow effect, reverse prop = reverse the color scheme. See Icon documentation for a list of sets and how to use. 
// Icon name= ternary operator checking props.isFavorite, returning string 'heart' if true, 'heart-o' if false.
// (props) - passing in the entire props object in as the parameter so we can have access to all the props we pass in, not just the campsite prop like before.
// campsite prop under RenderCampsite is destructuring the campsite object and comes from MainComponent.js where campsite is the variable declared by useState with the initial value of the CAMPSITES array.
// onPress= - calling the markFavoriteEventHandler we're receiving through props to tell the campsiteinfo screen, a heart icon has been clicked on, which will call the function we set = to the markFavorite prop when we passed it in from the campsiteinfo screen.
// dx - destructures the dx property from an object, dx is the distance of a gesture accross the x-axis.
// dx < -200 - we'll recognize a gesture that has a horizontal drag to the left that's smaller than -200 pixels. (-100 is bigger than -300)
// PanResponder has a number of predefined event handlers that can be used with it (methods).
// onStartShouldSetPanResponder - activates the PanResponder to respond to gestures on the component it's used on.
// onPanResponderEnd: e, gestures - these values are automatically passed into the event handler. e - event (native event object), gestureState - object that holds important info about the gestureState that just ended.
// isLeftSwipe - pass the gestureState value to it and return a true value if gesture is > 200 pixels to the left.
// 3rd argument of the alert passes an array which holds objects to configure the alert buttons.
// :props.markFavorite - if it's not a favorite, call the markFavorite event handler.
// useRef - in order to trigger an animation we'll need to set up a reference to it. (Like giving an html element an id code so you can refer to it later with something like getElementById.)
// create a ref and store it in view. point it to an animatable component (ref=view).
// onPanResponderGrant - pan handler that's triggered when gesture is first recognized and onStartShouldSetPanResponder returns true thus granting this view to respond to touch events.
// rubberBand animation (method) with a duration of 1 second. Every animatable method like rubberBand returns a promise. This promise will resolve to an object at the end of the animation and will contain the property of finished which returns true or false.
// Share.share - Share API's share method takes up to 2 objects and arguments.
// $title: - title, message, and url parameters this function is receiving
// dialogTitle - for andriod only, sets a title for the dialog box that wwill show up.
// shareCampsite - passing it 3 arguments, campsite.name = title, campsite.description = message, url for campsite image.

const RenderCampsite = (props) => {
    const { campsite } = props;

    const view = useRef();

    const isLeftSwipe = ({ dx }) => dx < -200;
    const isRightSwipe = ({ dx }) => dx > 200;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current
                .rubberBand(1000)
                .then((endState) =>
                    console.log(endState.finished ? 'finished' : 'canceled')
                );
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (isLeftSwipe(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' +
                        campsite.name +
                        ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () =>
                                props.isFavorite
                                    ? console.log('Already set as a favorite')
                                    : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            } else if (isRightSwipe(gestureState)) {
                props.onShowModal();
            }
        }
    });

    const shareCampsite = (title, message, url) => {
        Share.share(
            {
                title,
                message: `${title}: ${message} ${url}`,
                url
            },
            {
                dialogTitle: 'Share ' + title
            }
        );
    };

    if (campsite) {
        return (
            <Animatable.View
                animation='fadeInDownBig'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}
            >
                <Card containerStyle={styles.cardContainer}>
                    <Card.Image source={{ uri: baseUrl + campsite.image }}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.cardText}>{campsite.name}</Text>
                        </View>
                    </Card.Image>
                    <Text style={{ margin: 20 }}>{campsite.description}</Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.isFavorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() =>
                                props.isFavorite
                                    ? console.log('Already set as a favorite')
                                    : props.markFavorite()
                            }
                        />
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={props.onShowModal}
                        />
                        <Icon
                            name='share'
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() =>
                                shareCampsite(
                                    campsite.name,
                                    campsite.description,
                                    baseUrl + campsite.image
                                )
                            }
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardText: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
});

export default RenderCampsite;