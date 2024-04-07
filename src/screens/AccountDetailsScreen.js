import React, { useState } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { CustomButton } from '../components/customButton';
import Axios from 'axios';
import styles from '../components/styles';

export function AccountDetailsScreen({ route, navigation }) {
  const { username } = route.params;

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');

  const logout = () => {
    navigation.navigate('Home');
    // Reset username and password in the Login component
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const updatePassword = async () => {
    try {
      const newPassword = password;

      if (currentPassword === '' || newPassword === '') {
        Alert.alert('Błąd', 'Podaj nowe hasło.');
        return;
      }

      const response = await Axios.post('http://192.168.1.247:3001/changePassword', {
        username,
        currentPassword, 
        newPassword,
      });

      if (response.data.success) {
        Alert.alert('Sukces!', 'Hasło zostało zmienione.');
        setCurrentPassword('');
        setPassword('');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Błąd', 'Podano nieprawidłowe stare hasło.');
      } else {
        console.error('Error changing password:', error.message);
      }
    }
  };

  return (
    <View style={styles.containerCenter}>
      <Text style={{fontSize: 20, marginBottom: 16,}}>Konto użytkownika
        <Text style={{fontWeight: 'bold'}}> {username}</Text>
      </Text>
      <View style={styles.loginContainer}>
      <TextInput
          value={currentPassword}
          onChangeText={(text) => setCurrentPassword(text)}
          style={styles.loginInput}
          placeholder="Podaj stare hasło..."
          secureTextEntry={true}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.loginInput}
          placeholder="Wpisz nowe hasło..."
          secureTextEntry={true}
        />
        <View style={{marginBottom: 5}}><CustomButton 
          title="Zmień hasło" 
          onPress={updatePassword} /></View>
        <CustomButton 
          title="Wyloguj się" 
          onPress={logout} />
      </View>
    </View>
  );
}
