import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    /* SearchFishScreen.js */
    container: {
      flex: 1,
      padding: 16,
    },
    label: {
      fontSize: 16,
    },
    input: {
      flex: 1,
      height: 40,
      paddingHorizontal: 8,
      marginHorizontal: 6,
    },
    textInput: {
      flex: 0.5,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 3,
      paddingHorizontal: 10,
      marginLeft: 10,
      backgroundColor: '#E9EFF4',
      elevation: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 8,
    },
    containerCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    welcomeText: {
      fontSize: 18,
      marginRight: 20,
    },
    buttonsContainer: {
      width: '85%',
      flexDirection: 'column', 
      justifyContent: 'space-evenly', 
      padding: 10,
    },
    loginContainer: {
      flexDirection: 'column', 
      justifyContent: 'space-evenly', 
      width: '85%',
      height: 250,
      padding: 20,
      backgroundColor: '#D5DDE8',
      marginHorizontal: 20,
      borderRadius: 10,
      elevation: 3,
    },
    listContainer: {
      width: '100%',
      marginTop: 10,
    },
    listItem: {
      backgroundColor: '#D5DDE8',
      marginBottom: 7,
      borderRadius: 5,
      flexDirection: 'row', 
      alignItems: 'center', 
      padding: 10,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#374A67',
    },
    itemDetail: {
      fontSize: 14,
    },
    loginInput: {
      marginBottom: 7, 
      backgroundColor: 'white', 
      borderRadius: 4, 
      padding: 5, 
      paddingLeft: 10,
      borderColor: '#56606D', 
      borderWidth: 1.5,
    },
    fishImage: {
      width: 140,       
      height: 120,
      resizeMode: 'contain',
    },
    fishImageContainer: {
      marginRight: 17, 
    },
    fishDetails: {
      flex: 1, 
    },
    menuButton: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginVertical: 4,
      backgroundColor: '#E9EFF4',
      borderRadius: 5,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuButtonText: {
      fontSize: 18,
      lineHeight: 21,
      letterSpacing: 0.25,
      color: '#2D2F36',
    },
    searchContainer: {
      flexDirection: 'column', 
      justifyContent: 'space-evenly', 
      width: '100%',
      height: 280,
      paddingLeft: 20,
      paddingVertical: 10,
      backgroundColor: '#D5DDE8',
      marginHorizontal: 20,
      marginVertical: 13,
      borderRadius: 10,
      elevation: 3,
    },
    fishInputContainer: {
      flexDirection: 'column', 
      justifyContent: 'space-evenly', 
      width: '90%',
      height: 200,
      padding: 20,
      backgroundColor: '#D5DDE8',
      margin: 15,
      borderRadius: 10,
      elevation: 3,
    },
    bigFishImage: {
      width: 300,       
      height: 200,
      resizeMode: 'contain',
    }
  });

  export default styles;