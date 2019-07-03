import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import {ChatRoomScreen} from "./ChatRoomScreen";
import TabBarIcon from '../../../components/TabBarIcon';
import {ChatHomeScreen} from "./ChatHomeScreen";

export const ChatStackNavigator = createStackNavigator({
        ChatRoom: ChatRoomScreen,
        ChatHome: ChatHomeScreen,
    },
    {
        headerMode: 'none',
        initialRouteName: 'ChatHome',
        initialRouteKey: 'ChatHome'
    });
ChatStackNavigator.navigationOptions = {
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home${focused ? '' : '-outline'}`
                    : 'md-home'
            }
        />
    ), header: null,
};

