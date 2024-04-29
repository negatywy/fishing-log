import React, { useState } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import { CustomButton } from '../components/customButton.js';
import { Picker } from '@react-native-picker/picker';
import { FishPicker } from '../components/fishPicker.js';
import { ListComponent } from '../components/listComponent.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Axios from 'axios';
import styles from '../components/styles.js'

export function SearchFishScreen({ route }) {
  const { username } = route.params;
  const [gatunek, setGatunek] = useState('');
  const [weight, setWeight] = useState(0); 
  const [weightCondition, setWeightCondition] = useState('greater');
  const [length, setLength] = useState(0);
  const [lengthCondition, setLengthCondition] = useState('greater');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showListComponent, setShowListComponent] = useState(false);
  
  const [catchDate, setCatchDate] = useState(new Date());
  const [catchDateCondition, setCatchDateCondition] = useState('before');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateLabel, setDateLabel] = useState('Wybierz datę');

  const fishImages = {
    Sum: require('../images/sum.jpg'),      
    Płoć: require('../images/ploc.jpg'),
    Okoń: require('../images/okon.jpg'),
    Szczupak: require('../images/szczupak.jpg'),
    Leszcz: require('../images/leszcz.jpg'),
    Karp: require('../images/karp.jpg'),
    Sandacz: require('../images/sandacz.jpg'),
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setCatchDate(date);
    hideDatePicker();
    const formattedDate = new Date(date).toLocaleDateString();
    setDateLabel(formattedDate);
  };

  const clearAll = () => {
    setGatunek('');
    setWeight(0);
    setLength(0);
    setLengthCondition('greater');
    setWeightCondition('greater');
    setCatchDate(new Date());
    setCatchDateCondition('before');
    setDateLabel('Wybierz datę');
  };

  const handleSubmit = () => {
    console.log("szukaj");
    setShowListComponent(false);
    setIsSearching(true);
    
    const params = {
      user: username,
      gatunek: gatunek,
      weight: parseFloat(weight), 
      length: parseFloat(length),
      weightCondition: weightCondition,
      lengthCondition: lengthCondition,
      catchDate: catchDate.toISOString(),
      catchDateCondition: catchDateCondition,
    };

    Axios.get('http://192.168.1.247:3001/fish/getFish', { params })
      .then((response) => {
        setSearchResults(response.data);
        setIsSearching(false);
        setShowListComponent(true);
        clearAll();
      });
  };

  return (
    <View style={styles.containerCenter}>
      {showListComponent === false && (<>
      {gatunek != '' && (<><View style={{alignItems: 'center'}}>
        <Image source={fishImages[gatunek]} style={styles.bigFishImage} />
      </View></>)}
      <Text style={{fontSize: 18, fontWeight: 'bold',}}>Wybierz jeden lub więcej parametrów.</Text>
      <View style={styles.searchContainer}>
      <FishPicker gatunek={gatunek} setGatunek={setGatunek} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Waga:</Text>
        <TextInput
          placeholder="podaj wagę"
          style={styles.textInput}
          value={weight.toString()}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"/>
        <Picker
          selectedValue={weightCondition}
          style={styles.input}
          onValueChange={(itemValue) => setWeightCondition(itemValue)}>
          <Picker.Item label="większa" value="greater" />
          <Picker.Item label="mniejsza" value="less" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Długość:</Text>
        <TextInput
          placeholder="podaj długość"
          style={styles.textInput}
          value={length.toString()}
          onChangeText={(text) => setLength(text)}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={lengthCondition}
          style={styles.input}
          onValueChange={(itemValue) => setLengthCondition(itemValue)}>
          <Picker.Item label="większa" value="greater" />
          <Picker.Item label="mniejsza" value="less" />
        </Picker>
        </View>

        <View style={styles.inputContainer}>
          <CustomButton title={dateLabel} onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={catchDate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Picker
            selectedValue={catchDateCondition}
            style={styles.input}
            onValueChange={(itemValue) => setCatchDateCondition(itemValue)}
          >
            <Picker.Item label="Przed datą" value="before" />
            <Picker.Item label="Po dacie" value="after" />
          </Picker>
        </View></View>

      <View style={{width: '85%'}}>
        <CustomButton title="Szukaj" onPress={handleSubmit} />
      </View></>)}
      {showListComponent && (<>
        <CustomButton title="Nowe wyszukiwanie" onPress={() => {
          setShowListComponent(false);
        }} />
        <ListComponent listOfFish={searchResults} /></>
      )}
    </View>
  );
}

