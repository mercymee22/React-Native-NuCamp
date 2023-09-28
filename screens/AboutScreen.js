import { ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Avatar, Card, ListItem } from 'react-native-elements';
import Loading from '../components/LoadingComponent';

const Mission = () => {
    return (
        <Card>
            <Card.Title>Our Mission</Card.Title>
            <Card.Divider />
            <Text style={{ margin: 10 }}>
                We present a curated database of the best campsites in the vast woods
                and backcountry of the World Wide Web Wilderness. We increase access to
                adventure for the public while promoting safe and respectful use of
                resources. The expert wilderness trekkers on our staff personally verify
                each campsite to make sure that they are up to our standards. We also
                present a platform for campers to share reviews on campsites they have
                visited with each other.
            </Text>
        </Card>
    );
};

//Avatar - For each partner in the `partners` array, an `Avatar` component is rendered with the image source set to the URL of that partner's image, displaying it in a rounded shape.

const AboutScreen = () => {
    const partners = useSelector((state) => state.partners);

// partners.isLoading - check the values of isLoading and errMess properties of our partners object from Redux. Depending on what they contain, return different JSX from out AboutScreen component.

    if (partners.isLoading) {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Community Partners</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            </ScrollView>
        );
    }

    if (partners.errMess) {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Community Partners</Card.Title>
                    <Card.Divider />
                    <Text>{partners.errMess}</Text>
                </Card>
            </ScrollView>
        );
    }

    return (
        <ScrollView>
            <Mission />
            <Card>
                <Card.Title>Community Partners</Card.Title>
                <Card.Divider />
                {partners.partnersArray.map((partner) => {
                    return (
                        <ListItem key={partner.id}>
                            <Avatar source={{ url: baseUrl + partner.image }} rounded />
                            <ListItem.Content>
                                <ListItem.Title>{partner.name}</ListItem.Title>
                                <ListItem.Subtitle>{partner.description}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })}
            </Card>
        </ScrollView>
    );
};

export default AboutScreen;
