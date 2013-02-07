(function(global) {
	
	global.Appacitive.queries = {};

	// basic query for contains pagination
	/** 
	* @constructor
	**/
	var _pageQuery = function(o) {
		var options = o || {};
		this.pageNumber = options.pageNumber || 1;
		this.pageSize = options.pageSize || 200;
	}
	_pageQuery.prototype.toString = function() {
		return 'psize=' + this.pageSize + '&pnum=' + this.pageNumber;
	}

	// sort query
	/** 
	* @constructor
	**/
	var _sortQuery = function(o) {
		o = o || {};
		this.orderBy = o.orderBy || '__UtcLastUpdatedDate';
		this.isAscending = typeof o.isAscending == 'undefined' ? false : o.isAscending;
	}
	_sortQuery.prototype.toString = function() {
		return 'orderBy=' + this.orderBy + '&isAsc=' + this.isAscending;
	}

	// base query
	/** 
	* @constructor
	**/
	var _baseQuery = function(o) {
		var options = o || {};

		this.pageQuery = new _pageQuery(o);
		this.sortQuery = new _sortQuery(o);
		this.type = o.type || 'article';
		this.baseType = o.schema || o.relation;
		this.filter = '';

		this.extendOptions = function(changes) {
			for (var key in changes) {
				options[key] = changes[key];
			}
			this.pageQuery = new _pageQuery(options);
			this.sortQuery = new _sortQuery(options);
		};

		this.setFilter = function(filter) {
			this.filter = filter;
		}

		this.toUrl = function() {
			var finalUrl = global.Appacitive.config.apiBaseUrl 
				+ this.type + '.svc/' 
				+ this.baseType + '/find/all?' + this.pageQuery.toString() + '&' + this.sortQuery.toString();

			if (this.filter.trim().length > 0) {
				finalUrl += '&query=' + this.filter;
			}
			
			return finalUrl;
		}
	}

	// search all type query
	/** 
	* @constructor
	**/
	global.Appacitive.queries.SearchAllQuery = function(options) {
		
		options = options || {};
		var inner = new _baseQuery(options);

		// simple query
		this.toRequest = function() {
			var r = new global.Appacitive.HttpRequest();
			r.url = inner.toUrl();
			r.method = 'get';
			return r;
		};

		this.extendOptions = function() {
			inner.extendOptions.apply(inner, arguments);
		}
	};

	/** 
	* @constructor
	**/
	global.Appacitive.queries.BasicFilterQuery = function(options) {

		options = options || {};
		var inner = new _baseQuery(options);
		
		// just append the filters/properties parameter to the query string
		this.toRequest = function() {
			var r = new global.Appacitive.HttpRequest();
			r.url = inner.toUrl() + '&properties=' + options.filter + '&query=' + options.filter;
			r.method = 'get';
			return r;
		};

		this.extendOptions = function() {
			inner.extendOptions.apply(inner, arguments);
		}
	};

	/** 
	* @constructor
	**/
	global.Appacitive.queries.GraphQuery = function(options) {

		options = options || {};
		var inner = new _baseQuery(options);
		
		// just append the filters/properties parameter to the query string
		this.toRequest = function() {
			var r = new global.Appacitive.HttpRequest();
			r.url = global.Appacitive.config.apiBaseUrl;
			r.url += global.Appacitive.storage.urlFactory.article.getProjectionQueryUrl();
			r.method = 'post';
			r.data = options.graphQuery;
			return r;
		};

		this.extendOptions = function() {
			inner.extendOptions.apply(inner, arguments);
		}
	};

	/** 
	* @constructor
	**/
	global.Appacitive.queries.ConnectedArticlesQuery = function(options) {

		options = options || {};
		var inner = new _baseQuery(options);

		this.toRequest = function() {
			var r = new global.Appacitive.HttpRequest();
			r.url = global.Appacitive.config.apiBaseUrl + 'connection/' + options.relation + '/' + options.articleId + '/find?' 
				+ inner.pageQuery.toString() 
				+ '&' + inner.sortQuery.toString();
			return r;
		};

		this.extendOptions = function() {
			inner.extendOptions.apply(inner, arguments);
		}

		this.setFilter = function() {
			inner.setFilter.apply(inner, arguments);
		}
	};

})(window || process);