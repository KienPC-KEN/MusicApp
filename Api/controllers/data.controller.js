const mdPlayList = require('../model/playlist.model');
const mdSong = require('../model/song.model');

exports.getData = async (req, res, next) => {
    try {
        const listPlayList = await mdPlayList.find();
        const listSong = await mdSong.find();


        const dataJson = listPlayList.map(playlist => {
            const songsInPlaylist = listSong.filter(song => song.idPlaylist.includes(playlist.id));
            return {
                playlist: {
                    _id: playlist._id,
                    id: playlist.id,
                    name: playlist.name,
                    img: playlist.img,
                    status_0: playlist.status_0,
                    status_1: playlist.status_1,
                    status_2: playlist.status_2,
                    status_3: playlist.status_3,
                    // Sao chép các thuộc tính khác của playlist vào đây
                    songs: songsInPlaylist,
                },

            };
        });

        if (dataJson.length > 0) {

            return res.status(200).json({ dataJson, check: 'có dữ liệu' });
        } else {
            return res.status(404).json({ check: 'không có dữ liệu' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.search = async (req, res) => {
    const { name, author } = req.query

    try {
        let songs = [];

        songs = await mdSong.find({ name: new RegExp(name, 'i') });

        if (songs.length === 0) {
            // Nếu không tìm thấy kết quả theo name trong songs, thì kiểm tra author
            songs = await mdSong.find({ author: new RegExp(author, 'i') });
        }

        if (songs.length > 0) {
            res.status(200).json({ songs });
        } else {

            const playlistsSearch = await mdPlayList.find({ name: new RegExp(name, 'i') })
            const listSong = await mdSong.find();

            const playlists = playlistsSearch.map(playlist => {
                const songsInPlaylist = listSong.filter(song => song.idPlaylist.includes(playlist.id));
                return {
                    playlist: {
                        _id: playlist._id,
                        id: playlist.id,
                        name: playlist.name,
                        img: playlist.img,
                        status_0: playlist.status_0,
                        status_1: playlist.status_1,
                        status_2: playlist.status_2,
                        status_3: playlist.status_3,
                        // Sao chép các thuộc tính khác của playlist vào đây
                        songs: songsInPlaylist,
                    },

                };
            });

            if (playlists.length > 0) {
                res.status(200).json({ playlists });
            } else {
                res.status(404).json({ message: 'Không tìm thấy kết quả nào.' });
            }
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}