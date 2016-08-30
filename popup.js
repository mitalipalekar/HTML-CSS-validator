(function() {
	"use strict";

	window.onload = function() {
		document.getElementById("submithtml").onclick = HTMLCodeGenerator;
		
		//had to change strategy because of autocorrection of Chrome browser from HTML to XTML
		/*
		HTMLcodeContent = document.getElementById("htmlCodeOutput");
		chrome.tabs.executeScript(null, {file: "HTMLCodeGenerator.js"}, function() {
			if(chrome.runtime.lastError){
				HTMLcodeContent.innerHTML = "HTML generator produced an error: " + chrome.runtime.lastError.message;
			}
		});*/
	};

	//had to change strategy because of autocorrection of Chrome browser from HTML to XTML
	/*
	chrome.runtime.onMessage.addListener(function(message, sender, response) {
		HTMLcodeContent.innerHTML = message;
		determineValidHTML();
	});*/

	function HTMLCodeGenerator() {
		var htmlCode = document.getElementById("htmlCodeInput");
		document.getElementById("htmlCodeOutput").innerHTML = escapeChars(htmlCode.value);
		//console.log(htmlCode.value);
		determineValidHTML();
	}

	function escapeChars(codeEscaped) {
	    codeEscaped = codeEscaped.replace(/</g, "&lt;");
	    codeEscaped = codeEscaped.replace(/>/g, "&gt;");
	    codeEscaped = codeEscaped.replace(/&/g, "&amp;");
	    codeEscaped = codeEscaped.replace(/\'/g, "&#039;");
	    codeEscaped = codeEscaped.replace(/\"/g, "&quot;");
	    return codeEscaped;
	}

/*
To be checked:
- properly nested
- all tags are closed (self-closing ones as well)
- must be in all lowercase
- one root element
- DOCTYPE must be present 	                          DONE
- must have a head, html, title and body attribute
- Attributes:
	- must be lowercase
	- enclosed in quotes
	- minimalization is forbidden
	- xmlns element must be present in head

*/
	function determineValidHTML() {
		var HTMLcodeContent = document.getElementById("htmlCodeOutput");
		if(!doctypePresent(HTMLcodeContent)) {
			HTMLcodeContent.innerHTML = "DOCTYPE missing, not valid XHTML";
		} else if(properlyNested(HTMLcodeContent)){
			HTMLcodeContent.innerHTML = "HTML Code Properly Nested";
		} else {
			HTMLcodeContent.innerHTML = "HTML Code NOT Properly Nested";
		}
	}

	function doctypePresent(HTMLcodeContent) {
		if(HTMLcodeContent.innerHTML.includes("&amp;lt;!DOCTYPE")) {
			return true;
		} else {
			return false;
		}
	}

	function properlyNested(HTMLcodeContent) {
		var selfClosingTags = ["<area />", "<base />", "<br />", "<col />", "<command />", "<embed />", "<hr />", "<img />", "<input />", "<keygen />", "<link />", "<meta />", "<param />", "<source />", "<track />", "<wbr />"];
		var stack = [];
		for(var i = 0; i < HTMLcodeContent.innerHTML.length;) {
			var currentTag = HTMLcodeContent.innerHTML.substring(HTMLcodeContent.innerHTML.substring(i).indexOf("&amp;lt;") + i, HTMLcodeContent.innerHTML.substring(i + 1).indexOf("&amp;gt;") + i + 1 + "&amp;gt;".length);
			i += HTMLcodeContent.innerHTML.substring(i).indexOf("&amp;lt;") + currentTag.length;
			//console.log(currentTag);
			if (currentTag.match(/&amp;lt;[a-z1-9]+&amp;gt;/)) { //opening tag
				stack.push(currentTag);
				//console.log(currentTag);
			} else if(currentTag.match(/&amp;lt;\/[a-z1-9]+&amp;gt;/)) { //closing tag
				var topElement = stack.pop();
				//console.log(topElement);
				if(topElement.substring(8, topElement.indexOf("&amp;gt;")) !== currentTag.substring(9, currentTag.indexOf("&amp;gt;"))) {
					//console.log("opening tag" + topElement.substring(8, topElement.indexOf("&amp;gt;")));
					//console.log("closing tag" + currentTag.substring(9, topElement.indexOf("&amp;gt;")));
					//console.log("terminate" + currentTag);
					return false;
				}
			}
		}
		//console.log(stack.length);
		if (stack.length != 0) {
			return false;
		}
		return true;
	}
}) ();