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


//Setup media key
var activeTabs = [];
chrome.commands.onCommand.addListener(function(command) {
	for (var i = 0; i < activeTabs.length; i++) {
		chrome.tabs.sendMessage(activeTabs[i], {action: command});
	}
});

//Listener from the page DOM - Used for shutdown & media buttons
chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
	if(data.shutdown) {
		var hostName = 'com.me.netflix.autoplay';
		port = chrome.runtime.connectNative(hostName);
	}


	if (data.command == 'activateTab' && sender.tab) {
		if (activeTabs.indexOf(sender.tab.id) == -1) {
			activeTabs.push(sender.tab.id);
		}

		chrome.pageAction.show(sender.tab.id);
		chrome.pageAction.setTitle({
			tabId: sender.tab.id,
			title: 'Click to disable media keys for this tab'
		});
	}
});

