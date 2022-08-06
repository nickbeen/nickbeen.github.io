module.exports = {
	globDirectory: 'assets/',
	globPatterns: [
		'**/*.{css,js,svg}'
	],
	swDest: './serviceworker.js',
	swSrc: './assets/js/serviceworker.js'
};