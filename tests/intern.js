define({
	// The port on which the instrumenting proxy will listen
	proxyPort: 9000,

	// A fully qualified URL to the Intern proxy
	proxyUrl: 'http://127.0.0.1:9000/',
	
	tunnel: 'NullTunnel',

	environments: [
		{ browserName: 'firefox' },
		{ browserName: 'chrome' }
	],

	// Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
	maxConcurrency: 2,

	loaderOptions: {
		'host-node': 'node_modules/dojo/dojo',
		'host-browser': 'node_modules/dojo/dojo.js',
		// Packages that should be registered with the loader in each testing environment
		packages: [
			{ name: 'dojo', location: 'node_modules/dojo' },
			{ name: 'dijit', location: 'node_modules/dijit' },
			{ name: 'dstore', location: 'node_modules/dojo-dstore' }
		]
	},

	// A regular expression matching URLs to files that should not be included in code coverage analysis
	excludeInstrumentation: /^dojox?|^dijit|^dstore|\/node_modules\/|\/test\/|\/nls\//,

	// Non-functional test suite(s) to run in each browser
	suites: ['tests/units/all']
});