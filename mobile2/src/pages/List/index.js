import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import styles from './styles';
import logo from '../../assets/logo.png';

export default function List({ navigation }) {
    async function handleLogout() {
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }

    return (
        <View>
            <Text>List</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}