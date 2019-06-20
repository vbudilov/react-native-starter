import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/secure/home/HomeScreen';
import SettingsScreen from '../screens/secure/settings/SettingsScreen';

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
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    SettingsStack,
}, {
    tabBarOptions: {showLabel: false}
});
