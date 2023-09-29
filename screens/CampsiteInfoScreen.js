import { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import { Input, Rating } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { postComment } from '../features/comments/commentsSlice';
import * as Animatable from 'react-native-animatable'

// Navigation and route props are available via react.  route will be used to ge the navigation params passed to the navigation function back in the directory screen.
// route: destructuring the route prop in the parameter list of the CampsiteInfoScreen function.
// const campsite: destructuring to get the campsite param from the route.params object, which is where all the params for this route are located.
// FlatList component will handle rendering all the contents for the page including the list of comments. This replaces RenderCampsite. FlatList needs to be at the top level of component tree for the component it's in to properly calculate the scroll height and make the entire page scrollable.
// To get specific comments we'll filter by campsite.id property.
// Getting campsite.id from route prop
// data=comments.filter: filtering all the comments from the comments array that have an id that matches the id from the campsite we're currently rendering. (campsite.id coming from route prop.) This will result in array of comments that match this particular comapsites ID.
// style=styles.commentItem: custom style in the stylesheet, it's a javascript object.
// fontSize: 14 - When you use double curly braces, the first one is telling that you are going to write JavaScript, and the second one is creating a JavaScript object. This is because the style attribute expects a JavaScript object as its value.
// item.text: only 1 set of curly braces because item.text isn't an object but rather, it's a reference to the `text` property of the `item` object.
// item.author, item.data: template literal syntax, add dashes and a comma to results.
// keyExtractor prop - set the comments to use their unique Id they have, for the key.
// contentContainerStyle - since flatList is rendering the entire content, use special prop of contentContainerStyle to add styles.
// marginHorizontal: add space to sided, padding Vertical: space on top & bottom.
// ListHeaderComponent: shows content above the flatlist, can also use the other built in component, ListFooterComponent. ListHeader receives a single argument (campsite).
// RenderCampsite: displays campsite prop in a title above, both the title and text are wrapped in a fragment so we're only passing in a single parent component. 
// favorites = useSelector - access our favorites data from redux store via useSelector hook.
// state.favorites - const favorites = a call to useSelector which takes a selector function as an argument.  The selector function has the entire redux state as it's parameter and returns a specific slice of the state like state.comments.
// dispatch = useDispatch - need a reference to our dispatch function from redux set equal to constant dispatch. From useDispatch hook we imported from React/Redux.
// isFavorite=favorites.includes - checking if the favorites array contains this campsites id. resolves to true or false, the result is passed to isFavorite. Since we're not changing the data type being passed to isFavorite we don't need to update the RenderCampsite component.
// markFavorite - clicking on the heart icon cause markFavorite to be called.  dispatches our toggleFavorite action and passes in campsite.id as the action payload.

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        };
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    startingValue={item.rating}
                    imageSize={10}
                    readonly
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                />
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <FlatList
                data={comments.commentsArray.filter(
                    (comment) => comment.campsiteId === campsite.id
                )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20
                }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() =>
                                dispatch(toggleFavorite(campsite.id))
                            }
                            onShowModal={() => setShowModal(!showModal)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Rating
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)}
                        style={{ paddingVertical: 10 }}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(author) => setAuthor(author)}
                        value={author}
                    />
                    <Input
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(text) => setText(text)}
                        value={text}
                    />
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                            }}
                            color='#5637DD'
                            title='Submit'
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm();
                            }}
                            color='#808080'
                            title='Cancel'
                        />
                    </View>
                </View>
            </Modal>
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;