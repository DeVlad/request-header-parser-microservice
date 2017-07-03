var express = require('express');
var uaParser = require('ua-parser');
var app = express();
var port = process.env.PORT || 80;

app.use(express.static('public'))

app.get('/', function (req, res) {    
    res.sendFile('index.html');
});

app.get('/api', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var userAgent = req.headers['user-agent'];
    var lang = req.headers["accept-language"].split(",")[0];
    var parsed = uaParser.parse(req.headers['user-agent']);
    var osys = parsed.os.toString() || 'unknown';
    res.send(`{ "ip": "${ip}", "language": "${lang}", "software": "${osys}" }`);
});

app.listen(port);