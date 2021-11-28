import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screens/Login';
import Home from './Screens/Home';
import Play from './Screens/Play';
import Profile from './Screens/Profile';
import Game from './Screens/Game';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Play" component={Play} />
        <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
        <Stack.Screen options={{ headerShown: false }} name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
