import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { CustomButton } from './customButton.js';
import styles from './styles.js'

const fishImages = {
  Sum: require('../images/sum.png'),      
  Płoć: require('../images/ploc.png'),
  Okoń: require('../images/okon.png'),
  Szczupak: require('../images/szczupak.png'),
  Leszcz: require('../images/leszcz.png'),
  Karp: require('../images/karp.png'),
  Sandacz: require('../images/sandacz.png'),
};

export function ListComponent({ listOfFish }) {
  return (
    <ScrollView style={styles.listContainer}>
      {listOfFish.length > 0 ? (
        listOfFish.map((fish) => (
          <View key={fish._id} style={styles.listItem}>
            <View style={styles.fishImageContainer}>
              <Image
                source={fishImages[fish.gatunek]}
                style={styles.fishImage}
              />
            </View>
            <View style={styles.fishDetails}>
              <Text style={styles.itemTitle}>Gatunek: {fish.gatunek}</Text>
              <Text style={styles.itemDetail}>Waga:
                <Text style={{fontWeight: 'bold'}}> {fish.weight} kg</Text>
              </Text>
              <Text style={styles.itemDetail}>Długość: 
                <Text style={{fontWeight: 'bold'}}> {fish.length} cm</Text>
              </Text>
              <Text style={styles.itemDetail}>
                Data złowienia:
                <Text style={{fontWeight: 'bold'}}> {new Date(fish.catchDate).toLocaleDateString()}</Text>
              </Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.listItem}>
          <Text style={styles.itemDetail}>Brak ryb spełniających kryteria.</Text>
        </View>
      )}
    </ScrollView>
  );
}
