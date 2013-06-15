var express = require('express');
var app = express();
var twilio = require('twilio');
var port = process.env.port || 1337;

app.post('/respondToVoiceCall', function(req, res) {
    //Validate that this request really came from Twilio...
    if (twilio.validateExpressRequest(req, 'AP49f5d5ea8d83a04e1eef15679e875092')) {
        var twiml = new twilio.TwimlResponse();

        twiml.say('I want to win the prize. If I have to I will punch you in the eye');

        res.type('text/xml');
        res.send(twiml.toString());
    }
    else {
        res.send('you are not twilio.  Buzz off. your port is: ' + port);
    }
    
});

app.listen(port);
console.log('Listening on port %s', port);