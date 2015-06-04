var http = (function() {
	
	o = {
		headerObject: headerObject
	};

	return o;
	
	function headerObject(str) {
		var o = {};
		
		str.split('\r\n').forEach(function(l) {
			if (l.length > 0) {
				var i = l.indexOf(':');
				o[l.slice(0, i)] = l.slice(i+1).trim();
			}
		});
		
		return o;
	}

})();
