import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
    },
  
    logo: {
      height: 32,
      resizeMode: "contain",
      alignSelf: 'center',
      marginTop: 10
    },

    button: {
      height: 42,
      backgroundColor: '#f05a5b',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
    },
  
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });