import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const ItemPLayListSearch = ({ item, navigation }) => {
    if (!item) {
        return null;
    }
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Playlist', { item: item }) }}>
            <View style={styles.container}>
                <Text style={styles.text}>{item.name}</Text>
                <Image source={{ uri: item.img }} style={styles.img} transform={[{ rotate: "35deg" }]} />

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 130,
        borderRadius: 12,
        backgroundColor: '#872178',
        flexDirection: 'row',
        margin: 8,
        overflow: 'hidden',
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 12,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        marginBottom: 8,
        left: 8
    },
    text: {
        width: 120,
        color: 'white',
        fontSize: 16,
        left: 20,
        marginTop: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    }
})

export default ItemPLayListSearch;
