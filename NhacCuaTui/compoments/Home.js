import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = () => {
    return (
        <View style={styles.container}>

            <Image
                source={{ uri: 'https://tse1.mm.bing.net/th?id=OIP.eabwvduaVNHfhfmZvb-1TAHaEK&pid=Api&P=0&h=180' }} // Ảnh nền
                style={styles.backgroundImage}
            />
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', top: 50 }}>
                <Text style={styles.textTilte}>Dành cho bạn</Text>
                <Ionicons name='search' size={22} color={'#ffffff'} style={{ fontWeight: 'bold' }} />
            </View>
            <Image
                source={{ uri: 'https://tse1.mm.bing.net/th?id=OIP.eabwvduaVNHfhfmZvb-1TAHaEK&pid=Api&P=0&h=180' }} // Ảnh lớp ngoài cùng (là cùng một ảnh)
                style={styles.overlayImage}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.6, // Điều chỉnh độ mờ của ảnh overlay
    },
    overlayImage: {
        position: 'absolute',
        top: 180,
        left: 0,
        width: '100%',
        height: '50%',
    },
    textTilte: {
        fontSize: 22,
        marginRight: 220,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default Home;
