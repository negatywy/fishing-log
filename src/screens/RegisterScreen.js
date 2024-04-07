import React, { useState } from 'react';
import { TextInput, View, Alert, Text } from 'react-native';
import { CustomButton } from '../components/customButton.js';
import styles from '../components/styles.js'
import Axios from 'axios';

export function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      if (!username || !password) {
        Alert.alert('Błąd rejestracji', 'Wprowadź poprawny login i hasło.', [{ text: 'OK' }]);
        return; 
      }
      
      await Axios.post('http://192.168.1.247:3001/register', {
        username,
        password,
      });

      Alert.alert('Udało Ci się zarejestrować!', 'Teraz możesz zalogować się do aplikacji.',
        [{
          text: 'Powrót',
          onPress: () => {
              navigation.navigate('Home');
          },
        },]
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === "Username already exists") {
        Alert.alert(
          'Błąd rejestracji',
          'Podany użytkownik już istnieje. Wybierz inny login.',
          [{ text: 'OK' }]
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.containerCenter}>
      <View style={styles.loginContainer}>
      <Text style={{fontSize: 18, marginBottom: 10, marginHorizontal: 33}}>Załóż konto w aplikacji!</Text>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.loginInput}
        placeholder="Wpisz login..."
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.loginInput}
        placeholder="Wpisz hasło..."
        secureTextEntry={true}
      />
      <CustomButton title="Zarejestruj się" onPress={onSubmit} />
      </View>
    </View>
  );
}
