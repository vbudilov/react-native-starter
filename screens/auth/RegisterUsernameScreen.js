import React from 'react';
import {Button, Container, Content, Header, Icon, Item, Left, Right, Text} from 'native-base';
import {KeyboardAvoidingView, TextInput} from "react-native";
import validator from 'validator';
import DropdownAlert from 'react-native-dropdownalert';
import {Logger} from '@aws-amplify/core';
import {authStyle} from "./style";

export default class RegisterUsernameScreen extends React.Component {
    logger = new Logger('RegisterUsernameScreen');

    constructor(props) {
        super(props);

        this.state = {username: ""}
    }

    next = (navParams) => {
        if (validator.isEmpty(this.state.username) || !validator.isEmail(this.state.username)) {
            this.logger.info("Email validation error");
            this.dropdown.alertWithType('error', 'Error', "A valid email is required");
            return null;
        }

        this.props.navigation.navigate('RegisterPassword', navParams);
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={() => navigate('Main')}>
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
                    <Text style={{fontSize: 30, marginTop: 20}}>
                        What's your email?
                    </Text>
                    <Item style={{marginTop: 20}}>
                        <TextInput style={authStyle.textInput}
                                   placeholder="username"
                                   onChangeText={(text) => this.setState({username: text})}
                                   ref={(input) => this.username = input}
                                   value={this.state.username}/>
                    </Item>
                </Content>
                <Content style={{position: "absolute", width: "100%", bottom: 0, alignSelf: "center"}}>
                    <Button full light style={{height: 50}}
                            onPress={() => this.next({username: this.state.username})}>
                        <Text>Next</Text>
                    </Button>
                </Content>
                <KeyboardAvoidingView behavior={'padding'}/>
                <DropdownAlert ref={ref => this.dropdown = ref}/>
            </Container>
        );
    }
}
