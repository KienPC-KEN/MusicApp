import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';

import ItemPlayList from './item/itemPlayList';
import ItemPlayList2 from './item/ItemPlayList2';
import MusicPlayerBar from './MusicPlayerBar';

import { API_IP } from './config/Config'


import { useMusicContext } from './context/MusicContext';



const Home = ({ navigation, route }) => {

    const { currentSong } = useMusicContext();
    const [data, setdata] = useState([]);

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
            <ScrollView>
                <View style={{ flexDirection: 'row', top: 40 }}>
                    <Text style={styles.textTilte}>{getGreetingMessage()}</Text>
                    <Ionicons name='notifications-outline' size={24} color={'#ffffff'} style={{ fontWeight: 'bold', marginRight: 16 }} />
                    <Ionicons name="timer-outline" size={24} color={'#ffffff'} style={{ fontWeight: 'bold', marginRight: 16 }} />
                    <Ionicons name="settings-outline" size={24} color={'#ffffff'} style={{ fontWeight: 'bold', marginRight: 16 }} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 70, marginLeft: 16, alignSelf: 'flex-start' }}>
                    <TouchableOpacity activeOpacity={0.6} style={styles.buttonTilte}>
                        <Text style={{ color: "white", fontSize: 16 }}>Nhạc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.buttonTilte}>
                        <Text style={{ color: "white", fontSize: 16 }}>Podcast và chương trình</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={data.filter(item => item.playlist.status_0 === 1)}
                    renderItem={({ item }) => <ItemPlayList item={item.playlist} navigation={navigation} />}
                    keyExtractor={(item) => item.playlist._id}
                    style={{ marginTop: 16 }}
                    numColumns={2}
                    scrollEnabled={false} />

                <Text style={styles.text}>Mới phát gần đây</Text>
                <FlatList
                    data={data.filter(item => item.playlist.status_1 === 1)}
                    renderItem={({ item }) => <ItemPlayList2 item={item.playlist} navigation={navigation} />}
                    keyExtractor={(item) => item.playlist._id}
                    style={{ marginTop: 12 }}
                    horizontal={true} />

                <Text style={styles.text}>Lựa chọn của Spotify</Text>
                <FlatList
                    data={data.filter(item => item.playlist.status_2 === 1)}
                    renderItem={({ item }) => <ItemPlayList2 item={item.playlist} navigation={navigation} />}
                    keyExtractor={(item) => item.playlist._id}
                    style={{ marginTop: 12 }}
                    horizontal={true} />

                <Text style={styles.text}>Tâm trạng</Text>
                <FlatList
                    data={data.filter(item => item.playlist.status_3 === 1)}
                    renderItem={({ item }) => <ItemPlayList2 item={item.playlist} navigation={navigation} />}
                    keyExtractor={(item) => item.playlist._id}
                    style={{ marginTop: 12 }}
                    horizontal={true} />
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
    buttonTilte: {
        marginRight: 16,
        backgroundColor: '#333333',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 16,
        marginTop: 24,
    }
})

export default Home;
