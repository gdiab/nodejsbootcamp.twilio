var express = require('express');
var app = express();

app.post('/respondToVoiceCall', function(req, res) {
    //Validate that this request really came from Twilio...
    if (twilio.validateExpressRequest(req, '289eadd98bc62261424c3b0e1fab21ce')) {
        var twiml = new twilio.TwimlResponse();

        twiml.say('I want to win the prize. If I have to, I will punch you in the eye.');

        res.type('text/xml');
        res.send(twiml.toString());
    }
    else {
        res.send('you are not twilio.  Buzz off.');
    }
});

app.listen(1337);
console.log('Listening on port 1337...');