const _NEW_PRODUCT_ = (products) => {
	return {
		name: 'New Product ' + products.length,
		description: '',
		tags: [],
		price: 0,
		ibu: "N/A",
		abv: "N/A",
		image: 'beerlabel.png',
		thumb: '',
		link: 'https://via.placeholder.com/150',
		id: products.length
	}
}

const _EMAILS_LISTING_ = ((emails) => {
	return [
		{
			"name": "Order confirmation",
			"description": "Sent to customers after they place an order, confirming their purchase and providing details about their order."
		},
		{
			"name": "Shipping confirmation",
			"description": "Sent to customers when their order has been shipped, including tracking information."
		},
		{
			"name": "Payment confirmation",
			"description": "Sent to customers when their payment has been processed."
		},
		{
			"name": "Account creation",
			"description": "Sent to customers when they create an account on the website or app."
		},
		{
			"name": "Password reset",
			"description": "Sent to customers who request a password reset."
		},
		{
			"name": "Abandoned cart",
			"description": "Sent to customers who have items in their shopping cart but have not completed their purchase."
		},
		{
			"name": "Back in stock",
			"description": "Sent to customers who have previously expressed interest in an out-of-stock item when it becomes available again."
		},
		{
			"name": "New product launch",
			"description": "Sent to customers announcing the release of new products."
		},
		{
			"name": "Sale or promotion",
			"description": "Sent to customers announcing a sale or promotion."
		},
		{
			"name": "Feedback request",
			"description": "Sent to customers after their purchase asking for feedback on their experience."
		},
		{
			"name": "Customer appreciation",
			"description": "Sent to customers on their birthday or other special occasions to show appreciation."
		},
		{
			"name": "Upselling and Cross-selling",
			"description": "Sent to customers with products related to their purchase history."
		},
		{
			"name": "Reorder reminders",
			"description": "Sent to customers reminding them to reorder consumable products."
		},
		{
			"name": "Positive review request",
			"description": "Sent to customers asking them to leave a positive review."
		},
		{
			"name": "Customer loyalty program",
			"description": "Sent to customers announcing new rewards or benefits in their customer loyalty program."
		},
		{
			"name": "Gift card purchase",
			"description": "Sent to customers who have purchased a gift card or have been sent a gift card."
		},
		{
			"name": "Gift card redemption",
			"description": "Sent to customers who have redeemed a gift card."
		},
		{
			"name": "Return or exchange",
			"description": "Sent to customers who have requested a return or exchange, providing instructions on how to do so."
		},
		{
			"name": "Cancelled order",
			"description": "Sent to customers whose order has been cancelled, providing information on the reason for the cancellation."
		},
		{
			"name": "Refund",
			"description": "Sent to customers whose order has been refunded, providing information on the amount and method of refund."
		},
		// {
		// 	"name": "Subscription confirmation",
		// 	"description": "Sent to customers who have signed up for a subscription service, confirming their subscription and providing information on how to manage it."
		// },
		// {
		// 	"name": "Subscription renewal",
		// 	"description": "Sent to customers whose subscription is about to renew, providing information on the cost and renewal date."
		// },
		// {
		// 	"name": "Subscription cancellation",
		// 	"description": "Sent to customers who have cancelled a subscription, providing information on the date and reason for cancellation."
		// },
		// {
		// 	"name": "Subscription upgrade",
		// 	"description": "Sent to customers who have upgraded their subscription, providing information on the new features and benefits."
		// },
		// {
		// 	"name": "Subscription downgrade",
		// 	"description": "Sent to customers who have downgraded their subscription, providing information on the new features and benefits."
		// },
		// {
		// 	"name": "Membership confirmation",
		// 	"description": "Sent to customers who have joined a membership program, confirming their membership and providing information on how to manage it."
		// }

	]
})();

export {
	_NEW_PRODUCT_,
	_EMAILS_LISTING_
}