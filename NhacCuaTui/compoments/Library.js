import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useMusicContext } from './context/MusicContext';
import MusicPlayerBar from './MusicPlayerBar';

const Library = () => {
    const { currentSong } = useMusicContext();
    return (
        <View style={styles.container}>
            <Text style={styles.textTilte}>Chưa làm </Text>
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
        justifyContent: 'center'
    },
    textTilte: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 16,
    },
})

export default Library;
