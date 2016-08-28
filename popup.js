(function() {
	"use strict";

	var HTMLcodeContent;

	window.onload = function() {
		HTMLcodeContent = document.getElementById("htmlCode");

		chrome.tabs.executeScript(null, {file: "HTMLCodeGenerator.js"}, function() {
			if(chrome.runtime.lastError){
				HTMLcodeContent.innerHTML = "HTML generator produced an error: " + chrome.runtime.lastError.message;
			}
		});
	};

	chrome.runtime.onMessage.addListener(function(message, sender, response) {
		HTMLcodeContent.innerHTML = message;
	});
}) ();