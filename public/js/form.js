$(document).ready(function() {

	(function() {
var animateSpeed=300;
var emailReg = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;

	// Validating

	function validateName(name) {
		if (name.val()=='*') {
			name.addClass('validation-error',animateSpeed); return false;}
		else {name.removeClass('validation-error',animateSpeed); return true;}
	}

	function validateEmail(email,regex) {
		if (!regex.test(email.val())) {email.addClass('validation-error',animateSpeed); return false;}
		else {email.removeClass('validation-error',animateSpeed); return true;}
	}

	function validateMessage(message) {
		if (message.val()=='') {message.addClass('validation-error',animateSpeed); return false;}
		else {message.removeClass('validation-error',animateSpeed); return true;}
	}



	$('#send').click(function() {

		var result=true;

		var name = $('input[name=name]');
		var email = $('input[name=email]');
		var message = $('textarea[name=message]');

		// Validate
		if(!validateName(name)) result=false;
		if(!validateEmail(email,emailReg)) result=false;
		if(!validateMessage(message)) result=false;

		if(result==false) return false;

		// Data
		//var data = 'name=' + name.val() + '&email=' + email.val() + '&message='  + encodeURIComponent(message.val());

		var data = {
			name: name.val(),
			email: email.val(),
			message: encodeURIComponent(message.val())
		};

		// Disable fields
		$('.text').attr('disabled','true');

		// Loading icon
		$('.loading').show();

		// Start jQuery
		$.ajax({

			// PHP file that processes the data and send mail
			url: "/email",

			// GET method is used
			type: "POST",

			// Pass the data
			data: data,

			//Do not cache the page
			cache: false,

			success: function (response) {

				if(response === 'ok'){
					// Loading icon
					$('.loading').fadeOut('slow');
					$('#contactForm').attr('style','display:none');

					//show the success message
					$('.success-message').slideDown('slow');

					// Disable send button
					$('#send').attr('disabled',true);

				} else{
					$('.loading').fadeOut('slow')
					alert('Sorry, unexpected error. Please try again later.');
				}

			}

		});

		return false;

	});

	$('input[name=name]').blur(function(){validateName($(this));});
	$('input[name=email]').blur(function(){validateEmail($(this),emailReg); });
	$('textarea[name=message]').blur(function(){validateMessage($(this)); });

})();

});
