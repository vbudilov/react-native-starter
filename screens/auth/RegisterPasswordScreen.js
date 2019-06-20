import React from 'react';
import {Button, Container, Content, Header, Icon, Item, Left, Right, Text} from 'native-base';
import {KeyboardAvoidingView, TextInput} from "react-native";
import DropdownAlert from 'react-native-dropdownalert';
import validator from "validator";
import {authStyle} from "./style";
import Auth from '@aws-amplify/auth';
import {Logger} from '@aws-amplify/core';

export default class RegisterUsernameScreen extends React.Component {
    logger = new Logger('RegisterUsernameScreen');

    constructor(props) {
        super(props);
        this.state = {username: "", password: ""}

    }

    componentDidMount() {
        this.setState({
                "username":
                    this.props.navigation.getParam('username')
            }
        )
    }

    signUp = (registrationParams) => {
        const {username, password} = this.state;

        if (validator.isEmpty(username) || !validator.isEmail(username)) {
            this.logger.info("Email validation error");
            this.dropdown.alertWithType('error', 'Error', "A valid email is required");
            return null;
        }

        if (validator.isEmpty(password) || username.length < 2) {
            this.setState({passwordErrorMessage: "The password is required"});
            this.logger.info("Password validation error");
            this.dropdown.alertWithType('error', 'Error', "A password is required");
            return null;
        }

        this.setState({signingUp: true});

        Auth.signUp({
            username,
            password,
            attributes: {
                email: username
            }
        })
            .then(() => {
                this.logger.info('successful sign up!');
                this.setState({signingUp: false});
                this.props.navigation.navigate('RegisterConfirm', registrationParams)
            })
            .catch(err => {
                this.logger.info('error signing up!: ', err);
                this.dropdown.alertWithType('error', 'Error', err.message);
                this.setState({signingUp: false});
            })
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={() => navigate('Register')}>
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
                    <KeyboardAvoidingView behavior={'padding'}>

                    <Text style={{fontSize: 30, marginTop: 20}}>
                        What's your password?
                    </Text>
                    <Item style={{marginTop: 20}}>
                        <TextInput style={authStyle.textInput}
                                   placeholder="password"
                                   type={"password"}
                                   onChangeText={(text) => this.setState({password: text})}
                                   ref={(input) => this.passwordInput = input}
                                   secureTextEntry
                                   value={this.state.password}
                        />
                    </Item>
                    </KeyboardAvoidingView>
                </Content>
                <Content style={{position: "absolute", width: "100%", bottom: 0, alignSelf: "center"}}>
                    <Button full light style={{height: 50}}
                            onPress={() => this.signUp({
                                username: this.state.username,
                                password: this.state.password
                            })}>
                        <Text>Register</Text>
                    </Button>
                </Content>
                <DropdownAlert ref={ref => this.dropdown = ref}/>
            </Container>
        );
    }
}
