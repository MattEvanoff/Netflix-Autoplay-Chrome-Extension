//Listener from the page DOM - Used for shutdown
chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {	
	if(data.shutdown) {
		var hostName = 'com.me.netflix.autoplay';
		port = chrome.runtime.connectNative(hostName);
	}
});

//listener to add the icon to the addressbar
function addAutoplayer(tabId) {
	chrome.tabs.get(tabId, function(tab){ 
		if(tab.url.indexOf('netflix.com') > 0) {
			chrome.pageAction.show(tabId);
		}
	});
}

//attach said listener
chrome.tabs.onCreated.addListener(addAutoplayer);
chrome.tabs.onUpdated.addListener(addAutoplayer);
chrome.tabs.onSelectionChanged.addListener(addAutoplayer);
chrome.tabs.onActiveChanged.addListener(addAutoplayer);
