var express = require('express');

var sendgrid  = require('sendgrid')(process.env.SENDGRIDAPI);

var router = express.Router();



router.post('/', function(req, res) {

    var email = new sendgrid.Email({
        html:     '<p><strong>NAME:</strong> '+req.body.name+'</p><p><strong>EMAIL:</strong> '+req.body.email+'</p><p><strong>MESSAGE:</strong> '+decodeURI(req.body.message)+'</p>',
        to: ['info@dragondrop.co'],
        from:     req.body.email,
        fromname: req.body.name,
        subject:  'Dragon Drop Contact Form',
        text:     req.body.message
    });
    sendgrid.send(email, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
    });

    res.send('ok');
});

module.exports = router;
