import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './compoments/Home';
import Search from './compoments/Search';
import Library from './compoments/Library';

const Tab = createBottomTabNavigator();

const TabNav = () => {

    return (
        <Tab.Navigator
            initialRouteName={"Trang chủ"}
            screenOptions={() => ({
                headerShown: false,
                keyboardHidesTabBar: false,
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#666666',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarInactiveBackgroundColor: '#000000',
                tabBarActiveBackgroundColor: '#000000',
            })}>

            <Tab.Screen name={"Trang chủ"} component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
                }}
            />

            <Tab.Screen name={"Tìm kiếm"} component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='search' color={color} size={size} />
                }}
            />

            <Tab.Screen name={"Thư viện"} component={Library}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='library' color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default TabNav;
