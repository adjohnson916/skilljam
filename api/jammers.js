var mongoose = require('mongoose');

var mongo_base = process.env.MONGOLAB_URI || 'mongodb://localhost/skilljam_db';

mongoose.connect(mongo_base);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to 'skilljam_db' database");
});


var jammerSchema = mongoose.Schema({
    name: String,
    picture: String,
    email: String,
    skills: Array,
    description: String,
    facebook_id: String
})

var Jammer = mongoose.model('Jammer', jammerSchema)



exports.create = function(req, res) {
  var jammer = new Jammer(
        {
            name: req.body.name,
            picture: req.body.picture,
            email: req.body.email,
            skills: req.body.skills,
            description: req.body.description,
	    facebook_id: req.body.facebook_id
        });

  console.log(jammer);
  jammer.save(function(err, result){
    res.send(result);
  });
};


exports.update = function(req, res) {
  var _id = req.params.id;
  var updates =
        {
            name: req.body.name,
            picture: req.body.picture,
            email: req.body.email,
            skills: req.body.skills,
            description: req.body.description,
	    facebook_id: req.body.facebook_id
        };

  Jammer.update({_id: _id }, updates, { multi: true }, function(err, result){
    exports.findById(req, res);
  });
};


exports.findById = function(req, res) {
  var id = req.params.id;
  Jammer.find({  _id: id }, function(err, items){
    res.send(items);
  });
};

exports.findAll = function(req, res) {

  Jammer.find(function(err, items){
    console.log('findAll.find()', err, items);
    res.send(items);
  });
};

exports.search = function(req, res) {
  Jammer.find({'skills.name':req.params.skill},function(err, items){
    res.send(items);
  });
};


exports.deleteAll = function(req, res) {
  Jammer.find().remove(
    function(err, result) {
      res.send(result);
    });
};

exports.fbFindOrCreate = function(req, res) {
    console.log('fbFindOrCreate.() Entry', req);	  
    // Jammer.fbFind(req, function(err, items) {
    // 	if (err != 0) { // Create
    // 	    console.log('fbFindOrCreate.fbFind() Create a Jammer', err, items);	  
    // 	} else {
    // 	    console.log('fbFindOrCreate.fbFind() Found a Jammer', err, items);	  	    
    // 	}
    // });
};

exports.fbFind = function(req, res) { 
   // Jammer.find({'facebook_id':req.params.facebook_id},function(err, items){
   //  res.send(items);
   // });
};
