import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { API_IP } from './config/Config';

import ItemSearch from './item/ItemSearch';
import { useMusicContext } from './context/MusicContext';
import MusicPlayerBar from './MusicPlayerBar';

const SearchSong = ({ navigation }) => {
    const [data, setdata] = useState([]);
    const [searchText, setSearchText] = useState('');
    const { playSong, currentSong } = useMusicContext();

    const fetchData = (linkAPI) => {
        return fetch(linkAPI)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } return response.json();
            })
            .then((jsonData) => {

                if (jsonData) {
                    if (jsonData.songs) {
                        return jsonData.songs;
                    } else if (jsonData.playlists) {
                        return jsonData.playlists;
                    } else {
                        return [];
                    }

                } else {
                    throw new Error('Invalid data format');
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        const apiData = `http://${API_IP}:3000/api/search?name=${searchText}&author=${searchText}`;
        fetchData(apiData)
            .then((data) => setdata(data))
            .catch((error) => {
                console.log(error + ' lỗi lấy dữ liệu');
            });
    }, [searchText]);

    const handleClearText = () => {
        setSearchText('');
    };
    return (
        <View style={styles.container}>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={22} color="white" />
                <TextInput
                    placeholderTextColor='#CCCCCC'
                    placeholder='Bạn muốn nghe gì?'
                    style={styles.textInputSearch}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    autoFocus
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={handleClearText} style={styles.clearButton}>
                        <Ionicons name="close" size={20} color="white" style={{ position: "absolute", bottom: -10, right: 8 }} />
                    </TouchableOpacity>
                )}
                <Text style={{ position: "relative", color: 'white', marginLeft: 16 }} onPress={() => navigation.navigate('Tìm kiếm')}>Hủy</Text>
            </View>
            {searchText.length > 0 && (
                <FlatList
                    data={data}
                    renderItem={({ item }) => <ItemSearch item={item} navigation={navigation} onPress={async () => {
                        playSong(item)
                        console.log(item);
                    }} />}
                    keyExtractor={(item) => item._id || item.playlist._id}
                    style={{ marginTop: 12 }}
                />
            )}
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
    searchContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
        backgroundColor: '#333333',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 16,
        width: 320
    },
    textInputSearch: {
        borderRadius: 8,
        backgroundColor: '#333333',
        height: 40,
        marginLeft: 10,
        width: 280,
        color: 'white',
    },
})

export default SearchSong;
