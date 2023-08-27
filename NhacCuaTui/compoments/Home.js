import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ItemPlayList from './item/itemPlayList';
import ItemPlayList2 from './item/ItemPlayList2';

const Home = () => {

    const listPlaylists = [
        { id: 1, name: "Lofi Chill Nhạc Việt 2023", img: "https://mosaic.scdn.co/300/ab67616d00001e024493b8e39ce5d7d633882637ab67616d00001e025de1e9bc4bda094138f3643bab67616d00001e029c4af0e750e385ecbdafee7cab67616d00001e02b9e69cfcff062c7adc732c2a", status_0: 0, status_1: 1, status_2: 0, status_3: 1 },
        { id: 2, name: "Mới ra lò", img: "https://wallpaperaccess.com/full/1077119.jpg", status_0: 0, status_1: 0, status_2: 1, status_3: 1 },
        { id: 3, name: "Thoải mái gác chân lên", img: "https://i.scdn.co/image/ab67706f0000000262bc6f22c2512f7801a734c8", status_0: 0, status_1: 0, status_2: 1, status_3: 1 },
        { id: 4, name: "Daily Mix 1", img: "https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb206a97aa01385ef684f8e58c/1/en/large", status_0: 0, status_1: 1, status_2: 0, status_3: 1 },
        { id: 5, name: "Lofi thật lâu phai", img: "https://i.scdn.co/image/ab67706f00000002b8d4b3c31e3c26dde1ec3917", status_0: 0, status_1: 1, status_2: 0, status_3: 1 },
        { id: 6, name: "Nhạc Việt chill dễ ngủ", img: "https://mosaic.scdn.co/300/ab67616d00001e0202dc41ad81138aa3c53d2b98ab67616d00001e02110f5ff2ab2ab53e1cf5c2ccab67616d00001e021e239b69aacaf275c9106948ab67616d00001e02636bd3e9f31e1ea1e7bb389e", status_0: 0, status_1: 1, status_2: 0, status_3: 0 },
        { id: 7, name: "Tuyển tập của Rain Radio", img: "https://axinh.net/wp-content/uploads/2022/05/hinh-nen-may-tinh-lofi-chill-1024x576.jpg", status_0: 1, status_1: 0, status_2: 1, status_3: 0 },
        { id: 8, name: "Tuyển tập của Vũ.", img: "https://i.scdn.co/image/ab67706c0000da8406f8ee356d72bf5a98ad405a", status_0: 1, status_1: 0, status_2: 1, status_3: 1 },
        { id: 9, name: "Nấu ăn cho em", img: "https://i.scdn.co/image/ab67616d00001e02bcbd4a38b226dbd8041ac4b2", status_0: 1, status_1: 0, status_2: 0, status_3: 1 },
        { id: 10, name: "Daily Mix 2", img: "https://dailymix-images.scdn.co/v2/img/cdf7b84018f2c6c769ea16e0cd43d1a34c12fc0a/2/en/large", status_0: 1, status_1: 0, status_2: 1, status_3: 0 },
        { id: 11, name: "Daily Mix 3", img: "https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebff873b9ceb0d3f883035067c/3/en/large", status_0: 1, status_1: 1, status_2: 0, status_3: 0 },
        { id: 12, name: "Daily Mix 4", img: "https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb5bebfdee4c4cfea3473a51ab/4/en/large", status_0: 1, status_1: 0, status_2: 1, status_3: 0 },
    ];



    const listSongs = [];

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

                <FlatList
                    data={listPlaylists.filter(item => item.status_0 === 1)}
                    renderItem={({ item }) => <ItemPlayList item={item} />}
                    keyExtractor={(item) => item.id}
                    style={{ marginTop: 16 }}
                    numColumns={2}
                    scrollEnabled={false} />

                <Text style={styles.text}>Mới phát gần đây</Text>
                <FlatList
                    data={listPlaylists.filter(item => item.status_1 === 1)}
                    renderItem={({ item }) => <ItemPlayList2 item={item} />}
                    keyExtractor={(item) => item.id}
                    style={{ marginTop: 12 }}
                    horizontal={true} />

                <Text style={styles.text}>Lựa chọn của Spotify</Text>
                <FlatList
                    data={listPlaylists.filter(item => item.status_2 === 1)}
                    renderItem={({ item }) => <ItemPlayList2 item={item} />}
                    keyExtractor={(item) => item.id}
                    style={{ marginTop: 12 }}
                    horizontal={true} />

                <Text style={styles.text}>Tâm trạng</Text>
                <FlatList
                    data={listPlaylists.filter(item => item.status_3 === 1)}
                    renderItem={({ item }) => <ItemPlayList2 item={item} />}
                    keyExtractor={(item) => item.id}
                    style={{ marginTop: 12 }}
                    horizontal={true} />
            </ScrollView>


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
