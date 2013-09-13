/*
 * Massimiliano Leone - maximilianus@gmail.com - 2009, GPL licence
 */

function ajaxedInsertingCheckAndSubmit(){		
	var codeKv = new KValidator(/^[0-9]+$/);			
	var kvfCode = new KValidatorField('concertCode');
	kvfCode.setValidator(codeKv);
	
	var nameKv = new KValidator(/^[a-zA-Z ]+$/);
	var kvfName = new KValidatorField('groupName');
	kvfName.setValidator(nameKv);
	
	var dateKv = new KValidator(/^[0-9]+$/);
	var kvfDate = new KValidatorField('concertDate');
	kvfDate.setValidator(dateKv);
		
	var kvInsertForm = new KValidatorForm('concertsinsertform');	
	kvInsertForm.addField(kvfCode);
	kvInsertForm.addField(kvfName);
	kvInsertForm.addField(kvfDate);
	
	/*
	var dv = new DatesValidator(kvfStart.getValue(), kvfEnd.getValue());
	dv.setElementForDirtyWork("serror");
	kvForm.setExternalValidator( dv );
	kvForm.setStyler( new KVStyler() );
	*/
	
	var ff = JSUtils.getElementById("concertsinsertform");
	var ioe = JSUtils.getElementById("iout");
	
	//var url = "contents/concerti.xml"; // with apache this work in localhost
	//var url = "http://localhost:8080/ajax/contents/concerti.xml"; // with apache this work in localhost
	
	var url = "ConcertLogicInsert"; 
		
	var khijxConcerts = new Khijax(ff,ioe,url,"get",null,kvInsertForm);	
	
	// we love xslt [- and Transformers Autobot ;D]
	var optimusPrime = new KXSLTransformer();
	optimusPrime.setXSL("style/concerts.xsl"); // with apache this work in localhost
	//optimusPrime.setXSL("http://localhost:8080/ajax/contents/concerti.xsl"); // for other servers - change "ajax" to your path	
	
	function iCallback(text,xml,type) {
		fadeUp(oe,255,100,100);
		
		var a = text.split(/<xml[^>]*>((?:.|\n)*)<\/xml>/i)[1];
		var parsed = parseXMLDoc(a);
		
		optimusPrime.setXML(parsed);
		var o = optimusPrime.convert();		
							
		return o;				
	}
	
	khijxConcerts.setCallback( iCallback );
	khijxConcerts.getData(); 
}


function ajaxedSearchingCheckAndSubmit(){		
	var dateKv = new KValidator(/^[0-9]{8}$/);
			
	var kvfStart = new KValidatorField('startDate');
	kvfStart.setValidator(dateKv);
	//kvfStart.valid(); 

	var kvfEnd = new KValidatorField('endDate');
	kvfEnd.setValidator(dateKv);
	//kvfEnd.valid();
	
	var kvForm = new KValidatorForm('concertssearchform');	
	kvForm.addField(kvfStart);
	kvForm.addField(kvfEnd);
	
	//alert(kvfStart.getValue() +" "+ kvfEnd.getValue());
	var dv = new DatesValidator(kvfStart.getValue(), kvfEnd.getValue());
	dv.setElementForDirtyWork("serror");
	kvForm.setExternalValidator( dv );
	kvForm.setStyler( new KVStyler() );
	
	var ff = JSUtils.getElementById("concertisearchform");
	var oe = JSUtils.getElementById("sout");
	
	//var url = "contents/concerti.xml"; // with apache this work in localhost
	//var url = "http://localhost:8080/ajax/contents/concerti.xml"; // with apache this work in localhost
	
	var url = "ConcertLogicSearch"; 
		
	var khijxConcerts = new Khijax(ff,oe,url,"get",null,kvForm);	
	
	// we love xslt [- and Transformers Autobot ;D]
	var optimusPrime = new KXSLTransformer();
	optimusPrime.setXSL("style/concerts.xsl"); // with apache this work in localhost
	//optimusPrime.setXSL("http://localhost:8080/ajax/contents/concerti.xsl"); // for other servers - change "ajax" to your path	
	
	function myCallback(text,xml,type) {
		fadeUp(oe,255,100,100);
		
		var a = text.split(/<xml[^>]*>((?:.|\n)*)<\/xml>/i)[1];
		var parsed = parseXMLDoc(a);
		
		optimusPrime.setXML(parsed);
		var o = optimusPrime.convert();		
							
		return o;				
	}
	
	khijxConcerts.setCallback( myCallback );
	khijxConcerts.getData(); 
}

function dummyAjaxSearchCheckAndSubmit() {
	
	var doveKv = new KValidator(/^[a-zA-Z]+$/);
	
	var kvfDove = new KValidatorField('dove');
	kvfDove.setValidator(doveKv);
	//kvfWhere.valid(); //to validate onkeyup or similar
		
	var dataKv = new KValidator(/^[0-9]+$/);
			
	var kvfInizio = new KValidatorField('inizio');
	kvfInizio.setValidator(dataKv);
	//kvfStart.valid(); 

	var kvfFine = new KValidatorField('fine');
	kvfFine.setValidator(dataKv);
	//kvfEnd.valid();
	
	var kvDAForm = new KValidatorForm('daconcertform');	
	kvDAForm.addField(kvfDove);
	kvDAForm.addField(kvfInizio);
	kvDAForm.addField(kvfFine);
	
	var dadv = new DatesValidator(kvfInizio.getValue(), kvfFine.getValue());
	dadv.setElementForDirtyWork("daerror");
	kvDAForm.setExternalValidator( dadv );
	kvDAForm.setStyler( new KVStyler() );
	/*
	var ff = function() { alert("submitting"); return false }
	kvForm.setFunctionToExecuteAfterValidation(ff);
	kvForm.submit();
	*/	
	
	var ff = JSUtils.getElementById("daconcertform");
	var daoe = JSUtils.getElementById("daout");
	
	var url = "contents/concerti.xml"; // with apache this work in localhost
	//var url = "http://localhost:8080/ajax/contents/concerti.xml"; // with apache this work in localhost
	
	var khijxDAConcerts = new Khijax(ff,daoe,url,"get",null,kvDAForm);	
	
	// we love xslt [- and Transformers Autobot ;D]
	var daOptimusPrime = new KXSLTransformer();
	daOptimusPrime.setXSL("contents/concerti.xsl"); // with apache this work in localhost
	//optimusPrime.setXSL("http://localhost:8080/ajax/contents/concerti.xsl"); // for other servers - change "ajax" to your path	
	
	function daCallback(text,xml,type) {
		fadeUp(oe,255,100,100);		
		daOptimusPrime.setXML(xml);
		var o = daOptimusPrime.convert();
		return o;		
	}
	
	khijxDAConcerts.setCallback( daCallback );
	khijxDAConcerts.getData(); 
}

function DatesValidator(date1,date2) {
	this._init(date1,date2);	
}
DatesValidator.prototype = {
	_init: function(date1,date2) {
		this._date1 = parseInt(date1,10);
		this._date2 = parseInt(date2,10);		
		this._styler = new KVStyler();
	},
	setElementForDirtyWork: function(element) {		 
		this._out = JSUtils.getElementById(element);
	},
	_makeDirtyWork: function() {
		this._styler.setBad(this._out);
		//this._out.innerHTML = "Errore:<br/>il valore della data di inizio periodo deve essere ovviamente inferiore al valore della data di fine periodo "
	}, 
	isValid: function() {	
		if (this._date1 < this._date2) {			
			this._styler.setNeutral(this._out);
			this._out.innerHTML = "";
			return true
		} else {
			this._makeDirtyWork();
			return false
		}
	},
	setValues: function(arrayValue) {
		var a = arrayValue[0];
		var b = arrayValue[1];
		this._date1 = parseInt( a,10 );
		this._date2 = parseInt( b,10 );		 		
	}
}


 
function fadeUp (element,red,green,blue) {
	if (element.fade) {
		clearTimeout(element.fade);
	}
	element.style.backgroundColor = "rgb("+red+","+green+","+blue+")";
	if (red == 255 && green == 255 && blue == 255) {
		return;
	}
	var newred = red + Math.ceil((255 - red)/10);
	var newgreen = green + Math.ceil((255 - green)/10);
	var newblue = blue + Math.ceil((255 - blue)/10);
	var repeat = function() {
		fadeUp(element,newred,newgreen,newblue)
	};
	element.fade = setTimeout(repeat,100);
}
