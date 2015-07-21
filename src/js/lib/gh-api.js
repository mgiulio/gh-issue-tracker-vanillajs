export var api = {
	search: {
		repository: searchRepo
	},
	getRepoIssues: getRepoIssues
	//getUserRepos: getUserRepos
};

var
	apiUrl = 'https://api.github.com'
;

function searchRepo(keywords, qualifiers, sort, order) {
	var qs = [];
	for (var q in qualifiers)
		qs.push(q + ':' + qualifiers[q]);
	
	var searchTerm = keywords ?
		keywords + '+' + qs.join('+') : 
		qs.join('+')
	;
	
	var params = {
		'q': searchTerm
	};
	if (sort)
		params.sort = sort;
	if (order)
		params.order = order;
	
	return fetch(callUrl('/search/repositories', params))
		.then(function(response) {
			if (response.status != 200)
				throw new Error('Status error code: ' + response.status );
			return response.json();
		})
	;
}

function getRepoIssues(fullName, cfg) {
	var params = {};

	var filter = cfg.filter;
	if (filter) {
		var allowedFilters = {'state': 'open'};
		for (var f in filter)
			if (f in allowedFilters)
				params[f] = filter[f];
	}
	
	var sort = cfg.sort;
	if (sort) {
		if (sort.type)
			params['sort'] = sort.type;
		if (sort.dir)
			params['direction'] = sort.dir;
	}
	
	return new PageIterator(callUrl(`/repos/${fullName}/issues`, params));
}

function PageIterator(firstPageUrl) {
	this.navUrls = {
		first: firstPageUrl,
		next: firstPageUrl,
		prev: null,
		last: null
	};
}

PageIterator.prototype.next = function() {
	var self = this;
	
	return new Promise(function(resolve, reject) {
		if (!self.navUrls.next)
			resolve([]);
	
		fetch(self.navUrls.next)
			.then(function(response) {
				if (response.status != 200)
					reject(Error('Status error code: ' + response.status));
				
				self.updateNavUrls(response.headers.get('Link'));
				
				response.json().then(function(json) { resolve(json); });
			})
		;
	});
};

PageIterator.prototype.updateNavUrls = function() {
};

/* function getUserRepos(username, sort, done) {
	makeRequest('/users/' + username + '/repos', {'sort': sort}, done);
} */

function callUrl(path, pars) {
	var queryString = [];
	for (var p in pars)
		queryString.push(p + '=' + pars[p]);
	queryString = '?' + queryString.join('&');

	return apiUrl + path + queryString;
}
