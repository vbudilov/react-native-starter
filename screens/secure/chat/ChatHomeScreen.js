import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base";

import React from 'react';
import {Logger} from "@aws-amplify/core";
// import {API, Auth, graphqlOperation, Logger} from "@aws-amplify/core";
// import {SettingsService} from "../settings/services/settings-service";

export class ChatHomeScreen extends React.Component {

    logger = new Logger('Chat');

    constructor(props) {
        super(props);
    }

    render() {
        this.logger.info("Enter render(). username: ", this.myself);
        const {navigate} = this.props.navigation;
        return (
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                        <Title>Conversation List</Title>
                    </Body>

                </Header>
                <Content>
                    <Button full light style={{height: 50}}
                            onPress={() => navigate('ChatRoom', {name: 'Group name'})}>
                        <Text>Chat Now</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}
