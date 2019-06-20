import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// import MainTabNavigator from './MainTabNavigator';
import LandingScreen from "../screens/auth/LandingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterUsernameScreen from "../screens/auth/RegisterUsernameScreen";
import RegisterPasswordScreen from "../screens/auth/RegisterPasswordScreen";
import RegisterFirstNameScreen from "../screens/auth/RegisterFirstNameScreen";
import RegisterLastNameScreen from "../screens/auth/RegisterLastNameScreen";
import RegisterDOBScreen from "../screens/auth/RegisterDOBScreen";
import MainTabNavigator from "./MainTabNavigator";
import RegisterConfirmScreen from "../screens/auth/RegisterConfirmScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";

export default createAppContainer(createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        Main: LandingScreen,
        Login: LoginScreen,
        ForgotPassword: ForgotPasswordScreen,
        Register: RegisterUsernameScreen,
        RegisterPassword: RegisterPasswordScreen,
        RegisterFN: RegisterFirstNameScreen,
        RegisterLN: RegisterLastNameScreen,
        RegisterDOB: RegisterDOBScreen,
        RegisterConfirm: RegisterConfirmScreen,
        Secure: MainTabNavigator
    },
    {
        navigationOptions: {
            header: null,
        },
    }));
