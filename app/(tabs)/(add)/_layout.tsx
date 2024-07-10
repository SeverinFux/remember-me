import React from 'react';
import {Stack} from 'expo-router';
import IndexScreen from './index';
import DetailsScreen from './details';
import {NavigationContainer} from '@react-navigation/native';


function Layout() {
    return (
        <Stack
            screenOptions={{
                headerTitleStyle: {fontWeight: 'bold'},
                headerBackTitle: 'Back',
                headerBackButtonMenuEnabled: true,
            }}
        >
            <Stack.Screen name='index' options={{title: 'Create Foto'}}/>
            <Stack.Screen name='details' options={{title: 'Set ur Details'}}/>
        </Stack>

    );
}

export default Layout