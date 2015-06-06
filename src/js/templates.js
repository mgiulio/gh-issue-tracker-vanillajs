var templates = {
	'searchResult': m => `
		<li id="${m.id}" class="item${classIf(m.fork, ' fork')}" data-fullname="${m.full_name}">
			<h2 class="title">
				<span class="owner">
					<a href="${m.owner.url}" target="_blank">
						<img src="${m.owner.avatar_url}" title="${m.owner.login}">
						${m.owner.login}
					</a>
				</span>
				/ 
				<a href="${m.html_url}" target="_blank">${m.name}</a>
			</h2>
			<p class="description">${m.description}</p>
		</li>
	`,
	'issue': m => `
		<li class="item">
			<h2 class="title">
				<a target="_blank" href="${m.html_url}">${m.title}</a>
				<span class="number">${m.number}</span>
			</h2>
			<p class="meta">
				<span class="created-at">${ date(m.created_at) }</span>
			</p>
		</li>
	`
};

export var api = {
	templates: templates,
	renderArray: renderArray
};

function renderArray(arr, tmpl) {
	return arr.map(tmpl).join('');
}
	
function toLowerCase(str) {
	return str.toLowerCase();
}

function date(str) {
	var d = new Date(str);
	
	var day = d.getDate();
	var month = d.getMonth();
	var year = d.getFullYear();
	
	month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][month];
	year = String(year).substr(-2);
	
	return `${day} ${month} ${year}`;
}
	
function classIf(cond, className) {
	return cond ? className : '';
}

function mainLanguageClass(lang) {
	return !lang ? '' : ' ' + toLowerCase(lang);
}
	