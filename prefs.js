window.addEventListener('load', function() {

	var sleep = localStorage.sleep || 120;
	var shutdown = JSON.parse(localStorage.shutdown);

	document.getElementById('sleep').value = sleep;
	document.getElementById('shutdown').checked = !!shutdown;

	document.getElementById('save').addEventListener('click', function() {		
		localStorage.sleep = document.getElementById('sleep').value || 120;
		localStorage.shutdown = document.getElementById('shutdown').checked;
		window.close();
	});
});