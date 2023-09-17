const mongoose = require('mongoose');

const PlayListSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    status_0: { type: Number, required: true },
    status_1: { type: Number, required: true },
    status_2: { type: Number, required: true },
    status_3: { type: Number, required: true },

})

const PlayListModel = mongoose.model('playlist', PlayListSchema);
module.exports = PlayListModel;