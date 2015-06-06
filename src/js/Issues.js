export var api = {
	setRepo: setRepo
};

import {api as ghAPI} from './lib/gh-api.js';
import {api as tmpl} from './templates.js';

var
	rootEl = document.querySelector('#list .items')
;

function setRepo(fullName) {
	ghAPI.getRepoIssues(fullName, { 
		filter: {
			state: 'all'
		},
		sort: {
			/*field|by|criteria*/type: 'created',
			dir: 'desc'
		}//,			
		//page: 1
	})
		.then(function(issues) {
			appendItems(issues);
		})
		.catch(function(err) {
			console.log(err);
		})
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
