export default `

mutation CreateEventMessage(
    $eventId: String!, $message: String!
  ){
    createEventMessage(input: {eventId: $eventId, message: $message}){
      __typename
     eventId
    messageId
    message
    createdDate
    user {
      userId
      email
      name
    }
    }
}`;
