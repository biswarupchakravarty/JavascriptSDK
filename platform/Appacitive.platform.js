// tracks the platform and the runtime environment
// either the sdk is running in a browser either on a desktop or a mobile device
// or in nodejs

(function () {

	Appacitive.platform = {};

	if (window) {
		Appacitive.platform.isBrowser = true;

		// first figure out device
		var agents = ['Android','BlackBerry','iOS'];
		var isMobile = false;
		for (var agent in agents) {
			if (agents.hasOwnProperty(agent) == false) return;
			if (window.navigator.userAgent.toLowerCase().indexOf(agents[agent].toLowerCase()) != -1) {
				Appacitive.platform['is' + agents[agent]] = true;
				isMobile = true;
			}
		}

	} else if (process) {
		Appacitive.platform.isNode = true;
	}

})();