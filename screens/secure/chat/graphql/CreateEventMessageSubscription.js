export default `subscription SubscribeToEventComments($eventId: String!) {
  onCreateEventMessage(eventId: $eventId) {
    eventId
    messageId
    message
    userId
    createdDate
  }
}`;