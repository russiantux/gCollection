var express = require('express');
var app = express();
var request = require('request');

app.set('port', 8080);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/getCollectionDet', function(req,res){
    console.info("RECEIVED GET REQUEST");
    var qParams = [];
    for (var p in req.query){
        qParams.push({'name':p, 'value':req.query[p]})
    }
    var url = 'https://api.steampowered.com/ISteamRemoteStorage/GetCollectionDetails/v1/';
    console.info("url for post request:" + url);
    request.post(url,{form:{'collectioncount':'1', 'publishedfileids[0]': qParams[0].value}} ,function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
        }
        else{
            console.error("Error: " + response.statusCode + err);
        }
	});	
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });

  