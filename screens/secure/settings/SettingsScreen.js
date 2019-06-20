import React from 'react';
import {KeyboardAvoidingView, StyleSheet, Text} from 'react-native';
import {Body, Button, Container, Content, Icon, Left, ListItem, Right} from "native-base";

import Auth from '@aws-amplify/auth';
import {Logger} from '@aws-amplify/core';

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
    },
    userImage: {
        marginRight: 12,
    },
    listContainer: {
        marginBottom: 0,
        marginTop: 0,
        borderTopWidth: 0,
    },
    listItemContainer: {
        borderBottomColor: '#ECECEC',
    },
});

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        user: {
            pushNotifications: true,
            name: "Vladimir Budilov",
            email: "vladimir@budilov.com",
            location: "Philadelphia, PA"
        },
        notifications: false
    };

    logger = new Logger('Settings');

    onLogOut = () => {
        Auth.signOut()
            .then(data => {
                console.log("Logged out successfully. Redirecting to SignIn. ");
                this.props.navigation.navigate('Login');
            })
            .catch(err => console.log(err));
    };


    render() {
        // const { avatar, name, emails: [firstEmail] } = this.props
        return (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1, backgroundColor: '#fff'}}>

                <Container style={styles.scroll}>
                    {/*<Header/>*/}
                    <Content>

                        <ListItem icon onPress={() => this.onLogOut()}>
                            <Left>
                                <Button
                                    style={{backgroundColor: "#007AFF"}}>
                                    <Icon active name="bluetooth"/>
                                </Button>
                            </Left>
                            <Body>
                                <Text>Logout</Text>
                            </Body>
                            <Right>
                                <Text>On</Text>
                                <Icon active name="arrow-forward"/>
                            </Right>
                        </ListItem>

                    </Content>
                </Container>
            </KeyboardAvoidingView>
        )
    }
}


