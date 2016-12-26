var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.get('/', function(req, res){
	res.send('image search project');
})

app.listen(port, function(){
	console.log('image search app is running at port ' + port);
})