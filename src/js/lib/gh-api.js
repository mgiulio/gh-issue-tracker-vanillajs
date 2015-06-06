export var api = {
	search: {
		repository: searchRepo
	}
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
