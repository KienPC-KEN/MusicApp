import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const ItemPlayList2 = ({ item, navigation }) => {
    if (!item) {
        return null;
    }
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Playlist', { item: item }) }}>
            <View style={styles.container}>
                <Image source={{ uri: item.img }} style={styles.img} />
                <Text style={styles.text}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        margin: 8,
    },
    img: {
        width: 150,
        height: 100,
        resizeMode: 'contain',
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginTop: 8,
        fontWeight: 'bold',

    }
})

export default ItemPlayList2;
