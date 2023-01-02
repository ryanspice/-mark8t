
import * as Landing from "./components/www/Header.svelte";
import AgeGate from "./components/www/AgeGate.svelte";
import Quote from "./components/www/Quote.svelte";
import Map from "./components/www/Map.svelte";
import Calendar from "./components/www/Calendar.svelte";
import Newsletter from "./components/www/IframeNewsletter.svelte";
import Hours from "./components/www/Hours.svelte";
import FeatureVideo from "./components/www/FeatureVideo.svelte";

import Account from "./components/modules/Account.svelte";
import Contact from "./components/modules/Contact.svelte";
import Website from "./components/modules/Website.svelte";
import Google from "./components/modules/Google.svelte";
import Products from "./components/www/Products.svelte";

import Header from "./components/header/Header.svelte";
import ExternalLink from "./components/header/banner/ExternalLink.svelte";
import Footer from "./components/www/Footer.svelte";

import Modules from "./components/modules/index.js";
import Analytics from "./components/Analytics.svelte";
import Authenticate from "./components/Authenticate.svelte";
import Spinner from "./components/Spinner.svelte";
import Layout from "./components/Layout.svelte";

import Admin from "./pages/Admin.svelte";

import { _API_STORE_WEBSITE_ } from './stores.js';

import { base } from "$app/paths";
const Logout = () => {
	_API_STORE_WEBSITE_.set({});
	localStorage.removeItem('--store-website');

	localStorage.clear();
	window.location = base + "/";
}


export {
	Landing,
	AgeGate,
	Quote,
	Map,
	Calendar,
	Newsletter,
	Hours,
	FeatureVideo,

	Modules,
	Account,
	Contact,
	Website,
	Google,
	Products,

	Header,
	ExternalLink,
	Footer,

	Analytics,
	Authenticate,
	Spinner,
	Layout,

	Admin,
	Logout,

	_API_STORE_WEBSITE_
}