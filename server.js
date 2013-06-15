var express = require('express');
var app = express();
var twilio = require('twilio');
var port = process.env.port || 1337;
app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));

app.post('/respondToVoiceCall', function(req, res) {
    //Validate that this request really came from Twilio...
    if (twilio.validateExpressRequest(req, 'AP49f5d5ea8d83a04e1eef15679e875092')) {
        var twiml = new twilio.TwimlResponse();

        twiml.say('I want to win the prize If I have to I will punch you in the eye');

        res.type('text/xml');
        res.send(twiml.toString());
    }
    else {
        //res.send('you are not twilio.  Buzz off. your port is: ' + port);
        var twiml = new twilio.TwimlResponse();
        twiml.say('I want to win the prize If I have to I will punch you in the eye');

        res.type('text/xml');
        res.send(twiml.toString());
    }
    
});

app.post('/respondToSMS', function(req, res) {
    //Validate that this request really came from Twilio...
    var message = req.body.Body;
    var from = req.body.From;
    var sms = 'error';
    var compareString = 'i want to win the prize if i have to i will punch you in the eye';
    var twiml = new twilio.TwimlResponse();
    if (message.toLowerCase() == 'play')
    {
        sms = 'Call (702) 800-7236 and listen to the message. Then send a text to the same number with what you heard!';
    }
    else
    {
        if (message.toLowerCase() == compareString)
        {
            sms = 'Yup! Nailed it!';
        }
        else
        {
            sms = 'doh! That is not what I said! (send "play" to get instructions)';
        }
    }
    //res.type('text/xml');
    //twiml.sms(message);
    var client = new twilio.RestClient('ACb5691b2b28019bf5f5f00647fba3e2a5', '289eadd98bc62261424c3b0e1fab21ce');
    client.sms.messages.create({
        to:'+17028584082',
        from: from,
        body: sms.toString()
    }, function(error, message) {
        
        // The HTTP request to Twilio will run asynchronously.  This callback
        // function will be called when a response is received from Twilio
        
        // The "error" variable will contain error information, if any.
        // If the request was successful, this value will be "falsy"
        if (!error) {
            
            // The second argument to the callback will contain the information
            // sent back by Twilio for the request.  In this case, it is the
            // information about the text messsage you just sent:
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
     
            console.log('Message sent on:');
            console.log(message.dateCreated);
        }
        else {
            console.log('Oops! There was an error.');
        }
    });
    res.send(message +  twiml, {'Content-Type':'text/xml'}, 200);
    
});

app.listen(port);
console.log('Listening on port %s', port);