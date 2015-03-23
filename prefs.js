window.addEventListener('load', function() {

	var sleep = localStorage.sleep || 120;
	var shutdown = localStorage.shutdown ? JSON.parse(localStorage.shutdown) : false;

	document.getElementById('sleep').value = sleep;
	document.getElementById('shutdown').checked = !!shutdown;

	document.getElementById('save').addEventListener('click', function() {		
		localStorage.sleep = document.getElementById('sleep').value || 120;
		localStorage.shutdown = document.getElementById('shutdown').checked;
		window.close();
	});

	var URL = chrome.extension.getURL('install.bat');
	document.getElementById('download').href = URL;	
});