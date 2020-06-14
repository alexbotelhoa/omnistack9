import React, { useState } from 'react';
import { SafeAreaView, Alert, TouchableOpacity, AsyncStorage, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import styles from './styles';
import api from '../../services/api';

export default function Book({ navigation }) {
  const [date, setDate] = useState('10/10/2020');
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    })

    Alert.alert('Solicitação de reserva enviada.');

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <Text style={styles.formatData}>(DD/MM/AAAA)</Text>
      <TextInputMask
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY'
        }}
        value={date}
        onChangeText={date => {
          setDate(date)
        }}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}