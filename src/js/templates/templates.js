var tmpl = (function() {
		
	var tmpl = {
			item: m => `
				<h2 class="title">
					<a target="_blank" href="${m.html_url}">${m.title}</a>
					<span class="number">${m.number}</span>
				</h2>
				<p class="meta">
					<span class="created-at">${ date(m.created_at) }</span>
				</p>
			`
		}
	;
	
	return tmpl;
	
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
	
})();
		