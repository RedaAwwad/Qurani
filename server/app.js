const express = require('express');
const app = express();
const recitersAPI = require('./api/reciters');

// Access Cross Origin
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

app.use(recitersAPI);

// 404 Not Found
app.get('*', (req, res, next) => {
    return res.status(404).json({code: 404, message: 'Not Found!' });
});

app.listen(process.env.PORT || 8000, () => console.log('The app is running on port 8000'));