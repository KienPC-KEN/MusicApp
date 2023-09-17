import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const ItemPlayList = ({ item, navigation }) => {

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
        width: 180,
        borderRadius: 12,
        backgroundColor: '#333333',
        flexDirection: 'row',
        margin: 8,
    },
    img: {
        width: 80,
        height: 70,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        resizeMode: 'contain',
    },
    text: {
        width: 100,
        color: 'white',
        fontSize: 14,
        margin: 8,
        fontWeight: 'bold'
    }
})

export default ItemPlayList;
