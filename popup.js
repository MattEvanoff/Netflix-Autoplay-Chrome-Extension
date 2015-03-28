window.addEventListener('load', function() {
	var interval;
	//Check if user has set options
	var sleep = localStorage.sleep || 120;
	var sleepEpisodes = localStorage.sleepEpisodes || 3;	
	var shutdown = localStorage.shutdown ? JSON.parse(localStorage.shutdown) : false;

	//Check if we have already started
	chrome.tabs.getSelected(function(tab){	
		var opts = {
			action: 'update'
		};

		chrome.tabs.sendMessage(tab.id, opts, function(results) {
			if(!results.started) { //Not started, use default values
				document.getElementById('sleep').value = sleep;
				document.getElementById('sleepEpisodes').value = sleepEpisodes;
				document.getElementById('shutdown').checked = shutdown;
			} else {				//Started, use working values
				document.getElementById('sleepText').innerHTML = results.timeDiff || ' - ';
				document.getElementById('sleepEpisodesText').innerHTML = results.eppsLeft || ' - ';
				document.getElementById('shutdown').checked = results.shutdown;
			}
		});
	});

	document.getElementById('exit').addEventListener('click', function() {
		chrome.tabs.getSelected(function(tab){			
			var opts = {
				action: 'exit'
			};
			
			chrome.tabs.sendMessage(tab.id, opts, function(results) {
				//Exit Done
				document.getElementById('sleepText').innerHTML = ' - ';
				document.getElementById('sleepEpisodesText').innerHTML = ' - ';
			});
		});
	});


	//Setup our set/reset button
	document.getElementById('set').addEventListener('click', function() {
		var startTime = new Date();
		var sleepInput = document.getElementById('sleep');
		var sleepTimer = sleepInput.value * 60 * 1000;
		var sleepEpisodesInput = parseInt(document.getElementById('sleepEpisodes').value);
		var sleepStarted;
		
		chrome.tabs.getSelected(function(tab){
			var opts = {
				action: 'start',
				sleepTimer: sleepTimer,
				sleepEpisodes: sleepEpisodesInput,
				startTime: startTime.toString(),
				shutdown: document.getElementById('shutdown').checked
			};
			
			//This Message starts the whole thing off
			chrome.tabs.sendMessage(tab.id, opts, function(results) {
				//Watcher started
			});
								
		});

		//Makes the display in the popup update
		if(!interval) {
			interval = setInterval(function() {
				var currentTime = new Date();
				var timeDiff = (sleepTimer-(currentTime - startTime)) / 60 / 1000;
				document.getElementById('sleepText').innerHTML = parseInt(timeDiff);
				document.getElementById('sleepEpisodesText').innerHTML = sleepEpisodesInput;				
			}, 1000);
		}
	});

	//Makes the installer link to the install file, and causes it to open "save" dialog
	var URL = chrome.extension.getURL('install.bat');
	document.getElementById('download').href = URL;
});