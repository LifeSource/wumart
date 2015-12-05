module.exports = function () {

    var port = process.env.PORT || 3000,
    	env = process.env.NODE_ENV || "dev";

    var root = "./",
    	src = root + "src/",
    	client = src + "client/",
    	clientApp = client + "app/",
    	css = client + "css/",
    	styles = client + "styles/",
    	images = client + "images/",
    	server = src + "server/",
    	build = root + "build/",
    	temp = client + "temp/",
        transpiled = client + "transpiled/",
        report = root + "report/",
        specRunnerFile = "specs.html",
        wiredep = require('wiredep'),
        bowerFiles = wiredep({devDependencies: true})['js'], // jshint ignore:line
    	nodeModules = root + "node_modules/",
        jspmPackages = root + "jspm_packages/",
    	bowerComponents = root + "bower_components/",
    	ignore = [nodeModules, bowerComponents];

    var config = {
    	// Environment
    	env: env,
    	port: port,
    	// Paths
    	root: root,
    	src: src,
    	temp: temp,
    	build: build,
        report: report,
    	css: css,
    	fonts: bowerComponents + "font-awesome/fonts/**/*.*",
    	html: clientApp + "**/*.html",
    	htmlTemplates: clientApp + "**/*.html",
    	images: images + "**/*.*",
    	client: client,
    	clientApp: clientApp,
        transpiled: transpiled,
        transpiledJS: transpiled + "**/*.js",
    	styles: styles + "**/*.styl",
    	server: server,
    	// Files
    	nodeServer: server + "server.js",
    	index: client + "index.html",
    	siteCss: css + "site.css",
    	// JavaScripts
    	allJs: [
    		root + "*.js"
    	],
    	js: [
            jspmPackages + "system.js",
    		client + "config.js"
    	],
    	// Optimized files
    	optimized: {
    		app: "app.js",
    		lib: "lib.js"
    	},
    	// Template Cache
    	templateCache: {
    		file: "templates.js",
    		options: {
    			module: "app.core",
    			standAlone: false,
    			root: "app/"
    		}
    	},
    	// Bower and NPM
    	nodeModules: nodeModules,
    	bowerComponents: bowerComponents,
    	bower: {
    		json: root + "bower.json",
    		directory: bowerComponents,
    		ignorePath: "../.."
    	},
    	packages: [
    		"./package.json",
    		"./bower.json"
    	],
    	// Browser Sync
    	browserReloadDelay: 1000,
        /**
         * specs.html, our HTML spec runner
         */
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,

        /**
         * The sequence of the injections into specs.html:
         *  1 testlibraries
         *      mocha setup
         *  2 bower
         *  3 js
         *  4 spechelpers
         *  5 specs
         *  6 templates
         */
        testlibraries: [
            nodeModules + '/mocha/mocha.js',
            nodeModules + '/chai/chai.js',
            nodeModules + '/sinon-chai/lib/sinon-chai.js'
        ],
        specHelpers: [client + 'test-helpers/*.js'],
        specs: [clientApp + '**/*.spec.js'],
        serverIntegrationSpecs: [client + '/tests/server-integration/**/*.spec.js']
    };

    config.getWiredepDefaultOptions = function () {
    	var options = {
    		json: config.bower.json,
    		directory: config.bower.directory,
    		ignorePath: config.bower.ignorePath
    	};

    	return options;
    };

    /**
     * karma settings
     */
    config.karma = getKarmaOptions();

    return config;

    ////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                clientApp + '**/*.module.js',
                clientApp + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'} //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};
