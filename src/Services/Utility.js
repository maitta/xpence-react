const Utility = (function(){

	const utility = {};
    
	utility.getDate = function(){
		var today = new Date();

		var dd = today.getDate();
		//January is 0!
		var mm = today.getMonth() + 1; 
		var yyyy = today.getFullYear();

		today = dd + '/' + mm + '/' + yyyy;
		return today;
	};

	return utility;
})();

export default Utility;