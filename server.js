var express = require('express');
var app = express();
var twilio = require('twilio');
var port = process.env.port || 1337;

app.post('/respondToVoiceCall', function(req, res) {
    //Validate that this request really came from Twilio...
    if (twilio.validateExpressRequest(req, '289eadd98bc62261424c3b0e1fab21ce')) {
        var twiml = new twilio.TwimlResponse();

        twiml.say({voice:'woman'}, 'I want to win the prize. If I have to, I will punch you in the eye.');

        res.type('text/xml');
        res.send(twiml.toString());
    }
    else {
        res.send('you are not twilio.  Buzz off. your port is: ' + port);
    }
    
});

app.listen(port);
console.log('Listening on port %s', port);