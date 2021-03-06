import md5 from "./crypto/md5.min.js";
import Base64 from "./crypto/base64.min.js";
import $ from "@/utils/jquery.js";
import { errorFunction } from "simple-statistics";
/* eslint-disable */
//严格模式下声明变量;
var m7$=$.noConflict();
var moor;
var softphoneBar;
var phone;
var linked;
var that = window;
var service_url = "https://pbx-bj-tx04.7moor.com";
var ringFunc = function(){
};
var afterPhone = function(){
};
var errorFunc = function(){
};
var successFunc = function(){
};
var loadingFunc = function(){
};
var inputFunc = function(){
}
var callProcessor;
//###moor.js##
;(function(){
	var dijit,moorx,djConfig,moorConfig;
	/*
	moor, dijit, and moorx must always be the first three, and in that order.
	djConfig.scopeMap = [
		["moor", "fojo"],
		["dijit", "fijit"],
		["moorx", "fojox"]
	
	]
	*/

	/**Build will replace this comment with a scoped djConfig **/

	//The null below can be relaced by a build-time value used instead of djConfig.scopeMap.
	var sMap = null;

	//See if new scopes need to be defined.
	if((sMap || (typeof djConfig != "undefined" && djConfig.scopeMap)) && (typeof window != "undefined")){
		var scopeDef = "", scopePrefix = "", scopeSuffix = "", scopeMap = {}, scopeMapRev = {};
		sMap = sMap || djConfig.scopeMap;
		for(var i = 0; i < sMap.length; i++){
			//Make local variables, then global variables that use the locals.
			var newScope = sMap[i];
			scopeDef += "var " + newScope[0] + " = {}; " + newScope[1] + " = " + newScope[0] + ";" + newScope[1] + "._scopeName = '" + newScope[1] + "';";
			scopePrefix += (i == 0 ? "" : ",") + newScope[0];
			scopeSuffix += (i == 0 ? "" : ",") + newScope[1];
			scopeMap[newScope[0]] = newScope[1];
			scopeMapRev[newScope[1]] = newScope[0];
		}

		eval(scopeDef + "moor._scopeArgs = [" + scopeSuffix + "];");

		moor._scopePrefixArgs = scopePrefix;
		moor._scopePrefix = "(function(" + scopePrefix + "){";
		moor._scopeSuffix = "})(" + scopeSuffix + ")";
		moor._scopeMap = scopeMap;
		moor._scopeMapRev = scopeMapRev;
	}

(function(){

	// firebug stubs
	if(typeof that["loadFirebugConsole"] == "function"){
		// for Firebug 1.2
		that["loadFirebugConsole"]();
	}else{
		that.console = that.console || {};
		//	Be careful to leave 'log' always at the end
		var cn = [
			"assert", "count", "debug", "dir", "dirxml", "error", "group",
			"groupEnd", "info", "profile", "profileEnd", "time", "timeEnd",
			"trace", "warn", "log"
		];

		var i = 0, tn;
		while((tn=cn[i++])){
			if(!console[tn]){
				(function(){
					var tcn = tn+"";
					console[tcn] = ('log' in console) ? function(){
						var a = Array.apply({}, arguments);
						a.unshift(tcn+":");
						console["log"](a.join(" "));
					} : function(){}
					console[tcn]._fake = true;
				})();
			}
		}
	 }

	//TODOC:  HOW TO DOC THIS?
	// moor is the root variable of (almost all) our public symbols -- make sure it is defined.
	if(typeof moor == "undefined"){
		moor = {
			_scopeName: "moor",
			_scopePrefix: "",
			_scopePrefixArgs: "",
			_scopeSuffix: "",
			_scopeMap: {},
			_scopeMapRev: {}
		};
	}

	var d = moor;

	//Need placeholders for dijit and moorx for scoping code.
	if(typeof dijit == "undefined"){
		dijit = {_scopeName: "dijit"};
	}
	if(typeof moorx == "undefined"){
		moorx = {_scopeName: "moorx"};
	}

	if(!d._scopeArgs){
		d._scopeArgs = [moor, dijit, moorx];
	}

/*=====
moor.global = {
	//	summary:
	//		Alias for the global scope
	//		(e.g. the window object in a browser).
	//	description:
	//		Refer to 'moor.global' rather than referring to window to ensure your
	//		code runs correctly in contexts other than web browsers (e.g. Rhino on a server).
}
=====*/
	d.global = that;

	d.config =/*===== djConfig = =====*/{
		isDebug: false,
		debugAtAllCosts: false
	};

	// FIXME: 2.0, drop djConfig support. Use moorConfig exclusively for global config.
	var cfg = typeof djConfig != "undefined" ? djConfig :
		typeof moorConfig != "undefined" ? moorConfig : null;
		
	if(cfg){
		for(var c in cfg){
			d.config[c] = cfg[c];
		}
	}

/*=====
	// Override locale setting, if specified
	moor.locale = {
		// summary: the locale as defined by moor (read-only)
	};
=====*/
	moor.locale = d.config.locale;

	var rev = "$Rev: 24595 $".match(/\d+/);


	moor.version = {
		major: 1, minor: 6, patch: 1, flag: "",
		revision: rev ? +rev[0] : NaN,
		toString: function(){
			// with(d.version){
				return d.version.major + "." + d.version.minor + "." + d.version.vpatch + d.version.flag + " (" + d.version.revision + ")";	// String
			// }
		}
	}
    var OpenAjax;
		// Register with the OpenAjax hub
	if(typeof OpenAjax != "undefined"){
		OpenAjax.hub.registerLibrary(moor._scopeName, "http://moortoolkit.org", d.version.toString());
	}
	
	var extraNames, extraLen, empty = {};
	for(var i in {toString: 1}){ extraNames = []; break; }
	moor._extraNames = extraNames = extraNames || ["hasOwnProperty", "valueOf", "isPrototypeOf",
		"propertyIsEnumerable", "toLocaleString", "toString", "constructor"];
	extraLen = extraNames.length;

	moor._mixin = function(/*Object*/ target, /*Object*/ source){
		// summary:
		//		Adds all properties and methods of source to target. This addition
		//		is "prototype extension safe", so that instances of objects
		//		will not pass along prototype defaults.
		var name, s, i;
		for(name in source){
			// the "tobj" condition avoid copying properties in "source"
			// inherited from Object.prototype.  For example, if target has a custom
			// toString() method, don't overwrite it with the toString() method
			// that source inherited from Object.prototype
			s = source[name];
			if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
				target[name] = s;
			}
		}
				// IE doesn't recognize some custom functions in for..in
		if(extraLen && source){
			for(i = 0; i < extraLen; ++i){
				name = extraNames[i];
				s = source[name];
				if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
					target[name] = s;
				}
			}
		}
				return target; // Object
	}

	moor.mixin = function(/*Object*/obj, /*Object...*/props){
		if(!obj){ obj = {}; }
		for(var i=1, l=arguments.length; i<l; i++){
			d._mixin(obj, arguments[i]);
		}
		return obj; // Object
	}

	moor._getProp = function(/*Array*/parts, /*Boolean*/create, /*Object*/context){
		var obj=context || d.global;
		for(var i=0, p; obj && (p=parts[i]); i++){
			if(i == 0 && d._scopeMap[p]){
				p = d._scopeMap[p];
			}
			obj = (p in obj ? obj[p] : (create ? obj[p]={} : undefined));
		}
		return obj; // mixed
	}

	moor.setObject = function(/*String*/name, /*Object*/value, /*Object?*/context){

		var parts=name.split("."), p=parts.pop(), obj=d._getProp(parts, true, context);
		return obj && p ? (obj[p]=value) : undefined; // Object
	}

	moor.getObject = function(/*String*/name, /*Boolean?*/create, /*Object?*/context){

		return d._getProp(name.split("."), create, context); // Object
	}

	moor.exists = function(/*String*/name, /*Object?*/obj){

		return d.getObject(name, false, obj) !== undefined; // Boolean
	}

	moor["eval"] = function(/*String*/ scriptFragment){
		//	summary:
		//		A legacy method created for use exclusively by internal moor methods. Do not use
		//		this method directly, the behavior of this eval will differ from the normal
		//		browser eval.
		//	description:
		//		Placed in a separate function to minimize size of trapped
		//		exceptions. Calling eval() directly from some other scope may
		//		complicate tracebacks on some platforms.
		//	returns:
		//		The result of the evaluation. Often `undefined`
		return d.global.eval ? d.global.eval(scriptFragment) : eval(scriptFragment); 	// Object
	}

	//Real functions declared in moor._firebug.firebug.
	d.deprecated = d.experimental = function(){};

})();
// vim:ai:ts=4:noet

/*
 * loader.js - A bootstrap module.  Runs before the hostenv_*.js file. Contains
 * all of the package loading methods.
 */
(function(){
	var d = moor, currentModule;

	d.mixin(d, {
		_loadedModules: {},
		_inFlightCount: 0,
		_hasResource: {},

		_modulePrefixes: {
			moor: 	{	name: "moor", value: "." },
			// moorx: 	{	name: "moorx", value: "../moorx" },
			// dijit: 	{	name: "dijit", value: "../dijit" },
			doh: 	{	name: "doh", value: "../util/doh" },
			tests: 	{	name: "tests", value: "tests" }
		},

		_moduleHasPrefix: function(/*String*/module){
			// summary: checks to see if module has been established
			var mp = d._modulePrefixes;
			return !!(mp[module] && mp[module].value); // Boolean
		},

		_getModulePrefix: function(/*String*/module){
			// summary: gets the prefix associated with module
			var mp = d._modulePrefixes;
			if(d._moduleHasPrefix(module)){
				return mp[module].value; // String
			}
			return module; // String
		},

		_loadedUrls: [],

		//WARNING:
		//		This variable is referenced by packages outside of bootstrap:
		//		FloatingPane.js and undo/browser.js
		_postLoad: false,

		//Egad! Lots of test files push on this directly instead of using moor.addOnLoad.
		_loaders: [],
		_unloaders: [],
		_loadNotifying: false
	});


		moor._loadPath = function(/*String*/relpath, /*String?*/module, /*Function?*/cb){

		var uri = ((relpath.charAt(0) == '/' || relpath.match(/^\w+:/)) ? "" : d.baseUrl) + relpath;
		try{
			currentModule = module;
			return !module ? d._loadUri(uri, cb) : d._loadUriAndCheck(uri, module, cb); // Boolean
		}catch(e){
			console.error(e);
			return false; // Boolean
		}finally{
			currentModule = null;
		}
	}

	moor._loadUri = function(/*String*/uri, /*Function?*/cb){


		if(d._loadedUrls[uri]){
			return true; // Boolean
		}
		d._inFlightCount++; // block addOnLoad calls that arrive while we're busy downloading
		var contents = d._getText(uri, true);
		if(contents){ // not 404, et al
			d._loadedUrls[uri] = true;
			d._loadedUrls.push(uri);
			if(cb){
				//conditional to support script-inject i18n bundle format
				contents = /^define\(/.test(contents) ? contents : '('+contents+')';
			}else{
				//Only do the scoping if no callback. If a callback is specified,
				//it is most likely the i18n bundle stuff.
				contents = d._scopePrefix + contents + d._scopeSuffix;
			}
			if(!d.isIE){ contents += "\r\n//@ sourceURL=" + uri; } // debugging assist for Firebug
			var value = d["eval"](contents);
			if(cb){ cb(value); }
		}
		// Check to see if we need to call _callLoaded() due to an addOnLoad() that arrived while we were busy downloading
		if(--d._inFlightCount == 0 && d._postLoad && d._loaders.length){
			// We shouldn't be allowed to get here but Firefox allows an event
			// (mouse, keybd, async xhrGet) to interrupt a synchronous xhrGet.
			// If the current script block contains multiple require() statements, then after each
			// require() returns, inFlightCount == 0, but we want to hold the _callLoaded() until
			// all require()s are done since the out-of-sequence addOnLoad() presumably needs them all.
			// setTimeout allows the next require() to start (if needed), and then we check this again.
			setTimeout(function(){
				// If inFlightCount > 0, then multiple require()s are running sequentially and
				// the next require() started after setTimeout() was executed but before we got here.
				if(d._inFlightCount == 0){
					d._callLoaded();
				}
			}, 0);
		}
		return !!contents; // Boolean: contents? true : false
	}
	
	// FIXME: probably need to add logging to this method
	moor._loadUriAndCheck = function(/*String*/uri, /*String*/moduleName, /*Function?*/cb){
		// summary: calls loadUri then findModule and returns true if both succeed
		var ok = false;
		try{
			ok = d._loadUri(uri, cb);
		}catch(e){
			console.error("failed loading " + uri + " with error: " + e);
		}
		return !!(ok && d._loadedModules[moduleName]); // Boolean
	}

	moor.loaded = function(){
		// summary:
		//		signal fired when initial environment and package loading is
		//		complete. You should use moor.addOnLoad() instead of doing a
		//		direct moor.connect() to this method in order to handle
		//		initialization tasks that require the environment to be
		//		initialized. In a browser host,	declarative widgets will
		//		be constructed when this function finishes runing.
		d._loadNotifying = true;
		d._postLoad = true;
		var mll = d._loaders;

		//Clear listeners so new ones can be added
		//For other xdomain package loads after the initial load.
		d._loaders = [];

		for(var x = 0; x < mll.length; x++){
			mll[x]();
		}

		d._loadNotifying = false;
		
		//Make sure nothing else got added to the onload queue
		//after this first run. If something did, and we are not waiting for any
		//more inflight resources, run again.
		if(d._postLoad && d._inFlightCount == 0 && mll.length){
			d._callLoaded();
		}
	}

	moor.unloaded = function(){
		// summary:
		//		signal fired by impending environment destruction. You should use
		//		moor.addOnUnload() instead of doing a direct moor.connect() to this
		//		method to perform page/application cleanup methods. See
		//		moor.addOnUnload for more info.
		var mll = d._unloaders;
		while(mll.length){
			(mll.pop())();
		}
	}

	d._onto = function(arr, obj, fn){
		if(!fn){
			arr.push(obj);
		}else if(fn){
			var func = (typeof fn == "string") ? obj[fn] : fn;
			arr.push(function(){ func.call(obj); });
		}
	}

	moor.ready = moor.addOnLoad = function(/*Object*/obj, /*String|Function?*/functionName){

		d._onto(d._loaders, obj, functionName);

		//Added for xdomain loading. moor.addOnLoad is used to
		//indicate callbacks after doing some moor.require() statements.
		//In the xdomain case, if all the requires are loaded (after initial
		//page load), then immediately call any listeners.
		if(d._postLoad && d._inFlightCount == 0 && !d._loadNotifying){
			d._callLoaded();
		}
	}

	//Support calling moor.addOnLoad via djConfig.addOnLoad. Support all the
	//call permutations of moor.addOnLoad. Mainly useful when moor is added
	//to the page after the page has loaded.
	var dca = d.config.addOnLoad;
	if(dca){
		d.addOnLoad[(dca instanceof Array ? "apply" : "call")](d, dca);
	}

	moor._modulesLoaded = function(){
		if(d._postLoad){ return; }
		if(d._inFlightCount > 0){
			console.warn("files still in flight!");
			return;
		}
		d._callLoaded();
	}

	moor._callLoaded = function(){

		if(typeof setTimeout == "object" || (d.config.useXDomain && d.isOpera)){
			setTimeout(
				d.isAIR ? function(){ d.loaded(); } : d._scopeName + ".loaded();",
				0);
		}else{
			d.loaded();
		}
	}

	moor._getModuleSymbols = function(/*String*/modulename){
		// summary:
		//		Converts a module name in dotted JS notation to an array
		//		representing the path in the source tree
		var syms = modulename.split(".");
		for(var i = syms.length; i>0; i--){
			var parentModule = syms.slice(0, i).join(".");
			if(i == 1 && !d._moduleHasPrefix(parentModule)){
				// Support default module directory (sibling of moor) for top-level modules
				syms[0] = "../" + syms[0];
			}else{
				var parentModulePath = d._getModulePrefix(parentModule);
				if(parentModulePath != parentModule){
					syms.splice(0, i, parentModulePath);
					break;
				}
			}
		}
		return syms; // Array
	}

	moor._global_omit_module_check = false;

	moor.loadInit = function(/*Function*/init){

		init();
	}

	moor._loadModule = moor.require = function(/*String*/moduleName, /*Boolean?*/omitModuleCheck){

		omitModuleCheck = d._global_omit_module_check || omitModuleCheck;

		//Check if it is already loaded.
		var module = d._loadedModules[moduleName];
		if(module){
			return module;
		}

		// convert periods to slashes
		var relpath = d._getModuleSymbols(moduleName).join("/") + '.js';
		var modArg = !omitModuleCheck ? moduleName : null;
		var ok = d._loadPath(relpath, modArg);
		if(!ok && !omitModuleCheck){
			throw new Error("Could not load '" + moduleName + "'; last tried '" + relpath + "'");
		}

		// check that the symbol was defined
		// Don't bother if we're doing xdomain (asynchronous) loading.
		if(!omitModuleCheck && !d._isXDomain){
			// pass in false so we can give better error
			module = d._loadedModules[moduleName];
			if(!module){
				throw new Error("symbol '" + moduleName + "' is not defined after loading '" + relpath + "'");
			}
		}

		return module;
	}

	moor.provide = function(/*String*/ resourceName){

		//Make sure we have a string.
		resourceName = resourceName + "";
		return (d._loadedModules[resourceName] = d.getObject(resourceName, true)); // Object
	}

	//Start of old bootstrap2:

	moor.platformRequire = function(/*Object*/modMap){

		var common = modMap.common || [];
		var result = common.concat(modMap[d._name] || modMap["default"] || []);

		for(var x=0; x<result.length; x++){
			var curr = result[x];
			if(curr.constructor == Array){
				d._loadModule.apply(d, curr);
			}else{
				d._loadModule(curr);
			}
		}
	}

	moor.requireIf = function(/*Boolean*/ condition, /*String*/ resourceName){
		// summary:
		//		If the condition is true then call `moor.require()` for the specified
		//		resource
		//
		// example:
		//	|	moor.requireIf(moor.isBrowser, "my.special.Module");
		
		if(condition === true){
			// FIXME: why do we support chained require()'s here? does the build system?
			var args = [];
			for(var i = 1; i < arguments.length; i++){
				args.push(arguments[i]);
			}
			d.require.apply(d, args);
		}
	}

	moor.requireAfterIf = d.requireIf;

	moor.registerModulePath = function(/*String*/module, /*String*/prefix){
	
		d._modulePrefixes[module] = { name: module, value: prefix };
	};
	
	moor.requireLocalization = function(/*String*/moduleName, /*String*/bundleName, /*String?*/locale, /*String?*/availableFlatLocales){
	

		d.require("moor.i18n");
		d.i18n._requireLocalization.apply(d.hostenv, arguments);
	};


	var ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),
		ire = new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");

	moor._Url = function(/*moor._Url|String...*/){


		var n = null,
			_a = arguments,
			uri = [_a[0]];
		// resolve uri components relative to each other
		for(var i = 1; i<_a.length; i++){
			if(!_a[i]){ continue; }

			// Safari doesn't support this.constructor so we have to be explicit
			// FIXME: Tracked (and fixed) in Webkit bug 3537.
			//		http://bugs.webkit.org/show_bug.cgi?id=3537
			var relobj = new d._Url(_a[i]+""),
				uriobj = new d._Url(uri[0]+"");

			if(
				relobj.path == "" &&
				!relobj.scheme &&
				!relobj.authority &&
				!relobj.query
			){
				if(relobj.fragment != n){
					uriobj.fragment = relobj.fragment;
				}
				relobj = uriobj;
			}else if(!relobj.scheme){
				relobj.scheme = uriobj.scheme;

				if(!relobj.authority){
					relobj.authority = uriobj.authority;

					if(relobj.path.charAt(0) != "/"){
						var path = uriobj.path.substring(0,
							uriobj.path.lastIndexOf("/") + 1) + relobj.path;

						var segs = path.split("/");
						for(var j = 0; j < segs.length; j++){
							if(segs[j] == "."){
								// flatten "./" references
								if(j == segs.length - 1){
									segs[j] = "";
								}else{
									segs.splice(j, 1);
									j--;
								}
							}else if(j > 0 && !(j == 1 && segs[0] == "") &&
								segs[j] == ".." && segs[j-1] != ".."){
								// flatten "../" references
								if(j == (segs.length - 1)){
									segs.splice(j, 1);
									segs[j - 1] = "";
								}else{
									segs.splice(j - 1, 2);
									j -= 2;
								}
							}
						}
						relobj.path = segs.join("/");
					}
				}
			}

			uri = [];
			if(relobj.scheme){
				uri.push(relobj.scheme, ":");
			}
			if(relobj.authority){
				uri.push("//", relobj.authority);
			}
			uri.push(relobj.path);
			if(relobj.query){
				uri.push("?", relobj.query);
			}
			if(relobj.fragment){
				uri.push("#", relobj.fragment);
			}
		}

		this.uri = uri.join("");

		// break the uri into its main components
		var r = this.uri.match(ore);

		this.scheme = r[2] || (r[1] ? "" : n);
		this.authority = r[4] || (r[3] ? "" : n);
		this.path = r[5]; // can never be undefined
		this.query = r[7] || (r[6] ? "" : n);
		this.fragment  = r[9] || (r[8] ? "" : n);

		if(this.authority != n){
			// server based naming authority
			r = this.authority.match(ire);

			this.user = r[3] || n;
			this.password = r[4] || n;
			this.host = r[6] || r[7]; // ipv6 || ipv4
			this.port = r[9] || n;
		}
	}

	moor._Url.prototype.toString = function(){ return this.uri; };

	moor.moduleUrl = function(/*String*/module, /*moor._Url||String*/url){
		

		var loc = d._getModuleSymbols(module).join('/');
		if(!loc){ return null; }
		if(loc.lastIndexOf("/") != loc.length-1){
			loc += "/";
		}
		
		//If the path is an absolute path (starts with a / or is on another
		//domain/xdomain) then don't add the baseUrl.
		var colonIndex = loc.indexOf(":");
		if(loc.charAt(0) != "/" && (colonIndex == -1 || colonIndex > loc.indexOf("/"))){
			loc = d.baseUrl + loc;
		}

		return new d._Url(loc, url); // moor._Url
	};



})();

if(typeof window != 'undefined'){
	moor.isBrowser = true;
	moor._name = "browser";


	// attempt to figure out the path to moor if it isn't set in the config
	(function(){
		var d = moor;

		// this is a scope protection closure. We set browser versions and grab
		// the URL we were loaded from here.

		// grab the node we were loaded from
		if(document && document.getElementsByTagName){
			var scripts = document.getElementsByTagName("script");
			var rePkg = /moor(\.xd)?\.js(\W|$)/i;
			for(var i = 0; i < scripts.length; i++){
				var src = scripts[i].getAttribute("src");
				if(!src){ continue; }
				var m = src.match(rePkg);
				if(m){
					// find out where we came from
					if(!d.config.baseUrl){
						d.config.baseUrl = src.substring(0, m.index);
					}
					// and find out if we need to modify our behavior
					var cfg = (scripts[i].getAttribute("djConfig") || scripts[i].getAttribute("data-moor-config"));
					if(cfg){
						var cfgo = eval("({ "+cfg+" })");
						for(var x in cfgo){
							moor.config[x] = cfgo[x];
						}
					}
					break; // "first moor wins"
				}
			}
		}
		d.baseUrl = d.config.baseUrl;

		// fill in the rendering support information in moor.render.*
		var n = navigator;
		var dua = n.userAgent,
			dav = n.appVersion,
			tv = parseFloat(dav);

		if(dua.indexOf("Opera") >= 0){ d.isOpera = tv; }
		if(dua.indexOf("AdobeAIR") >= 0){ d.isAIR = 1; }
		d.isKhtml = (dav.indexOf("Konqueror") >= 0) ? tv : 0;
		d.isWebKit = parseFloat(dua.split("WebKit/")[1]) || undefined;
		d.isChrome = parseFloat(dua.split("Chrome/")[1]) || undefined;
		d.isMac = dav.indexOf("Macintosh") >= 0;

		// safari detection derived from:
		//		http://developer.apple.com/internet/safari/faq.html#anchor2
		//		http://developer.apple.com/internet/safari/uamatrix.html
		var index = Math.max(dav.indexOf("WebKit"), dav.indexOf("Safari"), 0);
		if(index && !moor.isChrome){
			// try to grab the explicit Safari version first. If we don't get
			// one, look for less than 419.3 as the indication that we're on something
			// "Safari 2-ish".
			d.isSafari = parseFloat(dav.split("Version/")[1]);
			if(!d.isSafari || parseFloat(dav.substr(index + 7)) <= 419.3){
				d.isSafari = 2;
			}
		}

				if(dua.indexOf("Gecko") >= 0 && !d.isKhtml && !d.isWebKit){ d.isMozilla = d.isMoz = tv; }
		if(d.isMoz){
			//We really need to get away from this. Consider a sane isGecko approach for the future.
			d.isFF = parseFloat(dua.split("Firefox/")[1] || dua.split("Minefield/")[1]) || undefined;
		}
		if(document.all && !d.isOpera){
			d.isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;
			//In cases where the page has an HTTP header or META tag with
			//X-UA-Compatible, then it is in emulation mode.
			//Make sure isIE reflects the desired version.
			//document.documentMode of 5 means quirks mode.
			//Only switch the value if documentMode's major version
			//is different from isIE's major version.
			var mode = document.documentMode;
			if(mode && mode != 5 && Math.floor(d.isIE) != mode){
				d.isIE = mode;
			}
		}

		//Workaround to get local file loads of moor to work on IE 7
		//by forcing to not use native xhr.
		if(moor.isIE && window.location.protocol === "file:"){
			moor.config.ieForceActiveXXhr=true;
		}
		
		d.isQuirks = document.compatMode == "BackCompat";

		// TODO: is the HTML LANG attribute relevant?
		d.locale = moor.config.locale || (d.isIE ? n.userLanguage : n.language).toLowerCase();

		// These are in order of decreasing likelihood; this will change in time.
				d._XMLHTTP_PROGIDS = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
		
		d._xhrObj = function(){
			// summary:
			//		does the work of portably generating a new XMLHTTPRequest object.
			var http, last_e;
						if(!moor.isIE || !moor.config.ieForceActiveXXhr){
							try{ http = new XMLHttpRequest(); }catch(e){}
						}
			if(!http){
				for(var i=0; i<3; ++i){
					var progid = d._XMLHTTP_PROGIDS[i];
					try{
						http = new ActiveXObject(progid);
					}catch(e){
						last_e = e;
					}

					if(http){
						d._XMLHTTP_PROGIDS = [progid];  // so faster next time
						break;
					}
				}
			}
			
			if(!http){
				throw new Error("XMLHTTP not available: "+last_e);
			}

			return http; // XMLHTTPRequest instance
		}

		d._isDocumentOk = function(http){
			var stat = http.status || 0,
				lp = location.protocol;
			return (stat >= 200 && stat < 300) || 	// Boolean
				stat == 304 ||			// allow any 2XX response code
				stat == 1223 ||			// get it out of the cache
								// Internet Explorer mangled the status code
				// Internet Explorer mangled the status code OR we're Titanium/browser chrome/chrome extension requesting a local file
				(!stat && (lp == "file:" || lp == "chrome:" || lp == "chrome-extension:" || lp == "app:"));
		}

		//See if base tag is in use.
		//This is to fix http://trac.moortoolkit.org/ticket/3973,
		//but really, we need to find out how to get rid of the moor._Url reference
		//below and still have DOH work with the moor.i18n test following some other
		//test that uses the test frame to load a document (trac #2757).
		//Opera still has problems, but perhaps a larger issue of base tag support
		//with XHR requests (hasBase is true, but the request is still made to document
		//path, not base path).
		var owloc = window.location+"";
		var base = document.getElementsByTagName("base");
		var hasBase = (base && base.length > 0);

		d._getText = function(/*URI*/ uri, /*Boolean*/ fail_ok){
			// summary: Read the contents of the specified uri and return those contents.
			// uri:
			//		A relative or absolute uri. If absolute, it still must be in
			//		the same "domain" as we are.
			// fail_ok:
			//		Default false. If fail_ok and loading fails, return null
			//		instead of throwing.
			// returns: The response text. null is returned when there is a
			//		failure and failure is okay (an exception otherwise)

			// NOTE: must be declared before scope switches ie. this._xhrObj()
			var http = d._xhrObj();

			if(!hasBase && moor._Url){
				uri = (new moor._Url(owloc, uri)).toString();
			}

			if(d.config.cacheBust){
				//Make sure we have a string before string methods are used on uri
				uri += "";
				uri += (uri.indexOf("?") == -1 ? "?" : "&") + String(d.config.cacheBust).replace(/\W+/g,"");
			}

			http.open('GET', uri, false);
			try{
				http.send(null);
				if(!d._isDocumentOk(http)){
					var err = Error("Unable to load "+uri+" status:"+ http.status);
					err.status = http.status;
					err.responseText = http.responseText;
					throw err;
				}
			}catch(e){
				if(fail_ok){ return null; } // null
				// rethrow the exception
				throw e;
			}
			return http.responseText; // String
		}
		

		var _w = window;
		var _handleNodeEvent = function(/*String*/evtName, /*Function*/fp){
			// summary:
			//		non-destructively adds the specified function to the node's
			//		evtName handler.
			// evtName: should be in the form "onclick" for "onclick" handlers.
			// Make sure you pass in the "on" part.
			var _a = _w.attachEvent || _w.addEventListener;
			evtName = _w.attachEvent ? evtName : evtName.substring(2);
			_a(evtName, function(){
				fp.apply(_w, arguments);
			}, false);
		};


		d._windowUnloaders = [];
		
		d.windowUnloaded = function(){
			// summary:
			//		signal fired by impending window destruction. You may use
			//		moor.addOnWindowUnload() to register a listener for this
			//		event. NOTE: if you wish to moor.connect() to this method
			//		to perform page/application cleanup, be aware that this
			//		event WILL NOT fire if no handler has been registered with
			//		moor.addOnWindowUnload. This behavior started in moor 1.3.
			//		Previous versions always triggered moor.windowUnloaded. See
			//		moor.addOnWindowUnload for more info.
			var mll = d._windowUnloaders;
			while(mll.length){
				(mll.pop())();
			}
			d = null;
		};

		var _onWindowUnloadAttached = 0;
		d.addOnWindowUnload = function(/*Object?|Function?*/obj, /*String|Function?*/functionName){


			d._onto(d._windowUnloaders, obj, functionName);
			if(!_onWindowUnloadAttached){
				_onWindowUnloadAttached = 1;
				_handleNodeEvent("onunload", d.windowUnloaded);
			}
		};

		var _onUnloadAttached = 0;
		d.addOnUnload = function(/*Object?|Function?*/obj, /*String|Function?*/functionName){

			d._onto(d._unloaders, obj, functionName);
			if(!_onUnloadAttached){
				_onUnloadAttached = 1;
				_handleNodeEvent("onbeforeunload", moor.unloaded);
			}
		};

	})();

	//START DOMContentLoaded
	moor._initFired = false;
	moor._loadInit = function(e){
		if(moor._scrollIntervalId){
			clearInterval(moor._scrollIntervalId);
			moor._scrollIntervalId = 0;
		}

		if(!moor._initFired){
			moor._initFired = true;

			//Help out IE to avoid memory leak.
			if(!moor.config.afterOnLoad && window.detachEvent){
				window.detachEvent("onload", moor._loadInit);
			}

			if(moor._inFlightCount == 0){
				moor._modulesLoaded();
			}
		}
	}

	if(!moor.config.afterOnLoad){
		if(document.addEventListener){
			//Standards. Hooray! Assumption here that if standards based,
			//it knows about DOMContentLoaded. It is OK if it does not, the fall through
			//to window onload should be good enough.
			document.addEventListener("DOMContentLoaded", moor._loadInit, false);
			window.addEventListener("load", moor._loadInit, false);
		}else if(window.attachEvent){
			window.attachEvent("onload", moor._loadInit);

			//DOMContentLoaded approximation. Diego Perini found this MSDN article
			//that indicates doScroll is available after DOM ready, so do a setTimeout
			//to check when it is available.
			//http://msdn.microsoft.com/en-us/library/ms531426.aspx
			if(!moor.config.skipIeDomLoaded && self === self.top){
				moor._scrollIntervalId = setInterval(function (){
					try{
						//When moor is loaded into an iframe in an IE HTML Application
						//(HTA), such as in a selenium test, javascript in the iframe
						//can't see anything outside of it, so self===self.top is true,
						//but the iframe is not the top window and doScroll will be
						//available before document.body is set. Test document.body
						//before trying the doScroll trick
						if(document.body){
							document.documentElement.doScroll("left");
							moor._loadInit();
						}
					}catch (e){}
				}, 30);
			}
		}
	}

		if(moor.isIE){
		try{
			(function(){
				document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
				var vmlElems = ["*", "group", "roundrect", "oval", "shape", "rect", "imagedata", "path", "textpath", "text"],
					i = 0, l = 1, s = document.createStyleSheet();
				if(moor.isIE >= 8){
					i = 1;
					l = vmlElems.length;
				}
				for(; i < l; ++i){
					s.addRule("v\\:" + vmlElems[i], "behavior:url(#default#VML); display:inline-block");
				}
			})();
		}catch(e){}
	}
		//END DOMContentLoaded


	/*
	OpenAjax.subscribe("OpenAjax", "onload", function(){
		if(moor._inFlightCount == 0){
			moor._modulesLoaded();
		}
	});

	OpenAjax.subscribe("OpenAjax", "onunload", function(){
		moor.unloaded();
	});
	*/
} //if (typeof window != 'undefined')

//Register any module paths set up in djConfig. Need to do this
//in the hostenvs since hostenv_browser can read djConfig from a
//script tag's attribute.
(function(){
	var mp = moor.config["modulePaths"];
	if(mp){
		for(var param in mp){
			moor.registerModulePath(param, mp[param]);
		}
	}
})();

//Load debug code if necessary.
if(moor.config.isDebug){
	//// moor.require("moor._firebug.firebug");
}

if(moor.config.debugAtAllCosts){
	// this breaks the new AMD based module loader. The XDomain won't be necessary
	// anyway if you switch to the asynchronous loader
	//moor.config.useXDomain = true;
	//moor.require("moor._base._loader.loader_xd");
	//// moor.require("moor._base._loader.loader_debug");
	//// moor.require("moor.i18n");
}


if(!moor._hasResource["moor._base.lang"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.lang"] = true;
moor.provide("moor._base.lang");


(function(){
	var d = moor, opts = Object.prototype.toString;

	// Crockford (ish) functions

	moor.isString = function(/*anything*/ it){
		//	summary:
		//		Return true if it is a String
		return (typeof it == "string" || it instanceof String); // Boolean
	};

	moor.isArray = function(/*anything*/ it){
		//	summary:
		//		Return true if it is an Array.
		//		Does not work on Arrays created in other windows.
		return it && (it instanceof Array || typeof it == "array"); // Boolean
	};

	moor.isFunction = function(/*anything*/ it){
		// summary:
		//		Return true if it is a Function
		return opts.call(it) === "[object Function]";
	};

	moor.isObject = function(/*anything*/ it){
		// summary:
		//		Returns true if it is a JavaScript object (or an Array, a Function
		//		or null)
		return it !== undefined &&
			(it === null || typeof it == "object" || d.isArray(it) || d.isFunction(it)); // Boolean
	};

	moor.isArrayLike = function(/*anything*/ it){
		//	summary:
		//		similar to moor.isArray() but more permissive
		//	description:
		//		Doesn't strongly test for "arrayness".  Instead, settles for "isn't
		//		a string or number and has a length property". Arguments objects
		//		and DOM collections will return true when passed to
		//		moor.isArrayLike(), but will return false when passed to
		//		moor.isArray().
		//	returns:
		//		If it walks like a duck and quacks like a duck, return `true`
		return it && it !== undefined && // Boolean
			// keep out built-in constructors (Number, String, ...) which have length
			// properties
			!d.isString(it) && !d.isFunction(it) &&
			!(it.tagName && it.tagName.toLowerCase() == 'form') &&
			(d.isArray(it) || isFinite(it.length));
	};

	moor.isAlien = function(/*anything*/ it){
		// summary:
		//		Returns true if it is a built-in function or some other kind of
		//		oddball that *should* report as a function but doesn't
		return it && !d.isFunction(it) && /\{\s*\[native code\]\s*\}/.test(String(it)); // Boolean
	};

	moor.extend = function(/*Object*/ constructor, /*Object...*/ props){
		// summary:
		//		Adds all properties and methods of props to constructor's
		//		prototype, making them available to all instances created with
		//		constructor.
		for(var i=1, l=arguments.length; i<l; i++){
			d._mixin(constructor.prototype, arguments[i]);
		}
		return constructor; // Object
	};

	moor._hitchArgs = function(scope, method /*,...*/){
		var pre = d._toArray(arguments, 2);
		var named = d.isString(method);
		return function(){
			// arrayify arguments
			var args = d._toArray(arguments);
			// locate our method
			var f = named ? (scope||d.global)[method] : method;
			// invoke with collected args
			return f && f.apply(scope || this, pre.concat(args)); // mixed
		}; // Function
	};

	moor.hitch = function(/*Object*/scope, /*Function|String*/method /*,...*/){
		//	summary:
		//		Returns a function that will only ever execute in the a given scope.
		//		This allows for easy use of object member functions
		//		in callbacks and other places in which the "this" keyword may
		//		otherwise not reference the expected scope.
		//		Any number of default positional arguments may be passed as parameters
		//		beyond "method".
		//		Each of these values will be used to "placehold" (similar to curry)
		//		for the hitched function.
		//	scope:
		//		The scope to use when method executes. If method is a string,
		//		scope is also the object containing method.
		//	method:
		//		A function to be hitched to scope, or the name of the method in
		//		scope to be hitched.
		//	example:
		//	|	moor.hitch(foo, "bar")();
		//		runs foo.bar() in the scope of foo
		//	example:
		//	|	moor.hitch(foo, myFunction);
		//		returns a function that runs myFunction in the scope of foo
		//	example:
		//		Expansion on the default positional arguments passed along from
		//		hitch. Passed args are mixed first, additional args after.
		//	|	var foo = { bar: function(a, b, c){ console.log(a, b, c); } };
		//	|	var fn = moor.hitch(foo, "bar", 1, 2);
		//	|	fn(3); // logs "1, 2, 3"
		//	example:
		//	|	var foo = { bar: 2 };
		//	|	moor.hitch(foo, function(){ this.bar = 10; })();
		//		execute an anonymous function in scope of foo
		
		if(arguments.length > 2){
			return d._hitchArgs.apply(d, arguments); // Function
		}
		if(!method){
			method = scope;
			scope = null;
		}
		if(d.isString(method)){
			scope = scope || d.global;
			if(!scope[method]){ throw(['moor.hitch: scope["', method, '"] is null (scope="', scope, '")'].join('')); }
			return function(){ return scope[method].apply(scope, arguments || []); }; // Function
		}
		return !scope ? method : function(){ return method.apply(scope, arguments || []); }; // Function
	};

	/*=====
	moor.delegate = function(obj, props){
		//	summary:
		//		Returns a new object which "looks" to obj for properties which it
		//		does not have a value for. Optionally takes a bag of properties to
		//		seed the returned object with initially.
		//	description:
		//		This is a small implementaton of the Boodman/Crockford delegation
		//		pattern in JavaScript. An intermediate object constructor mediates
		//		the prototype chain for the returned object, using it to delegate
		//		down to obj for property lookup when object-local lookup fails.
		//		This can be thought of similarly to ES4's "wrap", save that it does
		//		not act on types but rather on pure objects.
		//	obj:
		//		The object to delegate to for properties not found directly on the
		//		return object or in props.
		//	props:
		//		an object containing properties to assign to the returned object
		//	returns:
		//		an Object of anonymous type
		//	example:
		//	|	var foo = { bar: "baz" };
		//	|	var thinger = moor.delegate(foo, { thud: "xyzzy"});
		//	|	thinger.bar == "baz"; // delegated to foo
		//	|	foo.thud == undefined; // by definition
		//	|	thinger.thud == "xyzzy"; // mixed in from props
		//	|	foo.bar = "thonk";
		//	|	thinger.bar == "thonk"; // still delegated to foo's bar
	}
	=====*/

	moor.delegate = moor._delegate = (function(){
		// boodman/crockford delegation w/ cornford optimization
		function TMP(){}
		return function(obj, props){
			TMP.prototype = obj;
			var tmp = new TMP();
			TMP.prototype = null;
			if(props){
				d._mixin(tmp, props);
			}
			return tmp; // Object
		};
	})();

	/*=====
	moor._toArray = function(obj, offset, startWith){
		//	summary:
		//		Converts an array-like object (i.e. arguments, DOMCollection) to an
		//		array. Returns a new Array with the elements of obj.
		//	obj: Object
		//		the object to "arrayify". We expect the object to have, at a
		//		minimum, a length property which corresponds to integer-indexed
		//		properties.
		//	offset: Number?
		//		the location in obj to start iterating from. Defaults to 0.
		//		Optional.
		//	startWith: Array?
		//		An array to pack with the properties of obj. If provided,
		//		properties in obj are appended at the end of startWith and
		//		startWith is the returned array.
	}
	=====*/

	var efficient = function(obj, offset, startWith){
		return (startWith||[]).concat(Array.prototype.slice.call(obj, offset||0));
	};

		var slow = function(obj, offset, startWith){
		var arr = startWith||[];
		for(var x = offset || 0; x < obj.length; x++){
			arr.push(obj[x]);
		}
		return arr;
	};
	
	moor._toArray =
				d.isIE ?  function(obj){
			return ((obj.item) ? slow : efficient).apply(this, arguments);
		} :
				efficient;

	moor.partial = function(/*Function|String*/method /*, ...*/){
		//	summary:
		//		similar to hitch() except that the scope object is left to be
		//		whatever the execution context eventually becomes.
		//	description:
		//		Calling moor.partial is the functional equivalent of calling:
		//		|	moor.hitch(null, funcName, ...);
		var arr = [ null ];
		return d.hitch.apply(d, arr.concat(d._toArray(arguments))); // Function
	};

	var extraNames = d._extraNames, extraLen = extraNames.length, empty = {};

	moor.clone = function(/*anything*/ o){
		// summary:
		//		Clones objects (including DOM nodes) and all children.
		//		Warning: do not clone cyclic structures.
		if(!o || typeof o != "object" || d.isFunction(o)){
			// null, undefined, any non-object, or function
			return o;	// anything
		}
		if(o.nodeType && "cloneNode" in o){
			// DOM Node
			return o.cloneNode(true); // Node
		}
		if(o instanceof Date){
			// Date
			return new Date(o.getTime());	// Date
		}
		if(o instanceof RegExp){
			// RegExp
			return new RegExp(o);   // RegExp
		}
		var r, i, l, s, name;
		if(d.isArray(o)){
			// array
			r = [];
			for(i = 0, l = o.length; i < l; ++i){
				if(i in o){
					r.push(d.clone(o[i]));
				}
			}
// we don't clone functions for performance reasons
//		}else if(d.isFunction(o)){
//			// function
//			r = function(){ return o.apply(this, arguments); };
		}else{
			// generic objects
			r = o.constructor ? new o.constructor() : {};
		}
		for(name in o){
			// the "tobj" condition avoid copying properties in "source"
			// inherited from Object.prototype.  For example, if target has a custom
			// toString() method, don't overwrite it with the toString() method
			// that source inherited from Object.prototype
			s = o[name];
			if(!(name in r) || (r[name] !== s && (!(name in empty) || empty[name] !== s))){
				r[name] = d.clone(s);
			}
		}
				// IE doesn't recognize some custom functions in for..in
		if(extraLen){
			for(i = 0; i < extraLen; ++i){
				name = extraNames[i];
				s = o[name];
				if(!(name in r) || (r[name] !== s && (!(name in empty) || empty[name] !== s))){
					r[name] = s; // functions only, we don't clone them
				}
			}
		}
				return r; // Object
	};

	/*=====
	moor.trim = function(str){
		//	summary:
		//		Trims whitespace from both sides of the string
		//	str: String
		//		String to be trimmed
		//	returns: String
		//		Returns the trimmed string
		//	description:
		//		This version of trim() was selected for inclusion into the base due
		//		to its compact size and relatively good performance
		//		(see [Steven Levithan's blog](http://blog.stevenlevithan.com/archives/faster-trim-javascript)
		//		Uses String.prototype.trim instead, if available.
		//		The fastest but longest version of this function is located at
		//		moor.string.trim()
		return "";	// String
	}
	=====*/

	moor.trim = String.prototype.trim ?
		function(str){ return str.trim(); } :
		function(str){ return str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };

	/*=====
	moor.replace = function(tmpl, map, pattern){
		//	summary:
		//		Performs parameterized substitutions on a string. Throws an
		//		exception if any parameter is unmatched.
		//	tmpl: String
		//		String to be used as a template.
		//	map: Object|Function
		//		If an object, it is used as a dictionary to look up substitutions.
		//		If a function, it is called for every substitution with following
		//		parameters: a whole match, a name, an offset, and the whole template
		//		string (see https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/String/replace
		//		for more details).
		//	pattern: RegEx?
		//		Optional regular expression objects that overrides the default pattern.
		//		Must be global and match one item. The default is: /\{([^\}]+)\}/g,
		//		which matches patterns like that: "{xxx}", where "xxx" is any sequence
		//		of characters, which doesn't include "}".
		//	returns: String
		//		Returns the substituted string.
		//	example:
		//	|	// uses a dictionary for substitutions:
		//	|	moor.replace("Hello, {name.first} {name.last} AKA {nick}!",
		//	|	  {
		//	|	    nick: "Bob",
		//	|	    name: {
		//	|	      first:  "Robert",
		//	|	      middle: "X",
		//	|	      last:   "Cringely"
		//	|	    }
		//	|	  });
		//	|	// returns: Hello, Robert Cringely AKA Bob!
		//	example:
		//	|	// uses an array for substitutions:
		//	|	moor.replace("Hello, {0} {2}!",
		//	|	  ["Robert", "X", "Cringely"]);
		//	|	// returns: Hello, Robert Cringely!
		//	example:
		//	|	// uses a function for substitutions:
		//	|	function sum(a){
		//	|	  var t = 0;
		//	|	  moor.forEach(a, function(x){ t += x; });
		//	|	  return t;
		//	|	}
		//	|	moor.replace(
		//	|	  "{count} payments averaging {avg} USD per payment.",
		//	|	  moor.hitch(
		//	|	    { payments: [11, 16, 12] },
		//	|	    function(_, key){
		//	|	      switch(key){
		//	|	        case "count": return this.payments.length;
		//	|	        case "min":   return Math.min.apply(Math, this.payments);
		//	|	        case "max":   return Math.max.apply(Math, this.payments);
		//	|	        case "sum":   return sum(this.payments);
		//	|	        case "avg":   return sum(this.payments) / this.payments.length;
		//	|	      }
		//	|	    }
		//	|	  )
		//	|	);
		//	|	// prints: 3 payments averaging 13 USD per payment.
		//	example:
		//	|	// uses an alternative PHP-like pattern for substitutions:
		//	|	moor.replace("Hello, ${0} ${2}!",
		//	|	  ["Robert", "X", "Cringely"], /\$\{([^\}]+)\}/g);
		//	|	// returns: Hello, Robert Cringely!
		return "";	// String
	}
	=====*/

	var _pattern = /\{([^\}]+)\}/g;
	moor.replace = function(tmpl, map, pattern){
		return tmpl.replace(pattern || _pattern, d.isFunction(map) ?
			map : function(_, k){ return d.getObject(k, false, map); });
	};
})();

}

if(!moor._hasResource["moor._base.array"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.array"] = true;
moor.provide("moor._base.array");



(function(){
	var _getParts = function(arr, obj, cb){
		return [
			(typeof arr == "string") ? arr.split("") : arr,
			obj || moor.global,
			// FIXME: cache the anonymous functions we create here?
			(typeof cb == "string") ? new Function("item", "index", "array", cb) : cb
		];
	};

	var everyOrSome = function(/*Boolean*/every, /*Array|String*/arr, /*Function|String*/callback, /*Object?*/thisObject){
		var _p = _getParts(arr, thisObject, callback); arr = _p[0];
		for(var i=0,l=arr.length; i<l; ++i){
			var result = !!_p[2].call(_p[1], arr[i], i, arr);
			if(every ^ result){
				return result; // Boolean
			}
		}
		return every; // Boolean
	};

	moor.mixin(moor, {
		indexOf: function(	/*Array*/		array,
							/*Object*/		value,
							/*Integer?*/	fromIndex,
							/*Boolean?*/	findLast){
			// summary:
			//		locates the first index of the provided value in the
			//		passed array. If the value is not found, -1 is returned.
			// description:
			//		This method corresponds to the JavaScript 1.6 Array.indexOf method, with one difference: when
			//		run over sparse arrays, the moor function invokes the callback for every index whereas JavaScript
			//		1.6's indexOf skips the holes in the sparse array.
			//		For details on this method, see:
			//			https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/indexOf

			var step = 1, end = array.length || 0, i = 0;
			if(findLast){
				i = end - 1;
				step = end = -1;
			}
			if(fromIndex != undefined){ i = fromIndex; }
			if((findLast && i > end) || i < end){
				for(; i != end; i += step){
					if(array[i] == value){ return i; }
				}
			}
			return -1;	// Number
		},

		lastIndexOf: function(/*Array*/array, /*Object*/value, /*Integer?*/fromIndex){
			// summary:
			//		locates the last index of the provided value in the passed
			//		array. If the value is not found, -1 is returned.
			// description:
			//		This method corresponds to the JavaScript 1.6 Array.lastIndexOf method, with one difference: when
			//		run over sparse arrays, the moor function invokes the callback for every index whereas JavaScript
			//		1.6's lastIndexOf skips the holes in the sparse array.
			//		For details on this method, see:
			// 			https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/lastIndexOf
			return moor.indexOf(array, value, fromIndex, true); // Number
		},

		forEach: function(/*Array|String*/arr, /*Function|String*/callback, /*Object?*/thisObject){


			// match the behavior of the built-in forEach WRT empty arrs
			if(!arr || !arr.length){ return; }

			// FIXME: there are several ways of handilng thisObject. Is
			// moor.global always the default context?
			var _p = _getParts(arr, thisObject, callback); arr = _p[0];
			for(var i=0,l=arr.length; i<l; ++i){
				_p[2].call(_p[1], arr[i], i, arr);
			}
		},

		every: function(/*Array|String*/arr, /*Function|String*/callback, /*Object?*/thisObject){

			return everyOrSome(true, arr, callback, thisObject); // Boolean
		},

		some: function(/*Array|String*/arr, /*Function|String*/callback, /*Object?*/thisObject){

			return everyOrSome(false, arr, callback, thisObject); // Boolean
		},

		map: function(/*Array|String*/arr, /*Function|String*/callback, /*Function?*/thisObject){


			var _p = _getParts(arr, thisObject, callback); arr = _p[0];
			var outArr = (arguments[3] ? (new arguments[3]()) : []);
			for(var i=0,l=arr.length; i<l; ++i){
				outArr.push(_p[2].call(_p[1], arr[i], i, arr));
			}
			return outArr; // Array
		},

		filter: function(/*Array*/arr, /*Function|String*/callback, /*Object?*/thisObject){


			var _p = _getParts(arr, thisObject, callback); arr = _p[0];
			var outArr = [];
			for(var i=0,l=arr.length; i<l; ++i){
				if(_p[2].call(_p[1], arr[i], i, arr)){
					outArr.push(arr[i]);
				}
			}
			return outArr; // Array
		}
	});
})();
/*
*/

}

if(!moor._hasResource["moor._base.declare"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.declare"] = true;
moor.provide("moor._base.declare");




(function(){
	var d = moor, mix = d._mixin, op = Object.prototype, opts = op.toString,
		xtor = new Function, counter = 0, cname = "constructor";

	function err(msg, cls){ throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg); }

	// C3 Method Resolution Order (see http://www.python.org/download/releases/2.3/mro/)
	function c3mro(bases, className){
		var result = [], roots = [{cls: 0, refs: []}], nameMap = {}, clsCount = 1,
			l = bases.length, i = 0, j, lin, base, top, proto, rec, name, refs;

		// build a list of bases naming them if needed
		for(; i < l; ++i){
			base = bases[i];
			if(!base){
				err("mixin #" + i + " is unknown. Did you use moor.require to pull it in?", className);
			}else if(opts.call(base) != "[object Function]"){
				err("mixin #" + i + " is not a callable constructor.", className);
			}
			lin = base._meta ? base._meta.bases : [base];
			top = 0;
			// add bases to the name map
			for(j = lin.length - 1; j >= 0; --j){
				proto = lin[j].prototype;
				if(!proto.hasOwnProperty("declaredClass")){
					proto.declaredClass = "uniqName_" + (counter++);
				}
				name = proto.declaredClass;
				if(!nameMap.hasOwnProperty(name)){
					nameMap[name] = {count: 0, refs: [], cls: lin[j]};
					++clsCount;
				}
				rec = nameMap[name];
				if(top && top !== rec){
					rec.refs.push(top);
					++top.count;
				}
				top = rec;
			}
			++top.count;
			roots[0].refs.push(top);
		}

		// remove classes without external references recursively
		while(roots.length){
			top = roots.pop();
			result.push(top.cls);
			--clsCount;
			// optimization: follow a single-linked chain
			while(refs = top.refs, refs.length == 1){
				top = refs[0];
				if(!top || --top.count){
					// branch or end of chain => do not end to roots
					top = 0;
					break;
				}
				result.push(top.cls);
				--clsCount;
			}
			if(top){
				// branch
				for(i = 0, l = refs.length; i < l; ++i){
					top = refs[i];
					if(!--top.count){
						roots.push(top);
					}
				}
			}
		}
		if(clsCount){
			err("can't build consistent linearization", className);
		}

		// calculate the superclass offset
		base = bases[0];
		result[0] = base ?
			base._meta && base === result[result.length - base._meta.bases.length] ?
				base._meta.bases.length : 1 : 0;

		return result;
	}

	function inherited(args, a, f){
		var name, chains, bases, caller, meta, base, proto, opf, pos,
			cache = this._inherited = this._inherited || {};

		// crack arguments
		if(typeof args == "string"){
			name = args;
			args = a;
			a = f;
		}
		f = 0;

		caller = args.callee;
		name = name || caller.nom;
		if(!name){
			err("can't deduce a name to call inherited()", this.declaredClass);
		}

		meta = this.constructor._meta;
		bases = meta.bases;

		pos = cache.p;
		if(name != cname){
			// method
			if(cache.c !== caller){
				// cache bust
				pos = 0;
				base = bases[0];
				meta = base._meta;
				if(meta.hidden[name] !== caller){
					// error detection
					chains = meta.chains;
					if(chains && typeof chains[name] == "string"){
						err("calling chained method with inherited: " + name, this.declaredClass);
					}
					// find caller
					do{
						meta = base._meta;
						proto = base.prototype;
						if(meta && (proto[name] === caller && proto.hasOwnProperty(name) || meta.hidden[name] === caller)){
							break;
						}
					}while(base = bases[++pos]); // intentional assignment
					pos = base ? pos : -1;
				}
			}
			// find next
			base = bases[++pos];
			if(base){
				proto = base.prototype;
				if(base._meta && proto.hasOwnProperty(name)){
					f = proto[name];
				}else{
					opf = op[name];
					do{
						proto = base.prototype;
						f = proto[name];
						if(f && (base._meta ? proto.hasOwnProperty(name) : f !== opf)){
							break;
						}
					}while(base = bases[++pos]); // intentional assignment
				}
			}
			f = base && f || op[name];
		}else{
			// constructor
			if(cache.c !== caller){
				// cache bust
				pos = 0;
				meta = bases[0]._meta;
				if(meta && meta.ctor !== caller){
					// error detection
					chains = meta.chains;
					if(!chains || chains.constructor !== "manual"){
						err("calling chained constructor with inherited", this.declaredClass);
					}
					// find caller
					while(base = bases[++pos]){ // intentional assignment
						meta = base._meta;
						if(meta && meta.ctor === caller){
							break;
						}
					}
					pos = base ? pos : -1;
				}
			}
			// find next
			while(base = bases[++pos]){	// intentional assignment
				meta = base._meta;
				f = meta ? meta.ctor : base;
				if(f){
					break;
				}
			}
			f = base && f;
		}

		// cache the found super method
		cache.c = f;
		cache.p = pos;

		// now we have the result
		if(f){
			return a === true ? f : f.apply(this, a || args);
		}
		// intentionally if a super method was not found
	}

	function getInherited(name, args){
		if(typeof name == "string"){
			return this.inherited(name, args, true);
		}
		return this.inherited(name, true);
	}

	// emulation of "instanceof"
	function isInstanceOf(cls){
		var bases = this.constructor._meta.bases;
		for(var i = 0, l = bases.length; i < l; ++i){
			if(bases[i] === cls){
				return true;
			}
		}
		return this instanceof cls;
	}

	function mixOwn(target, source){
		var name, i = 0, l = d._extraNames.length;
		// add props adding metadata for incoming functions skipping a constructor
		for(name in source){
			if(name != cname && source.hasOwnProperty(name)){
				target[name] = source[name];
			}
		}
		// process unenumerable methods on IE
		for(; i < l; ++i){
			name = d._extraNames[i];
			if(name != cname && source.hasOwnProperty(name)){
				target[name] = source[name];
			}
		}
	}

	// implementation of safe mixin function
	function safeMixin(target, source){
		var name, t, i = 0, l = d._extraNames.length;
		// add props adding metadata for incoming functions skipping a constructor
		for(name in source){
			t = source[name];
			if((t !== op[name] || !(name in op)) && name != cname){
				if(opts.call(t) == "[object Function]"){
					// non-trivial function method => attach its name
					t.nom = name;
				}
				target[name] = t;
			}
		}
		// process unenumerable methods on IE
		for(; i < l; ++i){
			name = d._extraNames[i];
			t = source[name];
			if((t !== op[name] || !(name in op)) && name != cname){
				if(opts.call(t) == "[object Function]"){
					// non-trivial function method => attach its name
					t.nom = name;
				}
				target[name] = t;
			}
		}
		return target;
	}

	function extend(source){
		safeMixin(this.prototype, source);
		return this;
	}

	// chained constructor compatible with the legacy moor.declare()
	function chainedConstructor(bases, ctorSpecial){
		return function(){
			var a = arguments, args = a, a0 = a[0], f, i, m,
				l = bases.length, preArgs;

			if(!(this instanceof a.callee)){
				// not called via new, so force it
				return applyNew(a);
			}

			//this._inherited = {};
			// perform the shaman's rituals of the original moor.declare()
			// 1) call two types of the preamble
			if(ctorSpecial && (a0 && a0.preamble || this.preamble)){
				// full blown ritual
				preArgs = new Array(bases.length);
				// prepare parameters
				preArgs[0] = a;
				for(i = 0;;){
					// process the preamble of the 1st argument
					a0 = a[0];
					if(a0){
						f = a0.preamble;
						if(f){
							a = f.apply(this, a) || a;
						}
					}
					// process the preamble of this class
					f = bases[i].prototype;
					f = f.hasOwnProperty("preamble") && f.preamble;
					if(f){
						a = f.apply(this, a) || a;
					}
					// one peculiarity of the preamble:
					// it is called if it is not needed,
					// e.g., there is no constructor to call
					// let's watch for the last constructor
					// (see ticket #9795)
					if(++i == l){
						break;
					}
					preArgs[i] = a;
				}
			}
			// 2) call all non-trivial constructors using prepared arguments
			for(i = l - 1; i >= 0; --i){
				f = bases[i];
				m = f._meta;
				f = m ? m.ctor : f;
				if(f){
					f.apply(this, preArgs ? preArgs[i] : a);
				}
			}
			// 3) continue the original ritual: call the postscript
			f = this.postscript;
			if(f){
				f.apply(this, args);
			}
		};
	}


	// chained constructor compatible with the legacy moor.declare()
	function singleConstructor(ctor, ctorSpecial){
		return function(){
			var a = arguments, t = a, a0 = a[0], f;

			if(!(this instanceof a.callee)){
				// not called via new, so force it
				return applyNew(a);
			}

			//this._inherited = {};
			// perform the shaman's rituals of the original moor.declare()
			// 1) call two types of the preamble
			if(ctorSpecial){
				// full blown ritual
				if(a0){
					// process the preamble of the 1st argument
					f = a0.preamble;
					if(f){
						t = f.apply(this, t) || t;
					}
				}
				f = this.preamble;
				if(f){
					// process the preamble of this class
					f.apply(this, t);
					// one peculiarity of the preamble:
					// it is called even if it is not needed,
					// e.g., there is no constructor to call
					// let's watch for the last constructor
					// (see ticket #9795)
				}
			}
			// 2) call a constructor
			if(ctor){
				ctor.apply(this, a);
			}
			// 3) continue the original ritual: call the postscript
			f = this.postscript;
			if(f){
				f.apply(this, a);
			}
		};
	}

	// plain vanilla constructor (can use inherited() to call its base constructor)
	function simpleConstructor(bases){
		return function(){
			var a = arguments, i = 0, f, m;

			if(!(this instanceof a.callee)){
				// not called via new, so force it
				return applyNew(a);
			}

			//this._inherited = {};
			// perform the shaman's rituals of the original moor.declare()
			// 1) do not call the preamble
			// 2) call the top constructor (it can use this.inherited())
			for(; f = bases[i]; ++i){ // intentional assignment
				m = f._meta;
				f = m ? m.ctor : f;
				if(f){
					f.apply(this, a);
					break;
				}
			}
			// 3) call the postscript
			f = this.postscript;
			if(f){
				f.apply(this, a);
			}
		};
	}

	function chain(name, bases, reversed){
		return function(){
			var b, m, f, i = 0, step = 1;
			if(reversed){
				i = bases.length - 1;
				step = -1;
			}
			for(; b = bases[i]; i += step){ // intentional assignment
				m = b._meta;
				f = (m ? m.hidden : b.prototype)[name];
				if(f){
					f.apply(this, arguments);
				}
			}
		};
	}

	// forceNew(ctor)
	// return a new object that inherits from ctor.prototype but
	// without actually running ctor on the object.
	function forceNew(ctor){
		// create object with correct prototype using a do-nothing
		// constructor
		xtor.prototype = ctor.prototype;
		var t = new xtor;
		xtor.prototype = null;	// clean up
		return t;
	}

	// applyNew(args)
	// just like 'new ctor()' except that the constructor and its arguments come
	// from args, which must be an array or an arguments object
	function applyNew(args){
		// create an object with ctor's prototype but without
		// calling ctor on it.
		var ctor = args.callee, t = forceNew(ctor);
		// execute the real constructor on the new object
		ctor.apply(t, args);
		return t;
	}

	d.declare = function(className, superclass, props){
		// crack parameters
		if(typeof className != "string"){
			props = superclass;
			superclass = className;
			className = "";
		}
		props = props || {};

		var proto, i, t, ctor, name, bases, chains, mixins = 1, parents = superclass;

		// build a prototype
		if(opts.call(superclass) == "[object Array]"){
			// C3 MRO
			bases = c3mro(superclass, className);
			t = bases[0];
			mixins = bases.length - t;
			superclass = bases[mixins];
		}else{
			bases = [0];
			if(superclass){
				if(opts.call(superclass) == "[object Function]"){
					t = superclass._meta;
					bases = bases.concat(t ? t.bases : superclass);
				}else{
					err("base class is not a callable constructor.", className);
				}
			}else if(superclass !== null){
				err("unknown base class. Did you use moor.require to pull it in?", className);
			}
		}
		if(superclass){
			for(i = mixins - 1;; --i){
				proto = forceNew(superclass);
				if(!i){
					// stop if nothing to add (the last base)
					break;
				}
				// mix in properties
				t = bases[i];
				(t._meta ? mixOwn : mix)(proto, t.prototype);
				// chain in new constructor
				ctor = new Function;
				ctor.superclass = superclass;
				ctor.prototype = proto;
				superclass = proto.constructor = ctor;
			}
		}else{
			proto = {};
		}
		// add all properties
		safeMixin(proto, props);
		// add constructor
		t = props.constructor;
		if(t !== op.constructor){
			t.nom = cname;
			proto.constructor = t;
		}

		// collect chains and flags
		for(i = mixins - 1; i; --i){ // intentional assignment
			t = bases[i]._meta;
			if(t && t.chains){
				chains = mix(chains || {}, t.chains);
			}
		}
		if(proto["-chains-"]){
			chains = mix(chains || {}, proto["-chains-"]);
		}

		// build ctor
		t = !chains || !chains.hasOwnProperty(cname);
		bases[0] = ctor = (chains && chains.constructor === "manual") ? simpleConstructor(bases) :
			(bases.length == 1 ? singleConstructor(props.constructor, t) : chainedConstructor(bases, t));

		// add meta information to the constructor
		ctor._meta  = {bases: bases, hidden: props, chains: chains,
			parents: parents, ctor: props.constructor};
		ctor.superclass = superclass && superclass.prototype;
		ctor.extend = extend;
		ctor.prototype = proto;
		proto.constructor = ctor;

		// add "standard" methods to the prototype
		proto.getInherited = getInherited;
		proto.inherited = inherited;
		proto.isInstanceOf = isInstanceOf;

		// add name if specified
		if(className){
			proto.declaredClass = className;
			d.setObject(className, ctor);
		}

		// build chains and add them to the prototype
		if(chains){
			for(name in chains){
				if(proto[name] && typeof chains[name] == "string" && name != cname){
					t = proto[name] = chain(name, bases, chains[name] === "after");
					t.nom = name;
				}
			}
		}
		// chained methods do not return values
		// no need to chain "invisible" functions

		return ctor;	// Function
	};

	d.safeMixin = safeMixin;

})();

}

if(!moor._hasResource["moor._base.connect"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.connect"] = true;
moor.provide("moor._base.connect");



// this file courtesy of the TurboAjax Group, licensed under a moor CLA

// low-level delegation machinery
moor._listener = {
	// create a dispatcher function
	getDispatcher: function(){
		// following comments pulled out-of-line to prevent cloning them
		// in the returned function.
		// - indices (i) that are really in the array of listeners (ls) will
		//   not be in Array.prototype. This is the 'sparse array' trick
		//   that keeps us safe from libs that take liberties with built-in
		//   objects
		// - listener is invoked with current scope (this)
		return function fn(){
			var ap = Array.prototype, c = fn, ls = c._listeners, t = c.target,
			// return value comes from original target function
				r = t && t.apply(this, arguments),
			// make local copy of listener array so it is immutable during processing
				i, lls = [].concat(ls)
			;

			// invoke listeners after target function
			for(i in lls){
				if(!(i in ap)){
					lls[i].apply(this, arguments);
				}
			}
			// return value comes from original target function
			return r;
		};
	},
	// add a listener to an object
	add: function(/*Object*/ source, /*String*/ method, /*Function*/ listener){
		// Whenever 'method' is invoked, 'listener' will have the same scope.
		// Trying to supporting a context object for the listener led to
		// complexity.
		// Non trivial to provide 'once' functionality here
		// because listener could be the result of a moor.hitch call,
		// in which case two references to the same hitch target would not
		// be equivalent.
		source = source || moor.global;
		// The source method is either null, a dispatcher, or some other function
		var f = source[method];
		// Ensure a dispatcher
		if(!f || !f._listeners){
			var d = moor._listener.getDispatcher();
			// original target function is special
			d.target = f;
			// dispatcher holds a list of listeners
			d._listeners = [];
			// redirect source to dispatcher
			f = source[method] = d;
		}
		// The contract is that a handle is returned that can
		// identify this listener for disconnect.
		//
		// The type of the handle is private. Here is it implemented as Integer.
		// DOM event code has this same contract but handle is Function
		// in non-IE browsers.
		//
		// We could have separate lists of before and after listeners.
		return f._listeners.push(listener); /*Handle*/
	},
	// remove a listener from an object
	remove: function(/*Object*/ source, /*String*/ method, /*Handle*/ handle){
		var f = (source || moor.global)[method];
		// remember that handle is the index+1 (0 is not a valid handle)
		if(f && f._listeners && handle--){
			delete f._listeners[handle];
		}
	}
};

// Multiple delegation for arbitrary methods.

// This unit knows nothing about DOM, but we include DOM aware documentation
// and dontFix argument here to help the autodocs. Actual DOM aware code is in
// event.js.

moor.connect = function(/*Object|null*/ obj,
						/*String*/ event,
						/*Object|null*/ context,
						/*String|Function*/ method,
						/*Boolean?*/ dontFix){

	// normalize arguments
	var a=arguments, args=[], i=0;
	// if a[0] is a String, obj was omitted
	args.push(moor.isString(a[0]) ? null : a[i++], a[i++]);
	// if the arg-after-next is a String or Function, context was NOT omitted
	var a1 = a[i+1];
	args.push(moor.isString(a1)||moor.isFunction(a1) ? a[i++] : null, a[i++]);
	// absorb any additional arguments
	for(var l=a.length; i<l; i++){	args.push(a[i]); }
	// do the actual work
	return moor._connect.apply(this, args); /*Handle*/
}

// used by non-browser hostenvs. always overriden by event.js
moor._connect = function(obj, event, context, method){
	var l=moor._listener, h=l.add(obj, event, moor.hitch(context, method));
	return [obj, event, h, l]; // Handle
};

moor.disconnect = function(/*Handle*/ handle){
	// summary:
	//		Remove a link created by moor.connect.
	// description:
	//		Removes the connection between event and the method referenced by handle.
	// handle:
	//		the return value of the moor.connect call that created the connection.
	if(handle && handle[0] !== undefined){
		moor._disconnect.apply(this, handle);
		// let's not keep this reference
		delete handle[0];
	}
};

moor._disconnect = function(obj, event, handle, listener){
	listener.remove(obj, event, handle);
};

// topic publish/subscribe

moor._topics = {};

moor.subscribe = function(/*String*/ topic, /*Object|null*/ context, /*String|Function*/ method){
	//	summary:
	//		Attach a listener to a named topic. The listener function is invoked whenever the
	//		named topic is published (see: moor.publish).
	//		Returns a handle which is needed to unsubscribe this listener.
	//	context:
	//		Scope in which method will be invoked, or null for default scope.
	//	method:
	//		The name of a function in context, or a function reference. This is the function that
	//		is invoked when topic is published.
	//	example:
	//	|	moor.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); });
	//	|	moor.publish("alerts", [ "read this", "hello world" ]);

	// support for 2 argument invocation (omitting context) depends on hitch
	return [topic, moor._listener.add(moor._topics, topic, moor.hitch(context, method))]; /*Handle*/
};

moor.unsubscribe = function(/*Handle*/ handle){
	//	summary:
	//	 	Remove a topic listener.
	//	handle:
	//	 	The handle returned from a call to subscribe.
	//	example:
	//	|	var alerter = moor.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); };
	//	|	...
	//	|	moor.unsubscribe(alerter);
	if(handle){
		moor._listener.remove(moor._topics, handle[0], handle[1]);
	}
};

moor.publish = function(/*String*/ topic, /*Array*/ args){
	//	summary:
	//	 	Invoke all listener method subscribed to topic.
	//	topic:
	//	 	The name of the topic to publish.
	//	args:
	//	 	An array of arguments. The arguments will be applied
	//	 	to each topic subscriber (as first class parameters, via apply).
	//	example:
	//	|	moor.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); };
	//	|	moor.publish("alerts", [ "read this", "hello world" ]);

	// Note that args is an array, which is more efficient vs variable length
	// argument list.  Ideally, var args would be implemented via Array
	// throughout the APIs.
	var f = moor._topics[topic];
	if(f){
		f.apply(this, args||[]);
	}
};

moor.connectPublisher = function(	/*String*/ topic,
									/*Object|null*/ obj,
									/*String*/ event){
	//	summary:
	//	 	Ensure that every time obj.event() is called, a message is published
	//	 	on the topic. Returns a handle which can be passed to
	//	 	moor.disconnect() to disable subsequent automatic publication on
	//	 	the topic.
	//	topic:
	//	 	The name of the topic to publish.
	//	obj:
	//	 	The source object for the event function. Defaults to moor.global
	//	 	if null.
	//	event:
	//	 	The name of the event function in obj.
	//	 	I.e. identifies a property obj[event].
	//	example:
	//	|	moor.connectPublisher("/ajax/start", moor, "xhrGet");
	var pf = function(){ moor.publish(topic, arguments); }
	return event ? moor.connect(obj, event, pf) : moor.connect(obj, pf); //Handle
};

}

if(!moor._hasResource["moor._base.Deferred"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.Deferred"] = true;
moor.provide("moor._base.Deferred");



(function(){
	var mutator = function(){};
	var freeze = Object.freeze || function(){};
	// A deferred provides an API for creating and resolving a promise.
	moor.Deferred = function(/*Function?*/canceller){
	
	//		Note that the caller doesn't have to change his code at all to
	//		handle the asynchronous case.
		var result, finished, isError, head, nextListener;
		var promise = (this.promise = {});
		
		function complete(value){
			if(finished){
				throw new Error("This deferred has already been resolved");
			}
			result = value;
			finished = true;
			notify();
		}
		function notify(){
			var mutated;
			while(!mutated && nextListener){
				var listener = nextListener;
				nextListener = nextListener.next;
				if((mutated = (listener.progress == mutator))){ // assignment and check
					finished = false;
				}
				var func = (isError ? listener.error : listener.resolved);
				if (func) {
					try {
						var newResult = func(result);
						if (newResult && typeof newResult.then === "function") {
							newResult.then(moor.hitch(listener.deferred, "resolve"), moor.hitch(listener.deferred, "reject"));
							continue;
						}
						var unchanged = mutated && newResult === undefined;
						if(mutated && !unchanged){
							isError = newResult instanceof Error;
						}
						listener.deferred[unchanged && isError ? "reject" : "resolve"](unchanged ? result : newResult);
					}
					catch (e) {
						listener.deferred.reject(e);
					}
				}else {
					if(isError){
						listener.deferred.reject(result);
					}else{
						listener.deferred.resolve(result);
					}
				}
			}
		}
		// calling resolve will resolve the promise
		this.resolve = this.callback = function(value){
			// summary:
			//		Fulfills the Deferred instance successfully with the provide value
			this.fired = 0;
			this.results = [value, null];
			complete(value);
		};
		
		
		// calling error will indicate that the promise failed
		this.reject = this.errback = function(error){
			// summary:
			//		Fulfills the Deferred instance as an error with the provided error
			isError = true;
			this.fired = 1;
			complete(error);
			this.results = [null, error];
			if(!error || error.log !== false){
				(moor.config.deferredOnError || function(x){ console.error(x); })(error);
			}
		};
		// call progress to provide updates on the progress on the completion of the promise
		this.progress = function(update){
			// summary
			//		Send progress events to all listeners
			var listener = nextListener;
			while(listener){
				var progress = listener.progress;
				progress && progress(update);
				listener = listener.next;
			}
		};
		this.addCallbacks = function(/*Function?*/callback, /*Function?*/errback){
			this.then(callback, errback, mutator);
			return this;
		};
		// provide the implementation of the promise
		this.then = promise.then = function(/*Function?*/resolvedCallback, /*Function?*/errorCallback, /*Function?*/progressCallback){
			// summary:
			// 		Adds a fulfilledHandler, errorHandler, and progressHandler to be called for
			// 		completion of a promise. The fulfilledHandler is called when the promise
			// 		is fulfilled. The errorHandler is called when a promise fails. The
			// 		progressHandler is called for progress events. All arguments are optional
			// 		and non-function values are ignored. The progressHandler is not only an
			// 		optional argument, but progress events are purely optional. Promise
			// 		providers are not required to ever create progress events.
			//
			// 		This function will return a new promise that is fulfilled when the given
			// 		fulfilledHandler or errorHandler callback is finished. This allows promise
			// 		operations to be chained together. The value returned from the callback
			// 		handler is the fulfillment value for the returned promise. If the callback
			// 		throws an error, the returned promise will be moved to failed state.
			//
			// example:
			// 		An example of using a CommonJS compliant promise:
  			//		|	asyncComputeTheAnswerToEverything().
			//		|		then(addTwo).
			//		|		then(printResult, onError);
  			//		|	>44
			//
			var returnDeferred = progressCallback == mutator ? this : new moor.Deferred(promise.cancel);
			var listener = {
				resolved: resolvedCallback,
				error: errorCallback,
				progress: progressCallback,
				deferred: returnDeferred
			};
			if(nextListener){
				head = head.next = listener;
			}
			else{
				nextListener = head = listener;
			}
			if(finished){
				notify();
			}
			return returnDeferred.promise;
		};
		var deferred = this;
		this.cancel = promise.cancel = function () {
			// summary:
			//		Cancels the asynchronous operation
			if(!finished){
				var error = canceller && canceller(deferred);
				if(!finished){
					if (!(error instanceof Error)) {
						error = new Error(error);
					}
					error.log = false;
					deferred.reject(error);
				}
			}
		};
		freeze(promise);
	};
	moor.extend(moor.Deferred, {
		addCallback: function (/*Function*/callback) {
			return this.addCallbacks(moor.hitch.apply(moor, arguments));
		},
	
		addErrback: function (/*Function*/errback) {
			return this.addCallbacks(null, moor.hitch.apply(moor, arguments));
		},
	
		addBoth: function (/*Function*/callback) {
			var enclosed = moor.hitch.apply(moor, arguments);
			return this.addCallbacks(enclosed, enclosed);
		},
		fired: -1
	});
})();
moor.when = function(promiseOrValue, /*Function?*/callback, /*Function?*/errback, /*Function?*/progressHandler){
	// summary:
	//		This provides normalization between normal synchronous values and
	//		asynchronous promises, so you can interact with them in a common way
	//	example:
	//		|	function printFirstAndList(items){
	//		|		moor.when(findFirst(items), console.log);
	//		|		moor.when(findLast(items), console.log);
	//		|	}
	//		|	function findFirst(items){
	//		|		return moor.when(items, function(items){
	//		|			return items[0];
	//		|		});
	//		|	}
	//		|	function findLast(items){
	//		|		return moor.when(items, function(items){
	//		|			return items[items.length];
	//		|		});
	//		|	}
	//		And now all three of his functions can be used sync or async.
	//		|	printFirstAndLast([1,2,3,4]) will work just as well as
	//		|	printFirstAndLast(moor.xhrGet(...));
	
	if(promiseOrValue && typeof promiseOrValue.then === "function"){
		return promiseOrValue.then(callback, errback, progressHandler);
	}
	return callback(promiseOrValue);
};

}

if(!moor._hasResource["moor._base.json"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.json"] = true;
moor.provide("moor._base.json");


moor.fromJson = function(/*String*/ json){
	// summary:
	// 		Parses a [JSON](http://json.org) string to return a JavaScript object.
	// description:
	// 		Throws for invalid JSON strings, but it does not use a strict JSON parser. It
	// 		delegates to eval().  The content passed to this method must therefore come
	//		from a trusted source.
	// json:
	//		a string literal of a JSON item, for instance:
	//			`'{ "foo": [ "bar", 1, { "baz": "thud" } ] }'`

	return eval("(" + json + ")"); // Object
};

moor._escapeString = function(/*String*/str){
	//summary:
	//		Adds escape sequences for non-visual characters, double quote and
	//		backslash and surrounds with double quotes to form a valid string
	//		literal.
	return ('"' + str.replace(/(["\\])/g, '\\$1') + '"').
		replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").
		replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r"); // string
};

moor.toJsonIndentStr = "\t";
moor.toJson = function (/*Object*/ it, /*Boolean?*/ prettyPrint, /*String?*/ _indentStr){

	if(it === undefined){
		return "undefined";
	}
	var objtype = typeof it;
	if(objtype == "number" || objtype == "boolean"){
		return it + "";
	}
	if(it === null){
		return "null";
	}
	if(moor.isString(it)){
		return moor._escapeString(it);
	}
	// recurse
	var recurse = moor.toJson;
	// short-circuit for objects that support "json" serialization
	// if they return "self" then just pass-through...
	var newObj;
	_indentStr = _indentStr || "";
	var nextIndent = prettyPrint ? _indentStr + moor.toJsonIndentStr : "";
	var tf = it.__json__||it.json;
	if(moor.isFunction(tf)){
		newObj = tf.call(it);
		if(it !== newObj){
			return recurse(newObj, prettyPrint, nextIndent);
		}
	}
	if(it.nodeType && it.cloneNode){ // isNode
		// we can't seriailize DOM nodes as regular objects because they have cycles
		// DOM nodes could be serialized with something like outerHTML, but
		// that can be provided by users in the form of .json or .__json__ function.
		throw new Error("Can't serialize DOM nodes");
	}

	var sep = prettyPrint ? " " : "";
	var newLine = prettyPrint ? "\n" : "";

	// array
	if(moor.isArray(it)){
		var res = moor.map(it, function(obj){
			var val = recurse(obj, prettyPrint, nextIndent);
			if(typeof val != "string"){
				val = "undefined";
			}
			return newLine + nextIndent + val;
		});
		return "[" + res.join("," + sep) + newLine + _indentStr + "]";
	}
	/*
	// look in the registry
	try {
		window.o = it;
		newObj = moor.json.jsonRegistry.match(it);
		return recurse(newObj, prettyPrint, nextIndent);
	}catch(e){
		// console.log(e);
	}
	// it's a function with no adapter, skip it
	*/
	if(objtype == "function"){
		return null; // null
	}
	// generic object code path
	var output = [], key;
	for(key in it){
		var keyStr, val;
		if(typeof key == "number"){
			keyStr = '"' + key + '"';
		}else if(typeof key == "string"){
			keyStr = moor._escapeString(key);
		}else{
			// skip non-string or number keys
			continue;
		}
		val = recurse(it[key], prettyPrint, nextIndent);
		if(typeof val != "string"){
			// skip non-serializable values
			continue;
		}
		// FIXME: use += on Moz!!
		//	 MOW NOTE: using += is a pain because you have to account for the dangling comma...
		output.push(newLine + nextIndent + keyStr + ":" + sep + val);
	}
	return "{" + output.join("," + sep) + newLine + _indentStr + "}"; // String
};

}

if(!moor._hasResource["moor._base.Color"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.Color"] = true;
moor.provide("moor._base.Color");




(function(){

	var d = moor;

	moor.Color = function(/*Array|String|Object*/ color){
		// summary:
		//	 	Takes a named string, hex string, array of rgb or rgba values,
		//	 	an object with r, g, b, and a properties, or another `moor.Color` object
		//	 	and creates a new Color instance to work from.
		//
		// example:
		//		Work with a Color instance:
		//	 | var c = new moor.Color();
		//	 | c.setColor([0,0,0]); // black
		//	 | var hex = c.toHex(); // #000000
		//
		// example:
		//		Work with a node's color:
		//	 | var color = moor.style("someNode", "backgroundColor");
		//	 | var n = new moor.Color(color);
		//	 | // adjust the color some
		//	 | n.r *= .5;
		//	 | console.log(n.toString()); // rgb(128, 255, 255);
		if(color){ this.setColor(color); }
	};

	// FIXME:
	// 	there's got to be a more space-efficient way to encode or discover
	// 	these!!  Use hex?
	moor.Color.named = {
		black:      [0,0,0],
		silver:     [192,192,192],
		gray:       [128,128,128],
		white:      [255,255,255],
		maroon:		[128,0,0],
		red:        [255,0,0],
		purple:		[128,0,128],
		fuchsia:	[255,0,255],
		green:	    [0,128,0],
		lime:	    [0,255,0],
		olive:		[128,128,0],
		yellow:		[255,255,0],
		navy:       [0,0,128],
		blue:       [0,0,255],
		teal:		[0,128,128],
		aqua:		[0,255,255],
		transparent: d.config.transparentColor || [255,255,255]
	};

	moor.extend(moor.Color, {
		r: 255, g: 255, b: 255, a: 1,
		_set: function(r, g, b, a){
			var t = this; t.r = r; t.g = g; t.b = b; t.a = a;
		},
		setColor: function(/*Array|String|Object*/ color){
			// summary:
			//		Takes a named string, hex string, array of rgb or rgba values,
			//		an object with r, g, b, and a properties, or another `moor.Color` object
			//		and sets this color instance to that value.
			//
			// example:
			//	|	var c = new moor.Color(); // no color
			//	|	c.setColor("#ededed"); // greyish
			if(d.isString(color)){
				d.colorFromString(color, this);
			}else if(d.isArray(color)){
				d.colorFromArray(color, this);
			}else{
				this._set(color.r, color.g, color.b, color.a);
				if(!(color instanceof d.Color)){ this.sanitize(); }
			}
			return this;	// moor.Color
		},
		sanitize: function(){
			// summary:
			//		Ensures the object has correct attributes
			// description:
			//		the default implementation does nothing, include moor.colors to
			//		augment it with real checks
			return this;	// moor.Color
		},
		toRgb: function(){
			// summary:
			//		Returns 3 component array of rgb values
			// example:
			//	|	var c = new moor.Color("#000000");
			//	| 	console.log(c.toRgb()); // [0,0,0]
			var t = this;
			return [t.r, t.g, t.b];	// Array
		},
		toRgba: function(){
			// summary:
			//		Returns a 4 component array of rgba values from the color
			//		represented by this object.
			var t = this;
			return [t.r, t.g, t.b, t.a];	// Array
		},
		toHex: function(){
			// summary:
			//		Returns a CSS color string in hexadecimal representation
			// example:
			//	| 	console.log(new moor.Color([0,0,0]).toHex()); // #000000
			var arr = d.map(["r", "g", "b"], function(x){
				var s = this[x].toString(16);
				return s.length < 2 ? "0" + s : s;
			}, this);
			return "#" + arr.join("");	// String
		},
		toCss: function(/*Boolean?*/ includeAlpha){
			// summary:
			//		Returns a css color string in rgb(a) representation
			// example:
			//	|	var c = new moor.Color("#FFF").toCss();
			//	|	console.log(c); // rgb('255','255','255')
			var t = this, rgb = t.r + ", " + t.g + ", " + t.b;
			return (includeAlpha ? "rgba(" + rgb + ", " + t.a : "rgb(" + rgb) + ")";	// String
		},
		toString: function(){
			// summary:
			//		Returns a visual representation of the color
			return this.toCss(true); // String
		}
	});

	moor.blendColors = function(
		/*moor.Color*/ start,
		/*moor.Color*/ end,
		/*Number*/ weight,
		/*moor.Color?*/ obj
	){
		// summary:
		//		Blend colors end and start with weight from 0 to 1, 0.5 being a 50/50 blend,
		//		can reuse a previously allocated moor.Color object for the result
		var t = obj || new d.Color();
		d.forEach(["r", "g", "b", "a"], function(x){
			t[x] = start[x] + (end[x] - start[x]) * weight;
			if(x != "a"){ t[x] = Math.round(t[x]); }
		});
		return t.sanitize();	// moor.Color
	};

	moor.colorFromRgb = function(/*String*/ color, /*moor.Color?*/ obj){
		// summary:
		//		Returns a `moor.Color` instance from a string of the form
		//		"rgb(...)" or "rgba(...)". Optionally accepts a `moor.Color`
		//		object to update with the parsed value and return instead of
		//		creating a new object.
		// returns:
		//		A moor.Color object. If obj is passed, it will be the return value.
		var m = color.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
		return m && moor.colorFromArray(m[1].split(/\s*,\s*/), obj);	// moor.Color
	};

	moor.colorFromHex = function(/*String*/ color, /*moor.Color?*/ obj){
		// summary:
		//		Converts a hex string with a '#' prefix to a color object.
		//		Supports 12-bit #rgb shorthand. Optionally accepts a
		//		`moor.Color` object to update with the parsed value.
		//
		// returns:
		//		A moor.Color object. If obj is passed, it will be the return value.
		//
		// example:
		//	 | var thing = moor.colorFromHex("#ededed"); // grey, longhand
		//
		// example:
		//	| var thing = moor.colorFromHex("#000"); // black, shorthand
		var t = obj || new d.Color(),
			bits = (color.length == 4) ? 4 : 8,
			mask = (1 << bits) - 1;
		color = Number("0x" + color.substr(1));
		if(isNaN(color)){
			return null; // moor.Color
		}
		d.forEach(["b", "g", "r"], function(x){
			var c = color & mask;
			color >>= bits;
			t[x] = bits == 4 ? 17 * c : c;
		});
		t.a = 1;
		return t;	// moor.Color
	};

	moor.colorFromArray = function(/*Array*/ a, /*moor.Color?*/ obj){
		// summary:
		//		Builds a `moor.Color` from a 3 or 4 element array, mapping each
		//		element in sequence to the rgb(a) values of the color.
		// example:
		//		| var myColor = moor.colorFromArray([237,237,237,0.5]); // grey, 50% alpha
		// returns:
		//		A moor.Color object. If obj is passed, it will be the return value.
		var t = obj || new d.Color();
		t._set(Number(a[0]), Number(a[1]), Number(a[2]), Number(a[3]));
		if(isNaN(t.a)){ t.a = 1; }
		return t.sanitize();	// moor.Color
	};

	moor.colorFromString = function(/*String*/ str, /*moor.Color?*/ obj){
		// summary:
		//		Parses `str` for a color value. Accepts hex, rgb, and rgba
		//		style color values.
		// description:
		//		Acceptable input values for str may include arrays of any form
		//		accepted by moor.colorFromArray, hex strings such as "#aaaaaa", or
		//		rgb or rgba strings such as "rgb(133, 200, 16)" or "rgba(10, 10,
		//		10, 50)"
		// returns:
		//		A moor.Color object. If obj is passed, it will be the return value.
		var a = d.Color.named[str];
		return a && d.colorFromArray(a, obj) || d.colorFromRgb(str, obj) || d.colorFromHex(str, obj);
	};
})();

}

if(!moor._hasResource["moor._base.window"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.window"] = true;
moor.provide("moor._base.window");


/*=====
moor.doc = {
	// summary:
	//		Alias for the current document. 'moor.doc' can be modified
	//		for temporary context shifting. Also see moor.withDoc().
	// description:
	//    Refer to moor.doc rather
	//    than referring to 'window.document' to ensure your code runs
	//    correctly in managed contexts.
	// example:
	// 	|	n.appendChild(moor.doc.createElement('div'));
}
=====*/
moor.doc = window["document"] || null;

moor.body = function(){
	// summary:
	//		Return the body element of the document
	//		return the body object associated with moor.doc
	// example:
	// 	|	moor.body().appendChild(moor.doc.createElement('div'));

	// Note: document.body is not defined for a strict xhtml document
	// Would like to memoize this, but moor.doc can change vi moor.withDoc().
	return moor.doc.body || moor.doc.getElementsByTagName("body")[0]; // Node
};

moor.setContext = function(/*Object*/globalObject, /*DocumentElement*/globalDocument){
	// summary:
	//		changes the behavior of many core moor functions that deal with
	//		namespace and DOM lookup, changing them to work in a new global
	//		context (e.g., an iframe). The varibles moor.global and moor.doc
	//		are modified as a result of calling this function and the result of
	//		`moor.body()` likewise differs.
	moor.global = globalObject;
	moor.doc = globalDocument;
};

moor.withGlobal = function(	/*Object*/globalObject,
							/*Function*/callback,
							/*Object?*/thisObject,
							/*Array?*/cbArguments){
	// summary:
	//		Invoke callback with globalObject as moor.global and
	//		globalObject.document as moor.doc.
	// description:
	//		Invoke callback with globalObject as moor.global and
	//		globalObject.document as moor.doc. If provided, globalObject
	//		will be executed in the context of object thisObject
	//		When callback() returns or throws an error, the moor.global
	//		and moor.doc will be restored to its previous state.

	var oldGlob = moor.global;
	try{
		moor.global = globalObject;
		return moor.withDoc.call(null, globalObject.document, callback, thisObject, cbArguments);
	}finally{
		moor.global = oldGlob;
	}
};

moor.withDoc = function(	/*DocumentElement*/documentObject,
							/*Function*/callback,
							/*Object?*/thisObject,
							/*Array?*/cbArguments){
	// summary:
	//		Invoke callback with documentObject as moor.doc.
	// description:
	//		Invoke callback with documentObject as moor.doc. If provided,
	//		callback will be executed in the context of object thisObject
	//		When callback() returns or throws an error, the moor.doc will
	//		be restored to its previous state.

	var oldDoc = moor.doc,
		oldLtr = moor._bodyLtr,
		oldQ = moor.isQuirks;

	try{
		moor.doc = documentObject;
		delete moor._bodyLtr; // uncache
		moor.isQuirks = moor.doc.compatMode == "BackCompat"; // no need to check for QuirksMode which was Opera 7 only

		if(thisObject && typeof callback == "string"){
			callback = thisObject[callback];
		}

		return callback.apply(thisObject, cbArguments || []);
	}finally{
		moor.doc = oldDoc;
		delete moor._bodyLtr; // in case it was undefined originally, and set to true/false by the alternate document
		if(oldLtr !== undefined){ moor._bodyLtr = oldLtr; }
		moor.isQuirks = oldQ;
	}
};

}

if(!moor._hasResource["moor._base.event"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.event"] = true;
moor.provide("moor._base.event");



// this file courtesy of the TurboAjax Group, licensed under a moor CLA

(function(){
	// DOM event listener machinery
	var del = (moor._event_listener = {
		add: function(/*DOMNode*/ node, /*String*/ name, /*Function*/ fp){
			if(!node){return;}
			name = del._normalizeEventName(name);
			fp = del._fixCallback(name, fp);
			if(
								!moor.isIE &&
								(name == "mouseenter" || name == "mouseleave")
			){
				var ofp = fp;
				name = (name == "mouseenter") ? "mouseover" : "mouseout";
				fp = function(e){
					if(!moor.isDescendant(e.relatedTarget, node)){
						// e.type = oname; // FIXME: doesn't take? SJM: event.type is generally immutable.
						return ofp.call(this, e);
					}
				}
			}
			node.addEventListener(name, fp, false);
			return fp; /*Handle*/
		},
		remove: function(/*DOMNode*/ node, /*String*/ event, /*Handle*/ handle){
			// summary:
			//		clobbers the listener from the node
			// node:
			//		DOM node to attach the event to
			// event:
			//		the name of the handler to remove the function from
			// handle:
			//		the handle returned from add
			if(node){
				event = del._normalizeEventName(event);
				if(!moor.isIE && (event == "mouseenter" || event == "mouseleave")){
					event = (event == "mouseenter") ? "mouseover" : "mouseout";
				}

				node.removeEventListener(event, handle, false);
			}
		},
		_normalizeEventName: function(/*String*/ name){
			// Generally, name should be lower case, unless it is special
			// somehow (e.g. a Mozilla DOM event).
			// Remove 'on'.
			return name.slice(0,2) =="on" ? name.slice(2) : name;
		},
		_fixCallback: function(/*String*/ name, fp){
			// By default, we only invoke _fixEvent for 'keypress'
			// If code is added to _fixEvent for other events, we have
			// to revisit this optimization.
			// This also applies to _fixEvent overrides for Safari and Opera
			// below.
			return name != "keypress" ? fp : function(e){ return fp.call(this, del._fixEvent(e, this)); };
		},
		_fixEvent: function(evt, sender){
			// _fixCallback only attaches us to keypress.
			// Switch on evt.type anyway because we might
			// be called directly from moor.fixEvent.
			switch(evt.type){
				case "keypress":
					del._setKeyChar(evt);
					break;
			}
			return evt;
		},
		_setKeyChar: function(evt){
			evt.keyChar = evt.charCode >= 32 ? String.fromCharCode(evt.charCode) : '';
			evt.charOrCode = evt.keyChar || evt.keyCode;
		},
		// For IE and Safari: some ctrl-key combinations (mostly w/punctuation) do not emit a char code in IE
		// we map those virtual key codes to ascii here
		// not valid for all (non-US) keyboards, so maybe we shouldn't bother
		_punctMap: {
			106:42,
			111:47,
			186:59,
			187:43,
			188:44,
			189:45,
			190:46,
			191:47,
			192:96,
			219:91,
			220:92,
			221:93,
			222:39
		}
	});

	// DOM events
	
	moor.fixEvent = function(/*Event*/ evt, /*DOMNode*/ sender){
		// summary:
		//		normalizes properties on the event object including event
		//		bubbling methods, keystroke normalization, and x/y positions
		// evt: Event
		//		native event object
		// sender: DOMNode
		//		node to treat as "currentTarget"
		return del._fixEvent(evt, sender);
	};

	moor.stopEvent = function(/*Event*/ evt){
		// summary:
		//		prevents propagation and clobbers the default action of the
		//		passed event
		// evt: Event
		//		The event object. If omitted, window.event is used on IE.
		evt.preventDefault();
		evt.stopPropagation();
		// NOTE: below, this method is overridden for IE
	};

	// the default listener to use on dontFix nodes, overriden for IE
	var node_listener = moor._listener;
	
	// Unify connect and event listeners
	moor._connect = function(obj, event, context, method, dontFix){
		// FIXME: need a more strict test
		var isNode = obj && (obj.nodeType||obj.attachEvent||obj.addEventListener);
		// choose one of three listener options: raw (connect.js), DOM event on a Node, custom event on a Node
		// we need the third option to provide leak prevention on broken browsers (IE)
		var lid = isNode ? (dontFix ? 2 : 1) : 0, l = [moor._listener, del, node_listener][lid];
		// create a listener
		var h = l.add(obj, event, moor.hitch(context, method));
		// formerly, the disconnect package contained "l" directly, but if client code
		// leaks the disconnect package (by connecting it to a node), referencing "l"
		// compounds the problem.
		// instead we return a listener id, which requires custom _disconnect below.
		// return disconnect package
		return [ obj, event, h, lid ];
	};

	moor._disconnect = function(obj, event, handle, listener){
		([moor._listener, del, node_listener][listener]).remove(obj, event, handle);
	};

	// Constants

	// Public: client code should test
	// keyCode against these named constants, as the
	// actual codes can vary by browser.
	moor.keys = {
		// summary:
		//		Definitions for common key values
		BACKSPACE: 8,
		TAB: 9,
		CLEAR: 12,
		ENTER: 13,
		SHIFT: 16,
		CTRL: 17,
		ALT: 18,
		META: moor.isSafari ? 91 : 224,		// the apple key on macs
		PAUSE: 19,
		CAPS_LOCK: 20,
		ESCAPE: 27,
		SPACE: 32,
		PAGE_UP: 33,
		PAGE_DOWN: 34,
		END: 35,
		HOME: 36,
		LEFT_ARROW: 37,
		UP_ARROW: 38,
		RIGHT_ARROW: 39,
		DOWN_ARROW: 40,
		INSERT: 45,
		DELETE: 46,
		HELP: 47,
		LEFT_WINDOW: 91,
		RIGHT_WINDOW: 92,
		SELECT: 93,
		NUMPAD_0: 96,
		NUMPAD_1: 97,
		NUMPAD_2: 98,
		NUMPAD_3: 99,
		NUMPAD_4: 100,
		NUMPAD_5: 101,
		NUMPAD_6: 102,
		NUMPAD_7: 103,
		NUMPAD_8: 104,
		NUMPAD_9: 105,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_PLUS: 107,
		NUMPAD_ENTER: 108,
		NUMPAD_MINUS: 109,
		NUMPAD_PERIOD: 110,
		NUMPAD_DIVIDE: 111,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		F13: 124,
		F14: 125,
		F15: 126,
		NUM_LOCK: 144,
		SCROLL_LOCK: 145,
		// virtual key mapping
		copyKey: moor.isMac && !moor.isAIR ? (moor.isSafari ? 91 : 224 ) : 17
	};
	
	var evtCopyKey = moor.isMac ? "metaKey" : "ctrlKey";
	
	moor.isCopyKey = function(e){
		// summary:
		//		Checks an event for the copy key (meta on Mac, and ctrl anywhere else)
		// e: Event
		//		Event object to examine
		return e[evtCopyKey];	// Boolean
	};

	// Public: decoding mouse buttons from events


		if(moor.isIE < 9 || (moor.isIE && moor.isQuirks)){
		moor.mouseButtons = {
			LEFT:   1,
			MIDDLE: 4,
			RIGHT:  2,
			// helper functions
			isButton: function(e, button){ return e.button & button; },
			isLeft:   function(e){ return e.button & 1; },
			isMiddle: function(e){ return e.button & 4; },
			isRight:  function(e){ return e.button & 2; }
		};
	}else{
			moor.mouseButtons = {
			LEFT:   0,
			MIDDLE: 1,
			RIGHT:  2,
			// helper functions
			isButton: function(e, button){ return e.button == button; },
			isLeft:   function(e){ return e.button == 0; },
			isMiddle: function(e){ return e.button == 1; },
			isRight:  function(e){ return e.button == 2; }
		};
		}
	
		// IE event normalization
	if(moor.isIE){
		var _trySetKeyCode = function(e, code){
			try{
				// squelch errors when keyCode is read-only
				// (e.g. if keyCode is ctrl or shift)
				return (e.keyCode = code);
			}catch(e){
				return 0;
			}
		};

		// by default, use the standard listener
		var iel = moor._listener;
		var listenersName = (moor._ieListenersName = "_" + moor._scopeName + "_listeners");
		// dispatcher tracking property
		if(!moor.config._allow_leaks){
			// custom listener that handles leak protection for DOM events
			node_listener = iel = moor._ie_listener = {
				// support handler indirection: event handler functions are
				// referenced here. Event dispatchers hold only indices.
				handlers: [],
				// add a listener to an object
				add: function(/*Object*/ source, /*String*/ method, /*Function*/ listener){
					source = source || moor.global;
					var f = source[method];
					if(!f||!f[listenersName]){
						var d = moor._getIeDispatcher();
						// original target function is special
						d.target = f && (ieh.push(f) - 1);
						// dispatcher holds a list of indices into handlers table
						d[listenersName] = [];
						// redirect source to dispatcher
						f = source[method] = d;
					}
					return f[listenersName].push(ieh.push(listener) - 1) ; /*Handle*/
				},
				// remove a listener from an object
				remove: function(/*Object*/ source, /*String*/ method, /*Handle*/ handle){
					var f = (source||moor.global)[method], l = f && f[listenersName];
					if(f && l && handle--){
						delete ieh[l[handle]];
						delete l[handle];
					}
				}
			};
			// alias used above
			var ieh = iel.handlers;
		}

		moor.mixin(del, {
			add: function(/*DOMNode*/ node, /*String*/ event, /*Function*/ fp){
				if(!node){return;} // undefined
				event = del._normalizeEventName(event);
				if(event=="onkeypress"){
					// we need to listen to onkeydown to synthesize
					// keypress events that otherwise won't fire
					// on IE
					var kd = node.onkeydown;
					if(!kd || !kd[listenersName] || !kd._stealthKeydownHandle){
						var h = del.add(node, "onkeydown", del._stealthKeyDown);
						kd = node.onkeydown;
						kd._stealthKeydownHandle = h;
						kd._stealthKeydownRefs = 1;
					}else{
						kd._stealthKeydownRefs++;
					}
				}
				return iel.add(node, event, del._fixCallback(fp));
			},
			remove: function(/*DOMNode*/ node, /*String*/ event, /*Handle*/ handle){
				event = del._normalizeEventName(event);
				iel.remove(node, event, handle);
				if(event=="onkeypress"){
					var kd = node.onkeydown;
					if(--kd._stealthKeydownRefs <= 0){
						iel.remove(node, "onkeydown", kd._stealthKeydownHandle);
						delete kd._stealthKeydownHandle;
					}
				}
			},
			_normalizeEventName: function(/*String*/ eventName){
				// Generally, eventName should be lower case, unless it is
				// special somehow (e.g. a Mozilla event)
				// ensure 'on'
				return eventName.slice(0,2) != "on" ? "on" + eventName : eventName;
			},
			_nop: function(){},
			_fixEvent: function(/*Event*/ evt, /*DOMNode*/ sender){
				// summary:
				//		normalizes properties on the event object including event
				//		bubbling methods, keystroke normalization, and x/y positions
				// evt:
				//		native event object
				// sender:
				//		node to treat as "currentTarget"
				if(!evt){
					var w = sender && (sender.ownerDocument || sender.document || sender).parentWindow || window;
					evt = w.event;
				}
				if(!evt){return(evt);}
				evt.target = evt.srcElement;
				evt.currentTarget = (sender || evt.srcElement);
				evt.layerX = evt.offsetX;
				evt.layerY = evt.offsetY;
				// FIXME: scroll position query is duped from moor.html to
				// avoid dependency on that entire module. Now that HTML is in
				// Base, we should convert back to something similar there.
				var se = evt.srcElement, doc = (se && se.ownerDocument) || document;
				// DO NOT replace the following to use moor.body(), in IE, document.documentElement should be used
				// here rather than document.body
				var docBody = ((moor.isIE < 6) || (doc["compatMode"] == "BackCompat")) ? doc.body : doc.documentElement;
				var offset = moor._getIeDocumentElementOffset();
				evt.pageX = evt.clientX + moor._fixIeBiDiScrollLeft(docBody.scrollLeft || 0) - offset.x;
				evt.pageY = evt.clientY + (docBody.scrollTop || 0) - offset.y;
				if(evt.type == "mouseover"){
					evt.relatedTarget = evt.fromElement;
				}
				if(evt.type == "mouseout"){
					evt.relatedTarget = evt.toElement;
				}
				if (moor.isIE < 9 || moor.isQuirks) {
					evt.stopPropagation = del._stopPropagation;
					evt.preventDefault = del._preventDefault;
				}
				return del._fixKeys(evt);
			},
			_fixKeys: function(evt){
				switch(evt.type){
					case "keypress":
						var c = ("charCode" in evt ? evt.charCode : evt.keyCode);
						if (c==10){
							// CTRL-ENTER is CTRL-ASCII(10) on IE, but CTRL-ENTER on Mozilla
							c=0;
							evt.keyCode = 13;
						}else if(c==13||c==27){
							c=0; // Mozilla considers ENTER and ESC non-printable
						}else if(c==3){
							c=99; // Mozilla maps CTRL-BREAK to CTRL-c
						}
						// Mozilla sets keyCode to 0 when there is a charCode
						// but that stops the event on IE.
						evt.charCode = c;
						del._setKeyChar(evt);
						break;
				}
				return evt;
			},
			_stealthKeyDown: function(evt){
				// IE doesn't fire keypress for most non-printable characters.
				// other browsers do, we simulate it here.
				var kp = evt.currentTarget.onkeypress;
				// only works if kp exists and is a dispatcher
				if(!kp || !kp[listenersName]){ return; }
				// munge key/charCode
				var k=evt.keyCode;
				// These are Windows Virtual Key Codes
				// http://msdn.microsoft.com/library/default.asp?url=/library/en-us/winui/WinUI/WindowsUserInterface/UserInput/VirtualKeyCodes.asp
				var unprintable = (k!=13 || (moor.isIE >= 9 && !moor.isQuirks)) && k!=32 && k!=27 && (k<48||k>90) && (k<96||k>111) && (k<186||k>192) && (k<219||k>222);

				// synthesize keypress for most unprintables and CTRL-keys
				if(unprintable||evt.ctrlKey){
					var c = unprintable ? 0 : k;
					if(evt.ctrlKey){
						if(k==3 || k==13){
							return; // IE will post CTRL-BREAK, CTRL-ENTER as keypress natively
						}else if(c>95 && c<106){
							c -= 48; // map CTRL-[numpad 0-9] to ASCII
						}else if((!evt.shiftKey)&&(c>=65&&c<=90)){
							c += 32; // map CTRL-[A-Z] to lowercase
						}else{
							c = del._punctMap[c] || c; // map other problematic CTRL combinations to ASCII
						}
					}
					// simulate a keypress event
					var faux = del._synthesizeEvent(evt, {type: 'keypress', faux: true, charCode: c});
					kp.call(evt.currentTarget, faux);
					if(moor.isIE < 9 || (moor.isIE && moor.isQuirks)){
						evt.cancelBubble = faux.cancelBubble;
					}
					evt.returnValue = faux.returnValue;
					_trySetKeyCode(evt, faux.keyCode);
				}
			},
			// Called in Event scope
			_stopPropagation: function(){
				this.cancelBubble = true;
			},
			_preventDefault: function(){
				// Setting keyCode to 0 is the only way to prevent certain keypresses (namely
				// ctrl-combinations that correspond to menu accelerator keys).
				// Otoh, it prevents upstream listeners from getting this information
				// Try to split the difference here by clobbering keyCode only for ctrl
				// combinations. If you still need to access the key upstream, bubbledKeyCode is
				// provided as a workaround.
				this.bubbledKeyCode = this.keyCode;
				if(this.ctrlKey){_trySetKeyCode(this, 0);}
				this.returnValue = false;
			}
		});
				
		// override stopEvent for IE
		moor.stopEvent = (moor.isIE < 9 || moor.isQuirks) ? function(evt){
			evt = evt || window.event;
			del._stopPropagation.call(evt);
			del._preventDefault.call(evt);
		} : moor.stopEvent;
	}
	
	del._synthesizeEvent = function(evt, props){
			var faux = moor.mixin({}, evt, props);
			del._setKeyChar(faux);
			// FIXME: would prefer to use moor.hitch: moor.hitch(evt, evt.preventDefault);
			// but it throws an error when preventDefault is invoked on Safari
			// does Event.preventDefault not support "apply" on Safari?
			faux.preventDefault = function(){ evt.preventDefault(); };
			faux.stopPropagation = function(){ evt.stopPropagation(); };
			return faux;
	};
	
		// Opera event normalization
	if(moor.isOpera){
		moor.mixin(del, {
			_fixEvent: function(evt, sender){
				switch(evt.type){
					case "keypress":
						var c = evt.which;
						if(c==3){
							c=99; // Mozilla maps CTRL-BREAK to CTRL-c
						}
						// can't trap some keys at all, like INSERT and DELETE
						// there is no differentiating info between DELETE and ".", or INSERT and "-"
						c = c<41 && !evt.shiftKey ? 0 : c;
						if(evt.ctrlKey && !evt.shiftKey && c>=65 && c<=90){
							// lowercase CTRL-[A-Z] keys
							c += 32;
						}
						return del._synthesizeEvent(evt, { charCode: c });
				}
				return evt;
			}
		});
	}
	
		// Webkit event normalization
	if(moor.isWebKit){
				del._add = del.add;
		del._remove = del.remove;

		moor.mixin(del, {
			add: function(/*DOMNode*/ node, /*String*/ event, /*Function*/ fp){
				if(!node){return;} // undefined
				var handle = del._add(node, event, fp);
				if(del._normalizeEventName(event) == "keypress"){
					// we need to listen to onkeydown to synthesize
					// keypress events that otherwise won't fire
					// in Safari 3.1+: https://lists.webkit.org/pipermail/webkit-dev/2007-December/002992.html
					handle._stealthKeyDownHandle = del._add(node, "keydown", function(evt){
						//A variation on the IE _stealthKeydown function
						//Synthesize an onkeypress event, but only for unprintable characters.
						var k=evt.keyCode;
						// These are Windows Virtual Key Codes
						// http://msdn.microsoft.com/library/default.asp?url=/library/en-us/winui/WinUI/WindowsUserInterface/UserInput/VirtualKeyCodes.asp
						var unprintable = k!=13 && k!=32 && (k<48 || k>90) && (k<96 || k>111) && (k<186 || k>192) && (k<219 || k>222);
						// synthesize keypress for most unprintables and CTRL-keys
						if(unprintable || evt.ctrlKey){
							var c = unprintable ? 0 : k;
							if(evt.ctrlKey){
								if(k==3 || k==13){
									return; // IE will post CTRL-BREAK, CTRL-ENTER as keypress natively
								}else if(c>95 && c<106){
									c -= 48; // map CTRL-[numpad 0-9] to ASCII
								}else if(!evt.shiftKey && c>=65 && c<=90){
									c += 32; // map CTRL-[A-Z] to lowercase
								}else{
									c = del._punctMap[c] || c; // map other problematic CTRL combinations to ASCII
								}
							}
							// simulate a keypress event
							var faux = del._synthesizeEvent(evt, {type: 'keypress', faux: true, charCode: c});
							fp.call(evt.currentTarget, faux);
						}
					});
				}
				return handle; /*Handle*/
			},

			remove: function(/*DOMNode*/ node, /*String*/ event, /*Handle*/ handle){
				if(node){
					if(handle._stealthKeyDownHandle){
						del._remove(node, "keydown", handle._stealthKeyDownHandle);
					}
					del._remove(node, event, handle);
				}
			},
			_fixEvent: function(evt, sender){
				switch(evt.type){
					case "keypress":
						if(evt.faux){ return evt; }
						var c = evt.charCode;
						c = c>=32 ? c : 0;
						return del._synthesizeEvent(evt, {charCode: c, faux: true});
				}
				return evt;
			}
		});
		}
	})();

if(moor.isIE){
	// keep this out of the closure
	// closing over 'iel' or 'ieh' b0rks leak prevention
	// ls[i] is an index into the master handler array
	moor._ieDispatcher = function(args, sender){
		var ap = Array.prototype,
			h = moor._ie_listener.handlers,
			c = args.callee,
			ls = c[moor._ieListenersName],
			t = h[c.target];
		// return value comes from original target function
		var r = t && t.apply(sender, args);
		// make local copy of listener array so it's immutable during processing
		var lls = [].concat(ls);
		// invoke listeners after target function
		for(var i in lls){
			var f = h[lls[i]];
			if(!(i in ap) && f){
				f.apply(sender, args);
			}
		}
		return r;
	};
	moor._getIeDispatcher = function(){
		// ensure the returned function closes over nothing ("new Function" apparently doesn't close)
		return new Function(moor._scopeName + "._ieDispatcher(arguments, this)"); // function
	};
	// keep this out of the closure to reduce RAM allocation
	moor._event_listener._fixCallback = function(fp){
		var f = moor._event_listener._fixEvent;
		return function(e){ return fp.call(this, f(e, this)); };
	};
}

}

if(!moor._hasResource["moor._base.html"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.html"] = true;
moor.provide("moor._base.html");



// FIXME: need to add unit tests for all the semi-public methods

try{
	document.execCommand("BackgroundImageCache", false, true);
}catch(e){
	// sane browsers don't have cache "issues"
}

// =============================
// DOM Functions
// =============================


if(moor.isIE){
	moor.byId = function(id, doc){
		if(typeof id != "string"){
			return id;
		}
		var _d = doc || moor.doc, te = _d.getElementById(id);
		// attributes.id.value is better than just id in case the
		// user has a name=id inside a form
		if(te && (te.attributes.id.value == id || te.id == id)){
			return te;
		}else{
			var eles = _d.all[id];
			if(!eles || eles.nodeName){
				eles = [eles];
			}
			// if more than 1, choose first with the correct id
			var i=0;
			while((te=eles[i++])){
				if((te.attributes && te.attributes.id && te.attributes.id.value == id)
					|| te.id == id){
					return te;
				}
			}
		}
	};
}else{
	moor.byId = function(id, doc){
		// inline'd type check.
		// be sure to return null per documentation, to match IE branch.
		return ((typeof id == "string") ? (doc || moor.doc).getElementById(id) : id) || null; // DomNode
	};
}
/*=====
};
=====*/

(function(){
	var d = moor;
	var byId = d.byId;

	var _destroyContainer = null,
		_destroyDoc;
		d.addOnWindowUnload(function(){
		_destroyContainer = null; //prevent IE leak
	});
	
/*=====
	moor._destroyElement = function(node){
		// summary:
		// 		Existing alias for `moor.destroy`. Deprecated, will be removed
		// 		in 2.0
	}
=====*/
	moor._destroyElement = moor.destroy = function(/*String|DomNode*/node){

		node = byId(node);
		try{
			var doc = node.ownerDocument;
			// cannot use _destroyContainer.ownerDocument since this can throw an exception on IE
			if(!_destroyContainer || _destroyDoc != doc){
				_destroyContainer = doc.createElement("div");
				_destroyDoc = doc;
			}
			_destroyContainer.appendChild(node.parentNode ? node.parentNode.removeChild(node) : node);
			// NOTE: see http://trac.moortoolkit.org/ticket/2931. This may be a bug and not a feature
			_destroyContainer.innerHTML = "";
		}catch(e){
			/* squelch */
		}
	};

	moor.isDescendant = function(/*DomNode|String*/node, /*DomNode|String*/ancestor){
		//	summary:
		//		Returns true if node is a descendant of ancestor
		//	node: string id or node reference to test
		//	ancestor: string id or node reference of potential parent to test against
		//
		// example:
		//	Test is node id="bar" is a descendant of node id="foo"
		//	|	if(moor.isDescendant("bar", "foo")){ ... }
		try{
			node = byId(node);
			ancestor = byId(ancestor);
			while(node){
				if(node == ancestor){
					return true; // Boolean
				}
				node = node.parentNode;
			}
		}catch(e){ /* squelch, return false */ }
		return false; // Boolean
	};

	moor.setSelectable = function(/*DomNode|String*/node, /*Boolean*/selectable){
		//	summary:
		//		Enable or disable selection on a node
		//	node:
		//		id or reference to node
		//	selectable:
		//		state to put the node in. false indicates unselectable, true
		//		allows selection.
		//	example:
		//	Make the node id="bar" unselectable
		//	|	moor.setSelectable("bar");
		//	example:
		//	Make the node id="bar" selectable
		//	|	moor.setSelectable("bar", true);
		node = byId(node);
				if(d.isMozilla){
			node.style.MozUserSelect = selectable ? "" : "none";
		}else if(d.isKhtml || d.isWebKit){
					node.style.KhtmlUserSelect = selectable ? "auto" : "none";
				}else if(d.isIE){
			var v = (node.unselectable = selectable ? "" : "on");
			d.query("*", node).forEach("item.unselectable = '"+v+"'");
		}
				//FIXME: else?  Opera?
	};

	var _insertBefore = function(/*DomNode*/node, /*DomNode*/ref){
		var parent = ref.parentNode;
		if(parent){
			parent.insertBefore(node, ref);
		}
	};

	var _insertAfter = function(/*DomNode*/node, /*DomNode*/ref){
		//	summary:
		//		Try to insert node after ref
		var parent = ref.parentNode;
		if(parent){
			if(parent.lastChild == ref){
				parent.appendChild(node);
			}else{
				parent.insertBefore(node, ref.nextSibling);
			}
		}
	};

	moor.place = function(node, refNode, position){

		refNode = byId(refNode);
		if(typeof node == "string"){ // inline'd type check
			node = /^\s*</.test(node) ? d._toDom(node, refNode.ownerDocument) : byId(node);
		}
		if(typeof position == "number"){ // inline'd type check
			var cn = refNode.childNodes;
			if(!cn.length || cn.length <= position){
				refNode.appendChild(node);
			}else{
				_insertBefore(node, cn[position < 0 ? 0 : position]);
			}
		}else{
			switch(position){
				case "before":
					_insertBefore(node, refNode);
					break;
				case "after":
					_insertAfter(node, refNode);
					break;
				case "replace":
					refNode.parentNode.replaceChild(node, refNode);
					break;
				case "only":
					d.empty(refNode);
					refNode.appendChild(node);
					break;
				case "first":
					if(refNode.firstChild){
						_insertBefore(node, refNode.firstChild);
						break;
					}
					// else fallthrough...
				default: // aka: last
					refNode.appendChild(node);
			}
		}
		return node; // DomNode
	};

	// Box functions will assume this model.
	// On IE/Opera, BORDER_BOX will be set if the primary document is in quirks mode.
	// Can be set to change behavior of box setters.

	// can be either:
	//	"border-box"
	//	"content-box" (default)
	moor.boxModel = "content-box";

	// We punt per-node box mode testing completely.
	// If anybody cares, we can provide an additional (optional) unit
	// that overrides existing code to include per-node box sensitivity.

	// Opera documentation claims that Opera 9 uses border-box in BackCompat mode.
	// but experiments (Opera 9.10.8679 on Windows Vista) indicate that it actually continues to use content-box.
	// IIRC, earlier versions of Opera did in fact use border-box.
	// Opera guys, this is really confusing. Opera being broken in quirks mode is not our fault.

		if(d.isIE /*|| moor.isOpera*/){
		// client code may have to adjust if compatMode varies across iframes
		d.boxModel = document.compatMode == "BackCompat" ? "border-box" : "content-box";
	}
	
	var gcs;
		if(d.isWebKit){
			gcs = function(/*DomNode*/node){
			var s;
			if(node.nodeType == 1){
				var dv = node.ownerDocument.defaultView;
				s = dv.getComputedStyle(node, null);
				if(!s && node.style){
					node.style.display = "";
					s = dv.getComputedStyle(node, null);
				}
			}
			return s || {};
		};
		}else if(d.isIE){
		gcs = function(node){
			// IE (as of 7) doesn't expose Element like sane browsers
			return node.nodeType == 1 /* ELEMENT_NODE*/ ? node.currentStyle : {};
		};
	}else{
		gcs = function(node){
			return node.nodeType == 1 ?
				node.ownerDocument.defaultView.getComputedStyle(node, null) : {};
		};
	}
		moor.getComputedStyle = gcs;

		if(!d.isIE){
			d._toPixelValue = function(element, value){
			// style values can be floats, client code may want
			// to round for integer pixels.
			return parseFloat(value) || 0;
		};
		}else{
		d._toPixelValue = function(element, avalue){
			if(!avalue){ return 0; }
			// on IE7, medium is usually 4 pixels
			if(avalue == "medium"){ return 4; }
			// style values can be floats, client code may
			// want to round this value for integer pixels.
			if(avalue.slice && avalue.slice(-2) == 'px'){ return parseFloat(avalue); }
			// with(element){
				var sLeft = element.style.left;
				var rsLeft = element.runtimeStyle.left;
				element.runtimeStyle.left = element.currentStyle.left;
				try{
					// 'avalue' may be incompatible with style.left, which can cause IE to throw
					// this has been observed for border widths using "thin", "medium", "thick" constants
					// those particular constants could be trapped by a lookup
					// but perhaps there are more
					element.style.left = avalue;
					avalue = element.style.pixelLeft;
				}catch(e){
					avalue = 0;
				}
				element.style.left = sLeft;
				element.runtimeStyle.left = rsLeft;
			// }
			return avalue;
		};
	}
		var px = d._toPixelValue;

	// FIXME: there opacity quirks on FF that we haven't ported over. Hrm.
	/*=====
	moor._getOpacity = function(node){
			//	summary:
			//		Returns the current opacity of the passed node as a
			//		floating-point value between 0 and 1.
			//	node: DomNode
			//		a reference to a DOM node. Does NOT support taking an
			//		ID string for speed reasons.
			//	returns: Number between 0 and 1
			return; // Number
	}
	=====*/

		var astr = "DXImageTransform.Microsoft.Alpha";
	var af = function(n, f){
		try{
			return n.filters.item(astr);
		}catch(e){
			return f ? {} : null;
		}
	};

		moor._getOpacity =
			d.isIE < 9 ? function(node){
			try{
				return af(node).Opacity / 100; // Number
			}catch(e){
				return 1; // Number
			}
		} :
			function(node){
			return gcs(node).opacity;
		};

	/*=====
	moor._setOpacity = function(node, opacity){
			//	summary:
			//		set the opacity of the passed node portably. Returns the
			//		new opacity of the node.
			//	node: DOMNode
			//		a reference to a DOM node. Does NOT support taking an
			//		ID string for performance reasons.
			//	opacity: Number
			//		A Number between 0 and 1. 0 specifies transparent.
			//	returns: Number between 0 and 1
			return; // Number
	}
	=====*/

	moor._setOpacity =
				d.isIE < 9 ? function(/*DomNode*/node, /*Number*/opacity){
			var ov = opacity * 100, opaque = opacity == 1;
			node.style.zoom = opaque ? "" : 1;

			if(!af(node)){
				if(opaque){
					return opacity;
				}
				node.style.filter += " progid:" + astr + "(Opacity=" + ov + ")";
			}else{
				af(node, 1).Opacity = ov;
			}

			// on IE7 Alpha(Filter opacity=100) makes text look fuzzy so disable it altogether (bug #2661),
			//but still update the opacity value so we can get a correct reading if it is read later.
			af(node, 1).Enabled = !opaque;

			if(node.nodeName.toLowerCase() == "tr"){
				d.query("> td", node).forEach(function(i){
					d._setOpacity(i, opacity);
				});
			}
			return opacity;
		} :
				function(node, opacity){
			return node.style.opacity = opacity;
		};

	var _pixelNamesCache = {
		left: true, top: true
	};
	var _pixelRegExp = /margin|padding|width|height|max|min|offset/;  // |border
	var _toStyleValue = function(node, type, value){
		type = type.toLowerCase(); // FIXME: should we really be doing string case conversion here? Should we cache it? Need to profile!
				if(d.isIE){
			if(value == "auto"){
				if(type == "height"){ return node.offsetHeight; }
				if(type == "width"){ return node.offsetWidth; }
			}
			if(type == "fontweight"){
				switch(value){
					case 700: return "bold";
					case 400:
					default: return "normal";
				}
			}
		}
				if(!(type in _pixelNamesCache)){
			_pixelNamesCache[type] = _pixelRegExp.test(type);
		}
		return _pixelNamesCache[type] ? px(node, value) : value;
	};

	var _floatStyle = d.isIE ? "styleFloat" : "cssFloat",
		_floatAliases = { "cssFloat": _floatStyle, "styleFloat": _floatStyle, "float": _floatStyle }
	;

	// public API

	moor.style = function(	/*DomNode|String*/ node,
							/*String?|Object?*/ style,
							/*String?*/ value){

		var n = byId(node), args = arguments.length, op = (style == "opacity");
		style = _floatAliases[style] || style;
		if(args == 3){
			return op ? d._setOpacity(n, value) : n.style[style] = value; /*Number*/
		}
		if(args == 2 && op){
			return d._getOpacity(n);
		}
		var s = gcs(n);
		if(args == 2 && typeof style != "string"){ // inline'd type check
			for(var x in style){
				d.style(node, x, style[x]);
			}
			return s;
		}
		return (args == 1) ? s : _toStyleValue(n, style, s[style] || n.style[style]); /* CSS2Properties||String||Number */
	};

	// =============================
	// Box Functions
	// =============================

	moor._getPadExtents = function(/*DomNode*/n, /*Object*/computedStyle){
		//	summary:
		// 		Returns object with special values specifically useful for node
		// 		fitting.
		//	description:
		//		Returns an object with `w`, `h`, `l`, `t` properties:
		//	|		l/t = left/top padding (respectively)
		//	|		w = the total of the left and right padding
		//	|		h = the total of the top and bottom padding
		//		If 'node' has position, l/t forms the origin for child nodes.
		//		The w/h are used for calculating boxes.
		//		Normally application code will not need to invoke this
		//		directly, and will use the ...box... functions instead.
		var
			s = computedStyle||gcs(n),
			l = px(n, s.paddingLeft),
			t = px(n, s.paddingTop);
		return {
			l: l,
			t: t,
			w: l+px(n, s.paddingRight),
			h: t+px(n, s.paddingBottom)
		};
	};

	moor._getBorderExtents = function(/*DomNode*/n, /*Object*/computedStyle){
		//	summary:
		//		returns an object with properties useful for noting the border
		//		dimensions.
		//	description:
		// 		* l/t = the sum of left/top border (respectively)
		//		* w = the sum of the left and right border
		//		* h = the sum of the top and bottom border
		//
		//		The w/h are used for calculating boxes.
		//		Normally application code will not need to invoke this
		//		directly, and will use the ...box... functions instead.
		var
			ne = "none",
			s = computedStyle||gcs(n),
			bl = (s.borderLeftStyle != ne ? px(n, s.borderLeftWidth) : 0),
			bt = (s.borderTopStyle != ne ? px(n, s.borderTopWidth) : 0);
		return {
			l: bl,
			t: bt,
			w: bl + (s.borderRightStyle!=ne ? px(n, s.borderRightWidth) : 0),
			h: bt + (s.borderBottomStyle!=ne ? px(n, s.borderBottomWidth) : 0)
		};
	};

	moor._getPadBorderExtents = function(/*DomNode*/n, /*Object*/computedStyle){
		//	summary:
		//		Returns object with properties useful for box fitting with
		//		regards to padding.
		// description:
		//		* l/t = the sum of left/top padding and left/top border (respectively)
		//		* w = the sum of the left and right padding and border
		//		* h = the sum of the top and bottom padding and border
		//
		//		The w/h are used for calculating boxes.
		//		Normally application code will not need to invoke this
		//		directly, and will use the ...box... functions instead.
		var
			s = computedStyle||gcs(n),
			p = d._getPadExtents(n, s),
			b = d._getBorderExtents(n, s);
		return {
			l: p.l + b.l,
			t: p.t + b.t,
			w: p.w + b.w,
			h: p.h + b.h
		};
	};

	moor._getMarginExtents = function(n, computedStyle){
		//	summary:
		//		returns object with properties useful for box fitting with
		//		regards to box margins (i.e., the outer-box).
		//
		//		* l/t = marginLeft, marginTop, respectively
		//		* w = total width, margin inclusive
		//		* h = total height, margin inclusive
		//
		//		The w/h are used for calculating boxes.
		//		Normally application code will not need to invoke this
		//		directly, and will use the ...box... functions instead.
		var
			s = computedStyle||gcs(n),
			l = px(n, s.marginLeft),
			t = px(n, s.marginTop),
			r = px(n, s.marginRight),
			b = px(n, s.marginBottom);
		if(d.isWebKit && (s.position != "absolute")){
			// FIXME: Safari's version of the computed right margin
			// is the space between our right edge and the right edge
			// of our offsetParent.
			// What we are looking for is the actual margin value as
			// determined by CSS.
			// Hack solution is to assume left/right margins are the same.
			r = l;
		}
		return {
			l: l,
			t: t,
			w: l+r,
			h: t+b
		};
	};

	// Box getters work in any box context because offsetWidth/clientWidth
	// are invariant wrt box context
	//
	// They do *not* work for display: inline objects that have padding styles
	// because the user agent ignores padding (it's bogus styling in any case)
	//
	// Be careful with IMGs because they are inline or block depending on
	// browser and browser mode.

	// Although it would be easier to read, there are not separate versions of
	// _getMarginBox for each browser because:
	// 1. the branching is not expensive
	// 2. factoring the shared code wastes cycles (function call overhead)
	// 3. duplicating the shared code wastes bytes

	moor._getMarginBox = function(/*DomNode*/node, /*Object*/computedStyle){
		// summary:
		//		returns an object that encodes the width, height, left and top
		//		positions of the node's margin box.
		var s = computedStyle || gcs(node), me = d._getMarginExtents(node, s);
		var l = node.offsetLeft - me.l, t = node.offsetTop - me.t, p = node.parentNode;
				if(d.isMoz){
			// Mozilla:
			// If offsetParent has a computed overflow != visible, the offsetLeft is decreased
			// by the parent's border.
			// We don't want to compute the parent's style, so instead we examine node's
			// computed left/top which is more stable.
			var sl = parseFloat(s.left), st = parseFloat(s.top);
			if(!isNaN(sl) && !isNaN(st)){
				l = sl, t = st;
			}else{
				// If child's computed left/top are not parseable as a number (e.g. "auto"), we
				// have no choice but to examine the parent's computed style.
				if(p && p.style){
					var pcs = gcs(p);
					if(pcs.overflow != "visible"){
						var be = d._getBorderExtents(p, pcs);
						l += be.l, t += be.t;
					}
				}
			}
		}else if(d.isOpera || (d.isIE > 7 && !d.isQuirks)){
			// On Opera and IE 8, offsetLeft/Top includes the parent's border
			if(p){
				be = d._getBorderExtents(p);
				l -= be.l;
				t -= be.t;
			}
		}
				return {
			l: l,
			t: t,
			w: node.offsetWidth + me.w,
			h: node.offsetHeight + me.h
		};
	}
	
	moor._getMarginSize = function(/*DomNode*/node, /*Object*/computedStyle){
		// summary:
		//	returns an object that encodes the width and height of
		//	the node's margin box
		node = byId(node);
		var me = d._getMarginExtents(node, computedStyle || gcs(node));

		var size = node.getBoundingClientRect();
		return {
			w: (size.right - size.left) + me.w,
			h: (size.bottom - size.top) + me.h
		}
	}

	moor._getContentBox = function(node, computedStyle){
		// summary:
		//		Returns an object that encodes the width, height, left and top
		//		positions of the node's content box, irrespective of the
		//		current box model.

		// clientWidth/Height are important since the automatically account for scrollbars
		// fallback to offsetWidth/Height for special cases (see #3378)
		var s = computedStyle || gcs(node),
			pe = d._getPadExtents(node, s),
			be = d._getBorderExtents(node, s),
			w = node.clientWidth,
			h
		;
		if(!w){
			w = node.offsetWidth, h = node.offsetHeight;
		}else{
			h = node.clientHeight, be.w = be.h = 0;
		}
		// On Opera, offsetLeft includes the parent's border
				if(d.isOpera){ pe.l += be.l; pe.t += be.t; };
				return {
			l: pe.l,
			t: pe.t,
			w: w - pe.w - be.w,
			h: h - pe.h - be.h
		};
	};

	moor._getBorderBox = function(node, computedStyle){
		var s = computedStyle || gcs(node),
			pe = d._getPadExtents(node, s),
			cb = d._getContentBox(node, s)
		;
		return {
			l: cb.l - pe.l,
			t: cb.t - pe.t,
			w: cb.w + pe.w,
			h: cb.h + pe.h
		};
	};

	// Box setters depend on box context because interpretation of width/height styles
	// vary wrt box context.
	//
	// The value of moor.boxModel is used to determine box context.
	// moor.boxModel can be set directly to change behavior.
	//
	// Beware of display: inline objects that have padding styles
	// because the user agent ignores padding (it's a bogus setup anyway)
	//
	// Be careful with IMGs because they are inline or block depending on
	// browser and browser mode.
	//
	// Elements other than DIV may have special quirks, like built-in
	// margins or padding, or values not detectable via computedStyle.
	// In particular, margins on TABLE do not seems to appear
	// at all in computedStyle on Mozilla.

	moor._setBox = function(/*DomNode*/node, /*Number?*/l, /*Number?*/t, /*Number?*/w, /*Number?*/h, /*String?*/u){

		u = u || "px";
		var s = node.style;
		if(!isNaN(l)){ s.left = l + u; }
		if(!isNaN(t)){ s.top = t + u; }
		if(w >= 0){ s.width = w + u; }
		if(h >= 0){ s.height = h + u; }
	};

	moor._isButtonTag = function(/*DomNode*/node) {
		// summary:
		//		True if the node is BUTTON or INPUT.type="button".
		return node.tagName == "BUTTON"
			|| node.tagName=="INPUT" && (node.getAttribute("type")||'').toUpperCase() == "BUTTON"; // boolean
	};

	moor._usesBorderBox = function(/*DomNode*/node){
		//	summary:
		//		True if the node uses border-box layout.

		// We could test the computed style of node to see if a particular box
		// has been specified, but there are details and we choose not to bother.

		// TABLE and BUTTON (and INPUT type=button) are always border-box by default.
		// If you have assigned a different box to either one via CSS then
		// box functions will break.

		var n = node.tagName;
		return d.boxModel=="border-box" || n=="TABLE" || d._isButtonTag(node); // boolean
	};

	moor._setContentSize = function(/*DomNode*/node, /*Number*/widthPx, /*Number*/heightPx, /*Object*/computedStyle){
		//	summary:
		//		Sets the size of the node's contents, irrespective of margins,
		//		padding, or borders.
		if(d._usesBorderBox(node)){
			var pb = d._getPadBorderExtents(node, computedStyle);
			if(widthPx >= 0){ widthPx += pb.w; }
			if(heightPx >= 0){ heightPx += pb.h; }
		}
		d._setBox(node, NaN, NaN, widthPx, heightPx);
	};

	moor._setMarginBox = function(/*DomNode*/node, 	/*Number?*/leftPx, /*Number?*/topPx,
													/*Number?*/widthPx, /*Number?*/heightPx,
													/*Object*/computedStyle){
		//	summary:
		//		sets the size of the node's margin box and placement
		//		(left/top), irrespective of box model. Think of it as a
		//		passthrough to moor._setBox that handles box-model vagaries for
		//		you.

		var s = computedStyle || gcs(node),
		// Some elements have special padding, margin, and box-model settings.
		// To use box functions you may need to set padding, margin explicitly.
		// Controlling box-model is harder, in a pinch you might set moor.boxModel.
			bb = d._usesBorderBox(node),
			pb = bb ? _nilExtents : d._getPadBorderExtents(node, s)
		;
		if(d.isWebKit){
			// on Safari (3.1.2), button nodes with no explicit size have a default margin
			// setting an explicit size eliminates the margin.
			// We have to swizzle the width to get correct margin reading.
			if(d._isButtonTag(node)){
				var ns = node.style;
				if(widthPx >= 0 && !ns.width) { ns.width = "4px"; }
				if(heightPx >= 0 && !ns.height) { ns.height = "4px"; }
			}
		}
		var mb = d._getMarginExtents(node, s);
		if(widthPx >= 0){ widthPx = Math.max(widthPx - pb.w - mb.w, 0); }
		if(heightPx >= 0){ heightPx = Math.max(heightPx - pb.h - mb.h, 0); }
		d._setBox(node, leftPx, topPx, widthPx, heightPx);
	};

	var _nilExtents = { l:0, t:0, w:0, h:0 };

	// public API

	moor.marginBox = function(/*DomNode|String*/node, /*Object?*/box){

		
		var n = byId(node), s = gcs(n), b = box;
		return !b ? d._getMarginBox(n, s) : d._setMarginBox(n, b.l, b.t, b.w, b.h, s); // Object
	};

	moor.contentBox = function(/*DomNode|String*/node, /*Object?*/box){

		var n = byId(node), s = gcs(n), b = box;
		return !b ? d._getContentBox(n, s) : d._setContentSize(n, b.w, b.h, s); // Object
	};

	// =============================
	// Positioning
	// =============================

	var _sumAncestorProperties = function(node, prop){
		if(!(node = (node||0).parentNode)){return 0;}
		var val, retVal = 0, _b = d.body();
		while(node && node.style){
			if(gcs(node).position == "fixed"){
				return 0;
			}
			val = node[prop];
			if(val){
				retVal += val - 0;
				// opera and khtml #body & #html has the same values, we only
				// need one value
				if(node == _b){ break; }
			}
			node = node.parentNode;
		}
		return retVal;	//	integer
	};

	moor._docScroll = function(){
		var n = d.global;
		return "pageXOffset" in n
			? { x:n.pageXOffset, y:n.pageYOffset }
			: (n = d.isQuirks? d.doc.body : d.doc.documentElement, { x:d._fixIeBiDiScrollLeft(n.scrollLeft || 0), y:n.scrollTop || 0 });
	};

	moor._isBodyLtr = function(){
		return "_bodyLtr" in d? d._bodyLtr :
			d._bodyLtr = (d.body().dir || d.doc.documentElement.dir || "ltr").toLowerCase() == "ltr"; // Boolean
	};

		moor._getIeDocumentElementOffset = function(){
		//	summary:
		//		returns the offset in x and y from the document body to the
		//		visual edge of the page
		//	description:
		// The following values in IE contain an offset:
		//	|		event.clientX
		//	|		event.clientY
		//	|		node.getBoundingClientRect().left
		//	|		node.getBoundingClientRect().top
		//	 	But other position related values do not contain this offset,
		//	 	such as node.offsetLeft, node.offsetTop, node.style.left and
		//	 	node.style.top. The offset is always (2, 2) in LTR direction.
		//	 	When the body is in RTL direction, the offset counts the width
		//	 	of left scroll bar's width.  This function computes the actual
		//	 	offset.

		//NOTE: assumes we're being called in an IE browser

		var de = d.doc.documentElement; // only deal with HTML element here, _abs handles body/quirks

		if(d.isIE < 8){
			var r = de.getBoundingClientRect(); // works well for IE6+
			//console.debug('rect left,top = ' + r.left+','+r.top + ', html client left/top = ' + de.clientLeft+','+de.clientTop + ', rtl = ' + (!d._isBodyLtr()) + ', quirks = ' + d.isQuirks);
			var l = r.left,
			    t = r.top;
			if(d.isIE < 7){
				l += de.clientLeft;	// scrollbar size in strict/RTL, or,
				t += de.clientTop;	// HTML border size in strict
			}
			return {
				x: l < 0? 0 : l, // FRAME element border size can lead to inaccurate negative values
				y: t < 0? 0 : t
			};
		}else{
			return {
				x: 0,
				y: 0
			};
		}

	};
	
	moor._fixIeBiDiScrollLeft = function(/*Integer*/ scrollLeft){
		// In RTL direction, scrollLeft should be a negative value, but IE
		// returns a positive one. All codes using documentElement.scrollLeft
		// must call this function to fix this error, otherwise the position
		// will offset to right when there is a horizontal scrollbar.

				var ie = d.isIE;
		if(ie && !d._isBodyLtr()){
			var qk = d.isQuirks,
				de = qk ? d.doc.body : d.doc.documentElement;
			if(ie == 6 && !qk && d.global.frameElement && de.scrollHeight > de.clientHeight){
				scrollLeft += de.clientLeft; // workaround ie6+strict+rtl+iframe+vertical-scrollbar bug where clientWidth is too small by clientLeft pixels
			}
			return (ie < 8 || qk) ? (scrollLeft + de.clientWidth - de.scrollWidth) : -scrollLeft; // Integer
		}
				return scrollLeft; // Integer
	};

	// FIXME: need a setter for coords or a moveTo!!
	moor._abs = moor.position = function(/*DomNode*/node, /*Boolean?*/includeScroll){
		//	summary:
		//		Gets the position and size of the passed element relative to
		//		the viewport (if includeScroll==false), or relative to the
		//		document root (if includeScroll==true).
		//
		//	description:
		//		Returns an object of the form:
		//			{ x: 100, y: 300, w: 20, h: 15 }
		//		If includeScroll==true, the x and y values will include any
		//		document offsets that may affect the position relative to the
		//		viewport.
		//		Uses the border-box model (inclusive of border and padding but
		//		not margin).  Does not act as a setter.

		node = byId(node);
		var	db = d.body(),
			dh = db.parentNode,
			ret = node.getBoundingClientRect();
			ret = { x: ret.left, y: ret.top, w: ret.right - ret.left, h: ret.bottom - ret.top };
					if(d.isIE){
				// On IE there's a 2px offset that we need to adjust for, see _getIeDocumentElementOffset()
				var offset = d._getIeDocumentElementOffset();

				// fixes the position in IE, quirks mode
				ret.x -= offset.x + (d.isQuirks ? db.clientLeft+db.offsetLeft : 0);
				ret.y -= offset.y + (d.isQuirks ? db.clientTop+db.offsetTop : 0);
			}else if(d.isFF == 3){
				// In FF3 you have to subtract the document element margins.
				// Fixed in FF3.5 though.
				var cs = gcs(dh);
				ret.x -= px(dh, cs.marginLeft) + px(dh, cs.borderLeftWidth);
				ret.y -= px(dh, cs.marginTop) + px(dh, cs.borderTopWidth);
			}
				// account for document scrolling
		if(includeScroll){
			var scroll = d._docScroll();
			ret.x += scroll.x;
			ret.y += scroll.y;
		}

		return ret; // Object
	};

	moor.coords = function(/*DomNode|String*/node, /*Boolean?*/includeScroll){
		//	summary:
		//		Deprecated: Use position() for border-box x/y/w/h
		//		or marginBox() for margin-box w/h/l/t.
		//		Returns an object representing a node's size and position.
		//
		//	description:
		//		Returns an object that measures margin-box (w)idth/(h)eight
		//		and absolute position x/y of the border-box. Also returned
		//		is computed (l)eft and (t)op values in pixels from the
		//		node's offsetParent as returned from marginBox().
		//		Return value will be in the form:
		//|			{ l: 50, t: 200, w: 300: h: 150, x: 100, y: 300 }
		//		Does not act as a setter. If includeScroll is passed, the x and
		//		y params are affected as one would expect in moor.position().
		var n = byId(node), s = gcs(n), mb = d._getMarginBox(n, s);
		var abs = d.position(n, includeScroll);
		mb.x = abs.x;
		mb.y = abs.y;
		return mb;
	};

	// =============================
	// Element attribute Functions
	// =============================

	// moor.attr() should conform to http://www.w3.org/TR/DOM-Level-2-Core/

	var _propNames = {
			// properties renamed to avoid clashes with reserved words
			"class":   "className",
			"for":     "htmlFor",
			// properties written as camelCase
			tabindex:  "tabIndex",
			readonly:  "readOnly",
			colspan:   "colSpan",
			frameborder: "frameBorder",
			rowspan:   "rowSpan",
			valuetype: "valueType"
		},
		_attrNames = {
			// original attribute names
			classname: "class",
			htmlfor:   "for",
			// for IE
			tabindex:  "tabIndex",
			readonly:  "readOnly"
		},
		_forcePropNames = {
			innerHTML: 1,
			className: 1,
			htmlFor:   d.isIE,
			value:     1
		};

	var _fixAttrName = function(/*String*/ name){
		return _attrNames[name.toLowerCase()] || name;
	};

	var _hasAttr = function(node, name){
		var attr = node.getAttributeNode && node.getAttributeNode(name);
		return attr && attr.specified; // Boolean
	};

	// There is a difference in the presence of certain properties and their default values
	// between browsers. For example, on IE "disabled" is present on all elements,
	// but it is value is "false"; "tabIndex" of <div> returns 0 by default on IE, yet other browsers
	// can return -1.

	moor.hasAttr = function(/*DomNode|String*/node, /*String*/name){
		//	summary:
		//		Returns true if the requested attribute is specified on the
		//		given element, and false otherwise.
		//	node:
		//		id or reference to the element to check
		//	name:
		//		the name of the attribute
		//	returns:
		//		true if the requested attribute is specified on the
		//		given element, and false otherwise
		var lc = name.toLowerCase();
		return _forcePropNames[_propNames[lc] || name] || _hasAttr(byId(node), _attrNames[lc] || name);	// Boolean
	};

	var _evtHdlrMap = {}, _ctr = 0,
		_attrId = moor._scopeName + "attrid",
		// the next dictionary lists elements with read-only innerHTML on IE
		_roInnerHtml = {col: 1, colgroup: 1,
			// frameset: 1, head: 1, html: 1, style: 1,
			table: 1, tbody: 1, tfoot: 1, thead: 1, tr: 1, title: 1};

	moor.attr = function(/*DomNode|String*/node, /*String|Object*/name, /*String?*/value){
		node = byId(node);
		var args = arguments.length, prop;
		if(args == 2 && typeof name != "string"){ // inline'd type check
			// the object form of setter: the 2nd argument is a dictionary
			for(var x in name){
				d.attr(node, x, name[x]);
			}
			return node; // DomNode
		}
		var lc = name.toLowerCase(),
			propName = _propNames[lc] || name,
			forceProp = _forcePropNames[propName],
			attrName = _attrNames[lc] || name;
		if(args == 3){
			// setter
			do{
				if(propName == "style" && typeof value != "string"){ // inline'd type check
					// special case: setting a style
					d.style(node, value);
					break;
				}
				if(propName == "innerHTML"){
					// special case: assigning HTML
										if(d.isIE && node.tagName.toLowerCase() in _roInnerHtml){
						d.empty(node);
						node.appendChild(d._toDom(value, node.ownerDocument));
					}else{
											node[propName] = value;
										}
										break;
				}
				if(d.isFunction(value)){
					// special case: assigning an event handler
					// clobber if we can
					var attrId = d.attr(node, _attrId);
					if(!attrId){
						attrId = _ctr++;
						d.attr(node, _attrId, attrId);
					}
					if(!_evtHdlrMap[attrId]){
						_evtHdlrMap[attrId] = {};
					}
					var h = _evtHdlrMap[attrId][propName];
					if(h){
						d.disconnect(h);
					}else{
						try{
							delete node[propName];
						}catch(e){}
					}
					// ensure that event objects are normalized, etc.
					_evtHdlrMap[attrId][propName] = d.connect(node, propName, value);
					break;
				}
				if(forceProp || typeof value == "boolean"){
					// special case: forcing assignment to the property
					// special case: setting boolean to a property instead of attribute
					node[propName] = value;
					break;
				}
				// node's attribute
				node.setAttribute(attrName, value);
			}while(false);
			return node; // DomNode
		}
		// getter
		// should we access this attribute via a property or
		// via getAttribute()?
		value = node[propName];
		if(forceProp && typeof value != "undefined"){
			// node's property
			return value;	// Anything
		}
		if(propName != "href" && (typeof value == "boolean" || d.isFunction(value))){
			// node's property
			return value;	// Anything
		}
		// node's attribute
		// we need _hasAttr() here to guard against IE returning a default value
		return _hasAttr(node, attrName) ? node.getAttribute(attrName) : null; // Anything
	};

	moor.removeAttr = function(/*DomNode|String*/ node, /*String*/ name){
		//	summary:
		//		Removes an attribute from an HTML element.
		//	node:
		//		id or reference to the element to remove the attribute from
		//	name:
		//		the name of the attribute to remove
		byId(node).removeAttribute(_fixAttrName(name));
	};

	moor.getNodeProp = function(/*DomNode|String*/ node, /*String*/ name){
		//	summary:
		//		Returns an effective value of a property or an attribute.
		//	node:
		//		id or reference to the element to remove the attribute from
		//	name:
		//		the name of the attribute
		node = byId(node);
		var lc = name.toLowerCase(),
			propName = _propNames[lc] || name;
		if((propName in node) && propName != "href"){
			// node's property
			return node[propName];	// Anything
		}
		// node's attribute
		var attrName = _attrNames[lc] || name;
		return _hasAttr(node, attrName) ? node.getAttribute(attrName) : null; // Anything
	};

	moor.create = function(tag, attrs, refNode, pos){

		var doc = d.doc;
		if(refNode){
			refNode = byId(refNode);
			doc = refNode.ownerDocument;
		}
		if(typeof tag == "string"){ // inline'd type check
			tag = doc.createElement(tag);
		}
		if(attrs){ d.attr(tag, attrs); }
		if(refNode){ d.place(tag, refNode, pos); }
		return tag; // DomNode
	};

	/*=====
	moor.empty = function(node){
			//	summary:
			//		safely removes all children of the node.
			//	node: DOMNode|String
			//		a reference to a DOM node or an id.
			//	example:
			//	Destroy node's children byId:
			//	|	moor.empty("someId");
			//
			//	example:
			//	Destroy all nodes' children in a list by reference:
			//	|	moor.query(".someNode").forEach(moor.empty);
	}
	=====*/

	d.empty =
				d.isIE ?  function(node){
			node = byId(node);
			for(var c; c = node.lastChild;){ // intentional assignment
				d.destroy(c);
			}
		} :
				function(node){
			byId(node).innerHTML = "";
		};

	/*=====
	moor._toDom = function(frag, doc){
			//	summary:
			//		instantiates an HTML fragment returning the corresponding DOM.
			//	frag: String
			//		the HTML fragment
			//	doc: DocumentNode?
			//		optional document to use when creating DOM nodes, defaults to
			//		moor.doc if not specified.
			//	returns: DocumentFragment
			//
			//	example:
			//	Create a table row:
			//	|	var tr = moor._toDom("<tr><td>First!</td></tr>");
	}
	=====*/

	// support stuff for moor._toDom
	var tagWrap = {
			option: ["select"],
			tbody: ["table"],
			thead: ["table"],
			tfoot: ["table"],
			tr: ["table", "tbody"],
			td: ["table", "tbody", "tr"],
			th: ["table", "thead", "tr"],
			legend: ["fieldset"],
			caption: ["table"],
			colgroup: ["table"],
			col: ["table", "colgroup"],
			li: ["ul"]
		},
		reTag = /<\s*([\w\:]+)/,
		masterNode = {}, masterNum = 0,
		masterName = "__" + d._scopeName + "ToDomId";

	// generate start/end tag strings to use
	// for the injection for each special tag wrap case.
	for(var param in tagWrap){
		if(tagWrap.hasOwnProperty(param)){
			var tw = tagWrap[param];
			tw.pre  = param == "option" ? '<select multiple="multiple">' : "<" + tw.join("><") + ">";
			tw.post = "</" + tw.reverse().join("></") + ">";
			// the last line is destructive: it reverses the array,
			// but we don't care at this point
		}
	}

	d._toDom = function(frag, doc){
		//	summary:
		// 		converts HTML string into DOM nodes.

		doc = doc || d.doc;
		var masterId = doc[masterName];
		if(!masterId){
			doc[masterName] = masterId = ++masterNum + "";
			masterNode[masterId] = doc.createElement("div");
		}

		// make sure the frag is a string.
		frag += "";

		// find the starting tag, and get node wrapper
		var match = frag.match(reTag),
			tag = match ? match[1].toLowerCase() : "",
			master = masterNode[masterId],
			wrap, i, fc, df;
		if(match && tagWrap[tag]){
			wrap = tagWrap[tag];
			master.innerHTML = wrap.pre + frag + wrap.post;
			for(i = wrap.length; i; --i){
				master = master.firstChild;
			}
		}else{
			master.innerHTML = frag;
		}

		// one node shortcut => return the node itself
		if(master.childNodes.length == 1){
			return master.removeChild(master.firstChild); // DOMNode
		}

		// return multiple nodes as a document fragment
		df = doc.createDocumentFragment();
		while(fc = master.firstChild){ // intentional assignment
			df.appendChild(fc);
		}
		return df; // DOMNode
	};

	// =============================
	// (CSS) Class Functions
	// =============================
	var _className = "className";

	moor.hasClass = function(/*DomNode|String*/node, /*String*/classStr){
		//	summary:
		//		Returns whether or not the specified classes are a portion of the
		//		class list currently applied to the node.
		//
		//	node:
		//		String ID or DomNode reference to check the class for.
		//
		//	classStr:
		//		A string class name to look for.
		//
		//	example:
		//	Do something if a node with id="someNode" has class="aSillyClassName" present
		//	|	if(moor.hasClass("someNode","aSillyClassName")){ ... }

		return ((" "+ byId(node)[_className] +" ").indexOf(" " + classStr + " ") >= 0);  // Boolean
	};

	var spaces = /\s+/, a1 = [""],
		fakeNode = {},
		str2array = function(s){
			if(typeof s == "string" || s instanceof String){
				if(s.indexOf(" ") < 0){
					a1[0] = s;
					return a1;
				}else{
					return s.split(spaces);
				}
			}
			// assumed to be an array
			return s || "";
		};

	moor.addClass = function(/*DomNode|String*/node, /*String|Array*/classStr){


		node = byId(node);
		classStr = str2array(classStr);
		var cls = node[_className], oldLen;
		cls = cls ? " " + cls + " " : " ";
		oldLen = cls.length;
		for(var i = 0, len = classStr.length, c; i < len; ++i){
			c = classStr[i];
			if(c && cls.indexOf(" " + c + " ") < 0){
				cls += c + " ";
			}
		}
		if(oldLen < cls.length){
			node[_className] = cls.substr(1, cls.length - 2);
		}
	};

	moor.removeClass = function(/*DomNode|String*/node, /*String|Array?*/classStr){


		node = byId(node);
		var cls;
		if(classStr !== undefined){
			classStr = str2array(classStr);
			cls = " " + node[_className] + " ";
			for(var i = 0, len = classStr.length; i < len; ++i){
				cls = cls.replace(" " + classStr[i] + " ", " ");
			}
			cls = d.trim(cls);
		}else{
			cls = "";
		}
		if(node[_className] != cls){ node[_className] = cls; }
	};

	moor.replaceClass = function(/*DomNode|String*/node, /*String|Array*/addClassStr, /*String|Array?*/removeClassStr){


        node = byId(node);
		fakeNode.className = node.className;
		moor.removeClass(fakeNode, removeClassStr);
		moor.addClass(fakeNode, addClassStr);
		if(node.className !== fakeNode.className){
			node.className = fakeNode.className;
		}
	};

	moor.toggleClass = function(/*DomNode|String*/node, /*String|Array*/classStr, /*Boolean?*/condition){
		//	summary:
		//		Adds a class to node if not present, or removes if present.
		//		Pass a boolean condition if you want to explicitly add or remove.
		//	condition:
		//		If passed, true means to add the class, false means to remove.
		//
		// example:
		//	|	moor.toggleClass("someNode", "hovered");
		//
		// example:
		//	Forcefully add a class
		//	|	moor.toggleClass("someNode", "hovered", true);
		//
		// example:
		//	Available in `moor.NodeList()` for multiple toggles
		//	|	moor.query(".toggleMe").toggleClass("toggleMe");

		if(condition === undefined){
			condition = !d.hasClass(node, classStr);
		}
		d[condition ? "addClass" : "removeClass"](node, classStr);
	};

})();

}

if(!moor._hasResource["moor._base.NodeList"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.NodeList"] = true;
moor.provide("moor._base.NodeList");






(function(){

	var d = moor;

	var ap = Array.prototype, aps = ap.slice, apc = ap.concat;

	var tnl = function(/*Array*/ a, /*moor.NodeList?*/ parent, /*Function?*/ NodeListCtor){

		if(!a.sort){
			// make sure it's a real array before we pass it on to be wrapped
			a = aps.call(a, 0);
		}
		var ctor = NodeListCtor || this._NodeListCtor || d._NodeListCtor;
		a.constructor = ctor;
		moor._mixin(a, ctor.prototype);
		a._NodeListCtor = ctor;
		return parent ? a._stash(parent) : a;
	};

	var loopBody = function(f, a, o){
		a = [0].concat(aps.call(a, 0));
		o = o || d.global;
		return function(node){
			a[0] = node;
			return f.apply(o, a);
		};
	};

	// adapters

	var adaptAsForEach = function(f, o){
		//	summary:
		//		adapts a single node function to be used in the forEach-type
		//		actions. The initial object is returned from the specialized
		//		function.
		//	f: Function
		//		a function to adapt
		//	o: Object?
		//		an optional context for f
		return function(){
			this.forEach(loopBody(f, arguments, o));
			return this;	// Object
		};
	};

	var adaptAsMap = function(f, o){
		//	summary:
		//		adapts a single node function to be used in the map-type
		//		actions. The return is a new array of values, as via `moor.map`
		//	f: Function
		//		a function to adapt
		//	o: Object?
		//		an optional context for f
		return function(){
			return this.map(loopBody(f, arguments, o));
		};
	};

	var adaptAsFilter = function(f, o){
		//	summary:
		//		adapts a single node function to be used in the filter-type actions
		//	f: Function
		//		a function to adapt
		//	o: Object?
		//		an optional context for f
		return function(){
			return this.filter(loopBody(f, arguments, o));
		};
	};

	var adaptWithCondition = function(f, g, o){
		//	summary:
		//		adapts a single node function to be used in the map-type
		//		actions, behaves like forEach() or map() depending on arguments
		//	f: Function
		//		a function to adapt
		//	g: Function
		//		a condition function, if true runs as map(), otherwise runs as forEach()
		//	o: Object?
		//		an optional context for f and g
		return function(){
			var a = arguments, body = loopBody(f, a, o);
			if(g.call(o || d.global, a)){
				return this.map(body);	// self
			}
			this.forEach(body);
			return this;	// self
		};
	};

	var magicGuard = function(a){
		//	summary:
		//		the guard function for moor.attr() and moor.style()
		return a.length == 1 && (typeof a[0] == "string"); // inline'd type check
	};

	var orphan = function(node){
		//	summary:
		//		function to orphan nodes
		var p = node.parentNode;
		if(p){
			p.removeChild(node);
		}
	};
	// FIXME: should we move orphan() to moor.html?

	moor.NodeList = function(){
	

		return tnl(Array.apply(null, arguments));
	};

	//Allow things that new up a NodeList to use a delegated or alternate NodeList implementation.
	d._NodeListCtor = d.NodeList;

	var nl = d.NodeList, nlp = nl.prototype;

	// expose adapters and the wrapper as private functions

	nl._wrap = nlp._wrap = tnl;
	nl._adaptAsMap = adaptAsMap;
	nl._adaptAsForEach = adaptAsForEach;
	nl._adaptAsFilter  = adaptAsFilter;
	nl._adaptWithCondition = adaptWithCondition;

	// mass assignment

	// add array redirectors
	d.forEach(["slice", "splice"], function(name){
		var f = ap[name];
		//Use a copy of the this array via this.slice() to allow .end() to work right in the splice case.
		// CANNOT apply ._stash()/end() to splice since it currently modifies
		// the existing this array -- it would break backward compatibility if we copy the array before
		// the splice so that we can use .end(). So only doing the stash option to this._wrap for slice.
		nlp[name] = function(){ return this._wrap(f.apply(this, arguments), name == "slice" ? this : null); };
	});
	// concat should be here but some browsers with native NodeList have problems with it

	// add array.js redirectors
	d.forEach(["indexOf", "lastIndexOf", "every", "some"], function(name){
		var f = d[name];
		nlp[name] = function(){ return f.apply(d, [this].concat(aps.call(arguments, 0))); };
	});

	// add conditional methods
	d.forEach(["attr", "style"], function(name){
		nlp[name] = adaptWithCondition(d[name], magicGuard);
	});

	// add forEach actions
	d.forEach(["connect", "addClass", "removeClass", "replaceClass", "toggleClass", "empty", "removeAttr"], function(name){
		nlp[name] = adaptAsForEach(d[name]);
	});

	moor.extend(moor.NodeList, {
		_normalize: function(/*String||Element||Object||NodeList*/content, /*DOMNode?*/refNode){

			var parse = content.parse === true ? true : false;

			//Do we have an object that needs to be run through a template?
			if(typeof content.template == "string"){
				var templateFunc = content.templateFunc || (moor.string && moor.string.substitute);
				content = templateFunc ? templateFunc(content.template, content) : content;
			}

			var type = (typeof content);
			if(type == "string" || type == "number"){
				content = moor._toDom(content, (refNode && refNode.ownerDocument));
				if(content.nodeType == 11){
					//DocumentFragment. It cannot handle cloneNode calls, so pull out the children.
					content = moor._toArray(content.childNodes);
				}else{
					content = [content];
				}
			}else if(!moor.isArrayLike(content)){
				content = [content];
			}else if(!moor.isArray(content)){
				//To get to this point, content is array-like, but
				//not an array, which likely means a DOM NodeList. Convert it now.
				content = moor._toArray(content);
			}

			//Pass around the parse info
			if(parse){
				content._runParse = true;
			}
			return content; //Array
		},

		_cloneNode: function(/*DOMNode*/ node){
			// summary:
			// 		private utility to clone a node. Not very interesting in the vanilla
			// 		moor.NodeList case, but delegates could do interesting things like
			// 		clone event handlers if that is derivable from the node.
			return node.cloneNode(true);
		},

		_place: function(/*Array*/ary, /*DOMNode*/refNode, /*String*/position, /*Boolean*/useClone){
			// summary:
			// 		private utility to handle placing an array of nodes relative to another node.
			// description:
			// 		Allows for cloning the nodes in the array, and for
			// 		optionally parsing widgets, if ary._runParse is true.

			//Avoid a disallowed operation if trying to do an innerHTML on a non-element node.
			if(refNode.nodeType != 1 && position == "only"){
				return;
			}
			var rNode = refNode, tempNode;

			//Always cycle backwards in case the array is really a
			//DOM NodeList and the DOM operations take it out of the live collection.
			var length = ary.length;
			for(var i = length - 1; i >= 0; i--){
				var node = (useClone ? this._cloneNode(ary[i]) : ary[i]);

				//If need widget parsing, use a temp node, instead of waiting after inserting into
				//real DOM because we need to start widget parsing at one node up from current node,
				//which could cause some already parsed widgets to be parsed again.
				if(ary._runParse && moor.parser && moor.parser.parse){
					if(!tempNode){
						tempNode = rNode.ownerDocument.createElement("div");
					}
					tempNode.appendChild(node);
					moor.parser.parse(tempNode);
					node = tempNode.firstChild;
					while(tempNode.firstChild){
						tempNode.removeChild(tempNode.firstChild);
					}
				}

				if(i == length - 1){
					moor.place(node, rNode, position);
				}else{
					rNode.parentNode.insertBefore(node, rNode);
				}
				rNode = node;
			}
		},

		_stash: function(parent){
			this._parent = parent;
			return this; //moor.NodeList
		},

		end: function(){
			if(this._parent){
				return this._parent;
			}else{
				//Just return empty list.
				return new this._NodeListCtor();
			}
		},

		concat: function(item){
	

			var t = d.isArray(this) ? this : aps.call(this, 0),
				m = d.map(arguments, function(a){
					return a && !d.isArray(a) &&
						(typeof NodeList != "undefined" && a.constructor === NodeList || a.constructor === this._NodeListCtor) ?
							aps.call(a, 0) : a;
				});
			return this._wrap(apc.apply(t, m), this);	// moor.NodeList
		},

		map: function(/*Function*/ func, /*Function?*/ obj){
			//	summary:
			//		see moor.map(). The primary difference is that the acted-on
			//		array is implicitly this NodeList and the return is a
			//		moor.NodeList (a subclass of Array)
			///return d.map(this, func, obj, d.NodeList); // moor.NodeList
			return this._wrap(d.map(this, func, obj), this); // moor.NodeList
		},

		forEach: function(callback, thisObj){
			//	summary:
			//		see `moor.forEach()`. The primary difference is that the acted-on
			//		array is implicitly this NodeList. If you want the option to break out
			//		of the forEach loop, use every() or some() instead.
			d.forEach(this, callback, thisObj);
			// non-standard return to allow easier chaining
			return this; // moor.NodeList
		},

		// useful html methods
		coords:	adaptAsMap(d.coords),
		position: adaptAsMap(d.position),

		// FIXME: connectPublisher()? connectRunOnce()?

		/*
		destroy: function(){
			//	summary:
			//		destroys every item in 	the list.
			this.forEach(d.destroy);
			// FIXME: should we be checking for and/or disposing of widgets below these nodes?
		},
		*/

		place: function(/*String||Node*/ queryOrNode, /*String*/ position){
			var item = d.query(queryOrNode)[0];
			return this.forEach(function(node){ d.place(node, item, position); }); // moor.NodeList
		},

		orphan: function(/*String?*/ filter){
			//	summary:
			//		removes elements in this list that match the filter
			//		from their parents and returns them as a new NodeList.
			//	filter:
			//		CSS selector like ".foo" or "div > span"
			//	returns:
			//		`moor.NodeList` containing the orphaned elements
			return (filter ? d._filterQueryResult(this, filter) : this).forEach(orphan); // moor.NodeList
		},

		adopt: function(/*String||Array||DomNode*/ queryOrListOrNode, /*String?*/ position){
			return d.query(queryOrListOrNode).place(this[0], position)._stash(this);	// moor.NodeList
		},

		// FIXME: do we need this?
		query: function(/*String*/ queryStr){


			// FIXME: probably slow
			if(!queryStr){ return this; }
			var ret = this.map(function(node){
				// FIXME: why would we ever get undefined here?
				return d.query(queryStr, node).filter(function(subNode){ return subNode !== undefined; });
			});
			return this._wrap(apc.apply([], ret), this);	// moor.NodeList
		},

		filter: function(/*String|Function*/ filter){
			//	summary:
			// 		"masks" the built-in javascript filter() method (supported
			// 		in moor via `moor.filter`) to support passing a simple
			// 		string filter in addition to supporting filtering function
			// 		objects.
			//	filter:
			//		If a string, a CSS rule like ".thinger" or "div > span".
			//	example:
			//		"regular" JS filter syntax as exposed in moor.filter:
			//		|	moor.query("*").filter(function(item){
			//		|		// highlight every paragraph
			//		|		return (item.nodeName == "p");
			//		|	}).style("backgroundColor", "yellow");
			// example:
			//		the same filtering using a CSS selector
			//		|	moor.query("*").filter("p").styles("backgroundColor", "yellow");

			var a = arguments, items = this, start = 0;
			if(typeof filter == "string"){ // inline'd type check
				items = d._filterQueryResult(this, a[0]);
				if(a.length == 1){
					// if we only got a string query, pass back the filtered results
					return items._stash(this); // moor.NodeList
				}
				// if we got a callback, run it over the filtered items
				start = 1;
			}
			return this._wrap(d.filter(items, a[start], a[start + 1]), this);	// moor.NodeList
		},

		/*
		// FIXME: should this be "copyTo" and include parenting info?
		clone: function(){
			// summary:
			//		creates node clones of each element of this list
			//		and returns a new list containing the clones
		},
		*/

		addContent: function(/*String||DomNode||Object||moor.NodeList*/ content, /*String||Integer?*/ position){
		
			content = this._normalize(content, this[0]);
			for(var i = 0, node; (node = this[i]); i++){
				this._place(content, node, position, i > 0);
			}
			return this; //moor.NodeList
		},

		instantiate: function(/*String|Object*/ declaredClass, /*Object?*/ properties){
			//	summary:
			//		Create a new instance of a specified class, using the
			//		specified properties and each node in the nodeList as a
			//		srcNodeRef.
			//	example:
			//		Grabs all buttons in the page and converts them to diji.form.Buttons.
			//	|	var buttons = moor.query("button").instantiate("dijit.form.Button", {showLabel: true});
			var c = d.isFunction(declaredClass) ? declaredClass : d.getObject(declaredClass);
			properties = properties || {};
			return this.forEach(function(node){
				new c(properties, node);
			});	// moor.NodeList
		},

		at: function(/*===== index =====*/){
			var t = new this._NodeListCtor();
			d.forEach(arguments, function(i){
				if(i < 0){ i = this.length + i }
				if(this[i]){ t.push(this[i]); }
			}, this);
			return t._stash(this); // moor.NodeList
		}

	});

	nl.events = [
		// summary:
		//		list of all DOM events used in NodeList
		"blur", "focus", "change", "click", "error", "keydown", "keypress",
		"keyup", "load", "mousedown", "mouseenter", "mouseleave", "mousemove",
		"mouseout", "mouseover", "mouseup", "submit"
	];
	
	// FIXME: pseudo-doc the above automatically generated on-event functions

	// syntactic sugar for DOM events
	d.forEach(nl.events, function(evt){
			var _oe = "on" + evt;
			nlp[_oe] = function(a, b){
				return this.connect(_oe, a, b);
			};
				// FIXME: should these events trigger publishes?
		}
	);

})();

}

if(!moor._hasResource["moor._base.query"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.query"] = true;
(function(){


var defineQuery= function(d){
	// define everything in a closure for compressability reasons. "d" is an
	// alias to "moor" (or the toolkit alias object, e.g., "acme").

	////////////////////////////////////////////////////////////////////////
	// Toolkit aliases
	////////////////////////////////////////////////////////////////////////

	// if you are extracting moor.query for use in your own system, you will
	// need to provide these methods and properties. No other porting should be
	// necessary, save for configuring the system to use a class other than
	// moor.NodeList as the return instance instantiator
	var trim = 			d.trim;
	var each = 			d.forEach;
	// 					d.isIE; // float
	// 					d.isSafari; // float
	// 					d.isOpera; // float
	// 					d.isWebKit; // float
	// 					d.doc ; // document element
	var qlc = (d._NodeListCtor = 		d.NodeList);

	var getDoc = function(){ return d.doc; };
	// NOTE(alex): the spec is idiotic. CSS queries should ALWAYS be case-sensitive, but nooooooo
	var cssCaseBug = ((d.isWebKit||d.isMozilla) && ((getDoc().compatMode) == "BackCompat"));

	////////////////////////////////////////////////////////////////////////
	// Global utilities
	////////////////////////////////////////////////////////////////////////


	// on browsers that support the "children" collection we can avoid a lot of
	// iteration on chaff (non-element) nodes.
	// why.
	var childNodesName = !!getDoc().firstChild["children"] ? "children" : "childNodes";

	var specials = ">~+";

	// global thunk to determine whether we should treat the current query as
	// case sensitive or not. This switch is flipped by the query evaluator
	// based on the document passed as the context to search.
	var caseSensitive = false;

	// how high?
	var yesman = function(){ return true; };

	////////////////////////////////////////////////////////////////////////
	// Tokenizer
	////////////////////////////////////////////////////////////////////////

	var getQueryParts = function(query){
		
		if(specials.indexOf(query.slice(-1)) >= 0){
			// if we end with a ">", "+", or "~", that means we're implicitly
			// searching all children, so make it explicit
			query += " * "
		}else{
			// if you have not provided a terminator, one will be provided for
			// you...
			query += " ";
		}

		var ts = function(/*Integer*/ s, /*Integer*/ e){
			// trim and slice.

			// take an index to start a string slice from and an end position
			// and return a trimmed copy of that sub-string
			return trim(query.slice(s, e));
		}

		// the overall data graph of the full query, as represented by queryPart objects
		var queryParts = [];


		// state keeping vars
		var inBrackets = -1, inParens = -1, inMatchFor = -1,
			inPseudo = -1, inClass = -1, inId = -1, inTag = -1,
			lc = "", cc = "", pStart;

		// iteration vars
		var x = 0, // index in the query
			ql = query.length,
			currentPart = null, // data structure representing the entire clause
			_cp = null; // the current pseudo or attr matcher

		var endTag = function(){
			// called when the tokenizer hits the end of a particular tag name.
			// Re-sets state variables for tag matching and sets up the matcher
			// to handle the next type of token (tag or operator).
			if(inTag >= 0){
				var tv = (inTag == x) ? null : ts(inTag, x); // .toLowerCase();
				currentPart[ (specials.indexOf(tv) < 0) ? "tag" : "oper" ] = tv;
				inTag = -1;
			}
		}

		var endId = function(){
			// called when the tokenizer might be at the end of an ID portion of a match
			if(inId >= 0){
				currentPart.id = ts(inId, x).replace(/\\/g, "");
				inId = -1;
			}
		}

		var endClass = function(){
			// called when the tokenizer might be at the end of a class name
			// match. CSS allows for multiple classes, so we augment the
			// current item with another class in its list
			if(inClass >= 0){
				currentPart.classes.push(ts(inClass+1, x).replace(/\\/g, ""));
				inClass = -1;
			}
		}

		var endAll = function(){
			// at the end of a simple fragment, so wall off the matches
			endId(); endTag(); endClass();
		}

		var endPart = function(){
			endAll();
			if(inPseudo >= 0){
				currentPart.pseudos.push({ name: ts(inPseudo+1, x) });
			}
			// hint to the selector engine to tell it whether or not it
			// needs to do any iteration. Many simple selectors don't, and
			// we can avoid significant construction-time work by advising
			// the system to skip them
			currentPart.loops = (
					currentPart.pseudos.length ||
					currentPart.attrs.length ||
					currentPart.classes.length	);

			currentPart.oquery = currentPart.query = ts(pStart, x); // save the full expression as a string


			// otag/tag are hints to suggest to the system whether or not
			// it's an operator or a tag. We save a copy of otag since the
			// tag name is cast to upper-case in regular HTML matches. The
			// system has a global switch to figure out if the current
			// expression needs to be case sensitive or not and it will use
			// otag or tag accordingly
			currentPart.otag = currentPart.tag = (currentPart["oper"]) ? null : (currentPart.tag || "*");

			if(currentPart.tag){
				// if we're in a case-insensitive HTML doc, we likely want
				// the toUpperCase when matching on element.tagName. If we
				// do it here, we can skip the string op per node
				// comparison
				currentPart.tag = currentPart.tag.toUpperCase();
			}

			// add the part to the list
			if(queryParts.length && (queryParts[queryParts.length-1].oper)){
				// operators are always infix, so we remove them from the
				// list and attach them to the next match. The evaluator is
				// responsible for sorting out how to handle them.
				currentPart.infixOper = queryParts.pop();
				currentPart.query = currentPart.infixOper.query + " " + currentPart.query;
				/*
				console.debug(	"swapping out the infix",
								currentPart.infixOper,
								"and attaching it to",
								currentPart);
				*/
			}
			queryParts.push(currentPart);

			currentPart = null;
		}

		// iterate over the query, character by character, building up a
		// list of query part objects
		for(; lc=cc, cc=query.charAt(x), x < ql; x++){
			//		cc: the current character in the match
			//		lc: the last character (if any)

			// someone is trying to escape something, so don't try to match any
			// fragments. We assume we're inside a literal.
			if(lc == "\\"){ continue; }
			if(!currentPart){ // a part was just ended or none has yet been created
				// NOTE: I hate all this alloc, but it's shorter than writing tons of if's
				pStart = x;
				currentPart = {
					query: null, // the full text of the part's rule
					pseudos: [], // CSS supports multiple pseud-class matches in a single rule
					attrs: [], 	// CSS supports multi-attribute match, so we need an array
					classes: [], // class matches may be additive, e.g.: .thinger.blah.howdy
					tag: null, 	// only one tag...
					oper: null, // ...or operator per component. Note that these wind up being exclusive.
					id: null, 	// the id component of a rule
					getTag: function(){
						return (caseSensitive) ? this.otag : this.tag;
					}
				};

				// if we don't have a part, we assume we're going to start at
				// the beginning of a match, which should be a tag name. This
				// might fault a little later on, but we detect that and this
				// iteration will still be fine.
				inTag = x;
			}

			if(inBrackets >= 0){
				// look for a the close first
				if(cc == "]"){ // if we're in a [...] clause and we end, do assignment
					if(!_cp.attr){
						// no attribute match was previously begun, so we
						// assume this is an attribute existence match in the
						// form of [someAttributeName]
						_cp.attr = ts(inBrackets+1, x);
					}else{
						// we had an attribute already, so we know that we're
						// matching some sort of value, as in [attrName=howdy]
						_cp.matchFor = ts((inMatchFor||inBrackets+1), x);
					}
					var cmf = _cp.matchFor;
					if(cmf){
						// try to strip quotes from the matchFor value. We want
						// [attrName=howdy] to match the same
						//	as [attrName = 'howdy' ]
						if(	(cmf.charAt(0) == '"') || (cmf.charAt(0)  == "'") ){
							_cp.matchFor = cmf.slice(1, -1);
						}
					}
					// end the attribute by adding it to the list of attributes.
					currentPart.attrs.push(_cp);
					_cp = null; // necessary?
					inBrackets = inMatchFor = -1;
				}else if(cc == "="){
					// if the last char was an operator prefix, make sure we
					// record it along with the "=" operator.
					var addToCc = ("|~^$*".indexOf(lc) >=0 ) ? lc : "";
					_cp.type = addToCc+cc;
					_cp.attr = ts(inBrackets+1, x-addToCc.length);
					inMatchFor = x+1;
				}
				// now look for other clause parts
			}else if(inParens >= 0){
				// if we're in a parenthetical expression, we need to figure
				// out if it's attached to a pseudo-selector rule like
				// :nth-child(1)
				if(cc == ")"){
					if(inPseudo >= 0){
						_cp.value = ts(inParens+1, x);
					}
					inPseudo = inParens = -1;
				}
			}else if(cc == "#"){
				// start of an ID match
				endAll();
				inId = x+1;
			}else if(cc == "."){
				// start of a class match
				endAll();
				inClass = x;
			}else if(cc == ":"){
				// start of a pseudo-selector match
				endAll();
				inPseudo = x;
			}else if(cc == "["){
				// start of an attribute match.
				endAll();
				inBrackets = x;
				// provide a new structure for the attribute match to fill-in
				_cp = {
					/*=====
					attr: null, type: null, matchFor: null
					=====*/
				};
			}else if(cc == "("){
				// we really only care if we've entered a parenthetical
				// expression if we're already inside a pseudo-selector match
				if(inPseudo >= 0){
					// provide a new structure for the pseudo match to fill-in
					_cp = {
						name: ts(inPseudo+1, x),
						value: null
					}
					currentPart.pseudos.push(_cp);
				}
				inParens = x;
			}else if(
				(cc == " ") &&
				// if it's a space char and the last char is too, consume the
				// current one without doing more work
				(lc != cc)
			){
				endPart();
			}
		}
		return queryParts;
	};
	

	////////////////////////////////////////////////////////////////////////
	// DOM query infrastructure
	////////////////////////////////////////////////////////////////////////

	var agree = function(first, second){
		// the basic building block of the yes/no chaining system. agree(f1,
		// f2) generates a new function which returns the boolean results of
		// both of the passed functions to a single logical-anded result. If
		// either are not passed, the other is used exclusively.
		if(!first){ return second; }
		if(!second){ return first; }

		return function(){
			return first.apply(window, arguments) && second.apply(window, arguments);
		}
	};

	var getArr = function(i, arr){
		// helps us avoid array alloc when we don't need it
		var r = arr||[]; // FIXME: should this be 'new d._NodeListCtor()' ?
		if(i){ r.push(i); }
		return r;
	};

	var _isElement = function(n){ return (1 == n.nodeType); };

	// FIXME: need to coalesce _getAttr with defaultGetter
	var blank = "";
	var _getAttr = function(elem, attr){
		if(!elem){ return blank; }
		if(attr == "class"){
			return elem.className || blank;
		}
		if(attr == "for"){
			return elem.htmlFor || blank;
		}
		if(attr == "style"){
			return elem.style.cssText || blank;
		}
		return (caseSensitive ? elem.getAttribute(attr) : elem.getAttribute(attr, 2)) || blank;
	};

	var attrs = {
		"*=": function(attr, value){
			return function(elem){
				// E[foo*="bar"]
				//		an E element whose "foo" attribute value contains
				//		the substring "bar"
				return (_getAttr(elem, attr).indexOf(value)>=0);
			}
		},
		"^=": function(attr, value){
			// E[foo^="bar"]
			//		an E element whose "foo" attribute value begins exactly
			//		with the string "bar"
			return function(elem){
				return (_getAttr(elem, attr).indexOf(value)==0);
			}
		},
		"$=": function(attr, value){
			// E[foo$="bar"]
			//		an E element whose "foo" attribute value ends exactly
			//		with the string "bar"
			var tval = " "+value;
			return function(elem){
				var ea = " "+_getAttr(elem, attr);
				return (ea.lastIndexOf(value)==(ea.length-value.length));
			}
		},
		"~=": function(attr, value){
			// E[foo~="bar"]
			//		an E element whose "foo" attribute value is a list of
			//		space-separated values, one of which is exactly equal
			//		to "bar"

			// return "[contains(concat(' ',@"+attr+",' '), ' "+ value +" ')]";
			var tval = " "+value+" ";
			return function(elem){
				var ea = " "+_getAttr(elem, attr)+" ";
				return (ea.indexOf(tval)>=0);
			}
		},
		"|=": function(attr, value){
			// E[hreflang|="en"]
			//		an E element whose "hreflang" attribute has a
			//		hyphen-separated list of values beginning (from the
			//		left) with "en"
			var valueDash = " "+value+"-";
			return function(elem){
				var ea = " "+_getAttr(elem, attr);
				return (
					(ea == value) ||
					(ea.indexOf(valueDash)==0)
				);
			}
		},
		"=": function(attr, value){
			return function(elem){
				return (_getAttr(elem, attr) == value);
			}
		}
	};

	// avoid testing for node type if we can. Defining this in the negative
	// here to avoid negation in the fast path.
	var _noNES = (typeof getDoc().firstChild.nextElementSibling == "undefined");
	var _ns = !_noNES ? "nextElementSibling" : "nextSibling";
	var _ps = !_noNES ? "previousElementSibling" : "previousSibling";
	var _simpleNodeTest = (_noNES ? _isElement : yesman);

	var _lookLeft = function(node){
		// look left
		while(node = node[_ps]){
			if(_simpleNodeTest(node)){ return false; }
		}
		return true;
	};

	var _lookRight = function(node){
		// look right
		while(node = node[_ns]){
			if(_simpleNodeTest(node)){ return false; }
		}
		return true;
	};

	var getNodeIndex = function(node){
		var root = node.parentNode;
		var i = 0,
			tret = root[childNodesName],
			ci = (node["_i"]||-1),
			cl = (root["_l"]||-1);

		if(!tret){ return -1; }
		var l = tret.length;

		// we calculate the parent length as a cheap way to invalidate the
		// cache. It's not 100% accurate, but it's much more honest than what
		// other libraries do
		if( cl == l && ci >= 0 && cl >= 0 ){
			// if it's legit, tag and release
			return ci;
		}

		// else re-key things
		root["_l"] = l;
		ci = -1;
		for(var te = root["firstElementChild"]||root["firstChild"]; te; te = te[_ns]){
			if(_simpleNodeTest(te)){
				te["_i"] = ++i;
				if(node === te){
					// NOTE:
					// 	shortcutting the return at this step in indexing works
					// 	very well for benchmarking but we avoid it here since
					// 	it leads to potential O(n^2) behavior in sequential
					// 	getNodexIndex operations on a previously un-indexed
					// 	parent. We may revisit this at a later time, but for
					// 	now we just want to get the right answer more often
					// 	than not.
					ci = i;
				}
			}
		}
		return ci;
	};

	var isEven = function(elem){
		return !((getNodeIndex(elem)) % 2);
	};

	var isOdd = function(elem){
		return ((getNodeIndex(elem)) % 2);
	};

	var pseudos = {
		"checked": function(name, condition){
			return function(elem){
				return !!("checked" in elem ? elem.checked : elem.selected);
			}
		},
		"first-child": function(){ return _lookLeft; },
		"last-child": function(){ return _lookRight; },
		"only-child": function(name, condition){
			return function(node){
				if(!_lookLeft(node)){ return false; }
				if(!_lookRight(node)){ return false; }
				return true;
			};
		},
		"empty": function(name, condition){
			return function(elem){
				// DomQuery and jQuery get this wrong, oddly enough.
				// The CSS 3 selectors spec is pretty explicit about it, too.
				var cn = elem.childNodes;
				var cnl = elem.childNodes.length;
				// if(!cnl){ return true; }
				for(var x=cnl-1; x >= 0; x--){
					var nt = cn[x].nodeType;
					if((nt === 1)||(nt == 3)){ return false; }
				}
				return true;
			}
		},
		"contains": function(name, condition){
			var cz = condition.charAt(0);
			if( cz == '"' || cz == "'" ){ //remove quote
				condition = condition.slice(1, -1);
			}
			return function(elem){
				return (elem.innerHTML.indexOf(condition) >= 0);
			}
		},
		"not": function(name, condition){
			var p = getQueryParts(condition)[0];
			var ignores = { el: 1 };
			if(p.tag != "*"){
				ignores.tag = 1;
			}
			if(!p.classes.length){
				ignores.classes = 1;
			}
			var ntf = getSimpleFilterFunc(p, ignores);
			return function(elem){
				return (!ntf(elem));
			}
		},
		"nth-child": function(name, condition){
			var pi = parseInt;
			// avoid re-defining function objects if we can
			if(condition == "odd"){
				return isOdd;
			}else if(condition == "even"){
				return isEven;
			}
			// FIXME: can we shorten this?
			if(condition.indexOf("n") != -1){
				var tparts = condition.split("n", 2);
				var pred = tparts[0] ? ((tparts[0] == '-') ? -1 : pi(tparts[0])) : 1;
				var idx = tparts[1] ? pi(tparts[1]) : 0;
				var lb = 0, ub = -1;
				if(pred > 0){
					if(idx < 0){
						idx = (idx % pred) && (pred + (idx % pred));
					}else if(idx>0){
						if(idx >= pred){
							lb = idx - idx % pred;
						}
						idx = idx % pred;
					}
				}else if(pred<0){
					pred *= -1;
					// idx has to be greater than 0 when pred is negative;
					// shall we throw an error here?
					if(idx > 0){
						ub = idx;
						idx = idx % pred;
					}
				}
				if(pred > 0){
					return function(elem){
						var i = getNodeIndex(elem);
						return (i>=lb) && (ub<0 || i<=ub) && ((i % pred) == idx);
					}
				}else{
					condition = idx;
				}
			}
			var ncount = pi(condition);
			return function(elem){
				return (getNodeIndex(elem) == ncount);
			}
		}
	};

	var defaultGetter = (d.isIE < 9 || (moor.isIE && moor.isQuirks)) ? function(cond){
		var clc = cond.toLowerCase();
		if(clc == "class"){ cond = "className"; }
		return function(elem){
			return (caseSensitive ? elem.getAttribute(cond) : elem[cond]||elem[clc]);
		}
	} : function(cond){
		return function(elem){
			return (elem && elem.getAttribute && elem.hasAttribute(cond));
		}
	};

	var getSimpleFilterFunc = function(query, ignores){
		// generates a node tester function based on the passed query part. The
		// query part is one of the structures generated by the query parser
		// when it creates the query AST. The "ignores" object specifies which
		// (if any) tests to skip, allowing the system to avoid duplicating
		// work where it may have already been taken into account by other
		// factors such as how the nodes to test were fetched in the first
		// place
		if(!query){ return yesman; }
		ignores = ignores||{};

		var ff = null;

		if(!("el" in ignores)){
			ff = agree(ff, _isElement);
		}

		if(!("tag" in ignores)){
			if(query.tag != "*"){
				ff = agree(ff, function(elem){
					return (elem && (elem.tagName == query.getTag()));
				});
			}
		}

		if(!("classes" in ignores)){
			each(query.classes, function(cname, idx, arr){
				// get the class name
				/*
				var isWildcard = cname.charAt(cname.length-1) == "*";
				if(isWildcard){
					cname = cname.substr(0, cname.length-1);
				}
				// I dislike the regex thing, even if memoized in a cache, but it's VERY short
				var re = new RegExp("(?:^|\\s)" + cname + (isWildcard ? ".*" : "") + "(?:\\s|$)");
				*/
				var re = new RegExp("(?:^|\\s)" + cname + "(?:\\s|$)");
				ff = agree(ff, function(elem){
					return re.test(elem.className);
				});
				ff.count = idx;
			});
		}

		if(!("pseudos" in ignores)){
			each(query.pseudos, function(pseudo){
				var pn = pseudo.name;
				if(pseudos[pn]){
					ff = agree(ff, pseudos[pn](pn, pseudo.value));
				}
			});
		}

		if(!("attrs" in ignores)){
			each(query.attrs, function(attr){
				var matcher;
				var a = attr.attr;
				// type, attr, matchFor
				if(attr.type && attrs[attr.type]){
					matcher = attrs[attr.type](a, attr.matchFor);
				}else if(a.length){
					matcher = defaultGetter(a);
				}
				if(matcher){
					ff = agree(ff, matcher);
				}
			});
		}

		if(!("id" in ignores)){
			if(query.id){
				ff = agree(ff, function(elem){
					return (!!elem && (elem.id == query.id));
				});
			}
		}

		if(!ff){
			if(!("default" in ignores)){
				ff = yesman;
			}
		}
		return ff;
	};

	var _nextSibling = function(filterFunc){
		return function(node, ret, bag){
			while(node = node[_ns]){
				if(_noNES && (!_isElement(node))){ continue; }
				if(
					(!bag || _isUnique(node, bag)) &&
					filterFunc(node)
				){
					ret.push(node);
				}
				break;
			}
			return ret;
		}
	};

	var _nextSiblings = function(filterFunc){
		return function(root, ret, bag){
			var te = root[_ns];
			while(te){
				if(_simpleNodeTest(te)){
					if(bag && !_isUnique(te, bag)){
						break;
					}
					if(filterFunc(te)){
						ret.push(te);
					}
				}
				te = te[_ns];
			}
			return ret;
		}
	};

	// get an array of child *elements*, skipping text and comment nodes
	var _childElements = function(filterFunc){
		filterFunc = filterFunc||yesman;
		return function(root, ret, bag){
			// get an array of child elements, skipping text and comment nodes
			var te, x = 0, tret = root[childNodesName];
			while(te = tret[x++]){
				if(
					_simpleNodeTest(te) &&
					(!bag || _isUnique(te, bag)) &&
					(filterFunc(te, x))
				){
					ret.push(te);
				}
			}
			return ret;
		};
	};
	
	/*
	// thanks, Dean!
	var itemIsAfterRoot = d.isIE ? function(item, root){
		return (item.sourceIndex > root.sourceIndex);
	} : function(item, root){
		return (item.compareDocumentPosition(root) == 2);
	};
	*/

	// test to see if node is below root
	var _isDescendant = function(node, root){
		var pn = node.parentNode;
		while(pn){
			if(pn == root){
				break;
			}
			pn = pn.parentNode;
		}
		return !!pn;
	};

	var _getElementsFuncCache = {};

	var getElementsFunc = function(query){
		var retFunc = _getElementsFuncCache[query.query];
		// if we've got a cached dispatcher, just use that
		if(retFunc){ return retFunc; }
		// else, generate a new on

		var io = query.infixOper;
		var oper = (io ? io.oper : "");
		// the default filter func which tests for all conditions in the query
		// part. This is potentially inefficient, so some optimized paths may
		// re-define it to test fewer things.
		var filterFunc = getSimpleFilterFunc(query, { el: 1 });
		var qt = query.tag;
		var wildcardTag = ("*" == qt);
		var ecs = getDoc()["getElementsByClassName"];

		if(!oper){
			// if there's no infix operator, then it's a descendant query. ID
			// and "elements by class name" variants can be accelerated so we
			// call them out explicitly:
			if(query.id){
				// testing shows that the overhead of yesman() is acceptable
				// and can save us some bytes vs. re-defining the function
				// everywhere.
				filterFunc = (!query.loops && wildcardTag) ?
					yesman :
					getSimpleFilterFunc(query, { el: 1, id: 1 });

				retFunc = function(root, arr){
					var te = d.byId(query.id, (root.ownerDocument||root));
					if(!te || !filterFunc(te)){ return; }
					if(9 == root.nodeType){ // if root's a doc, we just return directly
						return getArr(te, arr);
					}else{ // otherwise check ancestry
						if(_isDescendant(te, root)){
							return getArr(te, arr);
						}
					}
				}
			}else if(
				ecs &&
				// isAlien check. Workaround for Prototype.js being totally evil/dumb.
				/\{\s*\[native code\]\s*\}/.test(String(ecs)) &&
				query.classes.length &&
				!cssCaseBug
			){
				// it's a class-based query and we've got a fast way to run it.

				// ignore class and ID filters since we will have handled both
				filterFunc = getSimpleFilterFunc(query, { el: 1, classes: 1, id: 1 });
				var classesString = query.classes.join(" ");
				retFunc = function(root, arr, bag){
					var ret = getArr(0, arr), te, x=0;
					var tret = root.getElementsByClassName(classesString);
					while((te = tret[x++])){
						if(filterFunc(te, root) && _isUnique(te, bag)){
							ret.push(te);
						}
					}
					return ret;
				};

			}else if(!wildcardTag && !query.loops){
				// it's tag only. Fast-path it.
				retFunc = function(root, arr, bag){
					var ret = getArr(0, arr), te, x=0;
					var tret = root.getElementsByTagName(query.getTag());
					while((te = tret[x++])){
						if(_isUnique(te, bag)){
							ret.push(te);
						}
					}
					return ret;
				};
			}else{
				// the common case:
				//		a descendant selector without a fast path. By now it's got
				//		to have a tag selector, even if it's just "*" so we query
				//		by that and filter
				filterFunc = getSimpleFilterFunc(query, { el: 1, tag: 1, id: 1 });
				retFunc = function(root, arr, bag){
					var ret = getArr(0, arr), te, x=0;
					// we use getTag() to avoid case sensitivity issues
					var tret = root.getElementsByTagName(query.getTag());
					while((te = tret[x++])){
						if(filterFunc(te, root) && _isUnique(te, bag)){
							ret.push(te);
						}
					}
					return ret;
				};
			}
		}else{
			// the query is scoped in some way. Instead of querying by tag we
			// use some other collection to find candidate nodes
			var skipFilters = { el: 1 };
			if(wildcardTag){
				skipFilters.tag = 1;
			}
			filterFunc = getSimpleFilterFunc(query, skipFilters);
			if("+" == oper){
				retFunc = _nextSibling(filterFunc);
			}else if("~" == oper){
				retFunc = _nextSiblings(filterFunc);
			}else if(">" == oper){
				retFunc = _childElements(filterFunc);
			}
		}
		// cache it and return
		return _getElementsFuncCache[query.query] = retFunc;
	};

	var filterDown = function(root, queryParts){
		// NOTE:
		//		this is the guts of the DOM query system. It takes a list of
		//		parsed query parts and a root and finds children which match
		//		the selector represented by the parts
		var candidates = getArr(root), qp, x, te, qpl = queryParts.length, bag, ret;

		for(var i = 0; i < qpl; i++){
			ret = [];
			qp = queryParts[i];
			x = candidates.length - 1;
			if(x > 0){
				// if we have more than one root at this level, provide a new
				// hash to use for checking group membership but tell the
				// system not to post-filter us since we will already have been
				// gauranteed to be unique
				bag = {};
				ret.nozip = true;
			}
			var gef = getElementsFunc(qp);
			for(var j = 0; (te = candidates[j]); j++){
				// for every root, get the elements that match the descendant
				// selector, adding them to the "ret" array and filtering them
				// via membership in this level's bag. If there are more query
				// parts, then this level's return will be used as the next
				// level's candidates
				gef(te, ret, bag);
			}
			if(!ret.length){ break; }
			candidates = ret;
		}
		return ret;
	};

	////////////////////////////////////////////////////////////////////////
	// the query runner
	////////////////////////////////////////////////////////////////////////

	// these are the primary caches for full-query results. The query
	// dispatcher functions are generated then stored here for hash lookup in
	// the future
	var _queryFuncCacheDOM = {},
		_queryFuncCacheQSA = {};

	// this is the second level of spliting, from full-length queries (e.g.,
	// "div.foo .bar") into simple query expressions (e.g., ["div.foo",
	// ".bar"])
	var getStepQueryFunc = function(query){
		var qparts = getQueryParts(trim(query));

		// if it's trivial, avoid iteration and zipping costs
		if(qparts.length == 1){
			// we optimize this case here to prevent dispatch further down the
			// chain, potentially slowing things down. We could more elegantly
			// handle this in filterDown(), but it's slower for simple things
			// that need to be fast (e.g., "#someId").
			var tef = getElementsFunc(qparts[0]);
			return function(root){
				var r = tef(root, new qlc());
				if(r){ r.nozip = true; }
				return r;
			}
		}

		// otherwise, break it up and return a runner that iterates over the parts recursively
		return function(root){
			return filterDown(root, qparts);
		}
	};

	var nua = navigator.userAgent;
	// some versions of Safari provided QSA, but it was buggy and crash-prone.
	// We need te detect the right "internal" webkit version to make this work.
	var wk = "WebKit/";
	var is525 = (
		d.isWebKit &&
		(nua.indexOf(wk) > 0) &&
		(parseFloat(nua.split(wk)[1]) > 528)
	);

	// IE QSA queries may incorrectly include comment nodes, so we throw the
	// zipping function into "remove" comments mode instead of the normal "skip
	// it" which every other QSA-clued browser enjoys
	var noZip = d.isIE ? "commentStrip" : "nozip";

	var qsa = "querySelectorAll";
	var qsaAvail = (
		!!getDoc()[qsa] &&
		// see #5832
		(!d.isSafari || (d.isSafari > 3.1) || is525 )
	);

	//Don't bother with n+3 type of matches, IE complains if we modify those.
	var infixSpaceRe = /n\+\d|([^ ])?([>~+])([^ =])?/g;
	var infixSpaceFunc = function(match, pre, ch, post) {
		return ch ? (pre ? pre + " " : "") + ch + (post ? " " + post : "") : /*n+3*/ match;
	};

	var getQueryFunc = function(query, forceDOM){
		//Normalize query. The CSS3 selectors spec allows for omitting spaces around
		//infix operators, >, ~ and +
		//Do the work here since detection for spaces is used as a simple "not use QSA"
		//test below.
		query = query.replace(infixSpaceRe, infixSpaceFunc);

		if(qsaAvail){
			// if we've got a cached variant and we think we can do it, run it!
			var qsaCached = _queryFuncCacheQSA[query];
			if(qsaCached && !forceDOM){ return qsaCached; }
		}

		// else if we've got a DOM cached variant, assume that we already know
		// all we need to and use it
		var domCached = _queryFuncCacheDOM[query];
		if(domCached){ return domCached; }

		// TODO:
		//		today we're caching DOM and QSA branches separately so we
		//		recalc useQSA every time. If we had a way to tag root+query
		//		efficiently, we'd be in good shape to do a global cache.

		var qcz = query.charAt(0);
		var nospace = (-1 == query.indexOf(" "));

		// byId searches are wicked fast compared to QSA, even when filtering
		// is required
		if( (query.indexOf("#") >= 0) && (nospace) ){
			forceDOM = true;
		}

		var useQSA = (
			qsaAvail && (!forceDOM) &&
			// as per CSS 3, we can't currently start w/ combinator:
			//		http://www.w3.org/TR/css3-selectors/#w3cselgrammar
			(specials.indexOf(qcz) == -1) &&
			// IE's QSA impl sucks on pseudos
			(!d.isIE || (query.indexOf(":") == -1)) &&

			(!(cssCaseBug && (query.indexOf(".") >= 0))) &&

			// FIXME:
			//		need to tighten up browser rules on ":contains" and "|=" to
			//		figure out which aren't good
			//		Latest webkit (around 531.21.8) does not seem to do well with :checked on option
			//		elements, even though according to spec, selected options should
			//		match :checked. So go nonQSA for it:
			//		http://bugs.moortoolkit.org/ticket/5179
			(query.indexOf(":contains") == -1) && (query.indexOf(":checked") == -1) &&
			(query.indexOf("|=") == -1) // some browsers don't grok it
		);

		// TODO:
		//		if we've got a descendant query (e.g., "> .thinger" instead of
		//		just ".thinger") in a QSA-able doc, but are passed a child as a
		//		root, it should be possible to give the item a synthetic ID and
		//		trivially rewrite the query to the form "#synid > .thinger" to
		//		use the QSA branch


		if(useQSA){
			var tq = (specials.indexOf(query.charAt(query.length-1)) >= 0) ?
						(query + " *") : query;
			return _queryFuncCacheQSA[query] = function(root){
				try{
					// the QSA system contains an egregious spec bug which
					// limits us, effectively, to only running QSA queries over
					// entire documents.  See:
					//		http://ejohn.org/blog/thoughts-on-queryselectorall/
					//	despite this, we can also handle QSA runs on simple
					//	selectors, but we don't want detection to be expensive
					//	so we're just checking for the presence of a space char
					//	right now. Not elegant, but it's cheaper than running
					//	the query parser when we might not need to
					if(!((9 == root.nodeType) || nospace)){ throw ""; }
					var r = root[qsa](tq);
					// skip expensive duplication checks and just wrap in a NodeList
					r[noZip] = true;
					return r;
				}catch(e){
					// else run the DOM branch on this query, ensuring that we
					// default that way in the future
					return getQueryFunc(query, true)(root);
				}
			}
		}else{
			// DOM branch
			var parts = query.split(/\s*,\s*/);
			return _queryFuncCacheDOM[query] = ((parts.length < 2) ?
				// if not a compound query (e.g., ".foo, .bar"), cache and return a dispatcher
				getStepQueryFunc(query) :
				// if it *is* a complex query, break it up into its
				// constituent parts and return a dispatcher that will
				// merge the parts when run
				function(root){
					var pindex = 0, // avoid array alloc for every invocation
						ret = [],
						tp;
					while((tp = parts[pindex++])){
						ret = ret.concat(getStepQueryFunc(tp)(root));
					}
					return ret;
				}
			);
		}
	};

	var _zipIdx = 0;

	// NOTE:
	//		this function is Moo inspired, but our own impl to deal correctly
	//		with XML in IE
	var _nodeUID = d.isIE ? function(node){
		if(caseSensitive){
			// XML docs don't have uniqueID on their nodes
			return (node.getAttribute("_uid") || node.setAttribute("_uid", ++_zipIdx) || _zipIdx);

		}else{
			return node.uniqueID;
		}
	} :
	function(node){
		return (node._uid || (node._uid = ++_zipIdx));
	};

	// determine if a node in is unique in a "bag". In this case we don't want
	// to flatten a list of unique items, but rather just tell if the item in
	// question is already in the bag. Normally we'd just use hash lookup to do
	// this for us but IE's DOM is busted so we can't really count on that. On
	// the upside, it gives us a built in unique ID function.
	var _isUnique = function(node, bag){
		if(!bag){ return 1; }
		var id = _nodeUID(node);
		if(!bag[id]){ return bag[id] = 1; }
		return 0;
	};

	// attempt to efficiently determine if an item in a list is a dupe,
	// returning a list of "uniques", hopefully in doucment order
	var _zipIdxName = "_zipIdx";
	var _zip = function(arr){
		if(arr && arr.nozip){
			return (qlc._wrap) ? qlc._wrap(arr) : arr;
		}
		// var ret = new d._NodeListCtor();
		var ret = new qlc();
		if(!arr || !arr.length){ return ret; }
		if(arr[0]){
			ret.push(arr[0]);
		}
		if(arr.length < 2){ return ret; }

		_zipIdx++;
		
		// we have to fork here for IE and XML docs because we can't set
		// expandos on their nodes (apparently). *sigh*
		if(d.isIE && caseSensitive){
			var szidx = _zipIdx+"";
			arr[0].setAttribute(_zipIdxName, szidx);
			for(var x = 1, te; te = arr[x]; x++){
				if(arr[x].getAttribute(_zipIdxName) != szidx){
					ret.push(te);
				}
				te.setAttribute(_zipIdxName, szidx);
			}
		}else if(d.isIE && arr.commentStrip){
			try{
				for(var x = 1, te; te = arr[x]; x++){
					if(_isElement(te)){
						ret.push(te);
					}
				}
			}catch(e){ /* squelch */ }
		}else{
			if(arr[0]){ arr[0][_zipIdxName] = _zipIdx; }
			for(var x = 1, te; te = arr[x]; x++){
				if(arr[x][_zipIdxName] != _zipIdx){
					ret.push(te);
				}
				te[_zipIdxName] = _zipIdx;
			}
		}
		return ret;
	};

	// the main executor
	d.query = function(/*String*/ query, /*String|DOMNode?*/ root){
		
		//Set list constructor to desired value. This can change
		//between calls, so always re-assign here.
		qlc = d._NodeListCtor;

		if(!query){
			return new qlc();
		}

		if(query.constructor == qlc){
			return query;
		}
		if(typeof query != "string"){ // inline'd type check
			return new qlc(query); // moor.NodeList
		}
		if(typeof root == "string"){ // inline'd type check
			root = d.byId(root);
			if(!root){ return new qlc(); }
		}

		root = root||getDoc();
		var od = root.ownerDocument||root.documentElement;

		// throw the big case sensitivity switch

		// NOTE:
		// 		Opera in XHTML mode doesn't detect case-sensitivity correctly
		// 		and it's not clear that there's any way to test for it
		caseSensitive = (root.contentType && root.contentType=="application/xml") ||
						(d.isOpera && (root.doctype || od.toString() == "[object XMLDocument]")) ||
						(!!od) &&
						(d.isIE ? od.xml : (root.xmlVersion||od.xmlVersion));

		// NOTE:
		//		adding "true" as the 2nd argument to getQueryFunc is useful for
		//		testing the DOM branch without worrying about the
		//		behavior/performance of the QSA branch.
		var r = getQueryFunc(query)(root);

		// FIXME:
		//		need to investigate this branch WRT #8074 and #8075
		if(r && r.nozip && !qlc._wrap){
			return r;
		}
		return _zip(r); // moor.NodeList
	}

	// FIXME: need to add infrastructure for post-filtering pseudos, ala :last
	d.query.pseudos = pseudos;

	// function for filtering a NodeList based on a selector, optimized for simple selectors
	d._filterQueryResult = function(/*NodeList*/ nodeList, /*String*/ filter, /*String|DOMNode?*/ root){
		var tmpNodeList = new d._NodeListCtor(),
			parts = getQueryParts(filter),
			filterFunc =
				(parts.length == 1 && !/[^\w#\.]/.test(filter)) ?
				getSimpleFilterFunc(parts[0]) :
				function(node) {
					return moor.query(filter, root).indexOf(node) != -1;
				};
		for(var x = 0, te; te = nodeList[x]; x++){
			if(filterFunc(te)){ tmpNodeList.push(te); }
		}
		return tmpNodeList;
	}
};//end defineQuery

var defineAcme= function(){
	// a self-sufficient query impl
	var acme = {
		trim: function(/*String*/ str){
			// summary:
			//		trims whitespaces from both sides of the string
			str = str.replace(/^\s+/, '');
			for(var i = str.length - 1; i >= 0; i--){
				if(/\S/.test(str.charAt(i))){
					str = str.substring(0, i + 1);
					break;
				}
			}
			return str;	// String
		},
		forEach: function(/*String*/ arr, /*Function*/ callback, /*Object?*/ thisObject){
			//	summary:
			// 		an iterator function that passes items, indexes,
			// 		and the array to a callback
			if(!arr || !arr.length){ return; }
			for(var i=0,l=arr.length; i<l; ++i){
				callback.call(thisObject||window, arr[i], i, arr);
			}
		},
		byId: function(id, doc){
			// 	summary:
			//		a function that return an element by ID, but also
			//		accepts nodes safely
			if(typeof id == "string"){
				return (doc||document).getElementById(id); // DomNode
			}else{
				return id; // DomNode
			}
		},
		// the default document to search
		doc: document,
		// the constructor for node list objects returned from query()
		NodeList: Array
	};

	// define acme.isIE, acme.isSafari, acme.isOpera, etc.
	var n = navigator;
	var dua = n.userAgent;
	var dav = n.appVersion;
	var tv = parseFloat(dav);
	acme.isOpera = (dua.indexOf("Opera") >= 0) ? tv: undefined;
	acme.isKhtml = (dav.indexOf("Konqueror") >= 0) ? tv : undefined;
	acme.isWebKit = parseFloat(dua.split("WebKit/")[1]) || undefined;
	acme.isChrome = parseFloat(dua.split("Chrome/")[1]) || undefined;
	var index = Math.max(dav.indexOf("WebKit"), dav.indexOf("Safari"), 0);
	if(index && !acme.isChrome){
		acme.isSafari = parseFloat(dav.split("Version/")[1]);
		if(!acme.isSafari || parseFloat(dav.substr(index + 7)) <= 419.3){
			acme.isSafari = 2;
		}
	}
	if(document.all && !acme.isOpera){
		acme.isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;
	}

	Array._wrap = function(arr){ return arr; };
  return acme;
};

	//prefers queryPortability, then acme, then moor
	if(that["moor"]){
		moor.provide("moor._base.query");
		
		
		defineQuery(that["queryPortability"]||that["acme"]||moor);
	}else{
		defineQuery(that["queryPortability"]||that["acme"]||defineAcme());
	}

})();

/*
*/

}

if(!moor._hasResource["moor._base.xhr"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.xhr"] = true;
moor.provide("moor._base.xhr");






(function(){
	var _d = moor, cfg = _d.config;

	function setValue(/*Object*/obj, /*String*/name, /*String*/value){
		//summary:
		//		For the named property in object, set the value. If a value
		//		already exists and it is a string, convert the value to be an
		//		array of values.

		//Skip it if there is no value
		if(value === null){
			return;
		}

		var val = obj[name];
		if(typeof val == "string"){ // inline'd type check
			obj[name] = [val, value];
		}else if(_d.isArray(val)){
			val.push(value);
		}else{
			obj[name] = value;
		}
	}
	
	moor.fieldToObject = function(/*DOMNode||String*/ inputNode){
		// summary:
		//		Serialize a form field to a JavaScript object.
		//
		// description:
		//		Returns the value encoded in a form field as
		//		as a string or an array of strings. Disabled form elements
		//		and unchecked radio and checkboxes are skipped.	Multi-select
		//		elements are returned as an array of string values.
		var ret = null;
		var item = _d.byId(inputNode);
		if(item){
			var _in = item.name;
			var type = (item.type||"").toLowerCase();
			if(_in && type && !item.disabled){
				if(type == "radio" || type == "checkbox"){
					if(item.checked){ ret = item.value; }
				}else if(item.multiple){
					ret = [];
					_d.query("option", item).forEach(function(opt){
						if(opt.selected){
							ret.push(opt.value);
						}
					});
				}else{
					ret = item.value;
				}
			}
		}
		return ret; // Object
	};

	moor.formToObject = function(/*DOMNode||String*/ formNode){
		// summary:
		//		Serialize a form node to a JavaScript object.
		// description:
		//		Returns the values encoded in an HTML form as
		//		string properties in an object which it then returns. Disabled form
		//		elements, buttons, and other non-value form elements are skipped.
		//		Multi-select elements are returned as an array of string values.
		//
		// example:
		//		This form:
		//		|	<form id="test_form">
		//		|		<input type="text" name="blah" value="blah">
		//		|		<input type="text" name="no_value" value="blah" disabled>
		//		|		<input type="button" name="no_value2" value="blah">
		//		|		<select type="select" multiple name="multi" size="5">
		//		|			<option value="blah">blah</option>
		//		|			<option value="thud" selected>thud</option>
		//		|			<option value="thonk" selected>thonk</option>
		//		|		</select>
		//		|	</form>
		//
		//		yields this object structure as the result of a call to
		//		formToObject():
		//
		//		|	{
		//		|		blah: "blah",
		//		|		multi: [
		//		|			"thud",
		//		|			"thonk"
		//		|		]
		//		|	};

		var ret = {};
		var exclude = "file|submit|image|reset|button|";
		_d.forEach(moor.byId(formNode).elements, function(item){
			var _in = item.name;
			var type = (item.type||"").toLowerCase();
			if(_in && type && exclude.indexOf(type) == -1 && !item.disabled){
				setValue(ret, _in, _d.fieldToObject(item));
				if(type == "image"){
					ret[_in+".x"] = ret[_in+".y"] = ret[_in].x = ret[_in].y = 0;
				}
			}
		});
		return ret; // Object
	};

	moor.objectToQuery = function(/*Object*/ map){
		//	summary:
		//		takes a name/value mapping object and returns a string representing
		//		a URL-encoded version of that object.
		//	example:
		//		this object:
		//
		//		|	{
		//		|		blah: "blah",
		//		|		multi: [
		//		|			"thud",
		//		|			"thonk"
		//		|		]
		//		|	};
		//
		//	yields the following query string:
		//
		//	|	"blah=blah&multi=thud&multi=thonk"

		// FIXME: need to implement encodeAscii!!
		var enc = encodeURIComponent;
		var pairs = [];
		var backstop = {};
		for(var name in map){
			var value = map[name];
			if(value != backstop[name]){
				var assign = enc(name) + "=";
				if(_d.isArray(value)){
					for(var i=0; i < value.length; i++){
						pairs.push(assign + enc(value[i]));
					}
				}else{
					pairs.push(assign + enc(value));
				}
			}
		}
		return pairs.join("&"); // String
	};

	moor.formToQuery = function(/*DOMNode||String*/ formNode){
		// summary:
		//		Returns a URL-encoded string representing the form passed as either a
		//		node or string ID identifying the form to serialize
		return _d.objectToQuery(_d.formToObject(formNode)); // String
	};

	moor.formToJson = function(/*DOMNode||String*/ formNode, /*Boolean?*/prettyPrint){
		// summary:
		//		Create a serialized JSON string from a form node or string
		//		ID identifying the form to serialize
		return _d.toJson(_d.formToObject(formNode), prettyPrint); // String
	};

	moor.queryToObject = function(/*String*/ str){

		// FIXME: should we grab the URL string if we're not passed one?
		var ret = {};
		var qp = str.split("&");
		var dec = decodeURIComponent;
		_d.forEach(qp, function(item){
			if(item.length){
				var parts = item.split("=");
				var name = dec(parts.shift());
				var val = dec(parts.join("="));
				if(typeof ret[name] == "string"){ // inline'd type check
					ret[name] = [ret[name]];
				}

				if(_d.isArray(ret[name])){
					ret[name].push(val);
				}else{
					ret[name] = val;
				}
			}
		});
		return ret; // Object
	};

	// need to block async callbacks from snatching this thread as the result
	// of an async callback might call another sync XHR, this hangs khtml forever
	// must checked by watchInFlight()

	moor._blockAsync = false;

	// MOW: remove moor._contentHandlers alias in 2.0
	var handlers = _d._contentHandlers = moor.contentHandlers = {

		text: function(xhr){
			// summary: A contentHandler which simply returns the plaintext response data
			return xhr.responseText;
		},
		json: function(xhr){
			// summary: A contentHandler which returns a JavaScript object created from the response data
			return _d.fromJson(xhr.responseText || null);
		},
		"json-comment-filtered": function(xhr){
			// summary: A contentHandler which expects comment-filtered JSON.
			// description:
			//		A contentHandler which expects comment-filtered JSON.
			//		the json-comment-filtered option was implemented to prevent
			//		"JavaScript Hijacking", but it is less secure than standard JSON. Use
			//		standard JSON instead. JSON prefixing can be used to subvert hijacking.
			//
			//		Will throw a notice suggesting to use application/json mimetype, as
			//		json-commenting can introduce security issues. To decrease the chances of hijacking,
			//		use the standard `json` contentHandler, and prefix your "JSON" with: {}&&
			//
			//		use djConfig.useCommentedJson = true to turn off the notice
			if(!moor.config.useCommentedJson){
				console.warn("Consider using the standard mimetype:application/json."
					+ " json-commenting can introduce security issues. To"
					+ " decrease the chances of hijacking, use the standard the 'json' handler and"
					+ " prefix your json with: {}&&\n"
					+ "Use djConfig.useCommentedJson=true to turn off this message.");
			}

			var value = xhr.responseText;
			var cStartIdx = value.indexOf("\/*");
			var cEndIdx = value.lastIndexOf("*\/");
			if(cStartIdx == -1 || cEndIdx == -1){
				throw new Error("JSON was not comment filtered");
			}
			return _d.fromJson(value.substring(cStartIdx+2, cEndIdx));
		},
		javascript: function(xhr){
			// summary: A contentHandler which evaluates the response data, expecting it to be valid JavaScript

			// FIXME: try Moz and IE specific eval variants?
			return _d.eval(xhr.responseText);
		},
		xml: function(xhr){
			// summary: A contentHandler returning an XML Document parsed from the response data
			var result = xhr.responseXML;
						if(_d.isIE && (!result || !result.documentElement)){
				//WARNING: this branch used by the xml handling in moor.io.iframe,
				//so be sure to test moor.io.iframe if making changes below.
				var ms = function(n){ return "MSXML" + n + ".DOMDocument"; };
				var dp = ["Microsoft.XMLDOM", ms(6), ms(4), ms(3), ms(2)];
				_d.some(dp, function(p){
					try{
						var dom = new ActiveXObject(p);
						dom.async = false;
						dom.loadXML(xhr.responseText);
						result = dom;
					}catch(e){ return false; }
					return true;
				});
			}
						return result; // DOMDocument
		},
		"json-comment-optional": function(xhr){
			// summary: A contentHandler which checks the presence of comment-filtered JSON and
			//		alternates between the `json` and `json-comment-filtered` contentHandlers.
			if(xhr.responseText && /^[^{\[]*\/\*/.test(xhr.responseText)){
				return handlers["json-comment-filtered"](xhr);
			}else{
				return handlers["json"](xhr);
			}
		}
	};



	moor._ioSetArgs = function(/*moor.__IoArgs*/args,
			/*Function*/canceller,
			/*Function*/okHandler,
			/*Function*/errHandler){

		var ioArgs = {args: args, url: args.url};

		//Get values from form if requestd.
		var formObject = null;
		if(args.form){
			var form = _d.byId(args.form);
			//IE requires going through getAttributeNode instead of just getAttribute in some form cases,
			//so use it for all.  See #2844
			var actnNode = form.getAttributeNode("action");
			ioArgs.url = ioArgs.url || (actnNode ? actnNode.value : null);
			formObject = _d.formToObject(form);
		}

		// set up the query params
		var miArgs = [{}];
	
		if(formObject){
			// potentially over-ride url-provided params w/ form values
			miArgs.push(formObject);
		}
		if(args.content){
			// stuff in content over-rides what's set by form
			miArgs.push(args.content);
		}
		if(args.preventCache){
			miArgs.push({"moor.preventCache": new Date().valueOf()});
		}
		ioArgs.query = _d.objectToQuery(_d.mixin.apply(null, miArgs));
	
		// .. and the real work of getting the deferred in order, etc.
		ioArgs.handleAs = args.handleAs || "text";
		var d = new _d.Deferred(canceller);
		d.addCallbacks(okHandler, function(error){
			return errHandler(error, d);
		});

		//Support specifying load, error and handle callback functions from the args.
		//For those callbacks, the "this" object will be the args object.
		//The callbacks will get the deferred result value as the
		//first argument and the ioArgs object as the second argument.
		var ld = args.load;
		if(ld && _d.isFunction(ld)){
			d.addCallback(function(value){
				return ld.call(args, value, ioArgs);
			});
		}
		var err = args.error;
		if(err && _d.isFunction(err)){
			d.addErrback(function(value){
				return err.call(args, value, ioArgs);
			});
		}
		var handle = args.handle;
		if(handle && _d.isFunction(handle)){
			d.addBoth(function(value){
				return handle.call(args, value, ioArgs);
			});
		}

		//Plug in topic publishing, if moor.publish is loaded.
		if(cfg.ioPublish && _d.publish && ioArgs.args.ioPublish !== false){
			d.addCallbacks(
				function(res){
					_d.publish("/moor/io/load", [d, res]);
					return res;
				},
				function(res){
					_d.publish("/moor/io/error", [d, res]);
					return res;
				}
			);
			d.addBoth(function(res){
				_d.publish("/moor/io/done", [d, res]);
				return res;
			});
		}

		d.ioArgs = ioArgs;
	
		// FIXME: need to wire up the xhr object's abort method to something
		// analagous in the Deferred
		return d;
	};

	var _deferredCancel = function(/*Deferred*/dfd){
		// summary: canceller function for moor._ioSetArgs call.
		
		dfd.canceled = true;
		var xhr = dfd.ioArgs.xhr;
		var _at = typeof xhr.abort;
		if(_at == "function" || _at == "object" || _at == "unknown"){
			xhr.abort();
		}
		var err = dfd.ioArgs.error;
		if(!err){
			err = new Error("xhr cancelled");
			err.moorType="cancel";
		}
		return err;
	};
	var _deferredOk = function(/*Deferred*/dfd){
		// summary: okHandler function for moor._ioSetArgs call.

		var ret = handlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
		return ret === undefined ? null : ret;
	};
	var _deferError = function(/*Error*/error, /*Deferred*/dfd){
		// summary: errHandler function for moor._ioSetArgs call.

		if(!dfd.ioArgs.args.failOk){
			console.error(error);
		}
		return error;
	};

	// avoid setting a timer per request. It degrades performance on IE
	// something fierece if we don't use unified loops.
	var _inFlightIntvl = null;
	var _inFlight = [];
	
	
	//Use a separate count for knowing if we are starting/stopping io calls.
	//Cannot use _inFlight.length since it can change at a different time than
	//when we want to do this kind of test. We only want to decrement the count
	//after a callback/errback has finished, since the callback/errback should be
	//considered as part of finishing a request.
	var _pubCount = 0;
	var _checkPubCount = function(dfd){
		if(_pubCount <= 0){
			_pubCount = 0;
			if(cfg.ioPublish && _d.publish && (!dfd || dfd && dfd.ioArgs.args.ioPublish !== false)){
				_d.publish("/moor/io/stop");
			}
		}
	};

	var _watchInFlight = function(){
		//summary:
		//		internal method that checks each inflight XMLHttpRequest to see
		//		if it has completed or if the timeout situation applies.
		
		var now = (new Date()).getTime();
		// make sure sync calls stay thread safe, if this callback is called
		// during a sync call and this results in another sync call before the
		// first sync call ends the browser hangs
		if(!_d._blockAsync){
			// we need manual loop because we often modify _inFlight (and therefore 'i') while iterating
			// note: the second clause is an assigment on purpose, lint may complain
			for(var i = 0, tif; i < _inFlight.length && (tif = _inFlight[i]); i++){
				var dfd = tif.dfd;
				var func = function(){
					if(!dfd || dfd.canceled || !tif.validCheck(dfd)){
						_inFlight.splice(i--, 1);
						_pubCount -= 1;
					}else if(tif.ioCheck(dfd)){
						_inFlight.splice(i--, 1);
						tif.resHandle(dfd);
						_pubCount -= 1;
					}else if(dfd.startTime){
						//did we timeout?
						if(dfd.startTime + (dfd.ioArgs.args.timeout || 0) < now){
							_inFlight.splice(i--, 1);
							var err = new Error("timeout exceeded");
							err.moorType = "timeout";
							dfd.errback(err);
							//Cancel the request so the io module can do appropriate cleanup.
							dfd.cancel();
							_pubCount -= 1;
						}
					}
				};
				if(moor.config.debugAtAllCosts){
					func.call(this);
				}else{
					try{
						func.call(this);
					}catch(e){
						dfd.errback(e);
					}
				}
			}
		}

		_checkPubCount(dfd);

		if(!_inFlight.length){
			clearInterval(_inFlightIntvl);
			_inFlightIntvl = null;
			return;
		}
	};

	moor._ioCancelAll = function(){
		//summary: Cancels all pending IO requests, regardless of IO type
		//(xhr, script, iframe).
		try{
			_d.forEach(_inFlight, function(i){
				try{
					i.dfd.cancel();
				}catch(e){/*squelch*/}
			});
		}catch(e){/*squelch*/}
	};

	//Automatically call cancel all io calls on unload
	//in IE for trac issue #2357.
		if(_d.isIE){
		_d.addOnWindowUnload(_d._ioCancelAll);
	}
	
	_d._ioNotifyStart = function(/*Deferred*/dfd){
		// summary:
		// 		If moor.publish is available, publish topics
		// 		about the start of a request queue and/or the
		// 		the beginning of request.
		// description:
		// 		Used by IO transports. An IO transport should
		// 		call this method before making the network connection.
		if(cfg.ioPublish && _d.publish && dfd.ioArgs.args.ioPublish !== false){
			if(!_pubCount){
				_d.publish("/moor/io/start");
			}
			_pubCount += 1;
			_d.publish("/moor/io/send", [dfd]);
		}
	};

	_d._ioWatch = function(dfd, validCheck, ioCheck, resHandle){

		var args = dfd.ioArgs.args;
		if(args.timeout){
			dfd.startTime = (new Date()).getTime();
		}
		
		_inFlight.push({dfd: dfd, validCheck: validCheck, ioCheck: ioCheck, resHandle: resHandle});
		if(!_inFlightIntvl){
			_inFlightIntvl = setInterval(_watchInFlight, 50);
		}
		// handle sync requests
		//A weakness: async calls in flight
		//could have their handlers called as part of the
		//_watchInFlight call, before the sync's callbacks
		// are called.
		if(args.sync){
			_watchInFlight();
		}
	};

	var _defaultContentType = "application/x-www-form-urlencoded";

	var _validCheck = function(/*Deferred*/dfd){
		return dfd.ioArgs.xhr.readyState; //boolean
	};
	var _ioCheck = function(/*Deferred*/dfd){
		return 4 == dfd.ioArgs.xhr.readyState; //boolean
	};
	var _resHandle = function(/*Deferred*/dfd){
		var xhr = dfd.ioArgs.xhr;
		if(_d._isDocumentOk(xhr)){
			dfd.callback(dfd);
		}else{
			var err = new Error("Unable to load " + dfd.ioArgs.url + " status:" + xhr.status);
			err.status = xhr.status;
			err.responseText = xhr.responseText;
			dfd.errback(err);
		}
	};

	moor._ioAddQueryToUrl = function(/*moor.__IoCallbackArgs*/ioArgs){
		//summary: Adds query params discovered by the io deferred construction to the URL.
		//Only use this for operations which are fundamentally GET-type operations.
		if(ioArgs.query.length){
			ioArgs.url += (ioArgs.url.indexOf("?") == -1 ? "?" : "&") + ioArgs.query;
			ioArgs.query = null;
		}
	};
	moor.xhr = function(/*String*/ method, /*moor.__XhrArgs*/ args, /*Boolean?*/ hasBody){
		//	summary:
		//		Sends an HTTP request with the given method.
		//	description:
		//		Sends an HTTP request with the given method.
		//		See also moor.xhrGet(), xhrPost(), xhrPut() and moor.xhrDelete() for shortcuts
		//		for those HTTP methods. There are also methods for "raw" PUT and POST methods
		//		via moor.rawXhrPut() and moor.rawXhrPost() respectively.
		//	method:
		//		HTTP method to be used, such as GET, POST, PUT, DELETE.  Should be uppercase.
		//	hasBody:
		//		If the request has an HTTP body, then pass true for hasBody.

		//Make the Deferred object for this xhr request.
		var dfd = _d._ioSetArgs(args, _deferredCancel, _deferredOk, _deferError);
		var ioArgs = dfd.ioArgs;

		//Pass the args to _xhrObj, to allow alternate XHR calls based specific calls, like
		//the one used for iframe proxies.
		var xhr = ioArgs.xhr = _d._xhrObj(ioArgs.args);
		//If XHR factory fails, cancel the deferred.
		if(!xhr){
			dfd.cancel();
			return dfd;
		}

		//Allow for specifying the HTTP body completely.
		if("postData" in args){
			ioArgs.query = args.postData;
		}else if("putData" in args){
			ioArgs.query = args.putData;
		}else if("rawBody" in args){
			ioArgs.query = args.rawBody;
		}else if((arguments.length > 2 && !hasBody) || "POST|PUT".indexOf(method.toUpperCase()) == -1){
			//Check for hasBody being passed. If no hasBody,
			//then only append query string if not a POST or PUT request.
			_d._ioAddQueryToUrl(ioArgs);
		}

		// IE 6 is a steaming pile. It won't let you call apply() on the native function (xhr.open).
		// workaround for IE6's apply() "issues"
		xhr.open(method, ioArgs.url, args.sync !== true, args.user || undefined, args.password || undefined);
		if(args.headers){
			for(var hdr in args.headers){
				if(hdr.toLowerCase() === "content-type" && !args.contentType){
					args.contentType = args.headers[hdr];
				}else if(args.headers[hdr]){
					//Only add header if it has a value. This allows for instnace, skipping
					//insertion of X-Requested-With by specifying empty value.
					xhr.setRequestHeader(hdr, args.headers[hdr]);
				}
			}
		}
		// FIXME: is this appropriate for all content types?
		xhr.setRequestHeader("Content-Type", args.contentType || _defaultContentType);
		if(!args.headers || !("X-Requested-With" in args.headers)){
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		}
		// FIXME: set other headers here!
		_d._ioNotifyStart(dfd);
		if(moor.config.debugAtAllCosts){
			xhr.send(ioArgs.query);
		}else{
			try{
				xhr.send(ioArgs.query);
			}catch(e){
				ioArgs.error = e;
				dfd.cancel();
			}
		}
		_d._ioWatch(dfd, _validCheck, _ioCheck, _resHandle);
		xhr = null;
		return dfd; // moor.Deferred
	};

	moor.xhrGet = function(/*moor.__XhrArgs*/ args){
		//	summary:
		//		Sends an HTTP GET request to the server.
		return _d.xhr("GET", args); // moor.Deferred
	};

	moor.rawXhrPost = moor.xhrPost = function(/*moor.__XhrArgs*/ args){
		//	summary:
		//		Sends an HTTP POST request to the server. In addtion to the properties
		//		listed for the moor.__XhrArgs type, the following property is allowed:
		//	postData:
		//		String. Send raw data in the body of the POST request.
		return _d.xhr("POST", args, true); // moor.Deferred
	};

	moor.rawXhrPut = moor.xhrPut = function(/*moor.__XhrArgs*/ args){
		//	summary:
		//		Sends an HTTP PUT request to the server. In addtion to the properties
		//		listed for the moor.__XhrArgs type, the following property is allowed:
		//	putData:
		//		String. Send raw data in the body of the PUT request.
		return _d.xhr("PUT", args, true); // moor.Deferred
	};

	moor.xhrDelete = function(/*moor.__XhrArgs*/ args){
		//	summary:
		//		Sends an HTTP DELETE request to the server.
		return _d.xhr("DELETE", args); //moor.Deferred
	};

	/*
	moor.wrapForm = function(formNode){
		//summary:
		//		A replacement for FormBind, but not implemented yet.

		// FIXME: need to think harder about what extensions to this we might
		// want. What should we allow folks to do w/ this? What events to
		// set/send?
		throw new Error("moor.wrapForm not yet implemented");
	}
	*/
})();

}

if(!moor._hasResource["moor._base.fx"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.fx"] = true;
moor.provide("moor._base.fx");






/*
	Animation loosely package based on Dan Pupius' work, contributed under CLA:
		http://pupius.co.uk/js/Toolkit.Drawing.js
*/
(function(){
	var d = moor;
	var _mixin = d._mixin;

	moor._Line = function(/*int*/ start, /*int*/ end){
		//	summary:
		//		moor._Line is the object used to generate values from a start value
		//		to an end value
		//	start: int
		//		Beginning value for range
		//	end: int
		//		Ending value for range
		this.start = start;
		this.end = end;
	};

	moor._Line.prototype.getValue = function(/*float*/ n){
		//	summary: Returns the point on the line
		//	n: a floating point number greater than 0 and less than 1
		return ((this.end - this.start) * n) + this.start; // Decimal
	};

	moor.Animation = function(args){
		_mixin(this, args);
		if(d.isArray(this.curve)){
			this.curve = new d._Line(this.curve[0], this.curve[1]);
		}

	};

	// Alias to drop come 2.0:
	d._Animation = d.Animation;

	d.extend(moor.Animation, {
		// duration: Integer
		//		The time in milliseonds the animation will take to run
		duration: 350,
		// repeat: Integer?
		//		The number of times to loop the animation
		repeat: 0,

		// rate: Integer?
		//		the time in milliseconds to wait before advancing to next frame
		//		(used as a fps timer: 1000/rate = fps)
		rate: 20 /* 50 fps */,
		_percent: 0,
		_startRepeatCount: 0,

		_getStep: function(){
			var _p = this._percent,
				_e = this.easing
			;
			return _e ? _e(_p) : _p;
		},
		_fire: function(/*Event*/ evt, /*Array?*/ args){
			//	summary:
			//		Convenience function.  Fire event "evt" and pass it the
			//		arguments specified in "args".
			//	description:
			//		Convenience function.  Fire event "evt" and pass it the
			//		arguments specified in "args".
			//		Fires the callback in the scope of the `moor.Animation`
			//		instance.
			//	evt:
			//		The event to fire.
			//	args:
			//		The arguments to pass to the event.
			var a = args||[];
			if(this[evt]){
				if(d.config.debugAtAllCosts){
					this[evt].apply(this, a);
				}else{
					try{
						this[evt].apply(this, a);
					}catch(e){
						// squelch and log because we shouldn't allow exceptions in
						// synthetic event handlers to cause the internal timer to run
						// amuck, potentially pegging the CPU. I'm not a fan of this
						// squelch, but hopefully logging will make it clear what's
						// going on
						console.error("exception in animation handler for:", evt);
						console.error(e);
					}
				}
			}
			return this; // moor.Animation
		},

		play: function(/*int?*/ delay, /*Boolean?*/ gotoStart){
			// summary:
			//		Start the animation.
			// delay:
			//		How many milliseconds to delay before starting.
			// gotoStart:
			//		If true, starts the animation from the beginning; otherwise,
			//		starts it from its current position.
			// returns: moor.Animation
			//		The instance to allow chaining.

			var _t = this;
			if(_t._delayTimer){ _t._clearTimer(); }
			if(gotoStart){
				_t._stopTimer();
				_t._active = _t._paused = false;
				_t._percent = 0;
			}else if(_t._active && !_t._paused){
				return _t;
			}

			_t._fire("beforeBegin", [_t.node]);

			var de = delay || _t.delay,
				_p = moor.hitch(_t, "_play", gotoStart);

			if(de > 0){
				_t._delayTimer = setTimeout(_p, de);
				return _t;
			}
			_p();
			return _t;
		},

		_play: function(gotoStart){
			var _t = this;
			if(_t._delayTimer){ _t._clearTimer(); }
			_t._startTime = new Date().valueOf();
			if(_t._paused){
				_t._startTime -= _t.duration * _t._percent;
			}

			_t._active = true;
			_t._paused = false;
			var value = _t.curve.getValue(_t._getStep());
			if(!_t._percent){
				if(!_t._startRepeatCount){
					_t._startRepeatCount = _t.repeat;
				}
				_t._fire("onBegin", [value]);
			}

			_t._fire("onPlay", [value]);

			_t._cycle();
			return _t; // moor.Animation
		},

		pause: function(){
			// summary: Pauses a running animation.
			var _t = this;
			if(_t._delayTimer){ _t._clearTimer(); }
			_t._stopTimer();
			if(!_t._active){ return _t; /*moor.Animation*/ }
			_t._paused = true;
			_t._fire("onPause", [_t.curve.getValue(_t._getStep())]);
			return _t; // moor.Animation
		},

		gotoPercent: function(/*Decimal*/ percent, /*Boolean?*/ andPlay){
			//	summary:
			//		Sets the progress of the animation.
			//	percent:
			//		A percentage in decimal notation (between and including 0.0 and 1.0).
			//	andPlay:
			//		If true, play the animation after setting the progress.
			var _t = this;
			_t._stopTimer();
			_t._active = _t._paused = true;
			_t._percent = percent;
			if(andPlay){ _t.play(); }
			return _t; // moor.Animation
		},

		stop: function(/*boolean?*/ gotoEnd){
			// summary: Stops a running animation.
			// gotoEnd: If true, the animation will end.
			var _t = this;
			if(_t._delayTimer){ _t._clearTimer(); }
			if(!_t._timer){ return _t; /* moor.Animation */ }
			_t._stopTimer();
			if(gotoEnd){
				_t._percent = 1;
			}
			_t._fire("onStop", [_t.curve.getValue(_t._getStep())]);
			_t._active = _t._paused = false;
			return _t; // moor.Animation
		},

		status: function(){
			// summary:
			//		Returns a string token representation of the status of
			//		the animation, one of: "paused", "playing", "stopped"
			if(this._active){
				return this._paused ? "paused" : "playing"; // String
			}
			return "stopped"; // String
		},

		_cycle: function(){
			var _t = this;
			if(_t._active){
				var curr = new Date().valueOf();
				var step = (curr - _t._startTime) / (_t.duration);

				if(step >= 1){
					step = 1;
				}
				_t._percent = step;

				// Perform easing
				if(_t.easing){
					step = _t.easing(step);
				}

				_t._fire("onAnimate", [_t.curve.getValue(step)]);

				if(_t._percent < 1){
					_t._startTimer();
				}else{
					_t._active = false;

					if(_t.repeat > 0){
						_t.repeat--;
						_t.play(null, true);
					}else if(_t.repeat == -1){
						_t.play(null, true);
					}else{
						if(_t._startRepeatCount){
							_t.repeat = _t._startRepeatCount;
							_t._startRepeatCount = 0;
						}
					}
					_t._percent = 0;
					_t._fire("onEnd", [_t.node]);
					!_t.repeat && _t._stopTimer();
				}
			}
			return _t; // moor.Animation
		},

		_clearTimer: function(){
			// summary: Clear the play delay timer
			clearTimeout(this._delayTimer);
			delete this._delayTimer;
		}

	});

	// the local timer, stubbed into all Animation instances
	var ctr = 0,
		timer = null,
		runner = {
			run: function(){}
		};

	d.extend(d.Animation, {

		_startTimer: function(){
			if(!this._timer){
				this._timer = d.connect(runner, "run", this, "_cycle");
				ctr++;
			}
			if(!timer){
				timer = setInterval(d.hitch(runner, "run"), this.rate);
			}
		},

		_stopTimer: function(){
			if(this._timer){
				d.disconnect(this._timer);
				this._timer = null;
				ctr--;
			}
			if(ctr <= 0){
				clearInterval(timer);
				timer = null;
				ctr = 0;
			}
		}

	});

	var _makeFadeable =
				d.isIE ? function(node){
			// only set the zoom if the "tickle" value would be the same as the
			// default
			var ns = node.style;
			// don't set the width to auto if it didn't already cascade that way.
			// We don't want to f anyones designs
			if(!ns.width.length && d.style(node, "width") == "auto"){
				ns.width = "auto";
			}
		} :
				function(){};

	moor._fade = function(/*Object*/ args){
		//	summary:
		//		Returns an animation that will fade the node defined by
		//		args.node from the start to end values passed (args.start
		//		args.end) (end is mandatory, start is optional)

		args.node = d.byId(args.node);
		var fArgs = _mixin({ properties: {} }, args),
			props = (fArgs.properties.opacity = {});

		props.start = !("start" in fArgs) ?
			function(){
				return +d.style(fArgs.node, "opacity")||0;
			} : fArgs.start;
		props.end = fArgs.end;

		var anim = d.animateProperty(fArgs);
		d.connect(anim, "beforeBegin", d.partial(_makeFadeable, fArgs.node));

		return anim; // moor.Animation
	};

	/*=====
	moor.__FadeArgs = function(node, duration, easing){
		//	node: DOMNode|String
		//		The node referenced in the animation
		//	duration: Integer?
		//		Duration of the animation in milliseconds.
		//	easing: Function?
		//		An easing function.
		this.node = node;
		this.duration = duration;
		this.easing = easing;
	}
	=====*/

	moor.fadeIn = function(/*moor.__FadeArgs*/ args){
		// summary:
		//		Returns an animation that will fade node defined in 'args' from
		//		its current opacity to fully opaque.
		return d._fade(_mixin({ end: 1 }, args)); // moor.Animation
	};

	moor.fadeOut = function(/*moor.__FadeArgs*/  args){
		// summary:
		//		Returns an animation that will fade node defined in 'args'
		//		from its current opacity to fully transparent.
		return d._fade(_mixin({ end: 0 }, args)); // moor.Animation
	};

	moor._defaultEasing = function(/*Decimal?*/ n){
		// summary: The default easing function for moor.Animation(s)
		return 0.5 + ((Math.sin((n + 1.5) * Math.PI)) / 2);
	};

	var PropLine = function(properties){
		// PropLine is an internal class which is used to model the values of
		// an a group of CSS properties across an animation lifecycle. In
		// particular, the "getValue" function handles getting interpolated
		// values between start and end for a particular CSS value.
		this._properties = properties;
		for(var p in properties){
			var prop = properties[p];
			if(prop.start instanceof d.Color){
				// create a reusable temp color object to keep intermediate results
				prop.tempColor = new d.Color();
			}
		}
	};

	PropLine.prototype.getValue = function(r){
		var ret = {};
		for(var p in this._properties){
			var prop = this._properties[p],
				start = prop.start;
			if(start instanceof d.Color){
				ret[p] = d.blendColors(start, prop.end, r, prop.tempColor).toCss();
			}else if(!d.isArray(start)){
				ret[p] = ((prop.end - start) * r) + start + (p != "opacity" ? prop.units || "px" : 0);
			}
		}
		return ret;
	};


	moor.animateProperty = function(/*moor.__AnimArgs*/ args){

		var n = args.node = d.byId(args.node);
		if(!args.easing){ args.easing = d._defaultEasing; }

		var anim = new d.Animation(args);
		d.connect(anim, "beforeBegin", anim, function(){
			var pm = {};
			for(var p in this.properties){
				// Make shallow copy of properties into pm because we overwrite
				// some values below. In particular if start/end are functions
				// we don't want to overwrite them or the functions won't be
				// called if the animation is reused.
				if(p == "width" || p == "height"){
					this.node.display = "block";
				}
				var prop = this.properties[p];
				if(d.isFunction(prop)){
					prop = prop(n);
				}
				prop = pm[p] = _mixin({}, (d.isObject(prop) ? prop: { end: prop }));

				if(d.isFunction(prop.start)){
					prop.start = prop.start(n);
				}
				if(d.isFunction(prop.end)){
					prop.end = prop.end(n);
				}
				var isColor = (p.toLowerCase().indexOf("color") >= 0);
				function getStyle(node, p){
					// moor.style(node, "height") can return "auto" or "" on IE; this is more reliable:
					var v = { height: node.offsetHeight, width: node.offsetWidth }[p];
					if(v !== undefined){ return v; }
					v = d.style(node, p);
					return (p == "opacity") ? +v : (isColor ? v : parseFloat(v));
				}
				if(!("end" in prop)){
					prop.end = getStyle(n, p);
				}else if(!("start" in prop)){
					prop.start = getStyle(n, p);
				}

				if(isColor){
					prop.start = new d.Color(prop.start);
					prop.end = new d.Color(prop.end);
				}else{
					prop.start = (p == "opacity") ? +prop.start : parseFloat(prop.start);
				}
			}
			this.curve = new PropLine(pm);
		});
		d.connect(anim, "onAnimate", d.hitch(d, "style", anim.node));
		return anim; // moor.Animation
	};

	moor.anim = function(	/*DOMNode|String*/	node,
							/*Object*/			properties,
							/*Integer?*/		duration,
							/*Function?*/		easing,
							/*Function?*/		onEnd,
							/*Integer?*/		delay){

		return d.animateProperty({ // moor.Animation
			node: node,
			duration: duration || d.Animation.prototype.duration,
			properties: properties,
			easing: easing,
			onEnd: onEnd
		}).play(delay || 0);
	};
})();

}

if(!moor._hasResource["moor._base.browser"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base.browser"] = true;
moor.provide("moor._base.browser");
	//Need this to be the last code segment in base, so do not place any
	//moor/requireIf calls in this file/ Otherwise, due to how the build system
	//puts all requireIf dependencies after the current file, the require calls
	//could be called before all of base is defined/
	moor.forEach(moor.config.require, function(i){
		moor["require"](i);
	});

}

if(!moor._hasResource["moor._base"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
moor._hasResource["moor._base"] = true;
moor.provide("moor._base");
}
	//INSERT moor.i18n._preloadLocalizations HERE

	if(moor.isBrowser && (document.readyState === "complete" || moor.config.afterOnLoad)){
		window.setTimeout(moor._loadInit, 100);
	}
})();

//###moor.js##
//###m7Util.js##
var m7PeerCalculagraph = null
var _topics = {};
var _loadedModules = {};
var opts = Object.prototype.toString;
var xtor = new Function;
var cname = "constructor";
var counter = 0;
var softphoneBar = null;
var phone = null;
var monitor = null;
var monitorTimers=[];
var monitoring = null;
var _cti_peerstate = null;
var prePhonebarStatus = '0';
var isCtiRelogin = false;
var currentEventObj = {}
var isSuperAdmin = false // 是否是超级管理员
var account = {}
function changePhoneBarStatus (busyType) {
    for (var i = 0; i < m7$('.userStatus').length; i ++) {
        m7$(m7$('.userStatus')[i]).css("color", "#8a8a8a")
        m7$(m7$('.userStatus')[i]).find("span").css("background-color", "#8a8a8a")
    }
    if (busyType == "0") {
        m7$("#IdleDisable").css("color", "#53d466")
        m7$("#IdleDisable").find("span").css("background-color", "#53d466")
        m7$('.peerTimeState').css("color", "#53d466")

    } else if (busyType == "2") {
        m7$("#RestDisable").css("color", "#e3a42c")
        m7$("#RestDisable").find("span").css("background-color", "#e3a42c")
        m7$('.peerTimeState').css("color", "#e3a42c")
    } else if (busyType == "1") {
        m7$("#BusyDisable").css("color", "#ff7a72")
        m7$("#BusyDisable").find("span").css("background-color", "#ff7a72")
        m7$('.peerTimeState').css("color", "#ff7a72")
    } else {
        m7$('#userStatus_'+ busyType).css("color", "#ff7a72")
        m7$('#userStatus_'+ busyType).find("span").css("background-color", "#ff7a72")
        m7$('.peerTimeState').css("color", "#ff7a72")
        m7$(m7$('.softphone_timer').find("span")[0]).css("color", "#ff7a72")
    }
}
function senvenProvide(resourceName) {
    resourceName = resourceName + "";
    return (_loadedModules[resourceName] = sevenGetObject(resourceName, true));
}
function senvenMPublish (topic, args) {
    var f = _topics[topic];
    if(f){
        f.apply(this, args||[]);
    }
}

function senvenMSubscribe(topic, context, method) {
    return [topic, _listener.add(_topics, topic, moor.hitch(context, method))];
}
function sevenMUsubscribe (handle) {
    if(handle){
        _listener.remove(_topics, handle[0], handle[1]);
    }
}
function senvenGetIndexof(array, value, fromIndex, findLast) {
        var step = 1, end = array.length || 0, i = 0;
        if(findLast){
            i = end - 1;
            step = end = -1;
        }
        if(fromIndex != undefined){ i = fromIndex; }
        if((findLast && i > end) || i < end){
            for(; i != end; i += step){
                if(array[i] == value){ return i; }
            }
        }
        return -1;
}
function sevenContent(obj, event, context, method, dontFix) {
    var a=arguments, args=[], i=0;
    args.push(isString(a[0]) ? null : a[i++], a[i++]);
    var a1 = a[i+1];
    args.push(isString(a1)||isFunction(a1) ? a[i++] : null, a[i++]);
    for(var l=a.length; i<l; i++){	args.push(a[i]); }
    return _connect.apply(this, args)
}
function isFunction (it) {
    return Object.prototype.toString.call(it) === "[object Function]";
}
function isString(it) {
    return (typeof it == "string" || it instanceof String)
}
function _connect(obj, event, context, method) {
    var l=_listener, h=l.add(obj, event, moor.hitch(context, method));
    return [obj, event, h, l];
}
function sevenGetObject(name, create, context) {
    return _getProp(name.split("."), create, context)
}
function _getProp(parts, create, context) {
    var obj=context || moor.global;
    for(var i=0, p; obj && (p=parts[i]); i++){
        if(i == 0 && moor._scopeMap[p]){
            p = moor._scopeMap[p];
        }
        obj = (p in obj ? obj[p] : (create ? obj[p]={} : undefined));
    }
    return obj;
}

function sevenDeclare(className, superclass, props) {
    if (typeof className != "string") {
        props = superclass;
        superclass = className;
        className = "";
    }
    props = props || {};

    var proto, i, t, ctor, name, bases, chains, mixins = 1, parents = superclass;
    if (opts.call(superclass) == "[object Array]") {
        bases = c3mro(superclass, className);
        t = bases[0];
        mixins = bases.length - t;
        superclass = bases[mixins];
    } else {
        bases = [0];
        if (superclass) {
            if (opts.call(superclass) == "[object Function]") {
                t = superclass._meta;
                bases = bases.concat(t ? t.bases : superclass);
            } else {
                err("base class is not a callable constructor.", className);
            }
        } else if (superclass !== null) {
            err("unknown base class. Did you use moor.require to pull it in?", className);
        }
    }
    if (superclass) {
        for (i = mixins - 1; ; --i) {
            proto = forceNew(superclass);
            if (!i) {
                break;
            }
            t = bases[i];
            (t._meta ? mixOwn : moor._mixin)(proto, t.prototype);
            ctor = new Function;
            ctor.superclass = superclass;
            ctor.prototype = proto;
            superclass = proto.constructor = ctor;
        }
    } else {
        proto = {};
    }
    safeMixin(proto, props);
    t = props.constructor;
    if (t !== Object.prototype.constructor) {
        t.nom = cname;
        proto.constructor = t;
    }

    for (i = mixins - 1; i; --i) {
        t = bases[i]._meta;
        if (t && t.chains) {
            chains = moor._mixin(chains || {}, t.chains);
        }
    }
    if (proto["-chains-"]) {
        chains = moor._mixin(chains || {}, proto["-chains-"]);
    }

    t = !chains || !chains.hasOwnProperty(cname);
    bases[0] = ctor = (chains && chains.constructor === "manual") ? simpleConstructor(bases) :
        (bases.length == 1 ? singleConstructor(props.constructor, t) : chainedConstructor(bases, t));

    ctor._meta = {
        bases: bases, hidden: props, chains: chains,
        parents: parents, ctor: props.constructor
    };
    ctor.superclass = superclass && superclass.prototype;
    ctor.extend = extend;
    ctor.prototype = proto;
    proto.constructor = ctor;

    proto.getInherited = getInherited;
    proto.inherited = inherited;
    proto.isInstanceOf = isInstanceOf;

    if (className) {
        proto.declaredClass = className;
        setObject(className, ctor);
    }
    if (chains) {
        for (name in chains) {
            if (proto[name] && typeof chains[name] == "string" && name != cname) {
                t = proto[name] = chain(name, bases, chains[name] === "after");
                t.nom = name;
            }
        }
    }
    return ctor;
}
function err(msg, cls){
    throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg);
}
function extend(source){
    safeMixin(this.prototype, source);
    return this;
}
function setObject(name, value, context) {
    var parts=name.split("."), p=parts.pop(), obj=_getProp(parts, true, context);
    return obj && p ? (obj[p]=value) : undefined;
}
function getInherited(name, args){
    if(typeof name == "string"){
        return this.inherited(name, args, true);
    }
    return this.inherited(name, true);
}

function chain(name, bases, reversed){
    return function(){
        var b, m, f, i = 0, step = 1;
        if(reversed){
            i = bases.length - 1;
            step = -1;
        }
        for(; b = bases[i]; i += step){
            m = b._meta;
            f = (m ? m.hidden : b.prototype)[name];
            if(f){
                f.apply(this, arguments);
            }
        }
    };
}
function isInstanceOf(cls){
    var bases = this.constructor._meta.bases;
    for(var i = 0, l = bases.length; i < l; ++i){
        if(bases[i] === cls){
            return true;
        }
    }
    return this instanceof cls;
}
function inherited(args, a, f){
    var name, chains, bases, caller, meta, base, proto, opf, pos,
        cache = this._inherited = this._inherited || {};

    if(typeof args == "string"){
        name = args;
        args = a;
        a = f;
    }
    f = 0;

    caller = args.callee;
    name = name || caller.nom;
    if(!name){
        err("can't deduce a name to call inherited()", this.declaredClass);
    }

    meta = this.constructor._meta;
    bases = meta.bases;

    pos = cache.p;
    if(name != cname){
        if(cache.c !== caller){
            pos = 0;
            base = bases[0];
            meta = base._meta;
            if(meta.hidden[name] !== caller){
                chains = meta.chains;
                if(chains && typeof chains[name] == "string"){
                    err("calling chained method with inherited: " + name, this.declaredClass);
                }
                do{
                    meta = base._meta;
                    proto = base.prototype;
                    if(meta && (proto[name] === caller && proto.hasOwnProperty(name) || meta.hidden[name] === caller)){
                        break;
                    }
                }while(base = bases[++pos]);
                pos = base ? pos : -1;
            }
        }
        base = bases[++pos];
        if(base){
            proto = base.prototype;
            if(base._meta && proto.hasOwnProperty(name)){
                f = proto[name];
            }else{
                opf = Object.prototype[name];
                do{
                    proto = base.prototype;
                    f = proto[name];
                    if(f && (base._meta ? proto.hasOwnProperty(name) : f !== opf)){
                        break;
                    }
                }while(base = bases[++pos]);
            }
        }
        f = base && f || Object.prototype[name];
    }else{
        if(cache.c !== caller){
            pos = 0;
            meta = bases[0]._meta;
            if(meta && meta.ctor !== caller){
                chains = meta.chains;
                if(!chains || chains.constructor !== "manual"){
                    err("calling chained constructor with inherited", this.declaredClass);
                }
                while(base = bases[++pos]){
                    meta = base._meta;
                    if(meta && meta.ctor === caller){
                        break;
                    }
                }
                pos = base ? pos : -1;
            }
        }
        while(base = bases[++pos]){
            meta = base._meta;
            f = meta ? meta.ctor : base;
            if(f){
                break;
            }
        }
        f = base && f;
    }

    cache.c = f;
    cache.p = pos;

    if(f){
        return a === true ? f : f.apply(this, a || args);
    }
}

function safeMixin(target, source){
    var name, t, i = 0, l = extraNames.length;
    for(name in source){
        t = source[name];
        if((t !== Object.prototype[name] || !(name in Object.prototype)) && name != cname){
            if(opts.call(t) == "[object Function]"){
                t.nom = name;
            }
            target[name] = t;
        }
    }
    for(; i < l; ++i){
        name = extraNames[i];
        t = source[name];
        if((t !== Object.prototype[name] || !(name in Object.prototype)) && name != cname){
            if(opts.call(t) == "[object Function]"){
                t.nom = name;
            }
            target[name] = t;
        }
    }
    return target;
}
function singleConstructor(ctor, ctorSpecial){
    return function(){
        var a = arguments, t = a, a0 = a[0], f;

        if(!(this instanceof a.callee)){
            return applyNew(a);
        }
        if(ctorSpecial){
            if(a0){
                f = a0.preamble;
                if(f){
                    t = f.apply(this, t) || t;
                }
            }
            f = this.preamble;
            if(f){
                f.apply(this, t);
            }
        }
        if(ctor){
            ctor.apply(this, a);
        }
        f = this.postscript;
        if(f){
            f.apply(this, a);
        }
    };
}
function chainedConstructor(bases, ctorSpecial){
    return function(){
        var a = arguments, args = a, a0 = a[0], f, i, m,
            l = bases.length, preArgs;

        if(!(this instanceof a.callee)){
            return applyNew(a);
        }
        if(ctorSpecial && (a0 && a0.preamble || this.preamble)){
            preArgs = new Array(bases.length);
            preArgs[0] = a;
            for(i = 0;;){
                a0 = a[0];
                if(a0){
                    f = a0.preamble;
                    if(f){
                        a = f.apply(this, a) || a;
                    }
                }
                f = bases[i].prototype;
                f = f.hasOwnProperty("preamble") && f.preamble;
                if(f){
                    a = f.apply(this, a) || a;
                }
                if(++i == l){
                    break;
                }
                preArgs[i] = a;
            }
        }
        for(i = l - 1; i >= 0; --i){
            f = bases[i];
            m = f._meta;
            f = m ? m.ctor : f;
            if(f){
                f.apply(this, preArgs ? preArgs[i] : a);
            }
        }
        f = this.postscript;
        if(f){
            f.apply(this, args);
        }
    };
}

function simpleConstructor(bases){
    return function(){
        var a = arguments, i = 0, f, m;

        if(!(this instanceof a.callee)){
            return applyNew(a);
        }
        for(; f = bases[i]; ++i){
            m = f._meta;
            f = m ? m.ctor : f;
            if(f){
                f.apply(this, a);
                break;
            }
        }
        f = this.postscript;
        if(f){
            f.apply(this, a);
        }
    };
}
function applyNew(args){
    var ctor = args.callee, t = forceNew(ctor);
    ctor.apply(t, args);
    return t;
}
function forceNew(ctor){
    xtor.prototype = ctor.prototype;
    var t = new new Function;
    xtor.prototype = null;
}
function extraNames() {
    var extraNames, extraLen, empty = {};
    for(var i in {toString: 1}){ extraNames = []; break; }
    return extraNames = extraNames || ["hasOwnProperty", "valueOf", "isPrototypeOf",
        "propertyIsEnumerable", "toLocaleString", "toString", "constructor"];
    extraLen = extraNames.length;
}
function mixOwn(target, source){
    var name, i = 0, l = extraNames.length;
    for(name in source){
        if(name != cname && source.hasOwnProperty(name)){
            target[name] = source[name];
        }
    }
    for(; i < l; ++i){
        name = extraNames[i];
        if(name != cname && source.hasOwnProperty(name)){
            target[name] = source[name];
        }
    }
}
function c3mro(bases, className){
    var result = [], roots = [{cls: 0, refs: []}], nameMap = {}, clsCount = 1,
        l = bases.length, i = 0, j, lin, base, top, proto, rec, name, refs;

    for(; i < l; ++i){
        base = bases[i];
        if(!base){
            err("mixin #" + i + " is unknown. Did you use moor.require to pull it in?", className);
        }else if(opts.call(base) != "[object Function]"){
            err("mixin #" + i + " is not a callable constructor.", className);
        }
        lin = base._meta ? base._meta.bases : [base];
        top = 0;
        for(j = lin.length - 1; j >= 0; --j){
            proto = lin[j].prototype;
            if(!proto.hasOwnProperty("declaredClass")){
                proto.declaredClass = "uniqName_" + (counter++);
            }
            name = proto.declaredClass;
            if(!nameMap.hasOwnProperty(name)){
                nameMap[name] = {count: 0, refs: [], cls: lin[j]};
                ++clsCount;
            }
            rec = nameMap[name];
            if(top && top !== rec){
                rec.refs.push(top);
                ++top.count;
            }
            top = rec;
        }
        ++top.count;
        roots[0].refs.push(top);
    }

    while(roots.length){
        top = roots.pop();
        result.push(top.cls);
        --clsCount;
        while(refs = top.refs, refs.length == 1){
            top = refs[0];
            if(!top || --top.count){
                top = 0;
                break;
            }
            result.push(top.cls);
            --clsCount;
        }
        if(top){
            for(i = 0, l = refs.length; i < l; ++i){
                top = refs[i];
                if(!--top.count){
                    roots.push(top);
                }
            }
        }
    }
    if(clsCount){
        err("can't build consistent linearization", className);
    }

    base = bases[0];
    result[0] = base ?
        base._meta && base === result[result.length - base._meta.bases.length] ?
            base._meta.bases.length : 1 : 0;

    return result;
}

var _listener = {
        getDispatcher: function(){
            return function fn(){
                var ap = Array.prototype, c = fn, ls = c._listeners, t = c.target,
                    r = t && t.apply(this, arguments),
                    i, lls = [].concat(ls);

                for(i in lls){
                    if(!(i in ap)){
                        lls[i].apply(this, arguments);
                    }
                }
                return r;
            };
        },
        add: function(source, method, listener){
            source = source || moor.global;
            var f = source[method];
            if(!f || !f._listeners){
                var d = _listener.getDispatcher();
                d.target = f;
                d._listeners = [];
                f = source[method] = d;
            }
            return f._listeners.push(listener);
        },
        remove: function(source,  method, handle){
            var f = (source || moor.global)[method];
            if(f && f._listeners && handle--){
                delete f._listeners[handle];
            }
        }
}

//##m7Util.js##
var moorCall={
	moortools:{},
	Phone:{},
	stateElement:{
		ring:{
			innerRing:null,
			normalRing:null,
			listenRing:null,
		},
		link:{
			consultationLink:null,
			dialoutLink:null,
			innerLink:null,
			listenLink:null,
			normalLink:null,
			threeWayCallLink:null,
		},
		ringring:{
			normalRinging:null,
			innerRinging:null,
			consultationRinging:null
		},
		abate:{},
		hole:{},
		invalid:{},
		peerState:{},
		base:{}
	},
	SoftphoneBar:{},
	callProcessor:{},
	recordError:{},
	Monitor:{}
};

//##moortools.js##
senvenProvide("moorCall.moortools");
moorCall.moortools.m7BeginLogon = function (loginName, password, extenType, agentStatus) {
    var config = {
        Monitor: false,
        proxy_url: service_url,//在用户中心查询到的地址，如：https://pbx-bj-ali2.7moor.com
        extenType: extenType,
        password: password,
        User: loginName,
        busyType: agentStatus
    };
    moorCall.moortools.m7initPhone(config);
};
moorCall.moortools.notifyDialogStayRemain;
moorCall.moortools.notifyDialogInterval = "";
moorCall.moortools.index = 1;
moorCall.moortools.input = function(connectType) {
	inputFunc(connectType);
};

moorCall.moortools.close = function() {
    // m7$('#cover').css("display", "none")
    // if(moorCall.moortools.notifyDialogInterval != "") {
    //     clearInterval(moorCall.moortools.notifyDialogInterval);
    // }
    // var bgObj = document.getElementById("hollyc5.bgDiv");
    // var msgObj = document.getElementById("hollyc5.msgDiv");
    // if(msgObj != null) {
    //     m7$(msgObj).remove();
    // }
    // if(bgObj != null) {
    //     m7$(bgObj).remove()
    // }
};
moorCall.moortools.success = function(message) {
	successFunc();
};
moorCall.moortools.loading = function(message, parentId, obj) {
	loadingFunc(message, parentId, obj);
};


moorCall.moortools.getDate = function(date) {
    var year = date.getFullYear();
    var minute = date.getMinutes();
    var day = date.getDate();
    var hour = date.getHours();
    var month = date.getMonth() + 1;
    var second = date.getSeconds();
    return year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) + " "
        + (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute) + ":" + (second > 9 ? second : "0" + second);
};
moorCall.moortools.m7CheckHide = function() {
    if(moorCall.moortools.notifyDialogStayRemain <= 0){
        moorCall.moortools.m7HideNotify();
    }
    moorCall.moortools.notifyDialogStayRemain -= 500;
};
moorCall.moortools.m7CheckLoadingHide = function(destExten) {
    var index = moorCall.moortools.index ++;
    var html = ("正在等待<span style='color:#3fb23f;font-weight:bold'>"+destExten+ "</span>接听，" + "请稍后<span style='font-weight:bold'>(00:" + (index<10?("0"+index):index) +")</span>");
    document.getElementById("hollyc5.loading.message").innerHTML = html;
    if(moorCall.moortools.notifyDialogStayRemain <= 0){
        moorCall.moortools.m7HideNotify();
    }
    moorCall.moortools.notifyDialogStayRemain -= 1000;
};
moorCall.moortools.m7ShowLoading = function(destExten, obj) {
    moorCall.moortools.notifyDialogStayRemain = 40000;
    moorCall.moortools.index = 1;
    moorCall.moortools.loading("", "softphonebar", obj || {});
    moorCall.moortools.notifyDialogInterval = setInterval(function(){
        moorCall.moortools.m7CheckLoadingHide(destExten);
    }, 1000);
};
moorCall.moortools.error = function(message) {
    errorFunc(message);
}
moorCall.moortools.initPhoneAgentStatus = function (message) {
    var statusStr = message.split(',').slice(3)
    var html = ""
    for (var i = 0; i < statusStr.length - 1; i++) {
        var item = statusStr[i]
        var statusStrName = item.split(':')[1]
        var statusStrIndex = item.split(':')[0].toString()
        html += '<a href="#" onclick="javascript:phone.m7SetBusy(true, '+statusStrIndex +', this)" id="userStatus_'+[i + 3]+'"  class="RestDisable userStatus">' +
            '<span class="ponit"></span>' + statusStrName + '<span class="line"></span></a>'
    }
    m7$("#phoneConfigStatus").html(html)
}
moorCall.moortools.m7ShowSuccess = function(message) {
    moorCall.moortools.notifyDialogStayRemain = 500;
    moorCall.moortools.success(message);
    moorCall.moortools.notifyDialogInterval = setInterval("moorCall.moortools.m7CheckHide()", 500);
};

moorCall.moortools.m7HideNotify = function() {
	moorCall.moortools.close();
	clearInterval(moorCall.moortools.notifyDialogInterval);
};
moorCall.moortools.m7getUrlVal = function (param) {
    var query = window.location.search;
    var iStart = query.indexOf(param);
    var iLen = param.length;
    if (iStart == -1) {
        return "";
    }
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart);
    if (iEnd == -1){
        return query.substring(iStart);
    }
    return query.substring(iStart, iEnd);
};
moorCall.moortools.m7initPhone = function (config) {
    moorCall.Phone.registerEvent(config);
};
moorCall.moortools.m7logout = function(){
    phone.destroy(true)
};
moorCall.moortools.m7afterPhone = function (phone) {
    if (phone) {
        softphoneBar = moorCall.SoftphoneBar.constructor(phone, "softphonebar");
		callProcessor = moorCall.callProcessor.constructor(phone);
		//移除监控
		// monitor = moorCall.Monitor.constructor(phone)
		//登录回调
		afterPhone();
    }
};

//##moortools.js##
//##m7PhoneBar.js##
senvenProvide("moorCall.Phone");

moorCall.Phone={
    m7MonitorServiceNum: [],
    m7MonitorQueues: [],
    m7AccountCall: null,
    m7MonitorPeers: [],
    m7NormalRinging: null,
    m7ConsultationRinging: null,
    m7ListenLink: null,
    m7PeerState: null,
    m7Invalid: null,
    m7Hold: null,
    m7Base: null,
    m7InnerRing: null,
    m7ConsultationLink: null,
    m7InnerLink: null,
    m7InnerRinging: null,
    m7DialoutLink: null,
    m7ThreeWayCallLink: null,
    m7NormalLink: null,
    m7Abate: null,
    m7ListenRing: null,
    m7NormalRing: null,
    callObject: {},
    m7IsWaitingEvent: false,
    m7CurentChannel: null,
    m7Destroyed: false,
    m7OtherChannel: null,
    m7IsSetbusy: false,
    m7BusyType: '0',
    m7CallId: null,
    m7IsLooter: false,
    m7IccCount:0,
    m7IsInvestigatting: false,
    dialoutData: null,
    m7Handle: [],
    m7IsRing: false,
  m7IsCallingOut:false,
    constructor: function(config) {
        var evtHandle = this.register("EvtAutoBusyTime", this, "m7AutoBusyTimeChanged");
        this.m7Handle.push(evtHandle);
        this.m7InitConfig(config);
        this._evtXhr = moor._xhrObj();
		this.m7WaitEvent();
		return this;
    },
    m7InitConfig: function(config) {
        for (var i in config) {
            this[i] = config[i];
        }
    },
    m7stopEvent: function() {
        if (this._evtXhr) {
            this._evtXhr.abort();
            this._evtXhr = null;
        }
    },
    destroy: function(removeQueue) {
        if (!this.m7Destroyed) {
            for (var i in this.m7Handle) {
                this.m7Noregister(this.m7Handle[i]);
            }

            this.m7stopEvent();
            this.m7exit(this.loginName, removeQueue);
            this.m7Destroyed = true;
        }
    },
    m7RemoteRing: function(callId, remoteId) {
        this._outboundId = callId;
    },
    register: function(evtType, obj, method) {
        return senvenMSubscribe(evtType, obj, method);
    },
    m7Register: function(info) {
    },
    m7exit: function(loginName, removeQueue) {
        var self = this;
        if (!loginName) {
            loginName = self.loginName;
        }
        var returnUrl = "./login.html";
        if(removeQueue == undefined) {
            removeQueue = true;
        }
        var phoneJson = {
            Command:"Action",
            Action:"Logoff",
            Account: self.accountId,
            SessionID:self.uniqueId,
            User: self.userId,
            PBX: self.pbx_in_ip,
            ActionID:"Logoff"+Math.random(),
            QueueRemove:removeQueue
        };
        var url = this.proxy_url;
        var result = false;
        m7$.ajax({
            url: url,
            data: {json: JSON.stringify(phoneJson)},
            jsonp: "callbackName",
            async: true,
            dataType: 'jsonp',
            timeout: 15000,
            success: function(response, ioArgs) {
                window.location = returnUrl;
            },
            error: function(response, ioArgs) {
                result = true;
                window.location = returnUrl;
            }
        });
    },
    m7pick: function (userId) {
        console.debug("签入座席"+userId);
        var self = this;
        var peer = self.m7MonitorPeers[userId];
        if(peer == null || peer.localNo == null || peer.localNo == ""){
            moorCall.moortools.error("不能对没有直线号码的座席做签入操作");
            return;
        }
        this.m7SendAction("SignIn", {
            User: userId
        },function(response, ioArgs) {
            if (response.Succeed) {
                moorCall.moortools.m7ShowSuccess("座席签入成功");
            } else {
                if(response.Expired){
                    self.m7Relogin();
                }
            }
        });
    },
    m7Noregister: function(handle) {
        sevenMUsubscribe(handle);
    },
    m7eventHandler: function(evtJsons) {
        var errorItem = ''

        try{
            var self = this;
            evtJsons.forEach(function (item) {
                errorItem=item
                if(self.m7Base == null) {
                    self.m7Base = moorCall.stateElement.base.constructor(self);
                }
                self.m7Base.m7ChooiceState(item);
            })
        } catch (e){
            if (e && e.stack) {
                var currentTime = moorCall.recordError.getCurrentTime();
                var data = {error: e, errorTime: currentTime, flag: "pageError", errorItem: errorItem}
                moorCall.recordError.dataHandle(data)
            }
            console.dir(e);
        }
    },
    m7WaitEvent: function() {
        if (this.m7IsWaitingEvent) {
            return;
        }
        if (!this.uniqueId || !this.userId){
            return
        }
        if (this._evtXhr == null) return;
        this.m7IsWaitingEvent = true;
        var self = this;
        var url = this.proxy_url;
        var phoneJson = {
            Command: "Action",
            Action: "GetState",
            SessionID: this.uniqueId,
            ActionID: "GetState"+Math.random(),
            User: this.userId
        };
        m7$.ajax({
            url: url,
            data: {json: JSON.stringify(phoneJson)},
            jsonp: "callbackName",
            async: true,
            dataType: 'jsonp',
            timeout: 15000,
            success: function(response, ioArgs){
                moorCall.recordError.sendActionToPbx()
                self.m7IccCount = 0;
                self.display("");
                if (!response) {
                    return;
                }
                var datas=response;
                var _response = datas.Response;
                if (!_response) {
                    _response = datas;
                }
                if (_response.Succeed && !_response.HasEvent) {

                } else if (!_response.Succeed) {
                    if (_response.Expired) {
                        var currentTime = moorCall.recordError.getCurrentTime();
                        var errorData = {eventJson: "GetState", catchRecord: _response.Message, errorTime: currentTime}
                        moorCall.recordError.dataHandle(errorData)
                        self.m7Relogin();
                        self.m7IsWaitingEvent=false;
                        return;
                    }
					window.setTimeout(function () {
						self.m7IsWaitingEvent = false;
 						self.m7WaitEvent();
                    }, 2000)
                    return
                } else {
                    if (_response.Kick) {
                        var comments = "";
                        if(_response.Comments)
                            comments = _response.Comments;
                        if(comments == "ukick" || comments == "ekick")
                            moorCall.moortools.error("您当前的会话已经失效,导致该问题的原因是别的座席使用相同的帐号（或相同的分机）登录了");
                        else
                            moorCall.moortools.error("您当前的会话已经失效,导致该问题的原因可能是被管理员强制签出");
                        // window.location = "./notify.html";
                        self.destroy();
                        return;
                    } else {
                        var events = datas.Event;
                        if(events != null) {
                            self.m7eventHandler(events);
                        }
                    }

                }
                self.m7IsWaitingEvent = false;
                self.m7WaitEvent();
            },

            error: function(response, ioArgs){
                self.m7IsWaitingEvent = false;
                window.setTimeout(function(){
                    self.m7IccCount++;
                    if (self.m7IccCount > 3) {
                        self.display("连接服务器超时，可能是您的网络问题，正在尝试重新连接...");
                        var currentTime = moorCall.recordError.getCurrentTime();
                        var errorData = {eventJson: "GetState", catchRecord: response, errorTime: currentTime}
                        moorCall.recordError.dataHandle(errorData)
                    }
                    self.m7WaitEvent();
                }, 1000);
                return;
            }
        });
    },
    m7hangupChann: function(channel){
        var self = this;
        console.debug("强拆"+channel);
        var params = {
            Channel: channel
        };
        var onload = function(response, ioArgs) {
            if (!response.Succeed) {
              if(response.Expired){
                self.m7Relogin();
              }
            }
        };
        if (this.m7Destroyed) return;
        var phoneJson = {};
        var url = this.proxy_url;
        m7$.extend(phoneJson,{
            Command:"Action",
            Action:"Hangup",
            Account:this.accountId,
            ActionID:"ForceHangup" + Math.random(),
            PBX:this.pbx_in_ip,
            SessionID:this.uniqueId
        });
        m7$.extend(phoneJson,params);
        if (onload == null) {
            onload = function(response, ioArgs) {
            }
        }

        m7$.ajax({
            url: url,
            data: {json: JSON.stringify(phoneJson)},
            jsonp: "callbackName",
            async: true,
            dataType: 'jsonp',
            timeout: 15000,
            success: onload,
            error: function(response, ioArgs) {
                console.dir(response);
            }
        });

    },
    display:function(message){
        var netMessage=m7$("#netMessage");
        if(netMessage){
            netMessage.html(message)
        }
    },
    m7Relogin: function(){
        if(this._isRelogin) {
            return;
        }
        var self = this;
        self._isRelogin = true;
        var url = this.proxy_url;
        var phoneJson = {
            Command:"Action",
            Action:"Login",
            User:self.loginName,
            Password:self.password,
            ActionID:"Login"+Math.random(),
            ExtenType:self.extenType,
            AutoBusy:false,
            Monitor: self.Monitor
        };
        m7$.ajax({
            url: url,
            data: {json: JSON.stringify(phoneJson)},
            jsonp: "callbackName",
            async: true,
            dataType: 'jsonp',
            timeout: 15000,
            success: function(response, ioArgs) {
                var _response = response;
                if (_response.SessionID) {
                    isCtiRelogin = true
                    self.uniqueId = _response.SessionID;
                    var date = new Date();
                    var identity = date.valueOf();
                    self.currentServerTime = identity - _response.Timestamp*1000;
                    if (_cti_peerstate == 1) {
                        if(self.m7PeerState.m7CurPeerStateKey == '0') {
                            self.m7SetBusy(false,self.m7PeerState.m7CurPeerStateKey);
                        } else if(self.m7PeerState.m7CurPeerStateKey != '99') {
                            self.m7SetBusy(true,self.m7PeerState.m7CurPeerStateKey);
                        }
                    }
                    // moorCall.moortools.initPhoneAgentStatus(_response.PhonebarConfig);
                    self.m7WaitEvent();
                } else if (!_response.Succeed) {
                    var code = _response.Result;
                    if(code){
                        if(code == 400) {
                            moorCall.moortools.error("没有对应接听设备" + code);
                        } else if(code == 404) {
                            moorCall.moortools.error("密码，账号，或者proxy_url不正确" + code);
                        } else if(code == 406) {
                            moorCall.moortools.error("坐席license版本问题，您登陆坐席的版本不支持使用软电话条" + code);
                        } else if(code == 601){
                            moorCall.moortools.error("您的账户通话座席登录数已达最大或者已经到期" + code);
                        } else if(code == 602){
                            moorCall.moortools.error("您的账户无通话座席登录数已达最大或者已经到期" + code);
                        } else if(code == 603){
                            moorCall.moortools.error("账户license到期，请联系管理员" + code);
                        }
                    } else {
                        moorCall.moortools.error("您当前的会话已经失效,导致该问题的原因可能是被管理员强制签出");
                    }
                    // window.location = "./notify.html";
                    self.destroy();
                }
                self._isRelogin = false;
            },
            error: function(response, ioArgs) {
                console.debug("ACTION返回错误[%s]", response);
            }
        });

    },
    m7Ring: function(callId, remoteId) {
        this.oldInboundId = this._inboundId;
        console.debug("控件onRing返回[callId:%s,remoteId:%s]", callId, remoteId);
        this._inboundId = callId;
    },
   m7AutoBusyTimeChanged: function(autoBusyTime) {
        this.autoBusyTime = autoBusyTime;
    },
    consult: function(phoneNum, mode) {
        var self = this;
        if(phoneNum.substr(0,1) == '9' && mode == 'external') {
            if(phoneNum.length <= 5) {
                phoneNum = phoneNum.substr(1);
                var peer = this.m7Base.m7getPhoneUserViaExten(phoneNum);
                if(!peer) {
                    phoneNum = "9" + phoneNum;
                }
            }
        }
        if(phoneNum.length > 4 && mode != 'skillgroup') {
            moorCall.moortools.m7ShowLoading(phoneNum, {num:phoneNum,type:'consult'});
            fromCid = this.sipNo + '@' + this.didNum;
        } else if(phoneNum.length <= 4 && mode != 'skillgroup'){
            if(phoneNum.substr(0,1) != '9') {
                moorCall.moortools.m7ShowLoading("工号  " + phoneNum + " ", {num:phoneNum,type:'consult'});
            } else {
                moorCall.moortools.m7ShowLoading(phoneNum, {num:phoneNum,type:'consult'});
            }
        } else if(mode == 'skillgroup') {
            moorCall.moortools.m7ShowLoading(phoneNum, {num:phoneNum,type:'consult'});
        }
        this.m7SendAction("Consult", {
            FromExten: self.sipNo,
            Exten: phoneNum,
            UserID: self.userId,
            Version: 'New',
            Timeout: 60000
        },function(response, ioArgs) {
            if (response.Succeed) {
                if (response.Version && response.Version === 'New') { // response.IsSupportCancel判断不能写外层，因为IsSupportCancel是后端加了才会显示，其他的还是默认隐藏
                    if (response.IsSupportCancel && response.IsSupportCancel === 'True') {
                        m7$('#cancelConsult').show().css({'display': 'block'}) // 显示取消咨询的按钮（其他情况默认隐藏）
                    } else {
                        m7$('#cancelConsult').hide()
                    }
                    // 为啦兼容老版电话条 如果有Version说明是新的咨询，需要通过事件来通知是成功还是失败
                } else {
                    moorCall.moortools.close();
                    m7$('#cancelConsult').hide()
                    moorCall.moortools.m7ShowSuccess("咨询成功");
                    self.m7changeState("stConcultTalking");
                }
            } else {
                moorCall.moortools.close();
                moorCall.moortools.error("咨询失败");
                if(response.Expired) {
                    self.m7Relogin();
                }
            }
        },function(response, ioArgs) {
            moorCall.moortools.close();
            moorCall.moortools.error("咨询失败");
        });
    },

    cancelConsult: function(exten){
        // m7OtherChannel当前会话的标志值
        var self = this
        var fromExten = this.User?this.User.substring(0,this.User.indexOf('@')):''
        if (self.m7OtherChannel) {
            this.m7SendAction("CancelConsult", {
                Channel: self.m7OtherChannel,
                ConsultExten: exten + '',
                FromExten: fromExten,
                UserID: self.userId,
                Version: 'New',
                Timeout: 60000
            },function(response, ioArgs) {
                if (response.Succeed) {
                    moorCall.moortools.close();
                    moorCall.moortools.m7ShowSuccess("取消咨询成功")
                } else {
                    alert("取消咨询失败!")
                    // moorCall.moortools.error("取消咨询失败!");
                    if(response.Expired) {
                        self.m7Relogin();
                    }
                }
            },function(response, ioArgs) {
                alert("取消咨询失败!")
                // moorCall.moortools.error("取消咨询失败");
            });
        }
    },

    batchDialout: function(phoneNum, data) {
        var self = this;
        if(phoneNum && data) {
            var context = data.context;
            var type = data.type;
            var callbackSuccFun = data.callbackSuccFun;
            var callbackFailFun = data.callbackFailFun;
            var callbackObj = data.callbackObj;

            this.m7SendAction("BatchDialout", {
                BatchDialoutType: type,
                Context: context,
                CallNumber: phoneNum,
                Timeout: 120000,
                Async: "true"
            },function(response, ioArgs) {

                if (response.Succeed) {
                    console.debug("批量外呼[%s]成功", phoneNum);
                    callbackSuccFun.call(callbackObj, response.Message);
                } else {
                    callbackFailFun.call(callbackObj, 0);
                }
            },function(response, ioArgs){
                callbackFailFun.call(callbackObj, 0);
            });
        }
    },
    playDtmf: function(num) {
        sipPhone.playDtmf(num);
    },
    m7StopSound: function(){
        try {
            if (document.soundPlayer) {
                document.soundPlayer.stop();
            }
        } catch (e) {
            console.debug(e);
        }
    },
    answer: function() {

    },
    dialout: function(phoneNum,type) {
        if(type == 'smallPhone'){
            //小号
            console.debug("呼叫："+phoneNum);
            var self = this;
            if (self.User&&self.User.indexOf("@") != -1) {
                var exten = self.User.split("@")[0];
            }
            var sendData = {
                exten:exten,
                called: phoneNum,
                cdrVar: phoneNum,
                actionId:"xiaohao",
            }
            //https的域名https://xiaohaobar.7moor.com
            var account = "N00000012351";//需要调整成自己账号的账户编号
            var secret = "a0d29a50-03b5-11e7-a6f4-5f4d6bb88e4b";//需要调整成自己账号的账户秘钥
            var timestamp = new Date().Format('yyyyMMddhhmmss');
            var sig_ = md5(account + secret + timestamp);
            var sig =sig_.toUpperCase();
            var authorization = Base64.encode(account + ':' + timestamp);
            m7$.ajax({
                url: "https://apis.7moor.com/v20160818/rlxh/dialout/" + account + "?sig="+ sig,
                type: 'post',
                data: JSON.stringify(sendData),
                dataType:'json',
                contentType: "application/json;charset=utf-8",
                headers: { 'Authorization': authorization},
                jsonp: 'callback',
                success:function(data){
                    if(data.Succeed == true){
                        console.debug("外呼[%s]成功", phoneNum);
                    } else {
                        console.debug("外呼失败");
                        moorCall.moortools.error(data.message);
                    }
                },
                error: function (data) {
                    alert("外呼失败")
                }
            });
        }else{
            //普通
            var self = this;
            var call_type = "";

            if(phoneNum.length < 5) {
                var peer = this.m7Base.m7getPhoneUserViaExten(phoneNum);
                if(!peer) {
                    phoneNum = "9" + phoneNum;
                    call_type = "dialout";
                    self.callObject.originCallNo = self.didNum;
                    self.callObject.originCalledNo = phoneNum;
                } else {
                    call_type = "inner";
                }
            } else {
                phoneNum = "9" + phoneNum;
                call_type = "dialout";
                self.callObject.originCallNo = self.didNum;
                self.callObject.originCalledNo = phoneNum;
            }

            this.m7SendAction("Originate", {
                Channel: "SIP/" + self.sipNo,
                Context: self.accountId,
                Exten: phoneNum,
                Priority: '1',
                UserID: self.userId,
                Timeout: 60000,
                Async: "true",
                CallType: call_type
            },function(response, ioArgs) {
                var json = response;
                if (!response.Succeed) {
                    if(response.Expired){
                        self.m7Relogin();
                    }
                }
            });
        }
    },
  m7SendAction: function(action, params, onload, onerror) {
        if (this.m7Destroyed) {
            return;
        }
        var phoneJson = {};
        var url = this.proxy_url;
        m7$.extend(phoneJson,{
            Command:"Action",
            Action:action,
            Account:this.accountId,
            ActionID:action+Math.random(),
            PBX:this.pbx_in_ip,
            SessionID:this.uniqueId
        });

        m7$.extend(phoneJson,params);

        var timeout = params.Timeout?params.Timeout:60000;

        if (onload == null) {
            onload = function(response, ioArgs) {
            }
        }

        if(onerror == null){
            onerror = function(response, ioArgs) {
            }
        }

        m7$.ajax({
            url: url,
            data: {json: JSON.stringify(phoneJson)},
            jsonp: "callbackName",
            async: true,
            dataType: 'jsonp',
            timeout: timeout,
            success: onload,
            error: onerror
        });
    },
    stopConsult: function() {
        var self = this;
        this.m7SendAction("StopConsult",  {
            FromExten: self.sipNo,
            UserID: self.userId,
            Timeout: 60000
        },function(response, ioArgs) {
            if (response.Succeed) {
                if(response.Message != undefined) {
                    if(response.Message == "Idle") {
                        self.m7changeState("stInvalid");
                    } else {
                        self.m7changeState("stTalking");
                    }
                } else {
                    self.m7changeState("stTalking");
                }
            } else {
                if(response.Expired){
                    self.m7Relogin();
                }
                moorCall.moortools.error("结束咨询通话失败");
            }
        });
    },
    hangup: function() {
        var self = this;
        this.m7SendAction('Hangup', {
            Channel: self.m7CurentChannel
        }, function(response, ioArgs) {
            if (!response.Succeed) {
              self.callObject = {};
              if(response.Expired){
                self.m7Relogin();
              }
            }
        });
    },
    hold: function() {
        var self = this;
        this.m7SendAction("Hold", {
            UserID: self.userId,
            Channel: self.m7OtherChannel,
            Async: "true"
        },function(response, ioArgs) {
            if (response.Succeed) {
                self._stateBeforeHold = self.m7Base.m7CurrentCallState.m7CallState;
                self.m7changeState("stHold");
            } else {
                if(response.Expired){
                    self.m7Relogin();
                }
            }
        });
    },
    unhold: function() {
        var self = this;
        this.m7SendAction("Unhold", {
            UserID: self.userId,
            Channel: self.m7OtherChannel,
            Async: "true"
        },function(response, ioArgs) {
            if (response.Succeed) {
                self.m7changeState(self._stateBeforeHold);
            } else {
                if(response.Expired){
                    self.m7Relogin();
                }
            }
        });
    },
    investigate: function() {
        if(this.m7IsInvestigatting) {
            return;
        } else {
            this.m7IsInvestigatting = true;
        }
        var self = this;
        var userId = self.userId;
        var context = self.accountId + "-investigate";
        self.m7SendAction('Transfer', {
            Exten: 's',
            Channel: self.m7OtherChannel,
            CallType: "investigate",
            UserID: userId,
            Context: context
        }, function(response, ioArgs) {
            if (!response.Succeed) {
              self.m7IsInvestigatting = false;
              if(response.Expired){
                self.m7Relogin();
              }
            }
        });
        this.m7IsInvestigatting = false;
    },
    transfer: function(destExten, mode, values) {
        var self = this;
        var fromCid = self.callObject.originCallNo;
        if(destExten.substr(0,1) == '9' && mode == 'external') {
            if(destExten.length <= 5) {
                destExten = destExten.substr(1);
                var peer = this.m7Base.m7getPhoneUserViaExten(destExten);
                if(!peer) {
                    destExten = "9" + destExten;
                }
            }
        }

        if(destExten.length > 4 && mode != 'skillgroup') {
            moorCall.moortools.m7ShowLoading(destExten);
            fromCid = this.sipNo + '@' + this.didNum;
        } else if(destExten.length <= 4 && mode != 'skillgroup'){
            if(destExten.substr(0,1) != '9') {
                moorCall.moortools.m7ShowLoading("工号  " + destExten + " ");
            } else {
                moorCall.moortools.m7ShowLoading(destExten);
            }
        } else if(mode == 'skillgroup') {
            moorCall.moortools.m7ShowLoading(destExten);
        }

        var synData = moor.objectToQuery(values);
        var context = "";
        context = this.accountId;
        var workSheetId;
        var customerId;
        if(self.callObject && self.callObject.data){
            workSheetId = self.callObject.data.workSheetId;
            customerId = self.callObject.data.customerId;
        }
        self.m7SendAction('Transfer', {
            WorkSheetID: workSheetId?workSheetId:"",
            CustomerID: customerId?customerId:"",
            Exten: destExten,
            Channel: self.m7OtherChannel,
            ExtraChannel: self.m7CurentChannel,
            UserID: self.userId,
            Context: context
        }, function(response, ioArgs) {
            moorCall.moortools.close();
            if (response.Succeed) {
                moorCall.moortools.m7ShowSuccess("转接成功");
            } else{
                var message = "";
                if(response.Message == "310") {
                    message = "未配置外呼线路";
                } else if(response.Message == "311"){
                    message = "转接的用户忙";
                } else if(response.Message == "312"){
                    message = "转接的用户未签入";
                } else if(response.Message == "313"){
                    message = "转接的用户正在通话";
                } else if(response.Message == "314"){
                    message = "转接的用户没有以通话方式登录";
                } else if(response.Message == "315"){
                    message = "无法呼通转接的用户";
                } else if(response.Message == "316"){
                    message = "转接用户不存在";
                } else {
                    message = "";
                }

                if(message == "") {
                    moorCall.moortools.error("转接失败");
                } else {
                    moorCall.moortools.error("转接失败：" + message);
                }
                if(response.Expired){
                    self.m7Relogin();
                }
            }
        },function(response, ioArgs) {
            moorCall.moortools.close();
        });
    },
    m7CalloutFail: function(callId, cause) {
        if (this.state == "stConsulting") {
            if (this._inboundId) {
                sipPhone.ChangeCurrentCall(this._inboundId);
                this.m7changeState("stTalking");
            }
        }
    },
    listen: function(channel) {

        var self = this;
        if(this.m7PeerState.m7CurPeerStateKey == "0") {
            moorCall.moortools.error("请先将电话置为忙碌");
            return;
        }
        this.m7SendAction("Originate", {
            Channel: "SIP/" + self.sipNo,
            Application: "ChanSpy",
            Data: channel+"|bq",
            UserID: self.userId,
            Callerid: self.sipNo,
            Async: "true"
        },function(response, ioArgs) {
            if (response.Succeed) {
                console.debug("监听[%s]成功", channel);
                self.m7OtherChannel = channel;
            } else {
                console.debug("监听[%s]失败"+response.Message, channel);
                if(response.Expired){
                    self.m7Relogin();
                }
            }
        });
    },
    kick: function(exten){
        var self = this;
        this.m7SendAction("Kick", {
            Exten: exten
        },function(response, ioArgs) {
            if (response.Succeed) {
                var peer = self.m7MonitorPeers[exten];
                if(peer){
                    peer.C5Status = "";
                    peer.callNo = "";
                    peer.callStatus = "Idle";
                    var date = new Date();
                    var identity = date.valueOf();
                    peer.timestamp = identity/1000;
                    linked = false;
                    peer.channel = "";
                    peer.linkedChannel = "";
                    console.debug("kickoff");
                    senvenMPublish("EvtMonitorPeer",[peer]);
                    self.m7Base.m7UpdQueueInfo();
                }
            } else {
                if(response.Expired){
                    self.m7Relogin();
                }
            }
        });
    },
    m7PlaySound: function(){
        try {
            if (document.soundPlayer) {
              document.soundPlayer.play();
            }
        } catch (e) {
            console.debug(e);
        }
    },
    threeWayCall: function(phoneNum) {
        var self = this;
        this.m7SendAction("ThreeWayCall",
            {
                FromExten: self.sipNo,
                UserID: self.userId,
                Exten: phoneNum,
                Timeout: 60000
            },function(response, ioArgs) {
                if (response.Succeed) {
                    self.m7changeState("stThreeWayTalking");
                } else {
                    if(response.Expired){
                        self.m7Relogin();
                    }
                    moorCall.moortools.error("三方通话失败");
                }
            });
    },
    m7SetBusy: function(isBusy,busyType, mySelf) {
        if (m7$('.dialoutCenterBox').length >= 1){
            return
        }
        if (m7$(".HangupEnable").css('display') == 'inline-block') { // 通话中不能切换状态~
            moorCall.moortools.error('该状态下不能切换状态!')
            return
        }
        if(this.m7IsSetbusy) {
            return;
        } else {
            this.m7IsSetbusy = true;
        }
        var self = this;
        var params = {
            "Exten": self.userId,
            Busy: isBusy,
            BusyType: "" +busyType
        };
        self.m7SendAction('Busy', params, function(response, ioArgs) {
            var res = response;
            if (!response.Succeed) {
                moorCall.moortools.error('切换状态失败！')
              if(response.Expired){
                self.m7Relogin();
              }
            } else if (response.Succeed){
                prePhonebarStatus = busyType
                changePhoneBarStatus(busyType)
            }
        });
        this.m7IsSetbusy = false;
        this.m7BusyType = busyType
    },
    m7ToIVR: function() {
        var self = this;
        var context = userInfo.accountId + "-validate";
        var actionName = "Validate";
        if(userInfo.accountId == "Q000000003893" || userInfo.accountId == "B000000006069"){
            actionName = "Check";
        }
        self.m7SendAction(actionName, {
            Exten: 's',
            Channel: self.m7OtherChannel,
            Context: context
        }, function(response, ioArgs) {
            if (!response.Succeed) {
              if(response.Expired){
                self.m7Relogin();
              }
              return ERR_NO_SUCH_CHANNEL;
            }
        });
        this.m7IsInvestigatting = false;
        return SUCCESS;
    },
    m7Phone_toMenu: function(exten) {
        var self = this;
        //var exten = "";
        var actionName = "IvrMenu";
        var phoneJson = {
            Channel: this.m7OtherChannel,
            Context: exten
        };
        this.m7SendAction(actionName, phoneJson,function(v) {
            if (v.Succeed) {
                moorCall.moortools.m7ShowSuccess("\u6765\u7535\u6b63\u5728\u8f6c\u9a8c\u8bc1\uff0c\u8bf7\u7a0d\u540e")
            } else {
                if (v.Expired) {
                    self.m7Relogin()
                }
                moorCall.moortools.m7ShowSuccess("\u8f6cIVR\u83dc\u5355\u5931\u8d25");
            }
        }, function() {
            moorCall.moortools.m7ShowSuccess("\u8f6cIVR\u83dc\u5355\u5931\u8d25")
        })
    },
    m7changeState: function(state) {
        senvenMPublish("EvtBarChange", [this.extenType + "_" + state]);
    },
    m7ChangePhone:  function(extenType, extenNum) {
        var self = this;
        if (extenType == "Local" || extenType == "gateway") {
            if(self.extenType == "sip")
                sipPhone.UnInitNoFire();
            self.sipNo = extenNum;
            self.extenType = extenType;
        } else
            return;
        self.m7SendAction('SetExtenType', {
            User: self.userId,
            LoginExten: extenNum,
            ExtenType: extenType,
        }, function(response, ioArgs) {
            if (!response.Succeed) {
              if(response.Expired){
                self.m7Relogin();
              }
            }
        });
    },
    m7LootCall: function(channel){
        var self = this;
        if(this.m7PeerState.m7CurPeerStateKey == "0") {
            moorCall.moortools.error("请先将电话置为忙碌");
            return;
        }
        var context = this.accountId;
        self.m7SendAction('Transfer', {
            Channel: channel,
            CallType: "Loot",
            Exten: self.sipNo,
            UserID: self.userId,
            Context: context
        }, function(response, ioArgs) {
            if (response.Succeed) {
                self.m7IsLooter = true;
            } else {
                if(response.Expired){
                    self.m7Relogin();
                }
            }
        });
    },
};
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
moorCall.Phone.registerEvent = function(config) {
    var result = null;
    var _self = this;
    var url = config.proxy_url;
    var phoneJson = {
        Command:"Action",
        Password: config.password,
        ActionID:"Login"+Math.random(),
        BusyType: config.busyType,
        User: config.User,
        ExtenType: config.extenType,
        Action:"Login",
        Monitor: config.Monitor
    };
    if (isSuperAdmin) { // 是否为超管
        phoneJson = {
            Command:'Action',
            Action:'Login',
            ActionID:"Login"+Math.random(),
            Password:"7pu3refwds98172e",
            UserID:"2387rufhinjvcx73rfws",
            PBX:"pbx.tx.test02.0", // 此pbx当前账号所在的pbx
            Account:"N00000002407", // 当前账号所在的account
            MonitorUser:true
        }
    }
    if (isSuperAdmin) {
        m7$('#moorCall_minitor').show()
        m7$('#softphonebar').hide()
    } else {
        if (config.Monitor) {
            m7$('#moorCall_minitor').show()
            m7$('#softphonebar').show()
        } else {
            m7$('#moorCall_minitor').hide()
            m7$('#softphonebar').show()
        }
    }
    m7$.ajax({
        url: url,
        data: {json: JSON.stringify(phoneJson)},
        jsonp: "callbackName",
        async: true,
        timeout: 15000,
        dataType: 'jsonp',
        success: function(response, ioArgs){
            var _response = response;
            if (_response.SessionID) {
                config.uniqueId = _response.SessionID;
                var date = new Date();
                var identity = date.valueOf();
                config.loginName = config.User;
                config.currentServerTime = identity - _response.Timestamp*1000;
                config.AutoBusyTime = _response.AutoBusyTime;
                config.accountId = _response.Account;
                config.userId = _response.UserID || phoneJson.UserID;
                config.PhonebarConfig = _response.PhonebarConfig;
                config.pbx_in_ip = _response.PBX;
                config.sipNo = _response.SipNum;
                account.sessionId = _response.SessionID
                account.accountId = _response.Account
                account.PBX = _response.PBX
				account.url = config.proxy_url	
				moorCall.Phone.constructor(config)
				result = moorCall.Phone.constructor(config);
				//result = moorCall.phone(config);
                phone = result;
                moorCall.moortools.m7afterPhone(phone);
                moorCall.moortools.initPhoneAgentStatus(_response.PhonebarConfig);
                _self.logonStatus = "logonSuccess";
            } else if (!_response.Succeed) {
                result =  false;
                var code = _response.Result;
                if(code) {
                    if(code == 400) {
                        moorCall.moortools.error("没有对应接听设备" + code);
                    } else if(code == 404) {
                        moorCall.moortools.error("密码，账号，或者proxy_url不正确" + code);
                    } else if(code == 406) {
                        moorCall.moortools.error("坐席license版本问题，您登陆坐席的版本不支持使用软电话条" + code);
                    } else if(code == 601){
                        moorCall.moortools.error("您的账户通话座席登录数已达最大或者已经到期" + code);
                    } else if(code == 602){
                        moorCall.moortools.error("您的账户无通话座席登录数已达最大或者已经到期" + code);
                    } else if(code == 603){
                        moorCall.moortools.error("账户license到期，请联系管理员" + code);
                    }
                }
                _self.logonStatus = "logonFail";
                // _self.destroy();
            } else {
                _self.logonStatus = "logonFail";
                result =  false;
            }
            senvenMPublish("EvtLogon", [_self.logonStatus]);
            return response;
        },
        error: function(response, ioArgs) {
            moorCall.moortools.error("请求超时，请检查本地网络");
            console.debug("注册ass失败");
            console.dir(response);
            _self.logonStatus = "logonFail";
            senvenMPublish("EvtLogon", [_self.logonStatus]);
            // window.location = "./notify.html";
            // alert("login failed!");
            return response;
        }

    });

};
//##m7PhoneBar.js##
//##objectDeclare.js##
/**
 * Created by yangjiao on 2018/10/23.
 */
senvenProvide("moorCall.stateElement.ring.innerRing");
senvenProvide("moorCall.stateElement.ring.normalRing");
senvenProvide("moorCall.stateElement.ring.listenRing");
senvenProvide("moorCall.stateElement.link.consultationLink");
senvenProvide("moorCall.stateElement.link.dialoutLink");
senvenProvide("moorCall.stateElement.link.innerLink");
senvenProvide("moorCall.stateElement.link.listenLink");
senvenProvide("moorCall.stateElement.link.normalLink");
senvenProvide("moorCall.stateElement.link.threeWayCallLink");
senvenProvide("moorCall.stateElement.ringring.normalRinging");
senvenProvide("moorCall.stateElement.ringring.innerRinging");
senvenProvide("moorCall.stateElement.ringring.consultationRinging");
senvenProvide("moorCall.stateElement.abate");
senvenProvide("moorCall.stateElement.hold");
senvenProvide("moorCall.stateElement.invalid");
senvenProvide("moorCall.stateElement.peerState");
senvenProvide("moorCall.stateElement.base");
senvenProvide("moorCall.SoftphoneBar");
senvenProvide("moorCall.callProcessor");
moorCall.stateElement.link.consultationLink= {
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },

  m7Base: null,

  m7ChooiceState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus") {
      if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
      } else if(evtJson.ChannelStatus == "hold") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneHold();
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "threeWayCall") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
        } else if(evtJson.LinkedChannel.ChannelType == "transfer") {
          this.m7Base.m7bus();
        } else if(evtJson.LinkedChannel.ChannelType == "inner") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerLink();
        } else if(evtJson.LinkedChannel.ChannelType == "normal") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
        } else if(evtJson.LinkedChannel.ChannelType == "dialout") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneDialoutLink();
        }
      }
    }
  },
  m7changeState:function() {
  }

}
moorCall.stateElement.link.dialoutLink= {
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },

  m7Base: null,

  m7CallState: "stDialTalking",

  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "hold") {
        this.m7Base.m7CurrentCallState = moorCall.stateElement.hold;
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "consultation") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        } else if(evtJson.LinkedChannel.ChannelType == "ThreeWayCall") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }
      }
    }
  },
  m7changeToolBarState:function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

}
moorCall.stateElement.link.innerLink={
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stInnerTalking",
  m7Base: null,
  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "hold") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneHold();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "consultation") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }
      }
    }
  },
  m7changeToolBarState:function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

}
moorCall.stateElement.link.listenLink={
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stListened",
  m7Base: null,

  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        senvenMPublish("EvtEndListen", []);
      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

}
moorCall.stateElement.link.normalLink= {
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stTalking",
  m7Base: null,

  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "hold") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneHold();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "consultation") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        } else if(evtJson.LinkedChannel.ChannelType == "ThreeWayCall") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }
      }
    }
  },
  m7changeToolBarState:function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

}
moorCall.stateElement.link.threeWayCallLink= {
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stThreeWayTalking",
  m7Base: null,

  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      }
    }
  },
  m7changeToolBarState:function(obj) {
    senvenMPublish("m7Base",[obj.m7CallState]);
  }

}
moorCall.stateElement.ring.innerRing = {
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stInnerDialing",
  m7Base: null,

  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "inner") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }
      }
    }
  },

  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

}
moorCall.stateElement.ring.listenRing= {
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stListening",
  m7Base: null,
  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Up") {
        if(evtJson.ChannelType == "listen") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneListenLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }
      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        senvenMPublish("EvtEndListen", []);
      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

}
moorCall.stateElement.ring.normalRing= {
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stDialing",
  m7Base: null,
  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "dialout") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneDialoutLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        } else if(evtJson.LinkedChannel.ChannelType == "dialTransfer") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneDialoutLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        }

      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

}
moorCall.stateElement.ringring.consultationRinging= {
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7Base: null,
  m7ChooiceState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus") {
      if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "consultation") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
        }
      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
      }
    }
  },

  m7changeState: function() {
  }
}
moorCall.stateElement.ringring.innerRinging={
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stInnerBelling",
  m7Base: null,

  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "threeWayCall") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          if(this.m7Base.m7Phone.m7IsRing) {
            this.m7Base.m7Phone.m7StopSound();
            this.m7Base.m7Phone.m7IsRing = false;
          }
        } else if(evtJson.LinkedChannel.ChannelType == "inner") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          if(this.m7Base.m7Phone.m7IsRing) {
            this.m7Base.m7Phone.m7StopSound();
            this.m7Base.m7Phone.m7IsRing = false;
          }
        }
      } else if(evtJson.ChannelStatus == "Hangup") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        if(this.m7Base.m7Phone.m7IsRing) {
          this.m7Base.m7Phone.m7StopSound();
          this.m7Base.m7Phone.m7IsRing = false;
        }
      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

}
moorCall.stateElement.ringring.normalRinging= {
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stBelling",
  m7Base: null,

  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      if (evtJson.ChannelStatus == "Hangup") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          if(this.m7Base.m7Phone.m7IsRing) {
              this.m7Base.m7Phone.m7StopSound();
              this.m7Base.m7Phone.m7IsRing = false;
          }
      } else if(evtJson.LinkedChannel.ChannelType == "threeWayCall") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        if(this.m7Base.m7Phone.m7IsRing) {
          this.m7Base.m7Phone.m7StopSound();
          this.m7Base.m7Phone.m7IsRing = false;
        }
      } else if(evtJson.LinkedChannel.ChannelType == "transfer") {
        this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
        if(this.m7Base.m7Phone.m7IsRing) {
          this.m7Base.m7Phone.m7StopSound();
          this.m7Base.m7Phone.m7IsRing = false;
        }
      } else if(evtJson.ChannelStatus == "Link") {
        if(evtJson.LinkedChannel.ChannelType == "normal") {
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          if(this.m7Base.m7Phone.m7IsRing) {
            this.m7Base.m7Phone.m7StopSound();
            this.m7Base.m7Phone.m7IsRing = false;
          }
        }

      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

}
moorCall.stateElement.abate={
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stAbate",
  m7Base: null,

  m7ChooiceCallState:function(evtJson) {
    if(evtJson.Event == "PeerStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      var isRegistered = false;
      if(evtJson.PeerStatus == "Registered") {
        isRegistered = true;
      }
      if (isRegistered && this.m7Base.m7CurrentCallState.m7CallState == "stAbate"){
        this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
        this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
      }
    }
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }

}
moorCall.stateElement.hold={
  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7Base: null,
  m7ChooiceState:function(evtJson) {
    if(evtJson.Event == "ChannelStatus") {
      switch(evtJson.ChannelStatus) {
        case 'Hangup':
          this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
          break;
        case 'Link':
          if(evtJson.LinkedChannel.ChannelType == "normalInner") {
            this.m7Base.m7CurrentCallState = this.m7Base._getNormalInnerLink();
          } else if(evtJson.LinkedChannel.ChannelType == "normal") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
          } else if(evtJson.LinkedChannel.ChannelType == "consultation") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
          } else if(evtJson.LinkedChannel.ChannelType == "dialoutInner") {
            this.m7Base.m7CurrentCallState = this.m7Base._getDialoutInnerLink();
          } else if(evtJson.LinkedChannel.ChannelType == "dialout") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneDialoutLink();
          }
          break;
      }
    }
  },
  m7changeState:function() {
  }

}
moorCall.stateElement.invalid={

  constructor: function(base) {
	this.m7Base = base;
	return this;
  },
  m7CallState: "stInvalid",
  m7Base: null,

  m7ChooiceCallState: function(evtJson) {
    if(evtJson.Event == "ChannelStatus" && evtJson.Exten == this.m7Base.m7Phone.sipNo) {
      switch(evtJson.ChannelStatus)
      {
        case 'Ringing':
          if(evtJson.LinkedChannel.ChannelType == "normal") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalRinging();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
            if(!this.m7Base.m7Phone.m7IsRing) {
              this.m7Base.m7Phone.m7PlaySound();
              this.m7Base.m7Phone.m7IsRing = true;
            }
          } else if(evtJson.LinkedChannel.ChannelType == "consultation") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationRinging();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "inner") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerRinging();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
            if(!this.m7Base.m7Phone.m7IsRing) {
              this.m7Base.m7Phone.m7PlaySound();
              this.m7Base.m7Phone.m7IsRing = true;
            }
          } else if(evtJson.LinkedChannel.ChannelType == "dialTransfer") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalRing();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "transfer"){
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalRinging();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
            if(!this.m7Base.m7Phone.m7IsRing) {
              this.m7Base.m7Phone.m7PlaySound();
              this.m7Base.m7Phone.m7IsRing = true;
            }
          }
          break;
        case 'Hangup':
          this.m7Base.m7CurrentCallState = this.m7Base.m7getInvalid();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          break;
        case 'hold':
          this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneHold();
          this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          break;
        case 'Ring':
          if(evtJson.ChannelType == "dialout") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalRing();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.ChannelType == "inner") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerRing();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.ChannelType == "listen") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneListenRing();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          }
          break;
        case 'Up':
          if(evtJson.ChannelType == "listen") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneListenLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          }
          break;
        case 'Link':
          if(evtJson.LinkedChannel.ChannelType == "normal") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "consultation") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneConsultationLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "threeWayCall") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneThreeWayCallLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "inner") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneInnerLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "dialout") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneDialoutLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          } else if(evtJson.LinkedChannel.ChannelType == "transfer") {
            this.m7Base.m7CurrentCallState = this.m7Base.m7getPhoneNormalLink();
            this.m7changeToolBarState(this.m7Base.m7CurrentCallState);
          }
          break;
      }
    }

  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtCallToolBarChange",[obj.m7CallState]);
  }
}
moorCall.stateElement.peerState= {
  m7CallStateValue: [],
  constructor: function(base) {
    this.m7Base = base;
    if(this.m7States == '') {
      var self = this;
      self.m7Base.m7Phone.PhonebarConfig.split(",").forEach(function(items) {
        self.m7put(items.split(":")[0],items.split(":")[1]);
        self.m7CallStateValue.push(items.split(":")[1]);
      });
    }
    this.m7CallStateValue["0"] = "stInvalid";
    this.m7CallStateValue["1"] = "stBusy";
    this.m7CallStateValue["2"] = "stRest";
    this.m7CallStateValue["99"] = "stSystemBusy";
    return this;
  },
  m7CurPeerStateKey: "0",
  m7States: new Array(),
  m7Base: null,
  m7CurPeerAutoTimeStateKey: "",

  _get: function(_key) {
    try{
      for (var i = 0; i< this.m7States.length; i++) {
        if (this.m7States[i].key == _key) {
          return this.m7States[i];
        }
      }
    }catch(e) {
      return null;
    }
  },
  m7ChooicePeerState: function (evtJson) {
    if(evtJson.Event == 'UserStatus' || evtJson.Event == 'UserBusy') {
      if(this.m7Base.m7Phone.userId == evtJson.UserID) {
        this.m7Base.m7CurrentPeerState = this.m7Base.m7getPhonePeerState();
        this.m7Base.m7CurrentPeerState.m7setPeerState(evtJson.BusyType)
          if(this.m7Base.m7CurrentCallState != null) {
          if(this.m7Base.m7CurrentCallState.m7CallState == 'stInvalid') {
              this.m7changeToolBarState(this.m7Base.m7CurrentPeerState);
          }
        }
      }
    }
  },
  m7setPeerState: function(curPeerStateKey) {
    this.m7CurPeerStateKey = curPeerStateKey;
    this.m7CurPeerAutoTimeStateKey = curPeerStateKey;

  },
  m7put: function(_key,_value) {
    this.m7States.push({key:_key,value:_value});
  },
  m7changeToolBarState: function(obj) {
    senvenMPublish("EvtPeerToolBarChange",[obj.m7CurPeerStateKey]);
  }

}
moorCall.stateElement.base= {
  constructor: function(phone) {
	this.m7Phone = phone;
	return this;
  },
  m7CurrentCallState: null,
  m7OldCurrentCallState: null,

  m7CurrentPeerState: null,

  m7Phone: null,

  m7getInvalid: function() {
    if(this.m7Phone.m7Invalid == null) {
      this.m7Phone.m7Invalid = moorCall.stateElement.invalid.constructor(this);
    }
    return this.m7Phone.m7Invalid;
  },
  m7getPhonePeerState: function() {
    if(this.m7Phone.m7PeerState == null) {
      this.m7Phone.m7PeerState = moorCall.stateElement.peerState.constructor(this);
    }
    return this.m7Phone.m7PeerState;
  },
  m7getPhoneHold: function() {
    if(this.m7Phone.m7Hold == null) {
      this.m7Phone.m7Hold = moorCall.stateElement.hold.constructor(this);
    }
    return this.m7Phone.m7Hold;
  },
  m7getPhoneAbate: function() {
    if(this.m7Phone.m7Abate == null) {
      this.m7Phone.m7Abate = moorCall.stateElement.abate.constructor(this);
    }
    return this.m7Phone.m7Abate;
  },
  m7getPhoneNormalLink: function() {
    if(this.m7Phone.m7NormalLink == null) {
      this.m7Phone.m7NormalLink = moorCall.stateElement.link.normalLink.constructor(this);
    }
    return this.m7Phone.m7NormalLink;
  },
  m7getPhoneInnerLink: function() {
    if(this.m7Phone.m7InnerLink == null) {
      this.m7Phone.m7InnerLink = moorCall.stateElement.link.innerLink.constructor(this);
    }
    return this.m7Phone.m7InnerLink;
  },
  m7getPhoneConsultationLink: function() {
    if(this.m7Phone.m7ConsultationLink == null) {
      this.m7Phone.m7ConsultationLink = moorCall.stateElement.link.consultationLink.constructor(this);
    }
    return this.m7Phone.m7ConsultationLink;
  },
  m7getPhoneThreeWayCallLink: function() {
    if(this.m7Phone.m7ThreeWayCallLink == null) {
      this.m7Phone.m7ThreeWayCallLink = moorCall.stateElement.link.threeWayCallLink.constructor(this);
    }
    return this.m7Phone.m7ThreeWayCallLink;
  },
  m7getPhoneConsultationRinging: function() {
    if(this.m7Phone.m7ConsultationRinging == null) {
      this.m7Phone.m7ConsultationRinging = moorCall.stateElement.ringring.consultationRinging.constructor(this);
    }
    return this.m7Phone.m7ConsultationRinging;
  },
  m7getPhoneListenLink: function() {
    if(this.m7Phone.m7ListenLink == null) {
      this.m7Phone.m7ListenLink = moorCall.stateElement.link.listenLink.constructor(this);
    }
    return this.m7Phone.m7ListenLink;
  },
  m7getPhoneDialoutLink: function() {
    if(this.m7Phone.m7DialoutLink == null) {
      this.m7Phone.m7DialoutLink =  moorCall.stateElement.link.dialoutLink.constructor(this);
    }
    return this.m7Phone.m7DialoutLink;
  },
  m7getPhoneNormalRinging: function() {
    if(this.m7Phone.m7NormalRinging == null) {
      this.m7Phone.m7NormalRinging = moorCall.stateElement.ringring.normalRinging.constructor(this);
    }
    return this.m7Phone.m7NormalRinging;
  },
  m7getPhoneInnerRing: function() {
    if(this.m7Phone.m7InnerRing == null) {
      this.m7Phone.m7InnerRing = moorCall.stateElement.ring.innerRing.constructor(this);
    }
    return this.m7Phone.m7InnerRing;
  },
  m7getPhoneNormalRing: function() {
    if(this.m7Phone.m7NormalRing == null) {
      this.m7Phone.m7NormalRing = moorCall.stateElement.ring.normalRing.constructor(this);
    }
    return this.m7Phone.m7NormalRing;
  },
  m7getPhoneInnerRinging: function() {
    if(this.m7Phone.m7InnerRinging == null) {
      this.m7Phone.m7InnerRinging = moorCall.stateElement.ringring.innerRinging.constructor(this);
    }
    return this.m7Phone.m7InnerRinging;
  },
  m7getPhoneListenRing: function() {
    if(this.m7Phone.m7ListenRing == null) {
      this.m7Phone.m7ListenRing = moorCall.stateElement.ring.listenRing.constructor(this);
    }
    return this.m7Phone.m7ListenRing;
  },
  m7getPhoneUserViaExten:function(exten) {
    if(!this.m7Phone.m7MonitorPeers) return null;
    for(var i in this.m7Phone.m7MonitorPeers) {
      if(this.m7Phone.m7MonitorPeers[i].exten == exten){
        return this.m7Phone.m7MonitorPeers[i];
      }
    }
    return null;
  },
  m7bus:function() {
  },
  m7ChooiceState:function(evtJson) {
    currentEventObj = evtJson
    this.m7setCallObj(evtJson);
    this.m7setMonitorObjs(evtJson);
    if(evtJson.Event == "PeerStatus") {
      if(evtJson.Exten == this.m7Phone.sipNo) {
        if(evtJson.PeerStatus == "Registered" && (this.m7Phone.extenType == "gateway" || this.m7Phone.extenType == "sip" || this.m7Phone.extenType == 'Local')) {
            this.m7CurrentCallState = this.m7getInvalid();
            this.m7CurrentCallState.m7changeToolBarState(this.m7CurrentCallState);
        } else if(evtJson.PeerStatus != "Registered" && (this.m7Phone.extenType == "gateway" || this.m7Phone.extenType == "sip" || this.m7Phone.extenType == 'Local')) {
          this.m7CurrentCallState = this.m7getPhoneAbate();
          this.m7CurrentCallState.m7changeToolBarState(this.m7CurrentCallState);
        }
      }
    } else {
      if(this.m7CurrentPeerState == null) {
        this.m7CurrentPeerState = this.m7getPhonePeerState();
      }
      this.m7CurrentPeerState.m7ChooicePeerState(evtJson);

      if(this.m7CurrentCallState == null) {
        this.m7CurrentCallState = this.m7getInvalid();
        if(this.m7Phone.extenType == "Local") {
          this.m7CurrentCallState.m7changeToolBarState(this.m7CurrentCallState);
        }
      }
      this.m7CurrentCallState.m7ChooiceCallState(evtJson);

    }

  },
  m7setCallObj: function(evtJson) {
    if(evtJson.ChannelStatus == "Hangup" || evtJson.PeerStatus == "Registered" || evtJson.PeerStatus == "Unregistered") {
        _cti_peerstate = 1
    } else {
        _cti_peerstate = null
    }
    if (evtJson.Event == 'UserBusy' && evtJson.UserID == this.m7Phone.userId && evtJson.BusyType && evtJson.BusyType != '99') {
        changePhoneBarStatus(evtJson.BusyType)
    }
    if (evtJson.Event == "ChannelStatus") {
      if(evtJson.Exten == this.m7Phone.sipNo) {
        if(evtJson.ChannelStatus == "Ring"){
          this.m7Phone.m7CurentChannel = evtJson.Channel;
          if(evtJson.ChannelType == "listen"){

          } else if(evtJson.ChannelType == "dialout") {
            var callsheetid = "";
            if(evtJson.Data.CallSheetID) {
              callsheetid = evtJson.Data.CallSheetID;
            }
            this.m7Phone.callObject = {
              callSheetId: callsheetid,
              originCallNo: evtJson.FromCid,
              originCalledNo: evtJson.FromDid,
              callType: "dialout",
              offeringTime: moorCall.moortools.getDate(new Date(evtJson.Timestamp * 1000)),
              data: evtJson.Data,
              status: "notDeal",
              monitorFilename: ""
            };

            if(this.m7Phone.dialoutData){
              this.m7Phone.callObject.data = this.m7Phone.dialoutData;
              this.m7Phone.dialoutData = null;
            }
            senvenMPublish("EvtDialing", [this.m7Phone.callObject]);
          }



        } else if(evtJson.ChannelStatus == "Ringing"){
          this.m7Phone.m7CurentChannel = evtJson.Channel;
          this.m7Phone.m7OtherChannel = evtJson.LinkedChannel.Channel;
          if(evtJson.LinkedChannel.ChannelType == "dialTransfer"
            ||evtJson.LinkedChannel.ChannelType == "transfer"){
            if(evtJson.Link){
              var linkedChannel = evtJson.LinkedChannel;
              var callsheetid = "";
              if(linkedChannel.Data && linkedChannel.Data.CallSheetID)
                callsheetid = linkedChannel.Data.CallSheetID;
              this.m7Phone.m7CallId = linkedChannel.Uniqueid;
              this.m7Phone.callObject = {
                callSheetId: callsheetid,
                originId: linkedChannel.Uniqueid,
                originCallNo: linkedChannel.FromCid,
                originCalledNo: linkedChannel.FromDid,
                callType: linkedChannel.ChannelType,
                queue: linkedChannel.Queue,
                location: linkedChannel.Location,
                callId: linkedChannel.Uniqueid,
                skillgroupNo: linkedChannel.Queue,
                monitorFilename: "",
                offeringTime: moorCall.moortools.getDate(new Date(evtJson.Timestamp * 1000)),
                data: {},

                agent: evtJson.Data.Agent,
                status: "notDeal",
                beginTime: "",
                endTime: ""
              };
              if (linkedChannel.Data) {
                this.m7Phone.callObject.data = linkedChannel.Data;
                this.m7Phone.callObject.data.callSheetId = callsheetid;
              }
              senvenMPublish("EvtRing", [this.m7Phone.callObject]);
            }
          }
          if(evtJson.LinkedChannel.ChannelType == "normal") {
            if (evtJson.Link) {
              var linkedChannel = evtJson.LinkedChannel;
              if(this.m7Phone.m7CallId != linkedChannel.Uniqueid) {
                this.m7Phone.m7CallId = linkedChannel.Uniqueid;
                var callsheetid = "";
                if(linkedChannel.Data && linkedChannel.Data.CallSheetID) {
                  callsheetid = linkedChannel.Data.CallSheetID;
                }
                this.m7Phone.callObject = {
                  callSheetId: callsheetid,
                  originId: linkedChannel.Uniqueid,
                  originCallNo: linkedChannel.FromCid,
                  originCalledNo: linkedChannel.FromDid,
                  callType: linkedChannel.ChannelType,
                  callId: linkedChannel.Uniqueid,
                  queue: linkedChannel.Queue,
                  location: linkedChannel.Location,
                  skillgroupNo: linkedChannel.Queue,
                  monitorFilename: "",
                  offeringTime: moorCall.moortools.getDate(new Date(evtJson.Timestamp * 1000)),
                  data: {},
                  beginTime: "",
                  endTime: "",
                  agent: evtJson.Data.Agent,
                  status: "notDeal",
                  ivrkey: linkedChannel.Data.IVRKEY,
                  callerCity: linkedChannel.CallerCity,
                  callerProvince: linkedChannel.CallerProvince,
                  queueName: linkedChannel.QueueName,
                };
                if (linkedChannel.Data) {
                  this.m7Phone.callObject.data = linkedChannel.Data;
                  this.m7Phone.callObject.data.callSheetId = callsheetid;
                }
                senvenMPublish("EvtRing", [this.m7Phone.callObject]);
              }
            }
          }

          if(this.m7Phone.m7IsLooter){
            this.m7Phone.m7IsLooter = false;

          }

          this.m7Phone.m7CurentChannel = evtJson.Channel;

        } else if(evtJson.ChannelStatus == "Link") {
          this.m7Phone.m7CurentChannel = evtJson.Channel;
          var linkedChannel = evtJson.LinkedChannel;
          this.m7Phone.m7OtherChannel = linkedChannel.Channel;
          this.m7Phone.callObject.callType = evtJson.ChannelType;
          if (!this.m7Phone.callObject.beginTime) {
            this.m7Phone.callObject.beginTime = moorCall.moortools.getDate(new Date(evtJson.Timestamp * 1000));
          }
          var callsheetid = "";
          if(linkedChannel.Data && linkedChannel.Data.CallSheetID) {
            callsheetid = linkedChannel.Data.CallSheetID;
          }
          this.m7Phone.callObject.originCallNo = linkedChannel.FromCid;
          this.m7Phone.callObject.originCalledNo = linkedChannel.FromDid;
          this.m7Phone.callObject.callSheetId = callsheetid;
          this.m7Phone.callObject.originId = linkedChannel.Uniqueid;
          this.m7Phone.callObject.queue = linkedChannel.Queue;
          this.m7Phone.callObject.location = linkedChannel.Location;
          this.m7Phone.callObject.callId = linkedChannel.Uniqueid;
          this.m7Phone.callObject.skillgroupNo = linkedChannel.Queue;

          this.m7Phone.callObject.status = "dealing";
          if(evtJson.RingTime) {
            this.m7Phone.callObject.offeringTime = moorCall.moortools.getDate(new Date(evtJson.RingTime * 1000));
          }

          if (linkedChannel.Data) {
            this.m7Phone.callObject.data = linkedChannel.Data;
            this.m7Phone.callObject.data.callSheetId = callsheetid;
          }
          senvenMPublish("EvtConnected", [this.m7Phone.callObject]);
        } else if(evtJson.ChannelStatus == "Unlink") {
          this.m7Phone.m7CurentChannel = evtJson.Channel;
          this.m7Phone.m7CallId = "";
        } else if(evtJson.ChannelStatus == "Hangup") {
          this.m7Phone.m7CurentChannel = evtJson.Channel;
          this.m7Phone.m7CallId = "";
          if(this.m7Phone.m7CurentChannel == evtJson.Channel) {
            if (evtJson.ChannelType == "normal" || evtJson.ChannelType == "dialout"
              || evtJson.ChannelType == "dialTransfer"
              || evtJson.ChannelType == "transfer"
              || evtJson.ChannelType == "webcall") {
              this.m7Phone.callObject.endTime = moorCall.moortools.getDate(new Date(evtJson.Timestamp * 1000));
              this.m7Phone.callObject.ringTime = moorCall.moortools.getDate(new Date(evtJson.Data.RingTime * 1000));

              if(evtJson.ChannelType == "dialout" || evtJson.ChannelType == "dialTransfer") {
                this.m7Phone.callObject.data = evtJson.Data;
              }

              senvenMPublish("EvtHangup", [this.m7Phone.callObject]);
            } else if (evtJson.ChannelType == "listen") {
              this.m7Phone.m7OtherChannel = "";
              senvenMPublish("EvtEndListen", []);
            }

          }

        }

      }
    }else if (evtJson.Event === 'ConsultSuccess' || evtJson.Event === 'ConsultFailed') {
        moorCall.moortools.close();
        if (evtJson.Event === 'ConsultSuccess') {
            moorCall.moortools.m7ShowSuccess("咨询成功")
            senvenMPublish("EvtBarChange", [this.m7Phone.extenType + "_" + "stConcultTalking"]);
        } else if (evtJson.Event === 'ConsultFailed') {
            moorCall.moortools.error("咨询失败");
        }
    }
  },

  m7getAgentViaSipNum:function(sipNum) {
    if(!this.m7Phone.m7MonitorPeers) return null;
    for(var i in this.m7Phone.m7MonitorPeers) {
      var test = this.m7Phone.m7MonitorPeers[i].sipNo;
      if(this.m7Phone.m7MonitorPeers[i].sipNo == sipNum){
        return this.m7Phone.m7MonitorPeers[i];
      }
    }
    return null;
  },

  m7setMonitorObjs: function(evtJson) {
    if (evtJson.Event == "ChannelStatus") {
      if(evtJson.ChannelStatus == "Hangup"){
        if(evtJson.UserID == undefined) {
          return;
        }
      }

      var peer = this.m7getAgentViaSipNum(evtJson.Exten);
      if(!peer){
        return;
      }

      if(evtJson.ChannelStatus == "Down"){
        peer.callStatus = "Down";
        peer.channel = evtJson.Channel;
        this.m7UpdQueueInfo();
      } else if(evtJson.ChannelStatus == "Ring") {
        peer.callStatus = "Ring";
        peer.called = false;
        peer.C5Status = evtJson.C5Status;
        peer.timestamp = evtJson.Timestamp;
        peer.channel = evtJson.Channel;
        if(evtJson.C5Status == "OutboundCall"
          || evtJson.C5Status == "InboundCall"
          || evtJson.C5Status == "listen"){
          peer.callNo = evtJson.Data.ListenExten;
        } else if(evtJson.FromDid)
          peer.callNo = evtJson.FromDid;
        senvenMPublish("EvtMonitorPeer",[peer]);
      } else if(evtJson.ChannelStatus == "Ringing"){
        peer.called = true;
        peer.callStatus = "Ringing";
        peer.C5Status = evtJson.C5Status;
        peer.channel = evtJson.Channel;
        peer.linkedChannel = evtJson.LinkedChannel.Channel;
        if(evtJson.ChannelType == "dialTransfer"){
          peer.callNo = evtJson.FromDid;
        } else {
          peer.callNo = evtJson.FromCid;
        }
        peer.timestamp = evtJson.Timestamp;
        senvenMPublish("EvtMonitorPeer",[peer]);
      } else if(evtJson.ChannelStatus == "Up") {
        if(evtJson.ChannelType == "listen"){
          peer.callNo = evtJson.Data.ListenExten;
          peer.timestamp = evtJson.Timestamp;
          peer.C5Status = evtJson.C5Status;
          peer.callStatus = evtJson.ChannelType;
          peer.linked = true;
          peer.channel = evtJson.Channel;
          senvenMPublish("EvtMonitorPeer",[peer]);
        }
      } else if(evtJson.ChannelStatus == "Link") {
        peer.timestamp = evtJson.Timestamp;
        peer.C5Status = evtJson.C5Status;
        linked = true;
        peer.channel = evtJson.Channel;
        peer.linkedChannel = evtJson.LinkedChannel.Channel;
        peer.callStatus = evtJson.ChannelType;
        if(evtJson.ChannelType == "dialout" || evtJson.ChannelType == "dialTransfer") {
          peer.callNo = evtJson.LinkedChannel.FromDid;
        } else {
          peer.callNo = evtJson.LinkedChannel.FromCid;
          m7$("#moorCall-dialout-input").val(peer.callNo);
        }
        senvenMPublish("EvtMonitorPeer",[peer]);
      } else if(evtJson.ChannelStatus == "Unlink") {

      } else if(evtJson.ChannelStatus == "Hangup"){
        if(peer.channel == evtJson.Channel) {
          if(this.m7Phone.m7OtherChannel == evtJson.Channel
            && (this.m7CurrentCallState.m7CallState == "stListening" ||this.m7CurrentCallState.m7CallState == "stListened")) {
            this.m7Phone.hangup();
          }
          peer.C5Status = evtJson.C5Status;
          peer.callNo = "";
          peer.callStatus = "Idle";
          peer.timestamp = evtJson.Timestamp;
          linked = false;
          peer.channel = "";
          peer.linkedChannel = "";
          senvenMPublish("EvtMonitorPeer",[peer]);
        }
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "QueueParams") {
      var queueItem={};
      queueItem=this.m7queryQueueItems(evtJson);
      if(queueItem) {
        if(evtJson.Removed) {
          queueItem.removed = true;
        }
        queueItem.queueName = evtJson.DisplayName;
        queueItem.idleAgentCount=evtJson.Members - evtJson.BusyMembers;
        queueItem.busyAgentCount=evtJson.BusyMembers;
        queueItem.totalAgentCount=evtJson.Members;
        queueItem.queueWaitCount=evtJson.Calls;
        queueItem.abadonedCalls=evtJson.Abandoned;
        queueItem.totalCalls=evtJson.TotalCalls;
        queueItem.DisplayName = evtJson.DisplayName;
        queueItem.members=[];
        for(var i in evtJson.QueueMember){
          var member = evtJson.QueueMember[i];
          queueItem.members[member] = member;
        }
        senvenMPublish("EvtMonitorQueue",[queueItem]);
      } else {
        queueItem = {
          queueName:evtJson.DisplayName,
          queueId:evtJson.Queue,
          idleAgentCount:evtJson.Members - evtJson.BusyMembers,
          busyAgentCount:evtJson.BusyMembers,
          totalAgentCount:evtJson.Members,
          queueWaitCount:evtJson.Calls,
          abadonedCalls:evtJson.Abandoned,
          DisplayName: evtJson.DisplayName,
          totalCalls:evtJson.TotalCalls,
          members:[],
          removed:false
        };
        for(var i in evtJson.QueueMember){
          var member = evtJson.QueueMember[i];
          queueItem.members[member] =member; //change
        }
        this.m7Phone.m7MonitorQueues[evtJson.Queue]= queueItem;
      }
      this.m7UpdQueueInfo();
    } else if(evtJson.Event == "QueueMemberAdded") {
      var queueItem=this.m7queryQueueItems(evtJson);
      if(queueItem) {
        if(!queueItem.members[evtJson.Exten]){
          queueItem.members[evtJson.Exten] = evtJson.Exten;  //change
          queueItem.totalAgentCount++;
          this.m7UpdQueueInfo();
        }
      } else {
      }
    } else if(evtJson.Event == "QueueMemberRemoved"){
      var queueItem=this.m7queryQueueItems(evtJson);
      if(queueItem){
        if(queueItem.members[evtJson.Exten]){
          delete queueItem.members[evtJson.Exten];
          queueItem.totalAgentCount--;
          this.m7UpdQueueInfo();
        }
      }else{
      }
    } else if(evtJson.Event == "QueueMemberPaused"){

    } else if(evtJson.Event == "Join"){
      var queueItem = this.m7queryQueueItems(evtJson);
      if(queueItem){
        queueItem.queueWaitCount++;
        senvenMPublish("EvtMonitorQueue",[queueItem]);
      } else {
      }
      senvenMPublish("EvtQueueEntryAdd", [evtJson]);
    } else if(evtJson.Event == "Leave"){
      var queueItem=this.m7queryQueueItems(evtJson);
      if(queueItem){
        queueItem.totalCalls++;
        queueItem.queueWaitCount--;
        if(queueItem.queueWaitCount < 0)
          queueItem.queueWaitCount = 0;
        senvenMPublish("EvtMonitorQueue",[queueItem]);
      } else {
      }
      senvenMPublish("EvtQueueEntryRemove", [evtJson]);
    } else if(evtJson.Event == "QueueCallerAbandon"){
      var queueItem=this.m7queryQueueItems(evtJson);
      if(queueItem){
        queueItem.abadonedCalls++;
        senvenMPublish("EvtMonitorQueue",[queueItem]);
      }
      senvenMPublish("EvtQueueEntryRemove", [evtJson]);
    }

    else if(evtJson.Event == "UserStatus") {
      var isRegistered = false;
      if(evtJson.PeerStatus == "Registered") {
        isRegistered = true;
      }
      if(!this.m7Phone.m7MonitorPeers[evtJson.UserID]) {
        var peer = {
          exten:evtJson.Exten,
          sipNo:evtJson.SipNum,
          name:evtJson.User,
          DisplayName: evtJson.DisplayName,
          loginExten:evtJson.LoginExten,
          peerStatus:evtJson.PeerStatus,
          status:evtJson.Status,
          C5Status:evtJson.C5Status,
          busy:evtJson.Busy,
          extenType:evtJson.ExtenType,
          login:evtJson.Login,
          userId:evtJson.UserID,
          user:evtJson.User,
          localNo:evtJson.Local,
          register: isRegistered,
          InCalls: evtJson.InCalls,
          InComplete: evtJson.InComplete,
          OutCalls: evtJson.OutCalls,
          OutComplete: evtJson.OutComplete,
          linked:false,
          channel:"",
          linkedChannel:"",
          called:false,
          //Idle, Ring, Ringing, inner, normal, dialout, dialTransfer,transfer, listen, webcall
          callStatus:"Idle",
          callNo:"",
          timestamp:evtJson.Login?(evtJson.BusyTimestamp):"",
          busyTimestamp:evtJson.BusyTimestamp,
          loginTimestamp:evtJson.LoginTimestamp,
          busyType:evtJson.BusyType
        };
        this.m7Phone.m7MonitorPeers[evtJson.UserID] = peer;
        senvenMPublish("EvtMonitorPeer",[peer]);
      } else {
        var peer = this.m7Phone.m7MonitorPeers[evtJson.UserID];
        peer.peerStatus = evtJson.PeerStatus;
        peer.status = evtJson.Status;
        peer.exten = evtJson.Exten;
        peer.sipNo = evtJson.SipNum;
        peer.C5Status = evtJson.C5Status;
        peer.busy = evtJson.Busy;
        peer.extenType = evtJson.ExtenType;
        peer.login = evtJson.Login;
        peer.loginExten = evtJson.LoginExten;
        peer.name = evtJson.User;
        peer.DisplayName = evtJson.DisplayName;
        peer.userId = evtJson.UserID;
        peer.user = evtJson.User;
        peer.localNo = evtJson.Local;
        peer.register = isRegistered;
        peer.InCalls = evtJson.InCalls;
        peer.InComplete = evtJson.InComplete;
        peer.OutCalls = evtJson.OutCalls;
        peer.OutComplete = evtJson.OutComplete;
        peer.busyTimestamp=evtJson.BusyTimestamp;
        peer.loginTimestamp=evtJson.LoginTimestamp;
        peer.busyType=evtJson.BusyType;
        peer.timestamp = peer.login?(peer.busyTimestamp):"";
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "UserBusy") {
      if(this.m7Phone.m7MonitorPeers[evtJson.UserID]) {
        var peer = this.m7Phone.m7MonitorPeers[evtJson.UserID];
        peer.busy = evtJson.Busy;
        peer.busyType=evtJson.BusyType;
        peer.busyTimestamp = evtJson.BusyTimestamp;
        peer.timestamp = peer.login?(peer.busyTimestamp):"";
        peer.loginTimestamp=evtJson.LoginTimestamp;
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "UserCallsUpdate") {
      if(this.m7Phone.m7MonitorPeers[evtJson.UserID]) {
        var peer = this.m7Phone.m7MonitorPeers[evtJson.UserID];
        peer.InCalls = evtJson.InCalls;
        peer.InComplete = evtJson.InComplete;
        peer.OutCalls = evtJson.OutCalls;
        peer.OutComplete = evtJson.OutComplete;
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "UserSignIn") {
      if(this.m7Phone.m7MonitorPeers[evtJson.UserID]) {
        var peer = this.m7Phone.m7MonitorPeers[evtJson.UserID];
        peer.extenType = evtJson.ExtenType;
        peer.login = evtJson.Login;
        peer.sipNo = evtJson.SipNum;
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "UserSignOut") {
      if(this.m7Phone.m7MonitorPeers[evtJson.UserID]) {
        var peer = this.m7Phone.m7MonitorPeers[evtJson.UserID];
        peer.extenType = evtJson.ExtenType;
        peer.sipNo = evtJson.SipNum;
        peer.login = evtJson.Login;
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "TrunkStatus") {
      if(!this.m7Phone.m7MonitorServiceNum[evtJson.ServiceNo]){
        var serviceNo = {
          serviceNo: evtJson.ServiceNo,
          inCalls: evtJson.InCalls,
          inLost: evtJson.InLost,
          inComplete: evtJson.InComplete,
          outCalls: 0,
          outComplete: 0
        };
        this.m7Phone.m7MonitorServiceNum[evtJson.ServiceNo] = serviceNo;
      } else {
        var serviceNo = this.m7Phone.m7MonitorServiceNum[evtJson.ServiceNo];
        serviceNo.inCalls = evtJson.InCalls,
          serviceNo.inLost = evtJson.InLost,
          serviceNo.inComplete = evtJson.InComplete,
          serviceNo.outCalls = 0,
          serviceNo.outComplete = 0
      }
      senvenMPublish("EvtMonitorServiceNo", [this.m7Phone.m7MonitorServiceNum[evtJson.ServiceNo]]);
    }

    else if(evtJson.Event == "PeerStatus") {
      var isRegistered = false;
      if(evtJson.PeerStatus == "Registered")
        isRegistered = true;
      var peer = this.m7getAgentViaSipNum(evtJson.Exten);
      if(peer){
        peer.register = isRegistered;
        peer.status = evtJson.Status;
        senvenMPublish("EvtMonitorPeer",[peer]);
        this.m7UpdQueueInfo();
      }
    }

    else if(evtJson.Event == "AccountStatus"){
      this.m7Phone.m7AccountCall = evtJson;
      senvenMPublish("EvtAccountStatus", [evtJson]);
    }

  },
  m7queryQueueItems:function(evtJson) {
    if(!this.m7Phone.m7MonitorQueues) {
      return null;
    }
    for(var i in this.m7Phone.m7MonitorQueues) {
      if(this.m7Phone.m7MonitorQueues[i].queueId==evtJson.Queue) {
        return this.m7Phone.m7MonitorQueues[i];
      }
    }
    return null;
  },
  m7UpdQueueInfo:function(){
    for(var i in this.m7Phone.m7MonitorQueues) {
      var queue = this.m7Phone.m7MonitorQueues[i];
      var members = queue.members;
      queue.busyAgentCount = 0;
      queue.idleAgentCount = 0;
      for(var j in members){
        var peer = this.m7getAgentViaSipNum(members[j]);
        if(peer){
          if(peer.extenType == "sip"){
            if(!peer.register
              || !peer.login
              || peer.busy
              || peer.callStatus != "Idle"){
              queue.busyAgentCount++;
            }else {
              queue.idleAgentCount++;
            }
          } else if(peer.extenType == "gateway"){
            if(!peer.register
              || peer.busy
              || peer.callStatus != "Idle"){
              queue.busyAgentCount++;
            }else {
              queue.idleAgentCount++;
            }
          } else if(peer.extenType == "Local"){
            if(peer.busy
              || peer.callStatus != "Idle"){
              queue.busyAgentCount++;
            } else {
              queue.idleAgentCount++;
            }
          } else {
            queue.busyAgentCount++;
          }
        } else {
          queue.idleAgentCount++;
        }
      }
      senvenMPublish("EvtMonitorQueue",[queue]);
    }
  },
  m7GetQueueInfo: function() {
    var info = "";
    for(var i in this.m7Phone.m7MonitorQueues) {
      var queue = this.m7Phone.m7MonitorQueues[i];
      if(queue == null) {
        continue;
      }
      var members = queue.members;
      for(var j in members) {
        var peer = this.m7getAgentViaSipNum(members[j]);
        if(peer != null) {
          info += (peer.exten + "," + peer.busyType + ";");
        }
      }
    }
    return info;
  }

}
moorCall.SoftphoneBar= {
  constructor: function(phone,srcNodeName) {
    this.m7Phone = phone;
    this.m7CallStateDescription["stInnerDialing"] = "呼叫中";
    this.m7CallStateDescription["stInnerTalking"] = "内部通话";
    this.m7CallStateDescription["stInvalid"] = "空闲";
    this.m7CallStateDescription["stAbate"] = "失效";
    this.m7CallStateDescription["stBelling"] = "来电振铃";
    this.m7CallStateDescription["stTalking"] = "普通通话";
    this.m7CallStateDescription["stListening"] = "监听振铃";
    this.m7CallStateDescription["stListened"] = "监听中";
    this.m7CallStateDescription["stDialing"] = "呼叫中";
    this.m7CallStateDescription["stDialTalking"] = "外呼通话";
    this.m7CallStateDescription["stHold"] = "保持";
    this.m7CallStateDescription["stInnerBelling"] = "来电振铃";
    this.m7CallStateDescription["stThreeWayTalking"] = "三方通话";
    this.m7CallStateColor["0"] = "#53D464";
    this.m7CallStateColor["1"] = "#FF7A90";
    this.m7CallStateColor["2"] = "#E3A42C";
    this.m7CallStateColor["99"] = "#ff6400";
    this.m7CallStateColor["call"] = "#FF33FF";
    this.m7Phone.register("EvtPeerToolBarChange", this, "m7ChangedPeerToolBarState");
    this.m7Phone.register("EvtCallToolBarChange", this, "m7ChangedCallToolBarState");
    this.m7SrcNodeDom = document.getElementById(srcNodeName);
    this.m7SrcNodePeerStateDom = document.getElementById(srcNodeName + ".peerState");
    this.m7SrcNodePeerTimeStateDom = document.getElementById(srcNodeName + ".peerTimeState");
    this.m7SrcNodeCallTimeStateDom = document.getElementById(srcNodeName + ".callTimeState");
    this.m7SrcNodeSelectStateDom = document.getElementById(srcNodeName + ".select");
    this.m7SrcNodeSelectMenuDom = document.getElementById(srcNodeName + ".selectMenu");
    this.m7SrcNodePhoneNumDom = document.getElementById(srcNodeName + ".softPhoneNum");
	this.m7Phone.register("EvtBarChange", this, "m7render");
	return this;
  },
  m7SrcNodeSelectStateDom: null,
  m7SrcNodePeerStateDom: null,
  m7SrcNodePhoneNumDom: null,
  m7SrcNodeCallTimeStateDom: null,
  m7SrcNodePeerTimeStateDom: null,
  m7SrcNodeSelectMenuDom: null,
  m7SrcNodeDom: null,
  m7CallStateDescription: [],
  m7Phone: null,
  m7CallStateColor: [],
  m7PeerHour: "0",
  m7PeerSecond: "1",
  m7PeerMinute: "0",
  m7PeerCalculagraph: null,

    Local_stInvalid: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stConcultTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ConsultThreeWayCallEnable", "ConsultTransferEnable","ConsultDisable", "StopConsultEnable", "transferIVR","transferSatisfaction"],
    Local_stBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stThreeWayTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stRest: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stInnerBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stListened: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stDialTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable","ConsultEnable", "StopConsultDisable", "transferIVREnable","transferSatisfactionEnable"],
    Local_stListening: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "transferIVREnable","transferSatisfactionEnable"],
    Local_stHold:["DialDisable", "smallDialDisable", "HangupDisable", "HoldGetEnable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable", "ConsultEnable", "StopConsultDisable", "transferIVREnable","transferSatisfactionEnable"],
    Local_stAbate: ["DialDisable", "smallDialDisable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    Local_stInnerDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stInnerTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "transferIVR","transferSatisfaction"],
    Local_stSystemBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],

    gateway_stInvalid: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stConcultTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "ConsultThreeWayCallEnable", "ConsultTransferEnable","ConsultDisable", "StopConsultEnable","transferIVR","transferSatisfaction"],
    gateway_stBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stThreeWayTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable", "transferIVR","transferSatisfaction"],
    gateway_stInnerBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stRest: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stListened: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stListening: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable", "ConsultEnable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    gateway_stDialTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable","ConsultEnable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    gateway_stBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stHold:["DialDisable", "smallDialDisable", "HangupDisable", "HoldGetEnable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    gateway_stAbate: ["DialDisable", "smallDialDisable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stInnerTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stInnerDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    gateway_stSystemBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],


    sip_stInvalid: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stConcultTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ConsultThreeWayCallEnable", "ConsultTransferEnable","ConsultDisable", "StopConsultEnable","transferIVR","transferSatisfaction"],
    sip_stBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stThreeWayTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stRest: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stInnerBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stListened: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stDialTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable","ConsultEnable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    sip_stListening: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable","ThreeWayCallDisable", "TransferDisable","ConsultDisable","transferIVR","transferSatisfaction"],
    sip_stHold:["DialDisable", "smallDialDisable", "HangupDisable", "HoldGetEnable","ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    sip_stTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldEnable", "ThreeWayCallDisable", "TransferEnable", "ConsultEnable", "StopConsultDisable","transferIVREnable","transferSatisfactionEnable"],
    sip_stAbate: ["DialDisable", "smallDialDisable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stBelling: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    sip_stInnerDialing: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable","transferIVR","transferSatisfaction"],
    sip_stInnerTalking: ["DialDisable", "smallDialDisable", "HangupEnable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable","ConsultDisable","transferIVR","transferSatisfaction"],
    sip_stSystemBusy: ["DialEnable", "smallDialEnable", "HangupDisable", "HoldDisable", "ThreeWayCallDisable", "TransferDisable", "ConsultDisable", "IdleDisable", "RestDisable", "BusyDisable", "StopConsultDisable","transferIVR","transferSatisfaction"],
    m7ToConsult: function() {
    moorCall.moortools.input("consult");
  },
  m7ChangedPeerToolBarState: function(peerState) {
    if(this.m7Phone.m7PeerState.m7CurPeerStateKey == "99") {
        if (this.m7Phone.AutoBusyTime != '0') {
            if(this.m7Phone.AutoBusyTime == undefined) {
                return;
            }
            var d = this.m7Phone.m7PeerState.m7CallStateValue[this.m7Phone.m7PeerState.m7CurPeerStateKey];
            if ((this.m7Phone.extenType == "gateway" || this.m7Phone.extenType == "sip") && currentEventObj.Event == "PeerStatus" && currentEventObj.Exten == this.m7Phone.sipNo && currentEventObj.PeerStatus == "Registered" ) {
               return;
            } else {
              this.m7ChangeState(d);
              this.m7AutoBusyTime(this.m7Phone.AutoBusyTime);
              return;
            }
        }
    }
    var state = this.m7Phone.m7PeerState.m7CallStateValue[this.m7Phone.m7PeerState.m7CurPeerStateKey];
    this.m7ChangeState(state);
    if(this.m7SrcNodePeerStateDom != null) {
       if (prePhonebarStatus && isCtiRelogin) {
           isCtiRelogin = false
           var color = '#ff7a72'
           if (prePhonebarStatus == '0') {
             color= '#53d466'
           } else if (prePhonebarStatus == '2') {
              color = '#e3a42c'
           }
           this.m7SrcNodePeerStateDom.innerHTML = "<span style=color:" + color + ">" + this.m7Phone.m7PeerState._get(prePhonebarStatus).value + "</span>";

       } else {
           if(!(currentEventObj.Event == "PeerStatus" && currentEventObj.Exten == this.m7Phone.sipNo && currentEventObj.PeerStatus == "Registered")) {
               this.m7SrcNodePeerStateDom.innerHTML = "<span style=color:" + this.m7CallStateColor[this.m7Phone.m7PeerState.m7CurPeerStateKey] + ">" + this.m7Phone.m7PeerState._get(peerState).value + "</span>";
           } else if (this.m7Phone.extenType == "sip" && ((prePhonebarStatus == '0' && currentEventObj.Event == "PeerStatus" && currentEventObj.Exten == this.m7Phone.sipNo && currentEventObj.PeerStatus == "Registered") || this.m7SrcNodePeerStateDom.innerText === '失效')) {
               this.m7SrcNodePeerStateDom.innerHTML = "<span style=color:" + this.m7CallStateColor[this.m7Phone.m7PeerState.m7CurPeerStateKey] + ">" + this.m7Phone.m7PeerState._get(peerState).value + "</span>";
           }
       }
        if(peerState != "99") {
        senvenMPublish("EvtPeerStatusChanged", [peerState]);
      }
    }
    if(this.m7SrcNodePeerTimeStateDom != null) {
      this.m7showTimer();
    }

  },
  m7exCancelConsult: function(exten){
        phone.cancelConsult(exten)
    },
  m7ChangeState: function(state) {
      if (state === 'stSystemBusy') {
          for (var i = 0; i < m7$('.userStatus').length; i ++) {
              m7$(m7$('.userStatus')[i]).css("color", "#8a8a8a")
              m7$(m7$('.userStatus')[i]).find("span").css("background-color", "#8a8a8a")
          }
          m7$("#BusyDisable").css("color", "#ff7a72")
          m7$("#BusyDisable").find("span").css("background-color", "#ff7a72")
          m7$('.peerTimeState').css("color", "#ff7a72")
      }
    var type = "sip";
    var extenType = this.m7Phone.extenType;
    if (extenType == "gateway" || extenType == "phone") {
      type = "gateway";
    } else if (extenType == "Local") {
      type = "Local";
    }
    var curState = type + "_" + state;
    this.m7render(curState);
  },
  m7ChangedCallToolBarState: function(state) {
      if(this.m7Phone.m7PeerState.m7CurPeerStateKey == "99" && !isCtiRelogin) { // 通话中接收到注册请求并且不是断网重连的情况
          if (this.m7Phone.AutoBusyTime && this.m7Phone.AutoBusyTime != '0') {
              if ((this.m7Phone.extenType == "gateway" || this.m7Phone.extenType == "sip") && currentEventObj.Event == "PeerStatus" && currentEventObj.Exten == this.m7Phone.sipNo && currentEventObj.PeerStatus == "Registered" ) {
                  return;
              }
          }
      }
      this.m7ChangeState(state);
    if(this.m7SrcNodePeerStateDom != null && state != "stInvalid") {
      var html = "<span style=color:"+this.m7CallStateColor["call"]+">" + this.m7CallStateDescription[state] + "</span>"
      this.m7SrcNodePeerStateDom.innerHTML = html;
      senvenMPublish("EvtCallStatusChanged", [state]);
    }
    if(this.m7SrcNodePeerTimeStateDom != null) {
      this.m7showTimer();
    }
    var peerStatus = m7$('#peerStatus');
    if(peerStatus == null) {
      return;
    }
    if (state == "stInvalid") {
      m7$("#moorCall-dialout-input").disabled = false;
      this.m7ChangedPeerToolBarState(this.m7Phone.m7PeerState.m7CurPeerStateKey);
    } else {
      m7$("#moorCall-dialout-input").disabled = true;
    }
  },
  m7showTimer: function() {
    var self = this;
    self.m7PeerHour = "0";
    self.m7PeerMinute = "0";
    self.m7PeerSecond = "1";
    if (m7PeerCalculagraph != null) {
      window.clearInterval(m7PeerCalculagraph);
    }
    m7PeerCalculagraph = window.setInterval(function () {
      self.m7SrcNodePeerTimeStateDom.innerHTML = ((self.m7PeerHour < 10) ? ("0" + self.m7PeerHour) : self.m7PeerHour) + ":" + ((self.m7PeerMinute < 10) ? ("0" + self.m7PeerMinute) : self.m7PeerMinute) + ":" + ((self.m7PeerSecond < 10) ? ("0" + self.m7PeerSecond) : self.m7PeerSecond);
      self.m7PeerSecond++;
      if (self.m7PeerSecond == 60) {
        self.m7PeerMinute++;
        self.m7PeerSecond = 0;
      }
      if (self.m7PeerMinute == 60) {
        self.m7PeerHour++;
        self.m7PeerMinute = 0;
      }
    }, 1000);
  },
  m7exTransfer: function(phoneNum) {
    if (/^\d+$/.test(phoneNum)) {
      moorCall.moortools.close('softphonebar');
      phone.transfer("9" + phoneNum, "external", {});
    } else {
      moorCall.moortools.error("请输入正确的电话号码");
    }
  },
  m7render: function (state) {
    var self = this;
    var htmlNode = m7$('#callStatus').find("a")
    for (var i = 0; i < htmlNode.length; i++) {
      if (self[state]) {
          if (senvenGetIndexof(self[state], htmlNode[i].id) < 0) {
              m7$(htmlNode[i]).css("display", "none")
          } else {
              m7$(htmlNode[i]).css("display", "")
          }
      }
    }
  },
  m7ToTransfer: function() {
    moorCall.moortools.input("transfer");
  },
  m7exConsult: function(phoneNum) {
    if (/^\d+$/.test(phoneNum)) {
      moorCall.moortools.close('softphonebar');
      phone.consult("9" + phoneNum, "external");
    } else {
      moorCall.moortools.error("请输入正确的电话号码");
    }
  },
    m7AutoBusyTime: function(AutoBusyTime) {
        if(this.m7SrcNodePeerStateDom != null) {
            this.m7SrcNodePeerStateDom.innerHTML = this.m7Phone.m7PeerState._get("99").value;
        }
        var self = this;
        if(m7PeerCalculagraph != null) {
            window.clearInterval(m7PeerCalculagraph);
        }
        m7PeerCalculagraph = window.setInterval(function(){
            if(AutoBusyTime < 60) {
                self.m7PeerHour = "0";
                self.m7PeerMinute = "0";
                self.m7PeerSecond = AutoBusyTime;
            } else if(AutoBusyTime >= 60 && (AutoBusyTime < 60*60)) {
                self.m7PeerMinute = parseInt(AutoBusyTime / 60);
                self.m7PeerHour = "0";
                self.m7PeerSecond = AutoBusyTime - self.m7PeerMinute* 60;
            } else if(AutoBusyTime >= 60*60 ) {
                self.m7PeerMinute = parseInt((AutoBusyTime - self.m7PeerHour*(60*60)) / (60));
                self.m7PeerHour = parseInt(AutoBusyTime / (60*60));
                self.m7PeerSecond = AutoBusyTime - self.m7PeerHour*(60*60) - self.m7PeerMinute* (60);
            }
            if(self.m7PeerHour < 0) {
                self.m7PeerHour = 0;
            }
            if(self.m7PeerMinute < 0) {
                self.m7PeerMinute = 0;
            }
            if(self.m7PeerSecond < 0) {
                self.m7PeerSecond = 0;
            }
            AutoBusyTime--
            console.log(AutoBusyTime)
            if (AutoBusyTime == 0 && self.m7Phone.m7BusyType !== '99') {
                var busyType = self.m7Phone.m7BusyType
                changePhoneBarStatus(busyType)
            }
            self.m7SrcNodePeerTimeStateDom.innerHTML = ((self.m7PeerHour<10)?("0"+self.m7PeerHour):self.m7PeerHour) + ":" + ((self.m7PeerMinute<10)?("0"+self.m7PeerMinute):self.m7PeerMinute) + ":" + ((self.m7PeerSecond<10)?("0"+self.m7PeerSecond):self.m7PeerSecond);
        }, 1000);
    },
  dialout: function (phoneNum, type) {
    if (/^\d+$/.test(phoneNum)) {
      this.m7Phone.dialout(phoneNum, type);
      return true;
    } else {
      moorCall.moortools.error("请输入正确的电话号码");
      return false;
    }
  }

}
moorCall.callProcessor={
  m7Phone: null,
  constructor: function (phone) {
    this.m7Phone = phone;
    evtHandle = this.m7Phone.register("EvtMonitorQueue" , this, "EvtMonitorQueue");
    this.m7Phone.m7Handle.push(evtHandle);
    var evtHandle = this.m7Phone.register("EvtHangup", this, "onHangup");
    this.m7Phone.m7Handle.push(evtHandle);
    var evtHandle = this.m7Phone.register("EvtRing", this, "m7Ring");
    this.m7Phone.m7Handle.push(evtHandle);
    evtHandle = this.m7Phone.register("EvtPeerStatusChanged", this, "peerStatusChanged");
    this.m7Phone.m7Handle.push(evtHandle);
    evtHandle = this.m7Phone.register("EvtConnected", this, "EvtConnected");
    this.m7Phone.m7Handle.push(evtHandle);
    evtHandle = this.m7Phone.register("EvtCallStatusChanged", this, "callStatusChanged");
    this.m7Phone.m7Handle.push(evtHandle);
    evtHandle = this.m7Phone.register("EvtLogon", this, "EvtLogon");
    this.m7Phone.m7Handle.push(evtHandle);
    evtHandle = this.m7Phone.register("EvtDialing", this, "onDialing");
	this.m7Phone.m7Handle.push(evtHandle);
	return this;
  },
  EvtMonitorQueue: function (queueItem) {
  },
  EvtConnected: function(data) {
    var phoneJson = {
      Command: "Action",
      Action: "Connected",
      Agent: "",
      CallsheetId: data.callSheetId,
      CalledNo: data.originCalledNo,
      EndTime: "",
      CallType: data.callType,
      Status: data.status,
      RingTime: data.offeringTime,
      ActionID: "Connected"+Math.random(),
      BeginTime: data.beginTime,
      CallNo: data.originCallNo,
      MonitorFilename: ""
    };
    this.sendAction(phoneJson);
  },
  onHangup: function(data) {
    var phoneJson = {
      Command: "Action",
      ActionID: "Hangup"+Math.random(),
      Action: "Hangup",
      Status: data.status,
      CalledNo: data.originCalledNo,
      CallType: data.callType,
      EndTime: data.endTime,
      CallsheetId: data.callSheetId,
      RingTime: data.ringTime,
      Agent: data.agent,
      CallNo: data.originCallNo,
      BeginTime: data.beginTime,
      MonitorFilename: data.data.MonitorFilename
    };
    this.sendAction(phoneJson);
  },
  callStatusChanged: function(data) {
  },
  onDialing: function(data) {
    var phoneJson = {
      Command: "Action",
      ActionID: "Dialing"+Math.random(),
      Action: "Dialing",
      Status: data.status,
      CallsheetId: data.callSheetId,
      RingTime: data.offeringTime,
      Agent: "",
      CallNo: data.originCallNo,
      CalledNo: data.originCalledNo,
      BeginTime: "",
      EndTime: "",
      CallType: data.callType,
      MonitorFilename: ""
    };
    this.sendAction(phoneJson);
  },
  m7Ring: function (data) {
    m7$("#moorCall-dialout-input").val(data.originCallNo);
    var phoneJson = {
      Command: "Action",
      Action: "Ring",
      ActionID: "Ring"+Math.random(),
      RingTime: data.offeringTime,
      CallNo: data.originCallNo,
      CalledNo: data.originCalledNo,
      Agent: data.agent,
      CallsheetId: data.callSheetId,
      CallType: data.callType,
      Status: data.status
    };
    this.sendAction(phoneJson);
  },
  sendAction: function(json) {
	//弹屏程序
	ringFunc({name:"jonykee"})
  },
  peerStatusChanged: function(data) {
  },
  EvtLogon: function(data) {
    var phoneJson = {
      Command: "Action",
      Action: "Logon",
      ActionID: "Logon" + Math.random(),
      Status: data
    };
    this.sendAction(phoneJson);
  },
}

//##objectDeclare.js##
//##recordError.js##
senvenProvide("moorCall.recordError");
var errorArr = []
var recordErrorFun = null
moorCall.recordError.sendActionToPbx = function (){
    if (recordErrorFun) { // 定时器还在跑时，不重新new 定时器
        return
    }
   recordErrorFun = window.setInterval(function () {
       if (errorArr.length > 0) {
           var url = account.url;
           var phoneJson = {
               Command: "Action",
               Action: "sykjRecordError",
               Account: account.accountId,
               ActionID: "sykjRecordError" + Math.random(),
               PBX: account.PBX,
               SessionID: account.sessionId,
               ErrorTime: errorArr[0].errorTime
           };
           if (errorArr[0] && errorArr[0].eventJson) {
               phoneJson.EventJson =  errorArr[0].eventJson
           }
           if (errorArr[0] && errorArr[0].catchRecord) {
               phoneJson.CatchRecord =  errorArr[0].catchRecord
           }
           m7$.ajax({
               url: url,
               data: {json: JSON.stringify(phoneJson)},
               jsonp: "callbackName",
               async: true,
               timeout: 15000,
               dataType: 'jsonp',
               success: function (response, ioArgs) {
               },
               error: function (response, ioArgs) {
               }
           });
           errorArr.splice(0, 1)
       } else {
           window.clearInterval(recordErrorFun)
           recordErrorFun = null
       }
   }, 5000)
}
moorCall.recordError.dataHandle = function (data) {
    if (data.flag && data.flag == 'pageError') { // m7eventHandler 捕获页面报错
        var errIndex = data.error.stack.indexOf('at ',data.error.stack.indexOf('at ')+1) // 获取第二个at的下标
        var errStr = data.error.stack.substring(0, errIndex) // 从0开始截取到第一个at结束
        var jsIndex = errStr.indexOf('/js/')// 截取出报错的js的下标
        var atIndex = errStr.indexOf('at ')// 截取出第一个at的下标
        var jsStr = errStr.substring(jsIndex+1,errStr.length) // 截取出报错的js名称
        var atStr = errStr.substring(0, atIndex) // 截取出第一个at之前的报错信息
        var lastStr = atStr + jsStr
        //汇总：第一个at之前的信息保留，第一个at之后，第二个at之前的信息保留.js部分，第二个at开始删除掉
        lastStr = lastStr.replace(/\ +/g,"").replace(/[\r\n]/g,"") // 去掉空格和回车~
        var errObj = {
            ChannelStatus: data.errorItem.ChannelStatus,
            ChannelType: data.errorItem.ChannelType,
            Event: data.errorItem.Event,
            Exten: data.errorItem.Exten,
            ExtenType: data.errorItem.ExtenType
        } // 截取事件中比较重要的信息
        var pushData = {eventJson: errObj, catchRecord: {str:lastStr}, errorTime: data.errorTime}
        errorArr.push(pushData)
    } else {
        errorArr.push(data)
    }
}
moorCall.recordError.getCurrentTime= function() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";
    if(day < 10)
        clock += "0";
    clock += day + " ";
    if(hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return(clock);
}

//##recordError.js##
//##m7Monitor.js##
senvenProvide("moorCall.Monitor");
moorCall.Monitor.monitorTimersHandle=null;
moorCall.Monitor.listenNode = null;
moorCall.Monitor.endListenHandler = null;
moorCall.Monitor={
    constructor: function(phone) {
        this.m7Phone = phone;
        this._statusDesc["stReady"] = "签出";
        this._statusDesc["stInner"] = "内部通话";
        this._statusDesc["stNormal"] = "普通通话";
        this._statusDesc["stValidate"] = "验证通话";
        this._statusDesc["stOffline"] = "离线";
        this._statusDesc["stListen"] = "监听";
        this._statusDesc["stRing"] = "呼叫中";
        this._statusDesc["stDialout"] = "外呼通话";
        this._statusDesc["stDialTransfer"] = "外呼转接通话";
        this._statusDesc["stIdle"] = "空闲";
        this._statusDesc["stBusy"] = "忙碌";
        this._statusDesc["stRinging"] = "来电振铃";
        this._statusDesc["stTransfer"] = "转接通话";
        this._statusDesc["stUnavaliable"] = "失效";
        this._statusDesc["stWebcall"] = "网络来电";

        this._init(this.m7Phone);
        var evtHandle = this.m7Phone.register("EvtMonitorQueue", this, "m7ChangedQueue");
        this.m7Handle.push(evtHandle);
        evtHandle = this.m7Phone.register("EvtMonitorPeer", this, "onAgentChanged");
        this.m7Handle.push(evtHandle);
        evtHandle = this.m7Phone.register("EvtMonitorServiceNo", this, "m7ChangedServiceNo");
		this.m7Handle.push(evtHandle);
		return this;
    },
    destroy: function() {
        for (var i in this.m7Handle) {
            this.m7Phone.m7Noregister(this.m7Handle[i]);
        }
    },
    m7Handle: [],
    m7Phone: null,
    _statusDesc: [],
    _busyType: "0",

    _init:function(phone){
        var tblQueues = document.getElementById("monitor.queues");
        var tblAgets = document.getElementById("monitor.agents");
        var tblServiceNos = document.getElementById("monitor.serviceNos");
        if(phone && phone.m7MonitorQueues){
            for(var j in phone.m7MonitorQueues)	{
                var item=phone.m7MonitorQueues[j];
                if(!item || !item.queueId)
                    continue;
                var tempArray=[item.members, item.queueName,item.idleAgentCount,item.totalAgentCount,
                    item.queueWaitCount,(item.totalCalls-item.abadonedCalls)];
                var curRow=this.m7QueryQueue(item.queueId,tblQueues,'queueId');
                if(!curRow){
                    this.m7CreateRowCell(tblQueues,item.queueId,tempArray,'queueId');
                }else{
                    this.m7UpdateRowCell(curRow,item.queueId,tempArray,'queueId',true);
                }
            }
        }
        if(phone && phone.m7MonitorServiceNum){
            for(var j in phone.m7MonitorServiceNum)	{
                var item=phone.m7MonitorServiceNum[j];
                if(!item || !item.serviceNo)
                    continue;
                var tempArray=[item.serviceNo,item.inCalls,item.inLost,item.inComplete];
                var curRow=this.m7QueryQueue(item.serviceNo,tblServiceNos,'serviceNo');
                if(!curRow){
                    this.m7CreateRowCell(tblServiceNos,item.serviceNo,tempArray,'serviceNo');
                }else{
                    this.m7UpdateRowCell(curRow,item.serviceNo,tempArray,'serviceNo',true);
                }
            }
        }
        moorCall.Monitor.setInterval();
    },
    displayExtenType:function(userId){
        var displayExtenType='';
        if(phone && phone.m7MonitorPeers){
            var peer = phone.m7MonitorPeers[userId];
            switch (peer.extenType) {
                case "sip":
                    displayExtenType='软电话';
                    break
                case "gateway":
                    displayExtenType='SIP话机/网关';
                    break
                case "Local":
                    displayExtenType=peer.localNo;
                    break
                case "none":
                    displayExtenType='无电话接入';
                    break
            }
        }
        return displayExtenType;
    },
    onAgentChanged: function(monitorAgent) {
        var self=this;
        if(!monitorAgent.userId){
            return;
        }
        if(!monitorAgent) {
            return;
        }
        var tblAgents = document.getElementById("icc.monitor.agents");
        var tempArray=[monitorAgent.DisplayName,monitorAgent.exten,monitorAgent.InComplete,
            monitorAgent.OutComplete,monitorAgent.callNo,monitorAgent.extenType,
            monitorAgent.callStatus,monitorAgent.timestamp,monitorAgent.status,0,
            monitorAgent.channel,monitorAgent.linkedChannel,monitorAgent.login];
        var curRow=self.m7QueryQueue(monitorAgent.userId,tblAgents,'userId');
        if (monitorAgent.user.indexOf('admin') == -1) {
            if (!curRow) {
                self.m7CreateRowCell(tblAgents, monitorAgent.userId, tempArray, 'userId');
            }
            else {
                self.m7UpdateRowCell(curRow, monitorAgent.userId, tempArray, 'userId');
            }
        }
        this.updatePeerNum();
    },
    updatePeerNum: function() {
        var idleNum = 0;
        var totalNum = 0;
        var onlineNum = 0;
        for(var i in phone.m7MonitorPeers) {
            var item=phone.m7MonitorPeers[i];
            var peerState = this.m7DisplayStatus(item.userId);
            if(item.user != null && item.user.indexOf('admin') != -1) {
                continue;
            }
            totalNum++;
            if(peerState != this._statusDesc["stOffline"] && peerState != this._statusDesc["stUnavaliable"] && peerState != this._statusDesc["stReady"]) {
                onlineNum++;
                if(peerState == this._statusDesc["stIdle"]) {
                    idleNum++;
                }
            }
        }
        document.getElementById("icc.monitor.agents.onlinePeer").innerHTML = onlineNum;
        document.getElementById("icc.monitor.agents.idlePeer").innerHTML = idleNum;
        document.getElementById("icc.monitor.agents.totalPeer").innerHTML = totalNum;
    },
    m7ChangedServiceNo: function(monitorServiceNo) {
        var self=this;
        if(!monitorServiceNo || !monitorServiceNo.serviceNo){
            return;
        }
        var tblServiceNos = document.getElementById("icc.monitor.serviceNos");
        var curRow=self.m7QueryQueue(monitorServiceNo.serviceNo,tblServiceNos,'serviceNo');
        var tempArray=[monitorServiceNo.serviceNo,monitorServiceNo.inCalls,monitorServiceNo.inLost,monitorServiceNo.inComplete];
        if(!curRow){
            self.m7CreateRowCell(tblServiceNos,monitorServiceNo.serviceNo,tempArray,'serviceNo');
        }else{
            self.m7UpdateRowCell(curRow,monitorServiceNo.serviceNo,tempArray,'serviceNo');
        }
    },
    m7CreateRowCell:function(tab, qid, arrCellText,key){
        var htmls = [];
        var userEvents = [];
        htmls.push("<table border=0 cellSpacing=0 cellPadding=0 width=100% >");
        htmls.push("<COLGROUP >");
        switch (key) {
            case "userId":
                htmls.push("<col width='9%' /><col width='7%' /><col width='9%' /><col width='9%' /><col width='11%' /><col width='9%' /><col width='9%' /><col width='9%' /><col width='9%' /><col width='19%' />");
                break
            case "queueId":
                htmls.push("<COL width='10%' span='5'>");
                break
            case "serviceNo":
                htmls.push("<COL width='10%' span='4'>");
                break
        }
        htmls.push("</COLGROUP>");
        htmls.push("<tr "+key+"="+qid+" class='even' >");
        switch (key) {
            case "userId":
                for(var i=0; i<10; i++) {
                    if(i==7) {
                        htmls.push("<td id='"+qid+"_7'></td>");
                        if(arrCellText[i] && (arrCellText[6] != "Idle" && !arrCellText[12] || arrCellText[12])){
                            var date = new Date();
                            var identity = date.valueOf();
                            var oldTime=((identity-phone.currentServerTime)-parseFloat(arrCellText[i])*1000)/1000;//设定初始值
                            if(oldTime<0){
                                oldTime=0;
                            }
                            var countTimer={
                                count:oldTime
                            }
                            monitorTimers[qid]=countTimer;
                        }
                    } else if(i==9) {
                        htmls.push("<td id='"+qid+"_9' extension='"+arrCellText[0]+"' status='"+arrCellText[6]+"' curChannel='"+arrCellText[10]+"' linkedChannel='"+arrCellText[11]+"' userId='"+qid+"'>");
                        var textNode
                        if (isSuperAdmin) {
                            textNode = '<a href="javascript:;" class="operation">&nbsp;强拆&nbsp;</a><a href="javascript:;" class="operation">&nbsp;签出&nbsp;</a><a href="javascript:;" class="operation">&nbsp;签入&nbsp;</a>';
                        } else {
                            textNode = '<a href="javascript:;"  class="operation">&nbsp;监听&nbsp;</a><a style="display:none" href="javascript:;" class="operation">&nbsp;结束监听&nbsp;</a>' +
                                '<a href="javascript:;" class="operation">&nbsp;强拆&nbsp;</a><a href="javascript:;" class="operation">&nbsp;抢接&nbsp;</a><a href="javascript:;" class="operation">&nbsp;签出&nbsp;</a><a href="javascript:;" class="operation">&nbsp;签入&nbsp;</a>';
                        }
                        htmls.push(textNode);
                        htmls.push("</td>");
                        userEvents.push(qid);
                    } else if(i==5)	{
                        htmls.push("<td>");
                        var extenType=this.displayExtenType(qid);
                        htmls.push(extenType);
                        htmls.push("</td>");
                    } else if(i==6) {
                        htmls.push("<td");
                        var statusName=this.m7DisplayStatus(qid);
                        if(statusName==this._statusDesc["stBusy"]){
                            if(this.m7Phone.m7PeerState && this.m7Phone.m7PeerState._get(this._busyType) != null) {
                                htmls.push(" style='color: #E09A16'");
                                statusName = this.m7Phone.m7PeerState._get(this._busyType).value;
                            }
                        } else if(statusName==this._statusDesc["stWebcall"] || statusName==this._statusDesc["stInner"]
                            || statusName==this._statusDesc["stRing"] || statusName==this._statusDesc["stRinging"]
                            || statusName== this._statusDesc["stListen"] || statusName==	this._statusDesc["stNormal"]
                            || statusName==this._statusDesc["stDialout"] || statusName==this._statusDesc["stDialTransfer"]
                            || statusName== this._statusDesc["stTransfer"]){
                            htmls.push(" style='color:#FF33FF'");
                        } else if(statusName==this._statusDesc["stIdle"]){
                            htmls.push(" style='color: #4DB690'");
                        }
                        htmls.push(">");
                        htmls.push(statusName)
                        htmls.push("</td>")
                    }  else {
                        htmls.push("<td>");
                        htmls.push(arrCellText[i])
                        htmls.push("</td>")
                    }
                }
                break
            case "queueId":
                var tipTitle = "";
                for(var i=0; i<arrCellText.length; i++){
                    if(i == 0) {
                        for(var j in arrCellText[i]){
                            if(this.m7Phone.m7Base.m7getAgentViaSipNum(j) != null) {
                                tipTitle += this.m7Phone.m7Base.m7getAgentViaSipNum(j).DisplayName + ",";
                            }
                        }
                        if(tipTitle != "") {
                            tipTitle = tipTitle.substring(0, tipTitle.lastIndexOf(","));
                        }
                    } else {
                        if(i == 3) {
                            htmls.push("<td title=" + tipTitle + "> ");
                            htmls.push("<a href='#'>");
                            htmls.push(arrCellText[i]);
                            htmls.push("</a>");
                            htmls.push("</td>");
                        } else {
                            htmls.push("<td ");
                            if(i==4&&arrCellText[i]!='0'){
                                htmls.push(" style='color:#E09A16'");
                            }
                            htmls.push(" >");
                            htmls.push(arrCellText[i])
                            htmls.push("</td>")
                        }
                    }
                }
                break
            case "serviceNo":
                for(var i=0; i<arrCellText.length; i++){
                    htmls.push("<td>");
                    htmls.push(arrCellText[i])
                    htmls.push("</td>")
                }
                break
        }
        htmls.push("</tr>");
        htmls.push("</table>")
        var row = document.createElement("tr");
        for(i = 0; i< tab.childNodes.length; i++) {
            if(tab.childNodes[i].nodeType == 1) {
                if(tab.childNodes[i].tagName == "TBODY") {
                    tab.childNodes[i].appendChild(row);
                }
            }
        }

        var cell = document.createElement("th");
        cell.style.paddingLeft = "1px";
        row.appendChild(cell);
        cell.innerHTML = htmls.join("");
        if(userEvents != '') {
            this.m7ConnectEvent(userEvents);
        }

    },
    m7DisplayStatus:function(userId){
        var displayName='';
        if(phone && phone.m7MonitorPeers){
            var peer= phone.m7MonitorPeers[userId];
            if(peer.login && peer.extenType!='none'){
                if((peer.extenType=='sip' || peer.extenType=='gateway') && peer.register==false){
                    displayName=this._statusDesc["stUnavaliable"];
                }else if(peer.callStatus=='Idle'){
                    if(peer.busyType != "0")	{
                        displayName=this._statusDesc["stBusy"];
                        this._busyType = peer.busyType;
                    }else{
                        displayName=this._statusDesc["stIdle"];
                        this._busyType = "0";
                    }
                }else if(peer.callStatus=='Ringing'){
                    displayName=this._statusDesc["stRinging"];
                }else if(peer.callStatus=='Ring'){
                    displayName=this._statusDesc["stRing"];
                }else if(peer.callStatus=='normal'){
                    displayName=this._statusDesc["stNormal"];
                }else if(peer.callStatus=='inner'){
                    displayName=this._statusDesc["stInner"];
                }else if(peer.callStatus=='dialout'){
                    displayName=this._statusDesc["stDialout"];
                }else if(peer.callStatus=='transfer'){
                    displayName=this._statusDesc["stTransfer"];
                }else if(peer.callStatus=='dialTransfer'){
                    displayName=this._statusDesc["stDialTransfer"];
                }else if(peer.callStatus=='listen'){
                    displayName=this._statusDesc["stListen"];
                }else if(peer.callStatus=='webcall'){
                    displayName=this._statusDesc["stWebcall"];
                }else if(peer.callStatus=='validate'){
                    displayName=this._statusDesc["stValidate"];
                }else {
                    displayName=peer.callStatus+'ass';
                }
            }else if(peer.login && peer.extenType=='none'){
                displayName='';
            }else{
                switch (peer.callStatus) {
                    case "Ring":
                        displayName=this._statusDesc["stRing"];
                        break
                    case "Ringing":
                        displayName=this._statusDesc["stRinging"];
                        break
                    case "inner":
                        displayName=this._statusDesc["stInner"];
                        break
                    case "normal":
                        displayName=this._statusDesc["stNormal"];
                        break
                    case "dialout":
                        displayName=this._statusDesc["stDialout"];
                        break
                    case "dialTransfer":
                        displayName=this._statusDesc["stDialTransfer"];
                        break
                    case "transfer":
                        displayName=this._statusDesc["stTransfer"];
                        break
                    case "listen":
                        displayName=this._statusDesc["stListen"];
                        break
                    case "webcall":
                        displayName=this._statusDesc["stWebcall"];
                        break
                    case "validate":
                        displayName=this._statusDesc["stValidate"];
                        break
                    default:
                        if(!peer.login && (peer.extenType=='gateway' || peer.extenType=='Local')){
                            displayName=this._statusDesc["stOffline"];
                        }else{
                            displayName=this._statusDesc["stReady"];
                        }
                }
            }
        }
        return displayName;
    },
    m7ConnectEvent:function(userEvents) {
        for(var i=0;i<userEvents.length;i++) {
            sevenContent(document.getElementById(userEvents[i]+"_9").firstChild, "onclick", this.listen);
            sevenContent(document.getElementById(userEvents[i]+"_9").childNodes[1], "onclick", this.endListen);
            sevenContent(document.getElementById(userEvents[i]+"_9").childNodes[2], "onclick", this.forceHangup);
            sevenContent(document.getElementById(userEvents[i]+"_9").childNodes[3], "onclick", this.loot);
            sevenContent(document.getElementById(userEvents[i]+"_9").childNodes[4], "onclick", this.m7ForKickout);
            sevenContent(document.getElementById(userEvents[i]+"_9").childNodes[5], "onclick", this.m7Checkin);
        }
    },
    m7ChangedQueue: function(monitorQueue) {
        var self=this;
        if(!monitorQueue || !monitorQueue.queueId)	{
            return;
        }
        var tblAgents = document.getElementById("icc.monitor.queues");
        var curRow=self.m7QueryQueue(monitorQueue.queueId,tblAgents,'queueId');
        var tempArray=[monitorQueue.members, monitorQueue.queueName,monitorQueue.idleAgentCount,monitorQueue.totalAgentCount,
            monitorQueue.queueWaitCount,(monitorQueue.totalCalls-monitorQueue.abadonedCalls)];
        if(!curRow){
            self.m7CreateRowCell(tblAgents,monitorQueue.queueId,tempArray,'queueId');
        }else{
            self.m7UpdateRowCell(curRow,monitorQueue.queueId,tempArray,'queueId');
        }
    },
    endListen:function(event) {
        phone.hangup();
    },
    m7QueryQueue:function(qid,table,key){
        for(var i=0; i<table.rows.length; i++)
        {
            var row = table.rows[i].cells[0].firstChild.rows[0];
            var trID=row.getAttribute(key);
            if(qid==trID){
                return table.rows[i].cells[0].firstChild.rows[0];
            }
        }
        return null;
    },
    m7UpdateOtherRowCell:function(row,qid,arrCellText,key,isFirst){
        if(key=='userId'){
            for(var i=0; i<row.cells.length; i++)
            {
                if(i==6){
                    row.cells[i].setAttribute("extension", arrCellText[0]);
                    row.cells[i].setAttribute("curChannel", arrCellText[7]);
                    row.cells[i].setAttribute("status", arrCellText[4]);
                    row.cells[i].setAttribute("linkedChannel", arrCellText[8]);
                    row.cells[i].setAttribute("userId", qid);
                    if(isFirst){
                        sevenContent(row.cells[i].firstChild, "onclick", this.listen);
                        sevenContent(row.cells[i].childNodes(4), "onclick", this.m7ForKickout);
                        sevenContent(row.cells[i].childNodes(2), "onclick", this.forceHangup);
                        sevenContent(row.cells[i].childNodes(3), "onclick", this.loot);
                        sevenContent(row.cells[i].childNodes(1), "onclick", this.endListen);
                        sevenContent(row.cells[i].childNodes(5), "onclick", this.m7Checkin);
                    }
                }
                else{
                    row.cells[i].innerText =arrCellText[i];
                }
            }
        }
    },
    loot:function(event){
        var o = event.target;
        var curChannel = o.parentNode.getAttribute("linkedChannel");
        var status = o.parentNode.getAttribute("status");
        var userId = o.parentNode.getAttribute("userId");
        if (userId == phone.userId) {
            moorCall.moortools.error('不允许对自身进行该操作')
            return;
        }
        if (sevenGetObject("phone.extenType")=='none') {
            moorCall.moortools.error('执行该操作必须以电话方式登录')
            return;
        }
        if(moorCall.Monitor.m7IsPeerSelf()){
            moorCall.moortools.error('该状态不允许抢接')
            return;
        }
        phone.m7LootCall(curChannel);
    },
    forceHangup:function(event){
        var o = event.target;
        var status = o.parentNode.getAttribute("status");
        var curChannel = o.parentNode.getAttribute("curChannel");
        if (status != "listen" && status != "Idle") {
            phone.m7hangupChann(curChannel);
        } else {
            moorCall.moortools.error('该状态不允许强拆')
        }
    },
    listen:function(event) {
        var self=this;
        if (sevenGetObject("phone.extenType")=='none') {
            moorCall.moortools.error('执行该操作必须以电话方式登录')
            return;
        }
        var o = event.target;
        var userId = o.parentNode.getAttribute("userId");
        var phoneNum = o.parentNode.getAttribute("extension");
        var status = o.parentNode.getAttribute("status");
        var channel = o.parentNode.getAttribute("curChannel");
        if (userId == phone.userId) {
            moorCall.moortools.error('不允许对自身进行该操作')
            return;
        }
        if(moorCall.Monitor.m7IsPeerSelf()){
            moorCall.moortools.error('该状态不允许监听')
            return;
        }
        if (status != "webcall" && status != "inner" && status!="normal" && status!="dialout" && status!="dialTransfer" && status!="transfer") {
            moorCall.moortools.error('该状态不允许监听')
            return;
        }
        if(phone.m7PeerState.m7CurPeerStateKey == "0") {
            moorCall.moortools.error('请先将电话置为忙碌')
            return;
        }
        o.style.display = "none";
        o.nextSibling.style.display = "";
        moorCall.Monitor.endListenHandler = phone.register("EvtEndListen", null, function() {moorCall.Monitor.onEndListen();});
        moorCall.Monitor.listenNode = o;
        phone.listen(channel);
    },
    m7UpdateRowCell:function(row,qid,arrCellText,key,isFirst){
        switch (key) {
            case "userId":
                for(var i=0; i<row.cells.length; i++) {
                    switch (i) {
                        case 7:
                            if(arrCellText[i] && (arrCellText[6] != "Idle" && !arrCellText[12] || arrCellText[12])){
                                var date = new Date();
                                var identity = date.valueOf();
                                var oldTime=((identity-phone.currentServerTime)-parseFloat(arrCellText[i])*1000)/1000;//设定初始值
                                if(oldTime<0){
                                    oldTime=0;
                                }
                                var countTimer={
                                    count:oldTime,
                                    tdNode:row.cells[i]
                                }
                                monitorTimers[qid]=countTimer;
                            }else{
                                delete monitorTimers[qid];
                                row.cells[i].innerText="";
                            }
                            break
                        case 6:
                            var statusName=this.m7DisplayStatus(qid);
                            if(statusName==this._statusDesc["stBusy"] && this.m7Phone.m7PeerState && this.m7Phone.m7PeerState._get(this._busyType) != null){
                                row.cells[i].style.color = "red";
                                statusName = this.m7Phone.m7PeerState._get(this._busyType).value;
                            }else if(statusName==this._statusDesc["stIdle"]){
                                row.cells[i].style.color = "green";
                            } else if (statusName == this._statusDesc["stWebcall"]
                                || statusName == this._statusDesc["stInner"]
                                || statusName == this._statusDesc["stNormal"]
                                || statusName == this._statusDesc["stDialTransfer"]
                                || statusName == this._statusDesc["stDialout"]
                                || statusName == this._statusDesc["stRing"]
                                || statusName == this._statusDesc["stRinging"]
                                || statusName == this._statusDesc["stListen"]
                                || statusName == this._statusDesc["stTransfer"]) {
                                row.cells[i].style.color = "#FF33FF";
                            }else{
                                row.cells[i].style.color = "";
                            }
                            row.cells[i].innerHTML = statusName;
                            break
                        case 5:
                            var extenType = this.displayExtenType(qid);
                            row.cells[i].innerHTML = extenType;
                            break
                        case 9:
                            row.cells[i].setAttribute("linkedChannel", arrCellText[11]);
                            row.cells[i].setAttribute("extension", arrCellText[0]);
                            row.cells[i].setAttribute("curChannel", arrCellText[10]);
                            row.cells[i].setAttribute("status", arrCellText[6]);
                            if(isFirst){
                                sevenContent(row.cells[i].firstChild, "onclick", this.listen);
                                sevenContent(row.cells[i].childNodes(1), "onclick", this.endListen);
                                sevenContent(row.cells[i].childNodes(4), "onclick", this.m7ForKickout);
                                sevenContent(row.cells[i].childNodes(3), "onclick", this.loot);
                                sevenContent(row.cells[i].childNodes(2), "onclick", this.forceHangup);
                                sevenContent(row.cells[i].childNodes(5), "onclick", this.m7Checkin);
                            }
                            break
                        default:
                            row.cells[i].innerHTML = arrCellText[i];

                    }
                }
                break
            case "queueId":
                var tipTitle = "";
                for(var i = 1; i<row.cells.length; i++) {
                    if(i == 2) {
                        row.cells[i].title = tipTitle;
                        row.cells[i].innerHTML = "<a href='#'>" + arrCellText[i + 1] + "</a>";
                    } else {
                        row.cells[i].innerText =arrCellText[i + 1];
                        if(i==3 &&arrCellText[i + 1]!='0'){
                            row.cells[i].style.color='red';
                        }else{
                            row.cells[i].style.color='';
                        }
                    }
                }
                for(var j in arrCellText[0]){
                    if(this.m7Phone.m7Base.m7getAgentViaSipNum(j) != null) {
                        tipTitle += this.m7Phone.m7Base.m7getAgentViaSipNum(j).DisplayName + ",";
                    }
                }
                if(tipTitle != "") {
                    tipTitle = tipTitle.substring(0, tipTitle.lastIndexOf(","));
                }
                break
            case "serviceNo":
                for(var i=1; i<row.cells.length; i++) {
                    row.cells[i].innerText =arrCellText[i];
                }
                break
        }
    },
    m7ForKickout:function(event) {
        var o = event.target;
        var sipNo = o.parentNode.getAttribute("extension");
        var username = o.parentNode.getAttribute("username");
        var userId = o.parentNode.getAttribute("userId");
        if (userId == phone.userId) {
            moorCall.moortools.error('不允许对自身进行该操作')
            return;
        }
        if(phone && phone.m7MonitorPeers){
            var peer=phone.m7MonitorPeers[userId];
            if(!peer.login && peer.extenType!='Local'  && peer.extenType!='gateway'){//离线的可以签出
                moorCall.moortools.error('不允许对签出坐席进行该操作')
                return;
            }
        }
        phone.kick(userId);
    },
    m7Checkin:function(event) {
        var o = event.target;
        var username = o.parentNode.getAttribute("username");
        var sipNo = o.parentNode.getAttribute("extension");
        var userId = o.parentNode.getAttribute("userId");
        if (userId == phone.userId) {
            moorCall.moortools.error('不允许对签出坐席进行该操作')
            return;
        }
        if(phone && phone.m7MonitorPeers){
            var peer=phone.m7MonitorPeers[userId];
            if(peer.login){
                moorCall.moortools.error('不允许对签入坐席进行该操作')
                return;
            }
            if(!peer.login && peer.extenType == 'Local'){
                return;
            }
        }
        phone.m7pick(userId);
    },
}
moorCall.Monitor.onEndListen=function() {
    var o = moorCall.Monitor.listenNode;
    o.nextSibling.style.display = "none";
    o.style.display = "";
    phone.m7Noregister(moorCall.Monitor.endListenHandler);
};
moorCall.Monitor.getTimer=function(countTimer){
    var minute="0";
    var second="0";
    var hour="0";
    countTimer = parseInt(countTimer)+1;
    hour=parseInt(countTimer/3600);
    minute = parseInt((countTimer%3600)/60);
    second = (countTimer%3600)%60;
    var mtime = (hour<10)? "0" + hour : hour;
    mtime += ":";
    mtime += (minute<10)? "0" + minute : minute;
    mtime += ":";
    mtime += (second<10)? "0" + second : second;

    return mtime;
};
moorCall.Monitor.setInterval=function(){
    if (moorCall.Monitor.monitorTimersHandle) {
        window.clearInterval(moorCall.Monitor.monitorTimersHandle);
    }
    moorCall.Monitor.monitorTimersHandle = window.setInterval("moorCall.Monitor.m7DoCallTimer",1000);
};
moorCall.Monitor.m7DoCallTimer=function(){
    if(monitorTimers){
        for(var i in monitorTimers) {
            if(document.getElementById(i+"_7") != null) {
                document.getElementById(i+"_7").innerText = moorCall.Monitor.getTimer(monitorTimers[i].count);
                monitorTimers[i].count++;
            }
        }
    }
};
moorCall.Monitor.m7IsPeerSelf=function() {
    var me=phone.userId;
    if(me && phone && phone.m7MonitorPeers){
        var peer=	phone.m7MonitorPeers[me];
        if(peer.callStatus=='Ring' ||peer.callStatus=='Ringing' || peer.callStatus=='inner'
            ||peer.callStatus=='normal'||peer.callStatus=='dialout'||peer.callStatus=='dialTransfer'
            ||peer.callStatus=='transfer'||peer.callStatus=='listen'){
            return true;
        }
    }
    return false;
};

//登录7陌
function moorlogin(loginName, password, extenType, agentStatus,callback){
	if(typeof callback==="function"){
		afterPhone = callback;
	}
	moorCall.moortools.m7BeginLogon(loginName, password, extenType, agentStatus);
}
//退出登录
function moorlogout(){
	moorCall.moortools.m7logout
}

//7陌
function moorring(callback){
	if(typeof callback==="function"){
		ringFunc = callback;
	}
}
//error回调
function catchError(callback){
	if(typeof callback==="function"){
		errorFunc = callback;
	}
}
//success回调
function catchSuccess(callback){
	if(typeof callback==="function"){
		successFunc = callback;
	}
}
//loading回调
function catchLoading(callback){
	if(typeof callback==="function"){
		loadingFunc = callback;
	}
}
//input回调
function catchInput(callback){
	if(typeof callback==="function"){
		inputFunc = callback;
	}
}
//##m7Monitor.js##
export {
	moorlogin,
	moorlogout,
	moorring,
	phone,
	softphoneBar,
	catchError,
	catchSuccess,
	catchLoading,
	catchInput,
	inputFunc
}