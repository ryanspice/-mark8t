const _NEW_PRODUCT_ = (products) => {
	return {
		name: 'New Product ' + products.length,
		description: '',
		tags: [],
		price: 0,
		ibu: "N/A",
		abv: "N/A",
		image: 'beerlabel.png',
		thumb: 'https://dundasandsons.ca/dev/logo_red.jpg',
		link: 'https://via.placeholder.com/150',
		id: products.length
	}
};

export {
	_NEW_PRODUCT_
}