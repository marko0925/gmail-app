var pg= require("pg");


function ConBD(){
	
	var connectionString = {
		host:"localhost",
		user:"postgres",
		pass:"marco25099410020",
		database:"VentaPCsBD"
	}


	var client = new pg.Client(connectionString);
	client.connect(function(error){
		if(error){
			throw error;
		}
		else{
		}
	});
	return client;
	
}

module.exports.ConBD= ConBD;