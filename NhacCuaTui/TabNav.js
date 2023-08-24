import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './compoments/Home';
import Discovery from './compoments/Discovery';
import Profile from './compoments/Profile';

const Tab = createBottomTabNavigator();

const TabNav = () => {

    return (
        <Tab.Navigator
            initialRouteName={"Dành cho bạn"}
            screenOptions={() => ({
                headerShown: false,
                keyboardHidesTabBar: false,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#A9A9A9',
                tabBarLabelStyle: { fontSize: 12 },

            })}>

            <Tab.Screen name={"Dành cho bạn"} component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='play-circle' color={color} size={size} />
                }}
            />

            <Tab.Screen name={"Khám Phá"} component={Discovery}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='headset' color={color} size={size} />
                }}
            />

            <Tab.Screen name={"Của Tui"} component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='person' color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default TabNav;
