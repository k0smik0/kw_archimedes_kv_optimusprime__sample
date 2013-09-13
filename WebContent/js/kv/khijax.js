/*
 * Massimiliano Leone - maximilianus@gmail.com - 2009, GPL licence
 */

/*
 *  A simple jewel to work with ajax
 *  
 *  container: 	object where we work (form, links group, etc)
 *  outElement: html element where we want show result
 *  url:		remote url we want retrieve using ajax
 *  method:		get/post method
 *  callback:	a function we can inject. It makes some dirty work :D
 *  validator: 	a custom validator, used before start ajax request    
 */
function Khijax(container,outElement,url,method,callback,validator) {
	this._init(container,outElement,url,method,callback,validator);
}
Khijax.isElement = function(element,type) {
	if (type == "form" && element.nodeName.toLowerCase() == type) {
		return true
	}
	return false;
}
Khijax.isForm = function(element){
	if (element.nodeName.toLowerCase() == "form") { 
		return true
	}
	return false;
}
Khijax.prototype = {
	_init: function(container,outElement,url,method,callback,validator) {		
		if (!container || !outElement || !url || !method)
			throw new Error("Khijax::init - container,outElement,url,method are mandatories in constructor!");
		
		this._url = new Object();
		this._url.name = null;
		this._url.isSetted = false;
		this._url.isDynamicPage = false;
		
		if (container) 	this.setContainer(container);
		if (outElement) this.setOutElement(outElement);		
		if (url) 		this.setUrl(url);
		if (method) 	this.setMethod(method);
		if (callback) 	this.setCallback(callback);		
		if (validator) 	this.setValidator(validator);
		
		var xhrHandler = new XHRHandler();
		this._xhr = xhrHandler.getXHR();
		//KVDebug("KVHijax::_init","ok");
	},
	//mutuators
	setOutElement: function(element) {
		if (!element) 
			throw new Error("Khijax::setOutElement - No element reference or element id has been provided!");
		var outElement = element.nodeName ? element : document.getElementById(element);
		if (!outElement) 
			throw new Error("Khijax::setOutElement - No element with reference or id of '" + outElement + "' exists!");
		this._outElement = outElement;
	},
	setUrl: function(url) {
		//alert("khijax:61");
		if (!is(url,String))
			throw new Error("Khijax::setUrl - Url must be a string!");
		this._url.name = url;
		/*if (/^[a-zA-Z0-9_\-]+\.[php|asp|jsp|py]$/.test(url)) { // if a dynamic page which process some data		
			this._url.isDynamicPage = true; 
		}
		else if (/^[a-zA-Z0-9_\-]+\.[xml|html|txt]$/.test(url)) { // if a static url
			this._url.isDynamicPage = false;
			this._query = this._url.name;
		}*/
		if (/^[a-zA-Z0-9_\-]+\.[xml|html|txt]$/.test(url)) { // if a static url
			//alert("khijax:73 static!");
			this._url.isDynamicPage = false;
			this._query = this._url.name;
		} else { // if a dynamic page which process some data
			//alert("khijax:77 dynamic!");
			this._url.isDynamicPage = true;
		}
		//alert("khijax:80 "+url);
		this._url.isSetted = true;
	},
	setCallback: function(callback) {
		if (!is(callback,Function)) 
			throw new Error("Khijax::setCallback - "+callback+" is not a Function");
		this._callback = callback;		
	},
	setMethod: function(value) {
		var v = value.toLowerCase()
		if (!(v == "get" || v == "post"))
			throw new Error("Khijax::setMehod - Only GET or POST method allowed!");
		this._method = v;
		delete v;
	},
	setValidator: function(validator) {
		if (is(validator.isValid,Function)) 
			this._validator = validator; 
	},
	setContainer: function(containerValue) {		
		if (!containerValue) 
			throw new Error("Khijax::setContainer - No element reference or element id has been provided!");
		var container = containerValue.nodeName ? containerValue : JSUtils.getElementById(containerValue);
		if (!container) 
			throw new Error("Khijax::setContainer - No element with reference or id of '" + container + "' exists!");
				
		this._container = container;
	},
	setLoadingStyle: function(value) {
		this._loadingStyle = value;
	},	
	getData: function() {
		if (!this._container)
			throw new Error("Khijax::getData - No container is defined!");
		if (isForm(this._container)) { // is form
			this._setOnSubmitEventInForm();
		}
		else { // is a set of links
			this._buildQueryForLinksAndSetOnClickEventInLinks(this._container);
		}
	},
	
	// private zone
	_buildQueryFromForm: function(form) {
		var query = "";
	    for (var i in form.elements) {
			var name = form.elements[i].name;
			var value = escape(form.elements[i].value);
			if (!/undefined|null|item|namedItem/.test(name) && !/submit|reset/.test(value)) {
				query += "&";
				query += name;
				query += "=";
				query += escape(form.elements[i].value);						
			}
	    }
		query = query.replace("&","");
		return query;
	},
	_setOnSubmitEventInForm: function() {
		var khjx = this; //trick for event scope, using closure
		
		if (this._validator) { // we want validate		
			this._container.onsubmit = function() {				
				if (khjx._validator.isValid()) {					
					khjx._query = (khjx._query) ? khjx._query: khjx._buildQueryFromForm(khjx._container);
					//alert("khijax:140 "+khjx._query);
					khjx._start();								
					return false; // so form will not start and page will not be refreshed - we love ajax ;D
				} 
				else {
					khjx._outElement.innerHTML = ""; 
					return false // however false, cause form is not valid and it will not start
				} 
			}
		} 
		else { // we don't validate
			this._container.onsubmit = function() {
				khjx._query = (khjx._query) ? khjx._query: khjx._buildQueryFromForm(khjx._container);
				khjx._start();
				return false; // so form will not start and page will not be refreshed - we love ajax ;D 
			}			
		}
	},
	_buildQueryForLinksAndSetOnClickEventInLinks: function(container) {
		var links = container.getElementsByTagName("a");
		var khjx = this;
		if (!this._query) { // null because url is a dynamic page - see setContainer
			for (var i in links) {
				links[i].onclick = function() {
					var linkQuery = this.getAttribute("href").split("?")[1];
					khjx.url+= "?"+linkQuery;
					khjx._start();
					return false;  // so page will not be refreshed
				}
			}
		}
		else {
			for (var i in links) {
				links[i].onclick = function() {				 
					khjx._start();
					return false; // so page will not be refreshed
				}
			}			
		}			
   		delete links;
	},
	_checkMandatories: function() {
		if (!this._url)
			throw new Error("Khijax::_checkMandatories - No url is defined!");
		if (!this._outElement)
			throw new Error("Khijax::_checkMandatories - No outElement is defined!");
					
		return true
	},
	_start: function() {
		if (this._checkMandatories) {		
			if (this._xhr) { // yeah! we have ajax ;D
				if (!this._method)
					throw new Error("Khijax::_start - No method is defined!");
										
				if (this._loadingStyle)
					this._loadingStyle();
	
				var khijax = this;
				
				this._xhr.onreadystatechange = function(){
					khijax._completeRequest();
				}
				if (this._method == "post") {
					this._xhr.open("POST", this._url.name, true);
					this._xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					this._xhr.send(this._query);					
				}
				if (this._method == "get") {
					if (this._url.isDynamicPage) {
						this._query = this._url.name+"?"+this._query;
						//this._query += "&random="+parseInt(Math.random()*99999999);
					}
					//alert("getting _url: "+this._url.name);
					this._xhr.open("GET", this._query, true);
					this._xhr.send(null);
				}
			}
			else { // :/ we don't have ajax - try iframe support
				this._outElement.innerHTML = '<iframe src="' + this._query + '" width="50%" height="50px">Iframes are not supported</iframe>';
			}
		}
		
	},
	_completeRequest: function() {
		if (this._xhr.readyState === 2) {
        	this._outElement.innerHTML = "Request sent...";
        }
        else if (this._xhr.readyState === 3) {
			this._outElement.innerHTML = "Receiving response...";
        }
		if (this._xhr.readyState === 4) {		
			if (this._xhr.status === 200 || this._xhr.status === 304) {
				if (this._callback) {
					this._outElement.innerHTML = "";					
					var cResult = this._callback(this._xhr.responseText, this._xhr.responseXML, this._xhr.getResponseHeader("Content-Type"));					
					this._outElement.appendChild(cResult);
				}
				else 
					//this._outElement.innerHTML = this._xhr.responseXML ? this._xhr.responseXML : this._xhr.responseText;			
					this._outElement.innerHTML = this._xhr.responseText;
			}
		}
	}	
}
