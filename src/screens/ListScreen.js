import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { CustomButton } from '../components/customButton.js';
import { ListComponent } from '../components/listComponent.js';
import Axios from 'axios';
import styles from '../components/styles.js'

export function ListScreen({ route, navigation }) {
  const { username } = route.params;
  const [listOfFish, setListOfFish] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const apiUrl = `http://192.168.1.247:3001/getFish`;

  const fetchFishData = () => {
    const params = { user: username };

    Axios.get(apiUrl, { params }).then((response) => {
      setListOfFish(response.data);
    });
  };

  useEffect(() => {
    fetchFishData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFishData();
    });
    return unsubscribe;
  }, [navigation]);

  const toggleMenu = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };

  return (
    <View style={styles.containerCenter}>
      <View style={styles.inputContainer}>
      <Text style={styles.welcomeText}>Witaj
        <Text style={{fontWeight: 'bold'}}> {username}</Text>
        !</Text>
      <CustomButton 
          title="Menu"
          style={styles.button} 
          onPress={toggleMenu} 
      /></View>
      {showMenu === true && (<><View style={styles.buttonsContainer}>
        <Pressable
          style={styles.menuButton} 
          onPress={() => {
            navigation.navigate('Dodaj złowioną rybę', { username });
            toggleMenu();
          }}><Text style={styles.menuButtonText}>Dodaj rybę</Text>
        </Pressable>
        <Pressable 
          style={styles.menuButton} 
          onPress={() => {
            navigation.navigate('Wyszukaj rybę', { username });
            toggleMenu();
          }}>
          <Text style={styles.menuButtonText}>Szukaj</Text></Pressable>
        <Pressable 
          style={styles.menuButton} 
          onPress={() => {
            navigation.navigate('Moje konto', { username });
            toggleMenu();
          }}>
          <Text style={styles.menuButtonText}>Konto</Text></Pressable>
      </View></>)}
      <ListComponent listOfFish={listOfFish} />
    </View>
  );
}
