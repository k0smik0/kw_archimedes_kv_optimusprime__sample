/*
 * Massimiliano Leone - maximilianus@gmail.com - 2009, GPL licence
 */

var JSUtils = {
	/*
	 * from http://javascript.html.it/guide/leggi/95/guida-ajax/
	 */
	getElementById: function(idElemento){	
		var elemento;		
		// se esiste il metodo getElementById questo if sarà 
		// diverso da false, null o undefined
		// e sarà quindi considerato valido, come un true
		if (document.getElementById) 
			elemento = document.getElementById(idElemento);
		// altrimenti è necessario usare un vecchio sistema
		else 
			elemento = document.all[idElemento];		
		return elemento;		
	}, // myGetElementById()
	
	/*
	 * from http://www.dominopower.com/issues/issue200004/howto002.html
	 */
	getRequestParameter: function(parameterName){
		var  // estraiamo i parametri di get dalla uri della pagina
		queryString = window.top.location.search.substring(1);
		
		// Add "=" to the parameter name (i.e. parameterName=value)
		// torna utile nello split della query per cercare il parametro voluto
		var parameterName = parameterName + "=";
		
		if (queryString.length > 0) {		
			// Find the beginning of the string
			begin = queryString.indexOf(parameterName);			
			// If the parameter name is not found, skip it, otherwise return the value
			if (begin != -1) {			
				// Add the length (integer) to the beginning
				begin += parameterName.length;
				// Multiple parameters are separated by the "&" sign
				end = queryString.indexOf("&", begin);				
				if (end == -1) {
					end = queryString.length
				}// if ( ! end )
				// Return the string (unescapes special characters such as & / = etc...)
				return unescape(queryString.substring(begin, end));
			} // if ( begin )
			// Return "null" if no parameter has been found
			return "null";			
		} // if ( querystring )
	}, // myGetRequestParametr()
	
	/*
	 * Funzione per recuperare per nome l'elemento figlio di un elemento dato
	 *
	 * Non usa l'id (che deve essere unico nel DOM) ma il name
	 * per lasciare la possibilita' di avere piu' nodi con lo stesso name
	 * ma figli di elementi diversi.
	 *
	 * Ad esempio per collocare piu' immagini di attesa nel documento,
	 * in caso di piu' richieste AJAX contemporanee
	 */
	getChildByName: function(theElement, name){	
		// analisi alla ricerca del nodo voluto
		if (theElement.childNodes) 
			for (var i = 0; i < theElement.childNodes.length; i++) 
				if (theElement.childNodes[i].name === name) 
					return theElement.childNodes[i];		
	}, // myGetChildByName()
	
	getElementsByClass: function(searchClass, node, tag){
		var classElements = new Array();
		if (node == null) 
			node = document;
		if (tag == null) 
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}
}// JSUtils

function isForm(container) {
	if (container.nodeName.toLowerCase() == "form") {
		return true
	}
	return false
}

function is(obj, type){
	return typeof(obj) === "undefined" || obj === null ? obj === type : obj.constructor === type
}
/*
function isDemo() {
	alert([
	is({}, Object), // true
	is("Hello", String), // true
	is(new String, String), // true
	is(function(){return false}, Function), // true
	is(new Function(), Function), // true
	is(/test/, Function), // false
	is(/test/, RegExp), // true
	is(new RegExp, Function), // false
	is(new RegExp, RegExp), // true
	is(RegExp, RegExp), // false
	is(RegExp, Function), // true
	is("undefined", BLA), //true because BLA is undefined
	is(null,null) //true
	]);
}
*/



function XHRHandler(){
	return this._init();
};
XHRHandler.prototype = {
	_init: function() {		
		 //for a singleton in entire browser, use navigator.VARIABLE
		 //for a singleton in window/page, simply use VARIABLE		
		/*if (!navigator.xhrHandlerInstance) {
			navigator.xhrHandlerInstance = this;
		}
		return navigator.xhrHandlerInstance;
		*/
		
				
		if (XHRHandler.xhrInstance == null) { XHRHandler.xhrInstance = this; }
		return XHRHandler.xhrInstance;
	},
	_retrieveXhrMethod: function() { // Factory method.
		//alert("retrieve method");
		var methods = [
			function() { return new XMLHttpRequest(); },
			function() { return new ActiveXObject('Msxml2.XMLHTTP'); },
			function() { return new ActiveXObject('Microsoft.XMLHTTP'); }
		];
		for(var i in methods) {
			try { methods[i](); }
			catch(e) { continue; }
			// If we reach this point, method[i] worked.
			this._xhrMethod = methods[i]; // Memoize the method.
			return methods[i];
		}
		// If we reach this point, none of the methods worked.
		throw new Error('XHRHandler: Could not create an XHR method.');
	},
	getXHR: function() {
		if (!this._xhrMethod ) {
			//alert("creating xhr");
			this._xhrMethod = this._retrieveXhrMethod();
		}
		return this._xhrMethod();		 
	}
}
