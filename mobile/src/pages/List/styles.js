import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 30
  },

  spotContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  spotStatusAprov: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00ff00'
  },

  spotStatusReprov: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff0000'
  },

  spotImage: {
    width: 175,
    height: 175,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#FFF',
    marginTop: 30,
  },

  spotCompany: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF'
  },

  spotTechs: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 30
  },

  spotClose: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold'
  },
  
});