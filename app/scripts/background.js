'use strict';

chrome.runtime.onInstalled.addListener(function(details) {
	console.log('previousVersion', details.previousVersion);

});

console.log('\'Allo \'Allo! Event Page for Browser Action');

chrome.tabs.query({
	currentWindow: true,
	active: true
}, function(tabs) {
	console.log('Funker det?' + tabs.url);
});