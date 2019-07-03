import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/secure/home/HomeScreen';
import SettingsScreen from '../screens/secure/settings/SettingsScreen';
import {ChatStackNavigator} from "../screens/secure/chat/ChatNavigation";


// Home Tab
const HomeStack = createStackNavigator({
    Home: HomeScreen,
});
HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home${focused ? '' : '-outline'}`
                    : 'md-home'
            }
        />
    ),
};

// Chat Tab
const ChatStack = createStackNavigator({
        Chat: ChatStackNavigator,
    },
    {
        headerMode: 'none'
    });
ChatStack.navigationOptions = {
    tabBarLabel: 'Chat',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'}
        />
    ), header: null,
};


// Settings Tab
const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});
SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
        />
    ), header: null,
};

export default createBottomTabNavigator({
    HomeStack,
    SettingsStack,
    ChatStack,
}, {
    tabBarOptions: {
        showLabel: false,
        header: null,
    }
});
