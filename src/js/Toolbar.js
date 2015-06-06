export var api = {
	init: init
};

import {api as ghAPI} from './lib/gh-api.js';
import {api as dom} from './lib/dom.js';
import {api as issues} from './Issues.js';

var
	rootEl,
	searchResultsEl
;

function init(cfg) {
	rootEl = document.querySelector(cfg.rootElSelector);
	searchResultsEl = rootEl.querySelector('.search-results');
	
	rootEl.addEventListener('submit', changeCurrentRepo, false); 
	searchResultsEl.addEventListener('click', onSearchResultSelection);
}

function changeCurrentRepo(e) {
	// start activity indicator
	
	e.preventDefault();
	// stopprop?
	
	var
		formEl = e.currentTarget,
		repoEl = formEl.querySelector('.repo')
	;

	var userText = repoEl.value;
	userText = sanitizeRepoSearchTerm(userText);
	repoEl.value = userText;
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
			var itemsHTML = repos.items.map(m => `<li class="item">${m.full_name}</li>`).join('');
			
			if (itemsHTML === '')
				itemsHTML = 'No items found';
			
			searchResultsEl.innerHTML = itemsHTML;
			showSearchResults();
		})
		.catch(function(err) {
			console.log(err);
		});
	;
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

function onSearchResultSelection(e) {
	e.stopPropagation();
	e.preventDefault();
	
	var itemEl = dom.getTarget(e, '.item');
	if (!itemEl)
		return;
	
	var repoFullName = itemEl.innerHTML;
	
	issues.setRepo(repoFullName);
	
	hideSearchResults();
}


function showSearchResults() {
	searchResultsEl.classList.add('visible');
}

function hideSearchResults() {
	searchResultsEl.classList.remove('visible');
}
