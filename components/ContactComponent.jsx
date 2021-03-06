import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card } from 'react-native-elements';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card title='Contact Information' wrapperStyle={{margin: 20}}>
                        <Text style={{marginBottom: 10}}>1 Nucamp Way {'\n'}
                                Seattle, WA 98001 {'\n'}
                                U.S.A.
                        </Text>
                        <Text>Phone: 1-206-555-1234</Text>
                        <Text>Email: campsites@nucamp.co</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;