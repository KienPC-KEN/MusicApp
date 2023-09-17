import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TextTicker from 'react-native-text-ticker';

import Slider from 'react-native-slider-x';

import { useMusicContext } from './context/MusicContext';

const MusicPlayerBar = () => {
    const { currentSong,
        currentPlayList,
        togglePlayPause,
        isPlaying,
        songProgress,
        onSliderValueChange,
        handleSongNextRandom } = useMusicContext();
    const [modalVisible, setModalVisible] = useState(false);


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // Hàm này để định dạng thời gian thành dạng phút:giây
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (

        currentSong ? (<View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    closeModal();
                }}>
                <StatusBar hidden />
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Icon name='chevron-down' size={32} onPress={() => setModalVisible(!modalVisible)} style={styles.iconCloseModal} />
                            <Text style={styles.textTitleModal} >{currentPlayList ? currentPlayList.name : 'No Playlist'}</Text>
                            <Icon name='ellipsis-horizontal' size={22} style={styles.iconCloseModal} />
                        </View>
                        <Image source={{ uri: currentSong.img }} style={styles.imgModal} />
                        <View style={{ flexDirection: 'row', }}>
                            <TextTicker
                                style={styles.textSongModal}
                                duration={10000} // Điều chỉnh tốc độ chạy chữ (milliseconds)
                                loop
                                bounce
                                repeatSpacer={32}
                            >
                                {currentSong.name}
                            </TextTicker>
                            <Icon name='add-circle-outline' size={30} color={'white'} style={{ marginLeft: 24, marginTop: 16 }} />
                        </View>
                        <Text style={styles.textAuthorModal}> {currentSong.author}</Text>
                        <Slider
                            style={{ width: '90%', height: 40 }}
                            disabled
                            minimumValue={0}
                            maximumValue={currentSong.duration}
                            value={songProgress}
                            onValueChange={onSliderValueChange}
                            minimumTrackTintColor="grey"
                            maximumTrackTintColor="#333"
                            thumbTintColor="transparent"
                        />
                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', marginRight: 150 }}>
                                {formatTime(songProgress)}
                            </Text>
                            <Text style={{ color: 'white', marginLeft: 150 }}>
                                {formatTime(currentSong.duration)}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', top: 24, marginRight: 16 }}>
                                <Icon name='shuffle' size={36} color={'#00CC00'} style={{}} />
                                <Text style={{ color: '#00CC00', fontSize: 40, bottom: 44 }}>.</Text>
                            </View>
                            <Icon disabled name='play-skip-back' size={30} color={'grey'} style={{ marginLeft: 32 }} />
                            <TouchableOpacity onPress={togglePlayPause}>
                                <Icon name={isPlaying ? 'pause-circle' : 'play-circle'} size={50} color="white" style={{ marginLeft: 32 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSongNextRandom}>
                                <Icon name='play-skip-forward' size={30} color={'white'} style={{ marginLeft: 32 }} />
                            </TouchableOpacity>

                            <Icon name='remove-circle-outline' size={30} color={'white'} style={{ marginLeft: 48 }} />



                        </View>



                    </View>
                </View>
            </Modal >
            <TouchableOpacity
                onPress={openModal} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: currentSong.img }} style={styles.img} />
                    <View style={{ flexDirection: 'column' }}>
                        <TextTicker
                            style={styles.songTitle}
                            duration={10000} // Điều chỉnh tốc độ chạy chữ (milliseconds)
                            loop
                            bounce
                            repeatSpacer={32}
                        >
                            {currentSong.name}
                        </TextTicker>

                        <Text style={styles.artistName}>{currentSong.author}</Text>
                    </View>

                    <TouchableOpacity onPress={togglePlayPause}>
                        <Icon name={isPlaying ? 'pause' : 'play'} size={30} color="white" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>



        </View >) : null

    );
};

const styles = {
    container: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        width: 380,
        borderRadius: 8,
        flexDirection: 'row',
        height: 65,
        alignItems: 'center',
        backgroundColor: '#333333',
        padding: 10,
    },
    img: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginTop: 8,
        marginBottom: 8,
        marginRight: 12,

    },
    songTitle: {
        width: 200,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 17,
    },
    artistName: {
        fontStyle: 'italic',
        color: 'grey',
    },

    icon: {
        left: 60
    },


    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    modalView: {
        flex: 1,
        width: "100%",
        backgroundColor: 'black',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconCloseModal: {
        borderRadius: 20,
        padding: 16,
        color: 'white',
    },
    textTitleModal: {
        width: 250,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    imgModal: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginTop: 50,
        marginBottom: 64,
    },
    textSongModal: {
        width: 300,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 26,
        alignSelf: 'flex-start',
        marginLeft: 16,
    },
    textAuthorModal: {
        width: 300,
        color: '#C0C0C0',
        fontSize: 16,
        marginLeft: 28,
        alignSelf: 'flex-start',
    }
};

export default MusicPlayerBar;
