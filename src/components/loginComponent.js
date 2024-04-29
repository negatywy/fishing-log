import React, { useState } from 'react';
import { TextInput, View, Alert } from 'react-native';
import { CustomButton } from './customButton';
import Axios from 'axios';
import styles from './styles';

function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
        await Axios.post('http://192.168.1.247:3001/user/login', {
            username, password,
        });     
        navigation.navigate('Lista ryb', { username });
    } catch (err) {
      Alert.alert('Błąd logowania', 'Podano nieprawidłową nazwę użytkownika lub hasło.',
        [{
          text: 'OK',
          onPress: () => {
              console.log('username or password incorrect');
          },
        },]
      );
      console.error(err);
    }
  };

  return (
    <View style={{flexDirection: 'column'}}>
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
      <View style={{marginBottom: 10, marginTop: 7}}><CustomButton 
        title="Zaloguj" 
        onPress={handleLogin} />
      </View>
      <CustomButton 
          title='Zarejestruj się'
          onPress={() => navigation.navigate('Rejestracja')} />
    </View>
  );
}

export default Login;