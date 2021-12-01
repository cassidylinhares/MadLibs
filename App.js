import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screens/Login';
import Home from './Screens/Home';
import Play from './Screens/Play';
import Game from './Screens/Game';
import Profile from './Screens/Profile';
import Result from './Screens/Result';
import VideoPlayer from './Screens/VideoPlayer'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Play" component={Play} />
        <Stack.Screen options={{ headerShown: false }} name="Game" component={Game} />
        <Stack.Screen options={{ headerShown: false }} name="Result" component={Result} />
        <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
        <Stack.Screen options={{ headerShown: false }} name="VideoPlayer" component={VideoPlayer} />
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
