// MusicPlayerContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { API_IP } from '../config/Config';

const MusicContext = createContext();

export function useMusicContext() {
    return useContext(MusicContext);
}

export function MusicProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState();
    const [currentSong, setCurrentSong] = useState(null);
    const [currentPlayList, setCurrentPlayList] = useState(null);
    const [songProgress, setSongProgress] = useState(0);
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

    const playSong = async (song, playList) => {
        if (sound) {
            await sound.unloadAsync();
        }
        // Tạo đường dẫn local cho tệp âm thanh
        const localFilePath = `http://${API_IP}:3000/music/${song.url}`;

        const { sound: newSound } = await Audio.Sound.createAsync({ uri: localFilePath });
        setSound(newSound);
        setIsPlaying(true);
        setCurrentSong(song);
        setSongProgress(0);
        setCurrentPlayList(playList);

        await newSound.playAsync();
    };

    const pauseSound = async () => {
        if (sound && isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);

        }
    };
    const togglePlayPause = () => {
        if (isPlaying) {
            pauseSound();
        } else if (sound) {
            sound.playAsync();
            setIsPlaying(true);
        }
    };

    const handleSongRandom = async (playList) => {
        const randomIndex = Math.floor(Math.random() * playList.songs.length);
        const randomSong = playList.songs[randomIndex];

        // Phát bài hát ngẫu nhiên
        playSong(randomSong, playList);
    };

    const handleSongNextRandom = async () => {
        if (currentPlayList) {
            const uniqueSongs = currentPlayList.songs.filter(song => song !== currentSong);

            const randomIndex = Math.floor(Math.random() * uniqueSongs.length);
            const randomSong = uniqueSongs[randomIndex];

            // Phát bài hát ngẫu nhiên
            playSong(randomSong, currentPlayList);
        } else {
            const allSongs = [];
            data.forEach(item => {
                allSongs.push(...item.playlist.songs);
              
            })

            const remainingSongs = allSongs.filter(song => song !== currentSong);

            if (remainingSongs.length > 0) {

                const randomIndex = Math.floor(Math.random() * remainingSongs.length);
                const randomSong = remainingSongs[randomIndex];


                playSong(randomSong, currentPlayList);
            } else {
                // Không có bài hát nào để phát
                console.log("Không có bài hát nào để phát.");
            }
        }
    };

    const onSliderValueChange = (value) => {
        setSongProgress(value);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentSong) {
                // Kiểm tra xem có bản nhạc nào đang phát không
                if (isPlaying && songProgress < currentSong.duration) {
                    // Tăng giá trị của songProgress lên mỗi giây
                    setSongProgress(songProgress + 1);
                } else if (songProgress >= currentSong.duration) {
                    // Bài hát kết thúc, xử lý chọn bài hát ngẫu nhiên
                    handleSongNextRandom();
                }
            }
        }, 1000); // Cập nhật mỗi giây

        // Xóa interval khi component unmount
        return () => clearInterval(interval);
    }, [isPlaying, songProgress, currentSong]);
    const value = {
        currentSong,
        currentPlayList,
        isPlaying,
        songProgress,
        playSong,
        pauseSound,
        togglePlayPause,
        onSliderValueChange,
        handleSongRandom,
        handleSongNextRandom,
    };
    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
}
