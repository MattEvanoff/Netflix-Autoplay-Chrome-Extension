window.addEventListener('load', function() {
	var interval;

	//Check if we have already started
	chrome.tabs.getSelected(function(tab){	
		var opts = {
			action: 'update'
		};

		chrome.tabs.sendMessage(tab.id, opts, function(results) {
			document.getElementById('sleepText').innerHTML = results.timeDiff || ' - ';
			document.getElementById('shutdown').checked = results.shutdown;			
		});
	});

	document.getElementById('exit').addEventListener('click',function() {
		chrome.tabs.getSelected(function(tab){			
			var opts = {
				action: 'exit'
			};
			
			chrome.tabs.sendMessage(tab.id, opts, function(results) {
				//Exit Done
				document.getElementById('sleepText').innerHTML = ' - ';
			});
		});
	});


	//Setup our set/reset button
	document.getElementById('set').addEventListener('click',function() {
		var startTime = new Date();
		var sleepInput = document.getElementById('sleep');
		var sleepTimer = sleepInput.value * 60 * 1000;
		var sleepStarted;
		
		chrome.tabs.getSelected(function(tab){
			var opts = {
				action: 'start',
				sleepTimer: sleepTimer,
				startTime: startTime.toString(),
				shutdown: document.getElementById('shutdown').checked
			};
			
			//This Message starts the whole thing off
			chrome.tabs.sendMessage(tab.id, opts, function(results) {
				//Watcher started
			});
								
		});

		if(!interval) {
			interval = setInterval(function() {
				var currentTime = new Date();
				var timeDiff = (sleepTimer-(currentTime - startTime)) / 60 / 1000;
				document.getElementById('sleepText').innerHTML = parseInt(timeDiff);
			}, 1000);
		}
	});

	var URL = chrome.extension.getURL('install.bat');
	document.getElementById('download').href = URL;
});