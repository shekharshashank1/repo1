var express = require('express'),
    methodOverride = require('method-override'),
    proxy = require('simple-http-proxy');
	
module.exports = function() {
	var app = express();
	app.use('/', express.static(__dirname + '\\app'));
	app.use(methodOverride());
	app.use('/', proxy('/', {
	    timeout: false,
	    onresponse: function(req, res) {
	        res.setHeader('Access-Control-Allow-Origin', '*');
	        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	    }
	}));
	
	return app;
}