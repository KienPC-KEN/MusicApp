import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';

import ItemSong from './item/ItemSong';

import MusicPlayerBar from './MusicPlayerBar';

import { useMusicContext } from './context/MusicContext';

const Playlist = (props) => {
    let itemPlaylist = props.route.params.item;

    const [img, setImg] = useState(itemPlaylist.img);
    const [name, setName] = useState(itemPlaylist.name);
    const [listSongs, setListSongs] = useState(itemPlaylist.songs);

    // Hàm này để định dạng thời gian thành dạng phút:giây
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours} giờ ${minutes} phút`;
    };
    let sumTime = 0;

    listSongs.forEach(element => {

        sumTime += element.duration;
    });
    const { currentSong, playSong, handleSongRandom } = useMusicContext();
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Ionicons name='chevron-back' style={{ marginTop: 52, marginLeft: 16 }} size={24} color={'#ffffff'} onPress={() => props.navigation.navigate('Trang chủ')} />
                <Image source={{ uri: img }} style={styles.img} />
            </View>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.containerLogo}>
                <Image source={require('../assets/logo.png')} style={{ width: 24, height: 24 }} />
                <Text style={{ color: 'white', fontSize: 16, marginLeft: 8 }}>Spotify</Text>
            </View>

            <Text style={{ color: '#fff991', alignSelf: 'flex-start', marginLeft: 16, marginTop: 8 }}>{formatTime(sumTime)}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                <Ionicons name='add-circle-outline' size={30} color={'#C0C0C0'} style={{ marginRight: 16 }} />
                <Ionicons name='arrow-down-circle-outline' size={30} color={'#C0C0C0'} style={{ marginRight: 16 }} />
                <Ionicons name='ellipsis-horizontal' size={30} color={'#C0C0C0'} style={{ marginRight: 124 }} />
                <View style={{ flexDirection: 'column', alignItems: 'center', top: 32, marginRight: 16 }}>
                    <Ionicons name='shuffle' size={40} color={'#00CC00'} />
                    <Text style={{ color: '#00CC00', fontSize: 50, bottom: 54 }}>.</Text>
                </View>
                <TouchableOpacity onPress={() => handleSongRandom(itemPlaylist)}>
                    <Ionicons name='play-circle' size={60} color={'#00CC00'} />
                </TouchableOpacity>

            </View>
            <FlatList
                data={listSongs}
                renderItem={({ item }) => <ItemSong item={item} onPress={async () => {
                    playSong(item, itemPlaylist)
                    console.log(item);
                }} />}
                keyExtractor={(item) => item._id}
            />
            {currentSong && (
                <>
                    <View style={{ marginTop: 60 }}></View>
                    <MusicPlayerBar />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    img: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginTop: 52,
        marginRight: 24,
        flex: 1
    },
    name: {
        color: 'white',
        fontSize: 24,
        alignSelf: 'flex-start',
        marginLeft: 16,
        marginTop: 16,

    },
    containerLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 16,
        marginTop: 8,
    }
})

export default Playlist;
