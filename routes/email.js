var express = require('express');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

var router = express.Router();

router.post('/', function(req, res) {
    const msg = {
    to: 'info@dragondrop.ltd',
    from: 'info@dragondrop.ltd',
    subject: 'Dragon Drop Contact Form',
    text: req.body.message,
    html: `<p><strong>NAME:</strong> ${req.body.name}</p><p><strong>EMAIL:</strong> ${req.body.email}</p><p><strong>MESSAGE:</strong> ${decodeURI(req.body.message)}</p>`,
  };

  sgMail
  .send(msg)
  .then(() => {
    res.send('ok');
  })
  .catch((error) => {
    console.error(error.response.body.errors)
  })

});

module.exports = router;
