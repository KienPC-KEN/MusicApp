import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Button, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_IP } from './config/Config'
import ItemPLayListSearch from './item/ItemPLayListSearch';
import { useMusicContext } from './context/MusicContext';
import MusicPlayerBar from './MusicPlayerBar';

const Search = ({ navigation }) => {

    const [data, setdata] = useState([]);
    const { currentSong } = useMusicContext();

    const fetchData = (linkAPI) => {
        return fetch(linkAPI)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } return response.json();
            })
            .then((jsonData) => {
                if (jsonData && jsonData.dataJson) {
                    return jsonData.dataJson;
                } else {
                    throw new Error('Invalid data format');
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        const apiData = `http://${API_IP}:3000/api/`;
        fetchData(apiData)
            .then((data) => setdata(data))
            .catch((error) => {
                console.log(error + ' lỗi lấy dữ liệu');
            });

    }, []);
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: 'row', top: 50 }}>
                    <Text style={styles.textTilte}>Tìm kiếm</Text>
                    <Ionicons name="camera-outline" size={30} color={'#ffffff'} style={{ fontWeight: 'bold', marginRight: 16 }} />
                </View>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={26} color="black" />
                    <TextInput
                        placeholder='Bạn muốn nghe gì?'
                        style={styles.textInputSearch}
                        onPressOut={() => navigation.navigate('SearchSong')}
                    />
                </View>
                <Text style={styles.textContentSearch}>Duyệt tìm tất cả</Text>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <ItemPLayListSearch item={item.playlist} navigation={navigation} />}
                    keyExtractor={(item) => item.playlist._id}
                    numColumns={2}
                    scrollEnabled={false} />
            </ScrollView>
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
    textTilte: {
        flex: 1,
        fontSize: 24,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 16,
    },
    searchContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 8,
        width: 360
    },
    textInputSearch: {
        height: 40,
        marginLeft: 10,

    },
    textContentSearch: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 16,
    },
})

export default Search;
