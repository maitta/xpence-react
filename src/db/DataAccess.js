import utility from '../Services/Utility'

const DataAccess = (function(){
	
	const dataAccess = {};
    
    const db = initDb();

	function initDb(){
		//db name, version, comment, size (10MB)
		const db = openDatabase('xpenceDB', '0.1', 'xpence tracker database', 10 * 1024 * 1024);	
		db.transaction(function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS Article (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, " + 
				"price REAL, comment TEXT, createdOn TEXT)");
			tx.executeSql("CREATE TABLE IF NOT EXISTS Consumption (id INTEGER PRIMARY KEY AUTOINCREMENT, articleId INTEGER, " + 
				"quantity INTEGER, comment TEXT, createdOn TEXT, FOREIGN KEY (articleId) REFERENCES Article (id))");			
		});	

		return db;
	};

	//public methods are added to the dataAccess object	
	dataAccess.insertArticleToDb = function(name, price, comment){
		//write value to db
		db.transaction(function(tx){
			var insert = "INSERT INTO Article (name, price, comment, createdOn) VALUES(?,?,?,?)";
			tx.executeSql(insert, [name, price, comment, utility.getDate()]);
			console.log('New article inserted. name: ' + name + ' price: ' + price);
		}, (e) => console.log('ERROR: ' + e.message));		
	};

	//Async method needs a success callback function to perform computation on the result set.
	dataAccess.getAllArticlesFromDb = function(renderFunc){
		//read value form db
		db.transaction(function(tx){
			tx.executeSql('SELECT id, name, price, comment FROM Article', [], renderFunc);
		});
	};

	//Async method needs a success callback function to perform computation on the result set.
	dataAccess.getAllConsumptionsFromDb = function(renderFunc){		
		db.transaction(function(tx){
			var innerJoin = "SELECT c.id as id, i.name as name, i.price as price FROM " +
								"Consumption c INNER JOIN Article i ON c.articleId = i.id";
			tx.executeSql(innerJoin, [], renderFunc);
		});
	};

	dataAccess.getTotal = function(renderFunc){
		db.transaction(function(tx){
			var query = "SELECT SUM(i.price) as total FROM Consumption c INNER JOIN Article i ON c.articleId = i.id";
			tx.executeSql(query, [], renderFunc);
		});
	};

	//Consumption quantity is 1 by now. Comment is not yet supported.
	dataAccess.insertConsumptionToDb = function(articleId){
		db.transaction(function (tx) {  
			var insert = "INSERT INTO Consumption (articleId, quantity, createdOn) VALUES(?,?,?)";
			tx.executeSql(insert, 
				[articleId, 1, utility.getDate()]);
			console.log('Consumption added. articleId: ' + articleId);	
		}, (e) => console.log('ERROR: ' + e.message));		
	};

	//test only!
	dataAccess.resetArticles = function(){
		db.transaction(function(tx){
			tx.executeSql("DROP TABLE Article", function() {
			      alert("Article table has been dropped."); 
			});
		});
	};

	return dataAccess;
})();

export default DataAccess;