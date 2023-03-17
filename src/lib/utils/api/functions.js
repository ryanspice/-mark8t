
export const fetchJsonFromUrl = async (url = '', callback = () => { }) => {
	return await fetch(url)
		.then(response => response.json())
		.then(data => {
			callback(data);
		})
		.catch(error => {
			console.error('Error:', error);
		});
}
