import RenderCampsite from '../features/campsites/RenderCampsite';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { COMMENTS } from '../shared/comments';


// Navigation and route props are available via react.  route will be used to ge the navigation params passed to the navigation function back in the directory screen.
// route: destructuring the route prop in the parameter list of the CampsiteInfoScreen function.
// const campsite: destructuring to get the campsite param from the route.params object, which is where all the params for this route are located.
// FlatList component will handle rendering all the contents for the page including the list of comments. This replaces RenderCampsite. FlatList needs to be at the top level of component tree for the component it's in to properly calculate the scroll height and make the entire page scrollable.
// To get specific comments we'll filter by campsite.id property.
// Getting campsite.id from route prop
// data=comments.filter: filtering all the comments from the comments array that have an id that matches the id from the campsite we're currently rendering. (campsite.id coming from route prop.) This will result in array of comments that match this particular comapsites ID.
// style=styles.commentItem: custom style in the stylesheet, it's a javascript object.
// fontSize: 14 - When you use double curly braces, the first one is telling that you are going to write JavaScript, and the second one is creating a JavaScript object. This is because the style attribute expects a JavaScript object as its value.
// RenderCampsite campsite=item: inside the campsite prop of the RenderCampsite, setting the campsite prop = to the campsite data received through route.params. Curly braces around item indicate we're destructuring the item property from the object passed in an an argument to the function..
// item.text: only 1 set of curly braces because item.text isn't an object but rather, it's a reference to the `text` property of the `item` object.

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const [comments, setComments] = useState(COMMENTS);

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14}}>{item.text}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={comments.filter(
                (comment) => comment.campsiteId === campsite.id
            )}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ marginHorizontal: 20, paddingVertical:20 }}
            ListHeaderComponent={
                <>
                    <RenderCampsite campsite={campsite} />
                    <Text style={StyleSheet.commentsTitle}>Comments</Text>
                </>
            }
        />
    );
};

export default CampsiteInfoScreen;