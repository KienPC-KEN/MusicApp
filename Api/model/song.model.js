const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    duration: { type: Number, required: true },
    img: { type: String, required: true },
    url: { type: String, required: true },
    idPlaylist: { type: Array, required: true },
})

const SongModel = mongoose.model('song', SongSchema);
module.exports = SongModel;