import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

// ActivityIndicator - built-in RN component that displays a circular loading indicator, followed by inline styles instead of in stylesheet.

function Loading() {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size='large' color='#5637DD' />
            <Text style={styles.loadingText}>Loading . . .</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
        color: '#5637DD',
        fontsize: 14,
        fontWeight: 'bold'
    }
});

export default Loading;