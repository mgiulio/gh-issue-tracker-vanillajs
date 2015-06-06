export var api = {
	init: init
};

import {api as ghAPI} from './lib/gh-api.js';
import {api as dom} from './lib/dom.js';
import {api as issues} from './Issues.js';
import {api as tmpl} from './templates.js';

var
	el = {}
;

init();

function init() {
	el.root = document.querySelector('#repo-selector');
	el.repo = el.root.querySelector('.repo');
	el.searchResults = el.root.querySelector('.search-results');
	
	el.root.addEventListener('submit', onSearchSubmit, false); 
	el.searchResults.addEventListener('click', onSearchResultSelection);
}

function onSearchSubmit(e) {
	e.stopPropagation();
	e.preventDefault();

	var userText = el.repo.value;
	userText = sanitizeRepoSearchTerm(userText);
	el.repo.value = userText;
	if (userText.length === 0)
		return;

	var 
		[user, repo] = parseRepoSearchTerm(userText),
		keywords = '', 
		qualifiers = {'in': 'name'}
	;
	if (user) 
		qualifiers['user'] = user;
	if (repo)
		keywords = repo;
	
	ghAPI.search.repository(keywords, qualifiers)
		.then(function(repos) {
			var html = repos.total_count === 0 ? 'No items found' : tmpl.renderArray(repos.items, tmpl.templates['searchResult']);
			el.searchResults.innerHTML = html;
			showSearchResults();
		})
		.catch(function(err) {
			console.log(err);
		});
	;
}

function onSearchResultSelection(e) {
	e.stopPropagation();
	e.preventDefault();
	
	var itemEl = dom.getTarget(e, '.item');
	if (!itemEl)
		return;
	
	var repoFullName = itemEl.dataset.fullname;
	
	issues.setRepo(repoFullName);
	
	hideSearchResults();
	el.repo.value = '';
}

function showSearchResults() {
	el.searchResults.classList.add('visible');
}

function hideSearchResults() {
	el.searchResults.classList.remove('visible');
}

function sanitizeRepoSearchTerm(s) {
	return s.trim();
}

function parseRepoSearchTerm(s) {
	var 
		parts = s.split('/'),
		user = '', repo = ''
	;
	if (parts.length === 1) {
		repo = parts[0];
	}
	else if (parts[1] !== '') {
		user = parts[0];
		repo = parts[1];
	}
	else
		user = parts[0];
	
	return [user, repo];
}
