import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import styles from './styles';
import logo from '../../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('marcelbotelho1@hotmail.com');
  const [techs, setTechs] = useState('ReactJS, PHP');
  // const [email, setEmail] = useState('');
  // const [techs, setTechs] = useState('');

  function checkTextInput() {
    if (email == '') return alert('Informe seu e-mail!');
    if (techs == '') return alert('Informe uma tecnologia!');

    handleSubmit()
  };

  async function handleSubmit() {
    const res = await api.post('/sessions', {
      email
    })

    const { _id } = res.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('List');
      }
    })
  }, []);

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={checkTextInput} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
