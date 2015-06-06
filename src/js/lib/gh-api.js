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
	
	return makeRequest('/search/repositories', params);
}

function getRepoIssues(fullName, cfg) {
	var params = {};

	var filter = cfg.filter;
	if (filter) {
		var allowedFilters = {};
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
	
	return makeRequest(`/repos/${fullName}/issues`, params);
}

/* function getUserRepos(username, sort, done) {
	makeRequest('/users/' + username + '/repos', {'sort': sort}, done);
} */

function makeRequest(path, pars) {
	return new Promise(function(resolve, reject) {
		var queryString = [];
		for (var p in pars)
			queryString.push(p + '=' + pars[p]);
		queryString = '?' + queryString.join('&');

		var url = apiUrl + path + queryString;
		
		return fetch(url)
			.then(function(response) {
				if (response.status != 200)
					reject(Error('Status error code: ' + response.status ));
				
				response.json().then(function(json) {
					resolve(json);
				});
				//console.log(response.text());
				//resolve(JSON.parse(response.text()));
			})
			.catch(function(err) {
				reject(err);
			})
		;
	});
}
