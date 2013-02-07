(function (global) {

	global.Appacitive.localStorage = new (function() {

		var _localStorage = window.localStorage || {};

		this.set = function(key, value) {
			value = value || '';
			if (!key) return false;
			_localStorage[key] = value;
			return true;
		};

		this.get = function(key) {
			return (!key ? null : _localStorage[key] || null);
		}

	})();

})(window || process);