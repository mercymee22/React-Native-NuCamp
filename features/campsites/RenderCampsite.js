import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

// campsite prop being passed in comes from MainComponent.js where campsite is the variable declared by useState with the initial value of the CAMPSITES array.
// Card - returns a card component
// Double Curly Braces for style=margin:20 mean; Outer cruly braces denote javascript being used in JSX, inner curly braces deonte a JS object.

const RenderCampsite = ({ campsite }) => {
    if (campsite) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={campsite.image}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {campsite.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{campsite.description}</Text>
            </Card>
        );
    }
    return <View />;
};

export default RenderCampsite;