export var api = {
	setRepo: setRepo
};

import {api as ghAPI} from './lib/gh-api.js';
import {api as tmpl} from './templates.js';

var
	rootEl = document.querySelector('#list .items'),
	pageIt
;

function setRepo(fullName) {
	pageIt = ghAPI.getRepoIssues(fullName, { 
		filter: {
			state: 'all'
		},
		sort: {
			/*field|by|criteria*/type: 'created',
			dir: 'desc'
		}			
	});
	
	getNextPage();
}

function getNextPage() {
	pageIt.next()
		.then(
			function(items) { // items is empty if no next page
				console.log(items);
				appendItems(items);
			},
			function() {
				console.log(arguments);
			}
		)
	;
}

function appendItems(items) {
	var html = tmpl.renderArray(items, tmpl.templates['issue']);
	
	var tmp = document.createElement('div');
	tmp.innerHTML = html;
	
	while (tmp.firstElementChild)
		rootEl.appendChild(tmp.firstElementChild);
}

function init(cfg) {
	//rootEl = document.querySelector(cfg.rootElSelector);
}
