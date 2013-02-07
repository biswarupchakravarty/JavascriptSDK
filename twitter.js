(function (global) {

	global.Appacitive.twitter = new (function() {

		var _accessToken = null, _accessTokenSecret = null;

		this.__defineSetter__('accessToken', function(v) {
			_accessToken = v;
		});

		this.__defineSetter__('accessTokenSecret', function(v) {
			_accessTokenSecret = v;
		});

	})();

})(window || process);