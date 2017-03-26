'use strict';
var iconv = require('iconv').iconv;
var util = require('util');
var inbox = require('inbox');

/* connect Data */
var client = inbox.createConnection(false, "imap.gmail.com", {
	secureConnection: true,
	auth: {
		user: "xxxx@gmail.com",
		pass: "xxxxxxxr"
	}
});

/* connect */
client.on('connect', function () {
	client.openMailbox("INBOX", function (error, info) {
		if (error) throw error;
		console.log("connect success.");
	});
});

/* NewMail arrival */
client.on('new', function (message) {
	console.log('Date:' + message.date);
	console.log('Sender:' + message.from.name + " - " + message.from.address);
	console.log('Subject:' + message.title);
	//console.log(util.inspect(data));)
	var uid = message.UID;

	var messageStream = client.createMessageStream(uid).on("data", function (data) {
		var body = conv.convert(data).toString();
		
	});
	console.log('-------');
	console.log(body);
	console.log('-------');
});


/* disconnect */
client.on('close', function () {
	console.log("disconected");
});

/* call event */
client.connect();
//client.close();