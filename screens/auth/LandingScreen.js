import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
import {Button, Container, Content, Text} from 'native-base';
import {authStyle} from "./style";
import Auth from '@aws-amplify/auth';
import {Logger} from '@aws-amplify/core';

export default class LandingScreen extends Component {

    logger = new Logger('LandingScreen');


    componentDidMount() {
        Auth.currentAuthenticatedUser()
            .then(user => {
                this.logger.info("Redirecting to activities");
                this.props.navigation.navigate('Secure');
            })
            .catch(err => {
                this.logger.info("Not logged in");
            });
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <Container>
                <ImageBackground source={require('../../assets/images/homescreen-background.jpg')}
                                 style={{flex: 1, alignContent: "center"}}>
                    <Content>
                        <Text style={{marginTop: 100, color: "black", alignSelf: "center", fontSize: 20}}>
                            Welcome message goes here
                        </Text>
                    </Content>
                </ImageBackground>
                <View style={{position: "absolute", width: "100%", bottom: 0, alignSelf: "center"}}>
                    <Button full light style={authStyle.landingPageLoginButton}
                            onPress={() => navigate('Login')}>
                        <Text>Sign In</Text>
                    </Button>
                    <Button full dark style={authStyle.landingPageCreateAccountButton}
                            onPress={() => navigate('Register')}>
                        <Text>Create Account</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}
