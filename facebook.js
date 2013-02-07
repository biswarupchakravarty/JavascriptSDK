(function (global) {

	global.Appacitive.facebook = new (function() {

		_accessToken = null;

		this.requestLogin = function(onSuccess, onError) {
			onSuccess = onSuccess || function(){};
			onError = onError || function(){};
			if (!FB) {
				onError();
				return;
			}
			FB.login(function(response) {
				if (response.authResponse) {
					var accessToken = response.authResponse.accessToken;
					_accessToken = accessToken;
					onSuccess(response.authResponse);
				} else {
					onError();
				}
			}, {scope:'email,user_birthday'});
		}

		this.getCurrentUserInfo = function(onSuccess, onError) {
			onSuccess = onSuccess || function(){};
			onError = onError || function(){};
			FB.api('/me', function(response) {
				if (response) {
					onSuccess(response);
				} else {
					onError();
				}
			});
		}

		this.__defineGetter__('accessToken', function() {
			return _accessToken;
		});

		this.__defineSetter__('accessToken', function(val) {
			_accessToken = val;
		});

		this.getProfilePictureUrl = function(username) {
			return 'https://graph.facebook.com/' + username + '/picture';
		}

		this.logout = function(onSuccess, onError) {
			onSuccess = onSuccess || function() {};
			onError = onError || function(){};
			try {
				FB.logout(function(response) {
				  onSuccess();
				});
			} catch(e) {
				onError(e.message);
			}
		};

	})();

})(window || process);