import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Animated, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import { useEffect, useRef } from 'react';

// Since our data is now in the Redux store, see Main component - useEffect, we no longer need to import the CAMPSITES, PROMOTIONS, AND PARTNERS arrays. Ans we're not using local state so we get rid of useState.
// FeaturedItem - renders each featured object
// were using using the item prop and destructuring it but we changed it to have access to the whole props object, so we can have access to the new props we're passing in. Then below that we destructure the item prop.
// View style - horizontally aligns text over the image
// Card.Image source= - now we're receiving a location reference to where our item is within the json server.  uri - congiguration object = to the loaton of the image to render.  baseUrl - where our json server is running.  item.image - string with the rest of the path to our image.
// React Animations: https://reactnative.dev/docs/animations


const FeaturedItem = (props) => {
    const { item } = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMsg) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={{uri: baseUrl + item.image}}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{item.description}</Text>
            </Card>
        );
    }
    return <View />;
};

// ScrollView (replaced w/Animated) - Used to render a group or list of items. Difference between ScrollView & FlatList, ScrollView loads all it's child components at once but flatList uses lazy loading (only render parts at a time).
// const featCampsite - using the array find method to find the first item where featured is set to true.
// Got rid of variable that hold local state and replaced them with variables that hold the data from the Redux store for campsites, promotions, partners
// state - special function called a selector that receives our Redux state.  We just want the campsites portion of the state so we return state.campsites.  We know state.campsites is available in the state because we defined it in the store.js file when we created configured store and defined our slice reducer with the name campsites.
// featCampsite-campsites.campsitesArray - the data is found in campsitesSlice.js, it is the campsites state object with the campsitesArray being one of the propertyies in it..
// Passing the props we created 
// isLoading=campsites.isLoading - passed in from the isLoading props created in the featuredItem component above.
// scaleValue - this is the recommended way to create animation values according to the React docs. This creates our animation value that we can apply to an animatable component.
// useRef - pass useRef new Animated.value with 0 as an argument, and access the current property of the ref object.
// useRef - returns a mutable ref object. This ref object has a current property that contains the value of whatever we pass to useRef as an argument and guarantees the same object will be available for each component rendered and not recreated. 
// scaleAnimation - hold our animation data. 2 arguments: 1 - name of animated value we want to have change over time. 2 - object containing 3 properties.
// toValue - what we want the animated.value to change to.  duration - how long it will take to animate from 0 - 1 (1.5 seconds).  useNativeDriver - helps improve performance of animations in this library.
// scaleAnimation.start - to run the animation once, call the start method on our scaleAnimation variable inside a useEffect hook.
// The useEffect hook gets arguments, a function and a dependency array which looks for values that have changed, to tell the function to fire. empty dependency array will cause the animation to start when it first mounts.
// tranform style, the type of transform we want is scale, and the value for scale is scaleValue, which is a dynamic value that will change  when the animation is running from 0 - 1. Tranform can be used to create many animations.
 
const HomeScreen = () => {
    const campsites = useSelector((state) => state.campsites);
    const promotions = useSelector((state) => state.promotions);
    const partners = useSelector((state) => state.partners);  
    const scaleValue = useRef (new Animated.Value(0)).current; 
    const scaleAnimation = Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
    });

    const featCampsite = campsites.campsitesArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find((item) => item.featured);
    const featPartner = partners.partnersArray.find((item) => item.featured);

    useEffect(() => {
        scaleAnimation.start();
    }, []);

    return (
        <Animated.ScrollView style={{ transform: [{ scale: scaleValue }] }}>
            <FeaturedItem 
                item={featCampsite}
                isLoading={campsites.isLoading}
                errMess={campsites.errMess}
            />
            <FeaturedItem 
                item={featPromotion} 
                isLoading={promotions.isLoading}
                errMess={promotions.errMess}
            />
            <FeaturedItem 
                item={featPartner}
                isLoading={partners.isLoading}
                errMess={partners.errMess} 
            />
        </Animated.ScrollView>
    );
};

export default HomeScreen;