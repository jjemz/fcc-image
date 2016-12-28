var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var ImageClient = require('google-images');
let client = new ImageClient('011588903241061341004:us5qbfn9dk4', 'AIzaSyA1QC4HjyrVtzovkah244-K5DShu7DLrME');


var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
//var url = 'mongodb://localhost:27017/querydb'
var url = 'mongodb://sample:sample@ds145118.mlab.com:45118/querydb'

mongoClient.connect(url, function(err, db){
   if (err) {
   	console.log('Unable to connect to mongodb server. Error: ' + err);
   } else {
   	console.log('Connection established to ', url);

   	var collection = db.collection('query');
		app.get('/api/imagesearch', function(req, res){

			var uri = req.url;
		    var input = uri.toString().substring(19, uri.toString().length); //remove the junk

			var newDate = new Date().toLocaleString();
		    var row = {
		    	term: input,
		    	time:  newDate
		    }

		    collection.insert(row, function(err, result){
		    	if(err) {
		    		console.log(err);
		    	} else {
		    		console.log('Inserted %d documents into the "redirect" collection. the document inserted with "_id" is ', result.length, result); 
		    	}
		    })

			client.search(input)
		    .then(function (images) {
		    	res.send(images);
		    });	
		})

		app.get('/api/latest/imagesearch', function(req, res) {
			collection.find().toArray(function(err, result){
				if (err) {
					console.log(err);
				} else if (result.length){
					res.send(result);
				}
			})
		});

   }
});



app.listen(port, function(){
	console.log('image search app is running at port ' + port);
})