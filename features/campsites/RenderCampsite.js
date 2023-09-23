import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';


// Card - returns a card component
// Double Curly Braces for style=margin:20 mean; Outer cruly braces denote javascript being used in JSX, inner curly braces deonte a JS object.
// Icon with icon sets (name, type, etc) raised prop = subtle shadow effect, reverse prop = reverse the color scheme. See Icon documentation for a list of sets and how to use. 
// Icon name= ternary operator checking props.isFavorite, returning string 'heart' if true, 'heart-o' if false.
// (props) - passing in the entire props object in as the parameter so we can have access to all the props we pass in, not just the campsite prop like before.
// campsite prop under RenderCampsite is destructuring the campsite object and comes from MainComponent.js where campsite is the variable declared by useState with the initial value of the CAMPSITES array.
// onPress= - calling the markFavoriteEventHandler we're receiving through props to tell the campsiteinfo screen, a heart icon has been clicked on, which will call the function we set = to the markFavorite prop when we passed it in from the campsiteinfo screen.

const RenderCampsite = (props) => {
    const { campsite } = props;
    if (campsite) {
        return (
            <Card containerStyle={ styles.cardContainer }>
                <Card.Image source={{ url: baseUrl + campsite.image}}>
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
            </Card>
        );
    }
    return <View />;
};

// StyleSheet: creating a stylesheet using StyleSheet.create call and passing in an object with the cardContainer style.

const styles = StyleSheet.create({
    cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 20
    }
    });

export default RenderCampsite;