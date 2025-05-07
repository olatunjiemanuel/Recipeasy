import React from 'react';
import {Tabs} from 'expo-router';
import TabBar from '../../components/TabBar';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen name="index"/>
            <Tabs.Screen name="search"/>
            <Tabs.Screen name="create"/>
            <Tabs.Screen name="profile"/>
        </Tabs>
    );
}