import {GiftedChat} from 'react-native-gifted-chat'
import {Body, Button, Container, Header, Left, Text, Right, Title} from "native-base";

import React from 'react';
import {Logger} from "@aws-amplify/core";
// import {API, Auth, graphqlOperation, Logger} from "@aws-amplify/core";
import ListEventMessages from './graphql/ListEventMessages';
import SubscribeToEventComments from "./graphql/CreateEventMessageSubscription";

// import {SettingsService} from "../settings/services/settings-service";

export class ChatRoomScreen extends React.Component {

    logger = new Logger('Chat');

    myself = {userId: "ID", name: "Vova"};

    state = {
        messages: []
    };

    // settingsService = new SettingsService();

    constructor(props) {
        super(props);

        // const subscription = API.graphql(
        //     graphqlOperation(SubscribeToEventComments, {eventId: "111"})
        // ).subscribe({
        //     next: (eventData) => {
        //         this.newCommentSubscriptionTrigger(eventData)
        //     }
        // });
        //
        // // Set the eventId and subscription and load the comments
        // this.setState({
        //     eventId: "111",
        //     subscription: subscription
        // }, this.getComments)

    }


    async componentWillMount() {
        // this.getSub(this.setEventIdAndOther());
        // this.myself = await this.settingsService.getMyself();
    }

    /**
     * Subscribes to an event with the activityId.
     */
    setEventIdAndOther() {

        const subscription = API.graphql(
            graphqlOperation(SubscribeToEventComments, {eventId: this.props.navigation.state.params.activityId})
        ).subscribe({
            next: (eventData) => {
                this.newCommentSubscriptionTrigger(eventData)
            }
        });

        // Set the eventId and subscription and load the comments
        this.setState({
            eventId: this.props.navigation.state.params.activityId,
            subscription: subscription
        }, this.getComments)
    }

    /**
     * This method executes when a new comment is received through a subscription
     *
     * @param eventData
     * @returns {Promise<void>}
     */
    async newCommentSubscriptionTrigger(eventData) {
        this.logger.debug("newCommentSubscriptionTrigger");

        if (this.state.userId === eventData.value.data.onCreateEventMessage.user.userId) {
            this.logger.info(this.state.username + " intercepted my own messages: " + eventData.value.data.onCreateEventMessage.text);
            return;
        }
        this.logger.debug("new message", eventData.value.data.onCreateEventMessage);
        let messages = this.state.messages;
        messages.unshift(this.transformOneEventMessageToGiftedChatFormat(eventData.value.data.onCreateEventMessage));
        // this.logger.info("messages after push", messages);
        this.setState({messages: [...this.state.messages]})
    }

    async getSub(callback) {
        let authUser = await Auth.currentAuthenticatedUser();

        this.setState({
            username: authUser.username,
            userId: authUser.signInUserSession.idToken.payload.sub
        }, callback);
        // this.logger.info("authUser", authUser);

        // return await Auth.currentSession().getIdToken().getJwtToken().sub()
    }

    componentWillUnmount() {
        this.logger.info("in componentWillUnmount");
        // Stop receiving data updates from the subscription
        // if (this.state.subscription != null)
        //     this.state.subscription.unsubscribe();
        //todo: Figure this exception out -- WebSocketModule.clos got 1 arguments, expected 3

    }

    /**
     * Retrieve the comments from the DB using AppSync
     *
     * @returns {Promise<void>}
     */
    async getComments() {
        console.log("Calling graphql for eventId of " + this.state.eventId);

        let results = await API.graphql(graphqlOperation(ListEventMessages, {
            eventId: this.state.eventId,
            first: 0,
            after: null
        }));

        // console.log("result", results);

        this.setState({
            messages: this.transformEventMessagesToGiftedChatFormat(results.data.listEventMessages.items),
        })
    }

    /**
     * Loop through the messages and reformat them into the GiftedChat-compatible format
     *
     * @param eventMessages
     * @returns {Array}
     */
    transformEventMessagesToGiftedChatFormat(eventMessages) {
        // console.log("Transforming messages", eventMessages);

        const messages = [];

        if (eventMessages == null)
            return [];

        eventMessages.map((item) => {
            let transformedMessage = this.transformOneEventMessageToGiftedChatFormat(item);
            this.logger.debug("Transformed message: ", transformedMessage);
            messages.push(transformedMessage);
        });

        return messages;
    }

    /**
     * Reformat one message retrieved from the DB into the GiftedChat format
     *
     * @param item
     * @returns {{_id: *, text: *, createdAt: *, user: {_id: string, name: string, avatar: string}}}
     */
    transformOneEventMessageToGiftedChatFormat(item) {
        this.logger.debug("Transforming message", item);

        return {
            _id: item.messageId,
            text: item.message,
            createdAt: item.createdDate,
            user: {
                _id: item.user.userId,
                name: (item.user.name) ? item.user.name : item.user.email,
                avatar: (item.user.profileImage) ? item.user.profileImage : "https://thumbs.dreamstime.com/b/" +
                    "hipster-beard-avatar-glasses-isolated-white-vector-flat-design-illustration-51006103.jpg",
            }
        }
    }

    /**
     * Called when the user adds a comment. Send the comment to the backend using Appsync
     *
     * @param messages
     * @returns {Promise<void>}
     */
    async onSend(messages = []) {

        // Append the message to the list for immediate feedback
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));

        // Save the message using AppSync
        // await API.graphql(graphqlOperation(CreateEventMessage, {
        //     eventId: this.state.eventId,
        //     message: messages[messages.length - 1].text
        // }));
    }


    render() {
        this.logger.info("Enter render(). username: ", this.myself);

        return (
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                        <Title>Chat</Title>
                    </Body>
                    <Right>
                        <Button hasText transparent
                                onPress={() => this.props.navigation.goBack(null)}>
                            <Text>Close</Text>
                        </Button>
                    </Right>
                </Header>

                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.myself.userId,
                        name: this.myself.name,
                        avatar: (this.myself.profileImage) ? this.myself.profileImage : "https://thumbs.dreamstime.com/b/" +
                            "hipster-beard-avatar-glasses-isolated-white-vector-flat-design-illustration-51006103.jpg",
                    }}
                />

            </Container>
        )
    }
}
