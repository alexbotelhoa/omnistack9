import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import { View, Text, SafeAreaView, ScrollView, Image, AsyncStorage, TouchableOpacity } from 'react-native'

import styles from './styles';
import logo from '../../assets/logo.png';
import SpotList from '../../components/SpotList';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);
    const [matchSpot, setMatchSpot] = useState(null)
    const [mensageCrudBackend, setMensageCrudBackend] = useState(false);    

    useEffect(() => {
      AsyncStorage.getItem('user').then(user_id => {
        const socket = socketio('http://192.168.1.101:3333', {
          query: { user_id }
        })

        socket.on('spotCrud', date => {
          setMensageCrudBackend(date)
        })

        socket.on('booking', date => {
          setMatchSpot(date)
        })
      })
    }, []);
    
    useEffect(() => {
      AsyncStorage.getItem('techs').then(storagedTechs => {
        const techsArray = storagedTechs.split(',').map(tech => tech.trim());
  
        setTechs(techsArray);
      })
    }, [mensageCrudBackend]);
  
    async function handleLogout() {
      await AsyncStorage.clear()
      navigation.navigate('Login')
    }

    return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
          <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>

      { matchSpot && (
        <View style={styles.spotContainer}>
          {matchSpot.approved ? 
            <Text style={styles.spotStatusAprov}>Sua reserva foi 'APROVADA'</Text>
          : 
            <Text style={styles.spotStatusReprov}>Sua reserva foi 'REPROVADA'</Text>
          }
          <Image style={styles.spotImage} source={{ uri: 'http://192.168.1.101:3333/files/office3-1591812611268.jpg' }} />

          <Text style={styles.spotCompany}>Sala 3</Text>
          <Text style={styles.spotTechs}>ReactJS, PHP</Text>

          <TouchableOpacity onPress={() => setMatchSpot(null)}>
            <Text style={styles.spotClose}>FECHAR</Text>
          </TouchableOpacity>
        </View>
      ) }
    </SafeAreaView>
    )
}