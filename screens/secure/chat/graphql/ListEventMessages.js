export default `
query ListEventMessages(
    $eventId: String!,
    $first: Int,
    $after: String
  ) {
    listEventMessages(
    eventId: $eventId,
    first: $first,
    after: $after
  ){
      items{
              __typename
                eventId
                messageId
                message
                createdDate
                user {
                    userId
                    email
                    name
                    profileImage
                }
            },
          nextToken
    }
}`;
