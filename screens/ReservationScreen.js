import { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    Switch,
    Button,
    Alert,
    Platform,
    StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Animated } from 'react-native';


// useState local state variables used for tracking the values in our campsiteReservaton Form. 1 state variable for each input + 1 more for displaying the datetime picker component.
// hikeIn - switch component input, date - date time picker component
// new Date - constructor which is built into javascript for creating a date object.
// handleReservation - event handler function used by the reservation screen when the form is submitted. showing the value of each state variable.
// setCampers, setHikeIn, etc. - resets the state variables back to their initial values with each ones setting function. ie: reset campers back to 1, hike in to false.
// new Date - sets to another date object which defaults to the current date.
// Picker - drop down list of items, like select in html.
// selectedValue, onValueChange - built in props from picker, onValueChange set = to a callback function that gets called each time the user makes a selection with the picker.
// setCampers(itemValue) - 1st parameter = item value user selected and use that to set our local state variable campers with the setCampers function.
// (Picker.Item) label = what the user sees, value = what gets passed to the onValueChange prop when the user makes a selection.
// Switch - React native component similar to checkbox or toggle on off. 3 built in props for switch - value, trackColor (has a true & false property), onValueChange - triggered when user changes the value.
// onValueChange = to a callback function that receives a parameter with the new value named value. set hikeIn state variable with the setHikeIn function = value parameter.
// onPress - toggles the value of the showCalendar state variable.
// title prop = value of date state variable formatted to US month/day/year.
// accessibilityLabel - to help with screen readers.
// showCalendar - date/time picker component. Only want to show date/time picker if showCalendar state variable is set to true from the user clicking the button. 
// logical && operator - if left side operand is false, right side is not evaluated at all.
// onDateChange details are listed in the react native documentation for the calendar, this is set up like the docs say.

const ReservationScreen = () => {
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleReservation = () => {
        const message = 
        `Number of Campers:  ${campers},
        \nHike-In?  ${hikeIn},
        \nDate:  ${date.toLocaleDateString('en-US')},
        `
        Alert.alert(
            'Begin Search?',
            message,
            [
                {
                    text: 'CANCEL',
                    onPress: () => resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => resetForm()
                }
            ],
            { cancelable: false }
        )
        console.log('campers:', campers);
        console.log('hikeIn:', hikeIn);
        console.log('date:', date);
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
    };

    return (
        <ScrollView>
            <Animated.View
                animation='zoomIn'
                duration={2000}
                delay={1000}
            >
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers:</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={campers}
                        onValueChange={(itemValue) => setCampers(itemValue)}
                    >
                        <Picker.Item label='1' value={1} />
                        <Picker.Item label='2' value={2} />
                        <Picker.Item label='3' value={3} />
                        <Picker.Item label='4' value={4} />
                        <Picker.Item label='5' value={5} />
                        <Picker.Item label='6' value={6} />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike In?</Text>
                    <Switch
                        style={styles.formItem}
                        value={hikeIn}
                        trackColor={{ true: '#5637DD', false: null }}
                        onValueChange={(value) => setHikeIn(value)}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date:</Text>
                    <Button
                        onPress={() => setShowCalendar(!showCalendar)}
                        title={date.toLocaleDateString('en-US')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a reservation date'
                    />
                </View>
                {showCalendar && (
                    <DateTimePicker
                        style={styles.formItem}
                        value={date}
                        mode='date'
                        display='default'
                        onChange={onDateChange}
                    />
                )}
                <View style={styles.formRow}>
                    <Button
                        onPress={() => handleReservation()}
                        title='Search Availability'
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>
            </Animated.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default ReservationScreen;
