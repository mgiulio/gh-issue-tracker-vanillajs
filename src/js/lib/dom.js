export var api = {
	getTarget: getTarget
};

function getTarget(e, selector) {
	var 
		el = e.target, 
		root = e.currentTarget,
		matches = false
	;
	
	while (el != root && !(matches = el.matches(selector)))
		el = el.parentNode;
	
	return matches ? el : null;
}
