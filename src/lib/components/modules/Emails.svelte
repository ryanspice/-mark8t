<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	import { phpStore, transformPHP } from "../parseHTML.js";

	let reverse = false;
	let output = "";

	import Quill from "quill";

	let selectedEmailType =
		localStorage.getObject("--admin-emails-selectedEmailType") ||
		Object.keys(_EMAILS_LISTING_)[0];
	let emailDescription = "";
	let editor;

	import { _EMAILS_LISTING_ } from "../../schema.js";

	function createFileNames(emailTypes) {
		return emailTypes.map(
			(emailType) => emailType.name.toLowerCase() + ".php"
		);
	}

	let fileNames = createFileNames(_EMAILS_LISTING_);
	let emailPreview = "";
	let lang = "en";
	let emailsWithRestParamaters = {
		"shipping-confirmation":
			"https://mark8t.ca/api/dev/mail/shipping-confirmation.php?lang=" +
			lang +
			"&name=John&order_id=12345&tracking_number=XYZ123&estimated_delivery=2022-12-31",
		"payment-confirmation":
			"https://mark8t.ca/api/dev/mail/payment-confirmation.php?lang=" +
			lang +
			"&name=Jane&order_id=67890&total_amount=100.00&payment_method=Credit+Card",
		"password-reset":
			"https://mark8t.ca/api/dev/mail/password-reset.php?lang=" +
			lang +
			"&token=123456",
		"account-creation":
			"https://mark8t.ca/api/dev/mail/account-creation.php?lang=" +
			lang +
			"&name=Jane&email=jane@example.com&password=abc123",
		"abandoned-cart":
			"https://mark8t.ca/api/dev/mail/abandoned-cart.php?lang=" +
			lang +
			"&cart_id=abc123&items=2&coupon_code=SUMMER10",
		"back-in-stock":
			"https://mark8t.ca/api/dev/mail/back-in-stock.php?lang=" +
			lang +
			"&product_name=Nike%20Running%20Shoes&product_link=https://mark8t.ca/products/123&quantity_available=10",
		"new-product-launch":
			"https://mark8t.ca/api/dev/mail/new-product-launch.php?lang=" +
			lang +
			"&product_name=Nike%20Running%20Shoes%20V3&product_link=https://mark8t.ca/products/456&product_details=New%20technology%20insole%20for%20extra%20cushioning",
		"sale-or-promotion":
			"https://mark8t.ca/api/dev/mail/sale-or-promotion.php?lang=" +
			lang +
			"&promo_code=SUMMERSALE&start_date=2022-06-01&end_date=2022-06-30&discount=20%",
		"feedback-request":
			"https://mark8t.ca/api/dev/mail/feedback-request.php?lang=" +
			lang +
			"&survey_link=https://mark8t.ca/survey",

		"customer-appreciation":
			"https://mark8t.ca/api/dev/mail/customer-appreciation.php?lang=" +
			lang +
			"&discount_code=BIRTHDAY10&expiration_date=2023-12-31",
		"Upselling and Cross-selling": {
			description:
				"Sent to customers with products related to their purchase history.",
		},
		"upselling-and-cross-selling":
			"https://mark8t.ca/api/dev/mail/upselling-and-cross-selling.php?lang=" +
			lang +
			"&product_name=Nike%20Running%20Shoes&product_link=https://mark8t.ca/products/123&quantity_available=10",
		"reorder-reminders":
			"https://mark8t.ca/api/dev/mail/reorder-reminders.php?lang=" +
			lang +
			"&product_name=Toothpaste&discount_code=REORDER20",
		"positive-review-request":
			"https://mark8t.ca/api/dev/mail/positive-review-request.php?lang=" +
			lang +
			"&product_name=Nike%20Running%20Shoes&product_link=https://mark8t.ca/products/123&review_link=https://mark8t.ca/review/123",
		"negative-review-request":
			"https://mark8t.ca/api/dev/mail/negative-review-request.php?lang=" +
			lang +
			"&product_name=Nike%20Running%20Shoes&product_link=https://mark8t.ca/products/123&review_link=https://mark8t.ca/review/123",
		"customer-loyalty-program":
			"https://mark8t.ca/api/dev/mail/customer-loyalty-program.php?lang=" +
			lang +
			"&discount_code=LOYALTY10&expiration_date=2023-12-31",
		"gift-card-purchase":
			"https://mark8t.ca/api/dev/mail/gift-card-purchase.php?lang=" +
			lang +
			"&gift_card_code=abc123&amount=100.00&expiration_date=2023-12-31",
		"gift-card-redemption":
			"https://mark8t.ca/api/dev/mail/gift-card-redemption.php?lang=" +
			lang +
			"&gift_card_code=abc123&amount=100.00&expiration_date=2023-12-31",
		"return-or-exchange":
			"https://mark8t.ca/api/dev/mail/return-or-exchange.php?lang=" +
			lang +
			"&order_id=12345&tracking_number=XYZ123&estimated_delivery=2022-12-31",
		"cancelled-order":
			"https://mark8t.ca/api/dev/mail/cancelled-order.php?lang=" +
			lang +
			"&order_id=12345&tracking_number=XYZ123&estimated_delivery=2022-12-31",
		refund:
			"https://mark8t.ca/api/dev/mail/refund.php?lang=" +
			lang +
			"&order_id=12345&tracking_number=XYZ123&estimated_delivery=2022-12-31",
		/* OTHERS */
		"customer-support":
			"https://mark8t.ca/api/dev/mail/customer-support.php?lang=" +
			lang +
			"&ticket_id=abc123&ticket_subject=Order%20Issue&ticket_status=Open",
		"order-confirmation":
			"https://mark8t.ca/api/dev/mail/order-confirmation.php?lang=" +
			lang +
			"&name=John&order_id=12345&total_amount=100.00&payment_method=Credit+Card",
		"order-tracking":
			"https://mark8t.ca/api/dev/mail/order-tracking.php?lang=" +
			lang +
			"&name=John&order_id=12345&tracking_number=XYZ123&estimated_delivery=2022-12-31",
		"order-update":
			"https://mark8t.ca/api/dev/mail/order-update.php?lang=" +
			lang +
			"&name=John&order_id=12345&order_status=Shipped",
		"order-cancelled":
			"https://mark8t.ca/api/dev/mail/order-cancelled.php?lang=" +
			lang +
			"&name=John&order_id=12345&order_status=Cancelled",
		"order-refund":
			"https://mark8t.ca/api/dev/mail/order-refund.php?lang=" +
			lang +
			"&name=John&order_id=12345&refund_amount=100.00&refund_method=Credit+Card",
		"order-shipped":
			"https://mark8t.ca/api/dev/mail/order-shipped.php?lang=" +
			lang +
			"&name=John&order_id=12345&tracking_number=XYZ123&estimated_delivery=2022-12-31",
		"order-delivered":
			"https://mark8t.ca/api/dev/mail/order-delivered.php?lang=" +
			lang +
			"&name=John&order_id=12345&tracking_number=XYZ123&estimated_delivery=2022-12-31",
		"order-returned":
			"https://mark8t.ca/api/dev/mail/order-returned.php?lang=" +
			lang +
			"&name=John&order_id=12345&tracking",
	};

	const importEmailTemplate = () => {
		let emailtemplateTestUrl = "";
		let emailtemplateFileName = fileNames[
			Object.keys(_EMAILS_LISTING_).indexOf(selectedEmailType)
		].replaceAll(" ", "-");

		localStorage.setObject(
			"--admin-emails-selectedEmailType",
			selectedEmailType
		);
		console.log(
			"--admin-emails-selectedEmailType",
			_EMAILS_LISTING_[selectedEmailType]
		);

		emailtemplateTestUrl = "https://mark8t.ca/api/dev/mail/";
		emailtemplateTestUrl += emailtemplateFileName;
		if (
			emailsWithRestParamaters[
				emailtemplateFileName.replace(".php", "").replaceAll("_", "-")
			]
		) {
			emailtemplateTestUrl =
				emailsWithRestParamaters[
					emailtemplateFileName
						.replace(".php", "")
						.replaceAll("_", "-")
				];
		}

		// emailtemplateTestUrl += `?lang=fr&name=John&order_id=12345&tracking_number=XYZ123&estimated_delivery=2022-12-31`;
		//emailtemplateTestUrl += `&name=${name}&contact=${contact}`;

		fetch(emailtemplateTestUrl)
			.then((res) => res.text())
			.then((data) => {
				emailPreview = data;
			});
		// console.log(_EMAILS_LISTING_[selectedEmailType].template);
	};

	// fetch(emailtemplateTestUrl)
	// 	.then((res) => res.text())
	// 	.then((data) => {
	// 		emailPreview = data;
	// 	});

	//selectedEmailType = Object.keys(_EMAILS_LISTING_)[2];

	function quill(node) {
		let q = new Quill(node, {
			modules: {
				toolbar: [
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					["bold", "italic", "underline"],
					[{ list: "ordered" }, { list: "bullet" }],
					["link", "image"],
				],
			},
			placeholder: "...",
			theme: "snow",
		});
		// q.clipboard.dangerouslyPasteHTML(0, emailTemplate);
	}

	// $: output = parseHTML(emailTemplate, reverse);

	$: emailTemplates = `<?php 
		$lang = $_GET['lang'] ?? 'en';
		$text = [
			'en' => [
			'subject' => 'Shipping Confirmation for Order #'.$_GET['order_id'],
			'greeting' => 'Hello '.$_GET['name'].',',
			'shipment_details' => 'Your order has been shipped and is on its way to you! Here are the details of your shipment:',
			'tracking_number' => 'Tracking Number: '.$_GET['tracking_number'],
			'estimated_delivery' => 'Estimated Delivery Date: '.$_GET['estimated_delivery'],
			'website' => 'You can track your shipment and view the details of your order on our website: https://mark8t.ca',
			'questions' => 'If you have any questions or concerns, please feel free to contact us at inquiries@mark8t.ca.',
			'regards' => 'Best regards,<br>The Mark8t Team',
			],
			'fr' => [
			'subject' => 'Confirmation d\'expédition pour la commande #'.$_GET['order_id'],
			'greeting' => 'Bonjour '.$_GET['name'].',',
			'shipment_details' => 'Votre commande a été expédiée et est en route vers vous ! Voici les détails de votre expédition :',
			'tracking_number' => 'Numéro de suivi : '.$_GET['tracking_number'],
			'estimated_delivery' => 'Date de livraison estimée : '.$_GET['estimated_delivery'],
			'website' => 'Vous pouvez suivre votre expédition et consulter les détails de votre commande sur notre site web : https://mark8t.ca',
			'questions' => "Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à inquiries@mark8t.ca.",
			'regards' => "Cordialement,<br>L'équipe Mark8t",
			],
		];
		?>
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title><?php echo $text[$lang]['subject']; ?></title>
		</head>
		<body>
			<table cellpadding="0" cellspacing="0" border="0" width="100%">
			<tr>
				<td align="center" valign="top" bgcolor="#FFFFFF">
		<table cellpadding="0" cellspacing="0" border="0" width="600">
		<tr>
		<td align="center" valign="top" style="padding: 30px;">
		<img src="https://mark8t.ca/storage/logo.svg" alt="Mark8t" width="175" height="100" style="display: block;">
		</td>
		</tr>
		</table>
		</td>
		</tr>
		<tr>
		<td align="center" valign="top" bgcolor="#FFFFFF" style="padding: 30px;">
		<table cellpadding="0" cellspacing="0" border="0" width="600">
		<tr>
		<td align="left" valign="top" style="padding: 20px;">
		<p><?php echo $text[$lang]['greeting']; ?></p>
		<p><?php echo $text[$lang]['shipment_details']; ?></p>
		<p><?php echo $text[$lang]['tracking_number']; ?></p>
		<p><?php echo $text[$lang]['estimated_delivery']; ?></p>
		<p><?php echo $text[$lang]['website']; ?></p>
		<p><?php echo $text[$lang]['questions']; ?></p>
		<p><?php echo $text[$lang]['regards']; ?></p>
		</td>
		</tr>
		</table>
		</td>
		</tr>
		</table>

		</body>
		</html>
	`;
	$: emailTemplate = transformPHP(emailTemplates);

	onMount(() => {
		importEmailTemplate();
		emailTemplate = transformPHP(emailTemplates);
		// import
		// window.transformPHP = transformPHP;
		//emailTemplate = output;
		// phpStore.subscribe((value) => {
		// emailTemplate = value;
		// });
		//console.log(output);
	});
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<div class="w-100">
	<strong>Email Templates <small>(preview)</small></strong>

	<hr />
	<p>
		<small
			>This page allows you to manage and configure the different email
			templates. <br /> You send test emails to your self, or preview them
			here.
		</small>
	</p>
	<hr />
	<!-- <label for="email-type">(preview)</label> -->
	<select
		on:wheel={(event) => {}}
		id="email-type"
		class="w-100"
		bind:value={selectedEmailType}
		on:change={importEmailTemplate}
	>
		<!-- <option value="">Select an email type</option> -->
		{#each Object.entries(_EMAILS_LISTING_) as [key, value, index]}
			<option value={key}>{value.name}</option>
		{/each}
	</select>
	<!-- show filename from fileNames -->
</div>

<hr />
<div hidden>
	<!-- <label for="email-description">Email Description:</label> -->
	<!-- <textarea
		id="email-description"
		class="w-100"
		bind:value={_EMAILS_LISTING_[selectedEmailType].description}
		disabled
	/> -->
	<label for="email-template"><h3 class="w-100">Template</h3></label>
	<pre id="editor" use:quill>
		<!-- {"<!DOCTYPE html" + emailTemplate.split("<!DOCTYPE html")[1]} -->
</pre>
</div>
<!-- <hr /> -->
<div>
	<!-- <label for="email-template"><h3 class="w-100">Preview</h3></label> -->
	<div id="editor-preview">
		{@html emailPreview}
	</div>
</div>

<style>
	#email-type {
		padding: 0.75rem;
		font-size: 1.5rem;
	}

	:global(#editor) {
		white-space: pre-wrap; /* Preserves whitespace */
		font-family: monospace; /* Optional, for a fixed-width font */
		min-height: 300px;
	}
	#editor-preview {
		min-height: 300px;
		border: 1px solid;
		/* margin: 1rem; */
	}
</style>
