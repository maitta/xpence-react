const Utility = (function(){

	const utility = {};
    
	utility.getDate = function(){
		let today = new Date();

		let dd = today.getDate();
		//January is 0!
		let mm = today.getMonth() + 1; 
		let yyyy = today.getFullYear();

		return dd + '/' + mm + '/' + yyyy;
	};

	return utility;
})();

export default Utility;