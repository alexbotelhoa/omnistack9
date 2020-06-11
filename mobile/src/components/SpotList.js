import React, { useState, useEffect, useMemo } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import socketio from 'socket.io-client'

import styles from './styles';
import api from '../services/api';

function SpotList({ tech, navigation }) {
  const [mensageCrudBackend, setMensageCrudBackend] = useState('');  
  const [spots, setSpots] = useState([]);

  const user_id = AsyncStorage.getItem('user');

  const socket = useMemo(() => socketio('http://192.168.1.101:3333', {
    query: { user_id },
  }), [user_id]);

  useEffect(() => {
    socket.on('spot_update', data => {
        setMensageCrudBackend(data)
    })
  }, [socket]);

  useEffect(() => {
    async function loadSpots() {
      const res = await api.get('/spots', {
        params: { tech }
      })

      setSpots(res.data);
    }

    loadSpots();
  }, [user_id, mensageCrudBackend]);

  function handleNavigate(id) {
    navigation.navigate('Book', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default withNavigation(SpotList);