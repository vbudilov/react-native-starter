import React from 'react';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import {Button, Container, Content, Header, Icon, Item, Left, Right, Text} from 'native-base';
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
                        <Button transparent onPress={() => navigate('RegisterFN')}>
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
                            What's your last name?
                        </Text>
                        <Item style={{marginTop: 20}}>
                            <TextInput style={authStyle.textInput}
                                       placeholder="last name"
                                       onChangeText={(text) => this.setState({lastName: text})}
                                       ref={(input) => this.lastName = input}
                                       value={this.state.lastName}/>
                        </Item>

                        <Button full light style={{height: 50}}
                                onPress={() => navigate('RegisterDOB', {
                                    username: this.state.username,
                                    password: this.state.password,
                                    firstName: this.state.firstName,
                                    lastName: this.state.lastName
                                })}>
                            <Text>Next</Text>
                        </Button>

                    </Content>

                <DropdownAlert ref={ref => this.dropdown = ref}/>
            </Container>
        );
    }
}
