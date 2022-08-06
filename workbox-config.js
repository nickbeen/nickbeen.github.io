module.exports = {
  globDirectory: __dirname,
	globPatterns: [
		'assets/**/*.{css,js,svg}'
	],
	swDest: './serviceworker.js',
	swSrc: './assets/js/serviceworker.js'
};