import React from 'react';
import {Button, Container, Content, Header, Icon, Item, Left, Right, Text} from 'native-base';
import {KeyboardAvoidingView, TextInput} from "react-native";
import {authStyle} from "./style";
import DropdownAlert from "react-native-dropdownalert";

export default class RegisterUsernameScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={() => navigate('RegisterPassword')}>
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
                        What's your first name?
                    </Text>
                    <Item style={{marginTop: 20}}>
                        <TextInput style={authStyle.textInput}
                                   placeholder="first name"
                                   onChangeText={(text) => this.setState({firstName: text})}
                                   ref={(input) => this.firstName = input}
                                   value={this.state.firstName}/>
                    </Item>
                        <Button full light style={{height: 50}}
                                onPress={() => navigate('RegisterLN', {
                                    username: this.state.username,
                                    password: this.state.password,
                                    firstName: this.state.firstName
                                })}>
                            <Text>Next</Text>
                        </Button>
                </Content>

                <DropdownAlert ref={ref => this.dropdown = ref}/>
            </Container>
        );
    }
}
