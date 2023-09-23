import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from '../components/LoadingComponent';

// Since our data is now in the Redux store, see Main component - useEffect, we no longer need to import the CAMPSITES, PROMOTIONS, AND PARTNERS arrays. Ans we're not using local state so we get rid of useState.
// FeaturedItem - renders each featured object
// were using using the item prop and destructuring it but we changed it to have access to the whole props object, so we can have access to the new props we're passing in. Then below that we destructure the item prop.
// View style - horizontally aligns text over the image
// Card.Image source= - now we're receiving a location reference to where our item is within the json server.  uri - congiguration object = to the loaton of the image to render.  baseUrl - where our json server is running.  item.image - string with the rest of the path to our image.

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

// ScrollView - Used to render a group or list of items. Difference between ScrollView & FlatList, ScrollView loads all it's child components at once but flatList uses lazy loading (only render parts at a time).
// const featCampsite - using the array find method to find the first item where featured is set to true.
// Got rid of variable that hold local state and replaced them with variables that hold the data from the Redux store for campsites, promotions, partners
// state - special function called a selector that receives our Redux state.  We just want the campsites portion of the state so we return state.campsites.  We know state.campsites is available in the state because we defined it in the store.js file when we created configured store and defined our slice reducer with the name campsites.
// featCampsite-campsites.campsitesArray - the data is found in campsitesSlice.js, it is the campsites state object with the campsitesArray being one of the propertyies in it..
// Passing the props we created 
// isLoading=campsites.isLoading - passed in from the isLoading props created in the featuredItem component above.

 const HomeScreen = () => {
    const campsites = useSelector((state) => state.campsites);
    const promotions = useSelector((state) => state.promotions);
    const partners = useSelector((state) => state.partners);

    const featCampsite = campsites.campsitesArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find((item) => item.featured);
    const featPartner = partners.partnersArray.find((item) => item.featured);

    return (
        <ScrollView>
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
        </ScrollView>
    );
};

export default HomeScreen;