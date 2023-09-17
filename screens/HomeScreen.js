import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';

// FeaturedItem - renders each featured object
// item - Destructuring a prop named item
// if(item) = conditional rendering in case item is undefined.
// View style - horizontally aligns text over the image

const FeaturedItem = ({ item }) => {
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={item.image}>
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

// We want to use state variable for rendering our data instead of importing our data directly because react will see when values created with the useState hook are updated and then render them.
// ScrollView - Used to render a group or list of items. Difference between ScrollView & FlatList, ScrollView loads all it's child components at once but flatList uses lazy loading (only render parts at a time).
// const featCampsite - using the array find method to find the first item where featured is set to true.

 const HomeScreen = () => {
    const [campsites, setCampsites] = useState(CAMPSITES);
    const [promotions, setPromotions] = useState(PROMOTIONS);
    const [partners, setPartners] = useState(PARTNERS);

    const featCampsite = campsites.find((item) => item.featured);
    const featPromotion = promotions.find((item) => item.featured);
    const featPartner = partners.find((item) => item.featured);

    return (
        <ScrollView>
            <FeaturedItem item={featCampsite} />
            <FeaturedItem item={featPromotion} />
            <FeaturedItem item={featPartner} />
        </ScrollView>
    );
};

export default HomeScreen;