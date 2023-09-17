import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ItemSearch = ({ item, onPress, navigation }) => {
    if (!item) {
        return null;
    }

    return (
        item.playlist ? (
            <TouchableOpacity onPress={() => { navigation.navigate('Playlist', { item: item.playlist }) }}>
                <View style={styles.container}>
                    <Image source={{ uri: item.playlist.img }} style={styles.img} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textName}>{item.playlist.name}</Text>
                        <Text style={styles.textAuthor}>{item.playlist.author}</Text>
                    </View>
                    <Ionicons name='chevron-forward' size={20} color={'#C0C0C0'} style={{ marginRight: 16 }} />
                </View>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <Image source={{ uri: item.img }} style={styles.img} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textAuthor}>{item.author}</Text>
                    </View>
                    <Ionicons name='ellipsis-horizontal' size={20} color={'#C0C0C0'} style={{ marginRight: 16 }} />
                </View>
            </TouchableOpacity>
        )

    );
}

const styles = StyleSheet.create({
    container: {
        width: 380,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'row',
        margin: 8,
    },
    img: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        marginLeft: 16,
    },
    textName: {
        width: 270,
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 10
    },
    textAuthor: {
        width: 270,
        color: '#C0C0C0',
        fontSize: 16,
        marginLeft: 10,

    }

})

export default ItemSearch;
