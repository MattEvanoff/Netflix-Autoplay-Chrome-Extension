window.addEventListener('load', function() {

	var sleep = localStorage.sleep || 120;
	var sleepEpisodes = localStorage.sleepEpisodes || 3;
	var shutdown = localStorage.shutdown ? JSON.parse(localStorage.shutdown) : false;

	document.getElementById('sleep').value = sleep;
	document.getElementById('sleepEpisodes').value = sleepEpisodes;
	document.getElementById('shutdown').checked = !!shutdown;

	document.getElementById('save').addEventListener('click', function() {		
		localStorage.sleep = document.getElementById('sleep').value || 120;
		localStorage.sleepEpisodes = document.getElementById('sleepEpisodes').value || 3;
		localStorage.shutdown = document.getElementById('shutdown').checked;
		window.close();
	});

	var URL = chrome.extension.getURL('install.bat');
	document.getElementById('download').href = URL;	
});