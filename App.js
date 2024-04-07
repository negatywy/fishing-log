import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/loginComponent.js';
import { ListScreen } from './src/screens/ListScreen.js';
import { InputFishScreen } from './src/screens/InputFishScreen.js';
import { SearchFishScreen } from './src/screens/SearchFishScreen.js';
import { AccountDetailsScreen } from './src/screens/AccountDetailsScreen.js';
import { RegisterScreen } from './src/screens/RegisterScreen.js';
import styles from './src/components/styles.js'

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>Fishing log</Text>
      <View style={styles.loginContainer}>
        <Login navigation={navigation}/>
        </View>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lista ryb" component={ListScreen} />
        <Stack.Screen name="Dodaj złowioną rybę" component={InputFishScreen} />
        <Stack.Screen name="Wyszukaj rybę" component={SearchFishScreen} />
        <Stack.Screen name="Moje konto" component={AccountDetailsScreen} />
        <Stack.Screen name="Rejestracja" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;