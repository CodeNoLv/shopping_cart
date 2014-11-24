(function() {
	var scripts = {
		cdn: {
			jquery: 'lib/jquery-1.11.1.min',
			pure: 'lib/pure'
		},
		corePath: 'core/',
		modulesPath: 'core/modules/',
		core: {
			config: 'config',
			core: 'core',
			sandbox: 'sandbox'
		},
		modules: [
			'products',
			'cart',
			'wallet'
		]
	};
	
	var requireConfig = function() {
		// Development only
		/*require.config({
			urlArgs: "bust=" + (new Date()).getTime()
		});
		*/
		require([scripts.corePath + scripts.core.config], requireCore);
	};

	var requireCore = function(config) {
		require([scripts.corePath + scripts.core.core], requireSandbox);
	};
	
	// Fascade of the core
	var requireSandbox = function(core) {
		require([scripts.cdn.pure, scripts.corePath + scripts.core.sandbox], requireMainModules);
	};

	/**
	 * Warning: all main modules are loaded at the same time, submodules may fail
	 * to load. Suggested to load them seperatedly 
	 */
	var requireMainModules = function(pure, sandbox) {
		var requiredScripts = scripts.modules.map(function(e) {return scripts.modulesPath + e + '.module';});
		require(requiredScripts, initMainModules);
	};
	
	var initMainModules = function() {
		APP.CORE.start_all();
	};
	
	require([scripts.cdn.jquery], requireConfig);
}());
