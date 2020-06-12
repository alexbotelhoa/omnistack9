import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import { Alert, SafeAreaView, ScrollView, Image, AsyncStorage, TouchableOpacity } from 'react-native'

import styles from './styles';
import logo from '../../assets/logo.png';
import SpotList from '../../components/SpotList';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
          const socket = socketio('http://192.168.1.101:3333', {
            query: { user_id }
          })
    
          socket.on('booking_response', booking => {
            Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
          })
        })
    }, []);
    
    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
          const techsArray = storagedTechs.split(',').map(tech => tech.trim());
    
          setTechs(techsArray);
        })
    }, []);
    
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
    </SafeAreaView>
    )
}