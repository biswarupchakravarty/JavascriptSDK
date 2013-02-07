// creates the skeleton of the object
// in the global context object
// in a browser, its going to be the 'window' object
// when in node.js, it's going to be the 'process' object

(function(global) {
	
	var Oppan = {};
	Oppan['GangnamStyle!!!'] = function() {
		this.utils = {
			http: {
			}
		}
	};

	if (!global.Appacitive) 
		global.Appacitive = new Oppan['GangnamStyle!!!']();

})(window||process);