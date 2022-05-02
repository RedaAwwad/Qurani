const router = require('express').Router();
const request = require('request');
const { surasNames } = require('./sourasNames');

// Get Reciters
let reciters = '';
request.get('http://mp3quran.net/api/_arabic.php', (err, res, body) => {
    if (err) return console.log(err);
    // All Reciters
    reciters = JSON.parse(body).reciters;
});

 // Get all Reciters Route
router.get('/api/reciters', (req, res) => {
    res.send(reciters);
});

// Get Single Reciter Route
router.get('/api/reciters/:id', (req, res) => {
    let reciterId = req.params.id;
    // Verify ID value
    if (isNaN(reciterId)) return res.status(422).json({code: 422, error: 'Not a valid ID!' });
    
    // Check About Id is Found
    const currentReciter = reciters.find((reciter) => reciter.id === reciterId);

    if (!currentReciter) return res.status(404).json({ code: 404, message: 'ID Not Found!' });

    let suras = [];
    let index = 0;
    currentReciter.suras.split(',').forEach((sura, i) => {	
        index = sura;	
        while (sura.length < 3) sura = "0" + sura;	

        suras[i] = {	
            id: index,	
            name: surasNames[index],	
            url: currentReciter.Server+ '/' + sura + '.mp3'	
        };	
    });	

    currentReciter.surasData = suras;

    res.send(currentReciter);
});

module.exports = router;