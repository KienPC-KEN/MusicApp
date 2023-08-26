import React from 'react';
import { View, StyleSheet, Text, Image, Button, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = () => {
    const getGreetingMessage = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            return 'Chào buổi sáng';
        } else if (currentHour >= 12 && currentHour < 18) {
            return 'Chào buổi chiều';
        } else {
            return 'Chào buổi tối';
        }
    };
    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', top: 50 }}>
                <Text style={styles.textTilte}>{getGreetingMessage()}</Text>
                <Ionicons name='notifications-outline' size={24} color={'#ffffff'} style={{ fontWeight: 'bold', marginRight: 16 }} />
                <Ionicons name="timer-outline" size={24} color={'#ffffff'} style={{ fontWeight: 'bold', marginRight: 16 }} />
                <Ionicons name="settings-outline" size={24} color={'#ffffff'} style={{ fontWeight: 'bold', marginRight: 16 }} />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 80, marginLeft: 16, alignSelf: 'flex-start' }}>
                <TouchableOpacity activeOpacity={0.6} style={styles.buttonTilte}>
                    <Text style={{ color: "white", fontSize: 16 }}>Nhạc</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.buttonTilte}>
                    <Text style={{ color: "white", fontSize: 16 }}>Podcast và chương trình</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    textTilte: {
        flex: 1,
        fontSize: 24,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 16,
    },
    buttonTilte: {
        marginRight: 16,
        backgroundColor: '#333333',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 16,
    }
})

export default Home;
