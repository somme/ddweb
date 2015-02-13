var express = require('express');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('OScg347HNNaIGvnT8PjAXg');

var router = express.Router();

router.post('/', function(req, res) {

    var message = {
        "html": '<p><strong>NAME:</strong> '+req.body.name+'</p><p><strong>EMAIL:</strong> '+req.body.email+'</p><p><strong>MESSAGE:</strong> '+decodeURI(req.body.message)+'</p>',
        "text": req.body.message,
        "subject": "Dragon Drop Contact Form",
        "from_email": req.body.email,
        "from_name": req.body.name,
        "to": [{
                "email": "sommes.email@gmail.com",
                "name": "Somme",
                "type": "to"
            }],
        "tags": [
            "notification"
        ]
    };
    mandrill_client.messages.send({"message": message}, function(result) {
        console.log(result);
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });

    res.send('ok');
});

module.exports = router;
