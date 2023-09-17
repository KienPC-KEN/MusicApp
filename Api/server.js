const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dataRouter = require('./router/data.router');

const app = express();

const uri = "mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/MyMusic"
mongoose.connect(uri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/music', express.static('music'));

app.use('/api', dataRouter);

const port = 3000;

app.get('/', (req, res) => {
    return res.redirect('/api');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});