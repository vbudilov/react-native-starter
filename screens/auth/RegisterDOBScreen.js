import React from 'react';
import {Button, Container, Content, Header, Icon, Item, Left, Right, Text} from 'native-base';
import {KeyboardAvoidingView, TextInput} from "react-native";
import {authStyle} from "./style";
import DropdownAlert from "react-native-dropdownalert";

export default class RegisterUsernameScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    register = async () => {

    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={() => navigate('RegisterLN')}>
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
                        What's your date of birth?
                    </Text>
                    <Item style={{marginTop: 20}}>
                        <TextInput style={authStyle.textInput}
                                   placeholder="date of birth"
                                   onChangeText={(text) => this.setState({dob: text})}
                                   ref={(input) => this.dob = input}
                                   value={this.state.dob}/>
                    </Item>
                    </KeyboardAvoidingView>
                </Content>
                <Content style={{position: "absolute", width: "100%", bottom: 0, alignSelf: "center"}}>
                    <Button full light style={{height: 50}}
                            onPress={() => this.register()}>
                        <Text>REGISTER</Text>
                    </Button>
                </Content>
                <DropdownAlert ref={ref => this.dropdown = ref}/>
            </Container>
        );
    }
}
