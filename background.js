chrome.runtime.onMessage.addListener(function getHTMLcode(response, sender, sendResponse) {
	alert(response);
});