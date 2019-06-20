React Native App with Cognito
===============================
#### Creator: Vladimir Budilov
* [LinkedIn](https://www.linkedin.com/in/vbudilov/)
* [Medium](https://medium.com/@budilov)


After reinventing the wheel a bunch of times I decided to create a fairly good-looking react native with Cognito template. 
### Quickstart

```
yarn install
```


### Tech stack/Frameworks/Services:

1. React Native
2. AWS Amplify
3. AWS Cognito
4. Native Base

Note: You will have to create your own AWS Cognito User Pool in order to use this app (otherwise it'll default to my sample User Pool and all fo the users that register for your copy of the app will be registered in my User Pool). Once you create it, update the amplify-configs.js file under /constants. 

```
Found in /constants/amplify-config.js

        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_######',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '#########',
```


##### The next step is to include a fully-functioning chat functionality with AWS Amplify and AWS AppSync. That's in the works. 
