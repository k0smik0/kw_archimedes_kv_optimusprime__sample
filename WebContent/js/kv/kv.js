/*
 * Massimiliano Leone - maximilianus@gmail.com - 2009, GPL licence
 */

/*
 *  KValidatorField is a validator for a single element (textarea?)
 *  in html page
 *  It works with a KValidator (basically a regexp matcher)
 *  
 */
function KValidatorField(element) {
	this._initKVField(element);		
}
KValidatorField.prototype = {
	_initKVField: function(element){
		this.setField(element);
	},
	setField: function(element) {
		if (!element) 
			throw new Error("KValidatorField::setField - No element reference or element id has been provided!");
		var kvField = element.nodeName ? element : document.getElementById(element);
		if (!kvField) 
			throw new Error("KValidatorField::setField - No element with reference or id of '" + kvField + "' exists!");
		this._element = kvField;
	},
	getId: function(){
		if (!this._element) {
			throw new Error("KValidator::getId - No element with reference or id of '" + this._element + "' exists!");
			return null
		}
		if (!this._element.id) {
			throw new Error("KValidator::getId - No id provided for element '" + this._element + "' !");
			return null
		}
		return this._element.id
	},
	getName: function() {
		if (!this._element) {
			throw new Error("KValidator::getName - No element with reference or id of '" + this._element + "' exists!");
			return null
		}
		if (!this._element.name) 
			return null
		
		return this._element.name
	},
	getValue: function() {
		return this._element.value;
	},
	setValidator: function(kvalidator){
		if (!kvalidator instanceof KValidator) {
			throw new Error("KValidator::setValidator - provided validator is not KValidator compliant");
		}
		this._kvalidator = kvalidator;
	},
	setStyler: function(kvStyler){
		 this._styler = (kvStyler instanceof KVStyler) ? kvStyler : null ;			
	},
	isValid: function() {
		if (this._kvalidator != null) {
			this._kvalidator.setValue(this.getValue());	
			
			return (this._kvalidator.isValid())			
		}		
	},
	getValidator: function() {
		KVDebug("validator: ",this._validator.toString());
	},
	valid: function(){
		if (this._styler) {
			var k = this;
			var e = k._element;
			this._element.onkeyup = function(){
				k._element = this;
				valid = k.isValid();
				if (valid) {					
					k._styler.setWell(e);
					k._styler.setNeutral(e);
				}
				else {					
					k._styler.setBad(e);					
				}
			}			
		}		
	}	
}

/*
 *  KValidatorForm is a form validator in html page
 *  In order to work, you must set a form id, and add 
 *  some KValidatorField, which box a field and its KValidator 
 *  
 *  It offer also a chance to execute custom function onsubmit,
 *  after validation is ok
 *    
 */
function KValidatorForm(form){	
	this._initKVForm(form);
}
KValidatorForm.prototype = {
	_initKVForm: function(form) {
		this.setForm(form);
	},
	setForm: function(form) {
		if (!form) 
			throw new Error("KValidatorForm::setForm - No element form reference or element form id has been provided!");
		var kvForm = form.nodeName ? form : document.getElementById(form);
		if (!kvForm) 
			throw new Error("KValidatorForm::setForm - No element form with reference or id of '" + kvForm + "' exists!");
		this._kvFields = new Array();
		this._kvForm = kvForm;
	},
	addField: function(newKVField){
		if (newKVField instanceof KValidatorField) {
			if (this._isFieldInForm(newKVField)) {
				this._kvFields.push(newKVField);
			}		
		}
	},
	setStyler: function(kvStyler){
		if (kvStyler instanceof KVStyler) {
			this._styler = kvStyler;
			this._styler.prepareAll(this._kvForm);
		}					
	},
	_isFieldInForm: function(kvField){
		var formInputElements = this._kvForm.getElementsByTagName('input');
		for (var i in formInputElements) {
			if ( formInputElements[i].id == kvField.getId() || 
				 formInputElements[i].name == kvField.getName() ) 
				return true
		}
		return false
	},	
	isValid: function() {
		if (this._notValid == null) 		 
			this._notValid = [];
		var values = [];
		for (var i in this._kvFields) {
			if (this._kvFields[i].isValid()) {//field valid
				values[i] = this._kvFields[i].getValue();				
			}
			else { //field not valid
				if (this._styler) {
					this._styler.setBad(this._kvFields[i]._element);
					this._kvFields[i].setStyler(this._styler);
					this._kvFields[i].valid();
				}
				this._notValid.push(false);
			}
		}		
		if (this._notValid.length > 0) {
			this._kvForm.focus();
			//this._kvForm.reset();
			values = null;
			this._notValid = null;
			return false;
		}
		else {
			if (this._externalValidator) { // last, external, check				
				this._externalValidator.setValues(values);
				var valid = this._externalValidator.isValid();
				if (valid){ // finally ok!
					this._values = values;
					this._notValid = null;		
				}
				return valid;
			}
			this._values = values;
			this._notValid = null;
			return true;			
		}		
	},
	getValues: function() {
		return this._values;
	},
	setExternalValidator: function(externalValidator) {
		this._externalValidator = eval(externalValidator);
	},
	setFunctionToExecuteAfterValidation: function(aFunctionAfterValidation) {
		this._functionAfterValidation = eval(aFunctionAfterValidation);
	},
	submit: function() {
		var kf = this;					
		this._kvForm.onsubmit = function(){
			if (kf.isValid()) {
				return kf._functionAfterValidation();
			}
			return false
		}
	}
}

/*
 * Just a simple styler for "ok","bad","info" field/form state
 */
function KVStyler() {}
KVStyler.prototype = { 
	/*
	 * it provides a prepareAllInputsForHints, setBad, setWell, setInformative
	 * in order to honor KValidatorForm or KValidatorField styler object
	 * for dependency injection 
	 */
	setBad: function(element) {
		if (element) {
			element.parentNode.className = "bad";
			element.className = "bad";
			element.parentNode.getElementsByTagName("span")[0].style.display = "inline";		
		}		
	},
	setWell: function(element) {
		element.parentNode.className = "welldone";
		element.className = "welldone";
		element.parentNode.getElementsByTagName("span")[0].style.display = "none";
	},
	setInformative: function(element) {
		element.parentNode.className = "";
	},
	setNeutral: function(element) {
		element.className = "";
		element.parentNode.getElementsByTagName("span")[0].style.display = "none";		
	},
	setNeutralOnBlur: function(element) {
		element.onblur = function () {
			this.parentNode.className = "";
			element.className = "";
			this.parentNode.getElementsByTagName("span")[0].style.display = "none";
		}
	},
	prepare: function(element) {
		element.onfocus = function() {
			this.parentNode.getElementsByTagName("span")[0].style.display = "inline";
		}
	},
	prepareAll: function(form) {
		var inputs = form.getElementsByTagName("input");
		for (var i=0; i<inputs.length; i++){
			inputs[i].onfocus = function () {
				this.parentNode.getElementsByTagName("span")[0].style.display = "inline";
			}
			inputs[i].onblur = function () {
				this.parentNode.getElementsByTagName("span")[0].style.display = "none";
			}
		}
	}
}

/*
 * Real core for "K"-bros api 
 * It matches a value against a regular expression pattern 
 */
function KValidator(pattern,value) {
	this._init(pattern, value);
}
KValidator.prototype = {
	_init: function(pattern, value) {
		if (pattern) 	this.setPattern(pattern);
		if (value) 		this.setValue(value);
	},
	setPattern: function(pattern) {
		if (! /\/{1}/.test(pattern)) 
			throw new Error("KValidator::setPattern - "+pattern+" is not a valid regexp pattern");
		this._pattern = pattern;
	},
	setValue: function(value) {
		//if (!value) return false; 
			//throw new Error("KValidator::setValue - "+value+" is not a significant value");
		this._value = value;
	},
	getValue: function() {
		return this._value;
	},
	isValid: function() {
		//if (!this._pattern || !this._value)
		//	throw new Error("KValidator::isValid - PATTERN and VALUE members are mandatories");
		/*if (!this._pattern)
			throw new Error("KValidator::isValid - PATTERN and VALUE members are mandatories");
		*/
		if (this._pattern && this._value) {
			if (this._pattern.test(this._value)) {
				return true
			}
			return false
		}
	}
}

/*
 * Write something in page - prefer it instead alert(something) ;D   
 */
function KVDebug(name,aValue) {
	var theNewParagraph = document.createElement('div');
	var theTextOfTheParagraph = document.createTextNode(name+": "+aValue);
	theNewParagraph.appendChild(theTextOfTheParagraph);
	JSUtils.getElementById('debug').appendChild(theNewParagraph);	
}
