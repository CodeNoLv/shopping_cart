APP.Sandbox =  {
    create : function (core, module_selector) {
        var CONTAINER = core.dom.query('#' + module_selector),
			MODULE = module_selector;
		
        return {
			obj : CONTAINER,
            find : function (selector) {
                return CONTAINER.query(selector);
            },
            addEvent : function (element, type, fn) {
                core.dom.bind(element, type, fn);           
            },
            removeEvent : function (element, type, fn) {
                core.dom.unbind(element, type, fn);              
            },
            notify : function (evt) {
                if (core.is_obj(evt) && evt.type) {
                    core.triggerEvent(evt);
                }         
            },
            listen : function (evts) {
                if (core.is_obj(evts)) {
                    core.registerEvents(evts, module_selector);
                }
            },
            ignore : function (evts) {
                if (core.is_arr) {
                    core.removeEvents(evts, module_selector);
                }   
            },
            create_element : function (el, config) {
                var i, child, text;
                el = core.dom.create(el);
                
                if (config) {
                    if (config.children && core.is_arr(config.children)) {
                        i = 0;
                        while(child = config.children[i]) {
                            el.appendChild(child);
                            i++;
                        }
                        delete config.children;
                    }
                    if (config.text) {
                        el.appendChild(document.createTextNode(config.text));
                        delete config.text;
                    }
                    core.dom.apply_attrs(el, config);
                }
                return el;
            },
			
			log : function (str) {
					APP.CORE.log(1, str, MODULE);
			},
			warning : function (str) {
					APP.CORE.log(2, str, MODULE);
			},
			error : function (str) {
					APP.CORE.log(3, str, MODULE);
			},
					
			time : function(str) {
				if (window.console && console.log && CORE_CONFIG.debug){
					console.time(MODULE + ' | ' + str);
				}
			},
					
			timeEnd : function(str) {
				if (window.console && console.log && CORE_CONFIG.debug){
					console.timeEnd(MODULE + ' | ' + str);
				}
			},
			
			baseUrl : function () {
				pathArray = window.location.href.split( '/' );
				protocol = pathArray[0];
				host = pathArray[2];
				return protocol + '//' + host;
			},
			
			noNull : function(str) {
				if(str == null || str == 'null')
					return '';
				else
					return str;
			}
        };
    }
}
