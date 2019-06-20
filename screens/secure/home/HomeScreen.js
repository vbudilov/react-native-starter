import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import {Container, Content} from "native-base";
import {mainStyle} from "../../../common/style";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        recommendations: [{
            name: "Basketball",
            organizer: "Friends",
            location: "Philadelphia, PA",
            time: "12:00PM",
            date: "Today"
        },
            {name: "Basketball", organizer: "Friends", location: "Philadelphia, PA", time: "12:00PM", date: "Today"},
            {name: "Basketball", organizer: "Friends", location: "Philadelphia, PA", time: "12:00PM", date: "Today"},
            {name: "Basketball", organizer: "Friends", location: "Philadelphia, PA", time: "12:00PM", date: "Today"}],
        highDemand: [],
        groupsYouIn: [],
        selectedPickerValue: "All Sports"
    };

    onValueChange(value) {
        this.setState({
            selectedPickerValue: value
        });
    }


    render() {
        return (
            <Container>
                <Content contentContainerStyle={mainStyle.content}>
                    <Text style={{marginBottom: 10, marginTop: 15, marginLeft: 10, fontSize: 20}}>Welcome Home</Text>
                </Content>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
