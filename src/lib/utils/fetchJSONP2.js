
function fetchJSONP(url, callback) {
	var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
	var script = document.createElement('script');

	window[callbackName] = function (data) {
		delete window[callbackName];
		document.body.removeChild(script);
		callback(data);
	};

	script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
	document.body.appendChild(script);
}
export default fetchJSONP;
// fetchJSONP('http://example.com/api?param1=foo&param2=bar', function (data) {
// 	console.log(data);
// });