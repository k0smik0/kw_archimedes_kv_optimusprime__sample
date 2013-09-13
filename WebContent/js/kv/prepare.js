/*
 * Massimiliano Leone - maximilianus@gmail.com - 2009, GPL licence
 */

// this part is for the form field hints to display
// only on the condition that the text input has focus.
// otherwise, it stays hidden.

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function prepareInputsForHints() {
	var inputs = document.getElementsByTagName("input");
	for (var i=0; i<inputs.length; i++){
		inputs[i].onfocus = function () {
		  this.parentNode.getElementsByTagName("span")[0].style.display = "inline";
		}
		inputs[i].onblur = function () {
		  this.parentNode.getElementsByTagName("span")[0].style.display = "none";
		}
	}
}
//addLoadEvent(prepareInputsForHints);

