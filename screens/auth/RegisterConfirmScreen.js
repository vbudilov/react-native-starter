import React, {Component} from 'react';
import {TextInput} from 'react-native';
import {Button, Container, Content, Header, Icon, Item, Left, Right, Text} from 'native-base';
import Auth from '@aws-amplify/auth';
import {Logger} from '@aws-amplify/core';
import {authStyle} from "./style";
import DropdownAlert from 'react-native-dropdownalert';
import validator from 'validator';


export default class RegisterConfirmScreen extends Component {

    state = {
        username: "",
        password: ""
    };

    logger = new Logger('LoginScreen');

    componentWillMount() {
        this.logger.info("In componentWillMount. ");
        let loggedIn = false;

        Auth.currentAuthenticatedUser()
            .then(user => {
                this.logger.info("Redirecting to activities");
                this.props.navigation.navigate('Secure');
            })
            .catch(err => {
                this.logger.info("Not logged in");
            });
    }


    confirmSignUp() {
        const {username, confirmationCode} = this.state;
        this.logger.info("Confirming sign-up: " + this.props.navigation.state.params.username);

        if (validator.isEmpty(this.state.username) || !validator.isEmail(this.state.username)) {
            this.logger.info("Username validation error");
            this.dropdown.alertWithType('error', 'Error', "A valid email is required");
            return null;
        }


        if (validator.isEmpty(confirmationCode)) {
            this.logger.info("Confirmation code validation error");
            this.dropdown.alertWithType('error', 'Error', "A valid code is required");
            return null;
        }

        Auth.confirmSignUp(username, confirmationCode)
            .then(() => {
                this.logger.info('successful confirm sign up! Redirecting to SignIn');

                this.props.navigation.navigate('Login', {
                    username: username,
                    password: this.state.password
                })
            })
            .catch(err => {
                this.logger.info('error confirming signing up!: ', err);
                this.dropdown.alertWithType('error', 'Error', err.message);
            })
    }

    render() {
        const {navigate} = this.props.navigation;


        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent>
                            <Icon style={{color: "#0f0007"}} name="arrow-back"/>
                        </Button>
                    </Left>
                    <Right>
                        {/*<Button transparent>*/}
                        {/*    <Text  style={{color: "#0f0007"}}>Cancel</Text>*/}
                        {/*</Button>*/}
                    </Right>
                </Header>

                <Content padder>

                    <Text style={{fontSize: 25, marginTop: 20}}>
                        Confirm your registration (code was emailed)
                    </Text>
                    <Item style={{marginTop: 20}}>
                        <TextInput style={authStyle.textInput}
                                   onChangeText={(text) => this.setState({username: text})}
                                   autoCapitalize="none"
                                   onSubmitEditing={() => this.confirmationCode.focus()}
                                   autoCorrect={false}
                                   underlineColorAndroid='transparent'
                                   keyboardType='email-address'
                                   returnKeyType="next"
                                   placeholder='email'
                                   value={this.state.username}
                        />
                    </Item>
                    <Item style={{marginTop: 20}}>
                        <TextInput style={authStyle.textInput}
                                   placeholder="confirmation code"
                                   onChangeText={(text) => this.setState({confirmationCode: text})}
                                   underlineColorAndroid='transparent'
                                   keyboardType='numeric'
                                   ref={(input) => this.confirmationCode = input}
                                   value={this.state.confirmationCode}
                        />
                    </Item>

                    <Button full light style={{height: 50}}
                            onPress={() => this.confirmSignUp()}>
                        <Text>Confirm</Text>
                    </Button>
                </Content>

                <DropdownAlert ref={ref => this.dropdown = ref}/>
            </Container>
        );
    }
}
