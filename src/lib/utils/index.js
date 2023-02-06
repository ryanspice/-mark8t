//
export const productTagsContain = (product, tag) => {
	return product.tags.includes(tag);
};

//
export const productAvailable = (product) => {
	if (!product) return;
	if (!productTagsContain(product, "retail")) return;
	if (product?.quantity === 0) {
		product.quantity = 1;
	}
};
