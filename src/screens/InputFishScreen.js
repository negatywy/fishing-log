import React, { useState } from 'react';
import { Text, View, TextInput, Alert, StyleSheet, Image } from 'react-native';
import { CustomButton } from '../components/customButton.js';
import { FishPicker } from '../components/fishPicker.js';
import Axios from 'axios';
import styles from '../components/styles.js';

const localStyles = StyleSheet.create({
  textInput: {
    flex: 0.8,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginLeft: 10,
    backgroundColor: '#E9EFF4',
    elevation: 1,
  },
});

const fishImages = {
  Sum: require('../images/sum.jpg'),      
  Płoć: require('../images/ploc.jpg'),
  Okoń: require('../images/okon.jpg'),
  Szczupak: require('../images/szczupak.jpg'),
  Leszcz: require('../images/leszcz.jpg'),
  Karp: require('../images/karp.jpg'),
  Sandacz: require('../images/sandacz.jpg'),
};

export function InputFishScreen({ route, navigation }) {
  const { username } = route.params;
  const [gatunek, setGatunek] = useState('');
  const [weight, setWeight] = useState(0);
  const [length, setLength] = useState(0);

  const handleSubmit = () => {
    if (!gatunek || weight <= 0 || length <= 0) {
      Alert.alert('Błąd', 'Jedno lub więcej z wymaganych pól nie zostało uzupełnione.');
      return;
    }

    Axios.post('http://192.168.1.247:3001/postFish', {
      gatunek, user: username, weight, length,
    }).then((response) => {
      Alert.alert('Dodano rybę', 'Powrót do listy', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Lista ryb', { username }),
        },
      ]);
    });
  };

  return (
    <View style={styles.containerCenter}>
      {gatunek != '' && (<><View style={{alignItems: 'center'}}>
        <Image source={fishImages[gatunek]} style={styles.bigFishImage} />
      </View></>)}
      <Text style={{fontSize: 18, fontWeight: 'bold',}}>Wprowadź parametry złowionej ryby.</Text>
      <View style={styles.fishInputContainer}>
      <FishPicker gatunek={gatunek} setGatunek={setGatunek}/>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Waga (kg):</Text>
        <TextInput
          placeholder="podaj wagę"
          style={localStyles.textInput}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Długość (cm):</Text>
        <TextInput
          placeholder="podaj długość"
          style={localStyles.textInput}
          value={length}
          onChangeText={(text) => setLength(text)}
          keyboardType="numeric"
        />
      </View>
      </View>
      <View style={{width: '85%'}}><CustomButton title="Dodaj" onPress={handleSubmit} /></View>
    </View>
  );
}
