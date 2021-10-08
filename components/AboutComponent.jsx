import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading  from './LoadingComponent';

// mapState receives state as a prop and returns 
// state data needed
// we will need to pass mapStatetoprops to the connect
const mapStateToProps = state => {
    return {
        // for the About component, we only need the partner state 
        partners: state.partners
    };
};

function Mission(){
    return (
        <Card title='Mission'>
            <Text style={{margin: 10}}>
                We present a curated database of the best campsites in 
                the vast woods and backcountry of the World Wide Web 
                Wilderness. We increase access to adventure for the public
                while promoting safe and respectful use of resources. The 
                expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    );
}

class About extends Component {
    // we removed constructor bc we dont need local state
    //any place we used state.partners now needs to be
    // props.partners.partners

    static navigationOptions = {
        title: 'About Us'
    }

    render() {

        function renderPartner({item}){
            return (
                <ListItem title={item.name} 
                          subtitle={item.description}
                          leftAvatar={{source: {uri: baseUrl + item.image}}}/>
            );
        }
// accessing partners reducer isLoading prop
        if(this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card title='Community Partners'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
// accessing partners reducer errMess prop to return err message
        if (this.props.partners.errMess) {
            return(
                <ScrollView>
                    <Mission />
                    <Card title='Community Partners'>
                        <Text>{this.props.partners.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }

        return (
            <ScrollView>
                <Mission />
                <Card title='Community Partners'>
                    <FlatList data={this.props.partners.partners} 
                              keyExtractor= {item => item.id.toString()}
                              renderItem={renderPartner }/>
                </Card>
            </ScrollView>
        );
    }
}

// connects the About comp to the redux store to make sure
// it receives the partners prop 
export default connect(mapStateToProps)(About);