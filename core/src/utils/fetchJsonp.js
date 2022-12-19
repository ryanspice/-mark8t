
export const fetchJSONP = (url) => {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = url;
		script.onload = () => {
			resolve(window.data);
			window.data = undefined;
		};
		script.onerror = (error) => {
			reject(error);
		};
		document.head.appendChild(script);
	});
};
export default fetchJSONP;