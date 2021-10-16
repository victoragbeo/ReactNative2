import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Button, Modal, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
// request redux store to pass Favs state as props
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)) 
};

function RenderComments({comments}) {
    
    const renderCommentItem = ({item}) => {
        return (
            <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
                <Card title='Comments'>
                    <View style={{margin: 10}}>
                        <Text style={{fontSize: 14}}>{item.text}</Text>
                        <Rating style={{fontSize: 12,
                                        alignItems:'flex-start',
                                        paddingVertical: '5%'
                                        }}
                                        startingValue={item.rating}
                                        imageSize= {10}
                                        readonly />
                        
                        
                        <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
                    </View>
                </Card>
            </Animatable.View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function RenderCampsite(props) {

    const {campsite} = props;

    if (campsite) {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Card
                    featuredTitle={campsite.name}
                    image={{uri: baseUrl + campsite.image}}>
                    <Text style={{margin: 10}}>
                        {campsite.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => props.favorite ? 
                                console.log('Already set as a favorite') : props.markFavorite()}
                        />
                        <Icon 
                            name= 'pencil'
                            type= 'font-awesome'
                            color= '#5637DD'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
}

class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state= {
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(campsiteId) {
        this.props.postComment(campsiteId, this.state.rating, this.state.author, this.state.text );
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        })
    }
//we r now tracking campsiteId in the STORE as array we pass 
// campsiteID in markFav to mark
    markFavorite(campsiteId) {
        // pass ID of camp that was marked in postfav()
        this.props.postFavorite(campsiteId);
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
    // we add includes() n pass campID to check if the renderCamp exist 
    // in Fav array which is done thru this.props.favs
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments}  />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                       

                        <Rating showRating
                                startingValue={this.state.rating}
                                imageSize={40}
                                onFinishRating={rating => this.setState({rating: rating})}
                                style={{paddingVertical: 10}}
                        />
                        <Input placeholder='author'
                                leftIcon={{type:'font-awesome', name:'user-o'}}
                                leftIconContainerStyle= {{paddingRight: 10}}
                                value={this.state.author}
                                onChangeText={author => this.setState({author:author})}
                                />
                           
                        
                        <Input placeholder='comment'
                                leftIcon={{type:'font-awesome', name:'comment-o'}}
                                leftIconContainerStyle= {{paddingRight: 10}}
                                value={this.state.text}
                                onChangeText={text => this.setState({text: text})}/>
                         <View style={{margin: 10}}>
                            <Button title='Submit'
                                    color='#5637DD'
                                    onPress={()=> {
                                        this.handleComment(campsiteId)
                                        this.resetForm()
                                    }}
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button title= 'Cancel'
                                    onPress={() => {this.toggleModal()
                                                    this.resetForm()
                                                    }}
                                    color= '#808080'
                                    
                                    >
                            </Button>
                        </View>
                        
                    </View>
                </Modal>
            </ScrollView>
        );

    }
}
const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);