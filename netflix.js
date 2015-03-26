(function() {

	chrome.runtime.sendMessage({command: 'activateTab'});

	var interval;
	var startTime;
	var sleepStarted;
	var shutdown;
	var sleepTimer;
	var started;

	chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
		console.log(data);
		console.log(sender);
		console.log(sendResponse);
		switch (data.action) {
			case 'play-pause':
				if(document.getElementsByClassName('player-play-pause').length > 0) {
					document.getElementsByClassName('player-play-pause')[0].click();
				}
				break;
			case 'next':
				if(document.getElementsByClassName('player-next-episode').length > 0) {
					document.getElementsByClassName('player-next-episode')[0].click();
				}
				break;						
			case 'stop':
				if(document.getElementsByClassName('player-back-to-browsing').length > 0) {
					document.getElementsByClassName('player-back-to-browsing')[0].click();
				}						
				break;
			case 'prev':
				break;

			case 'sleep':
				sleep();
				sendResponse('Playback Paused - Timer Cleared');
				break;

			case 'start':
				start(data);
				sendResponse('Started');
				break;

			case 'update':
				sendResponse({
					timeDiff: interval ? parseInt((sleepTimer-(new Date() - startTime)) / 60 / 1000) : false,
					shutdown: shutdown,
					started: started
				});
				break;

			case 'exit':
				exit();
				sendResponse('Exited');

		}
	});

	//Pauses video, then puts then runs the shutdown if the user wants
	function sleep() {
		clearInterval(interval);
		interval = false;

		//pause playback
		var pause = document.getElementsByClassName('player-play-pause');
		if(pause.length > 0) {
			pause[0].click();
		}	

		//Run shutdown command
		if(shutdown) {
			chrome.runtime.sendMessage({shutdown: 'now'});
		}
	}

	function start(data) {
		started = true;
		startTime = new Date();
		shutdown = data.shutdown;
		sleepTimer = data.sleepTimer;

		if(!interval) {
			//Start our watcher
			interval = setInterval(function() {
				var currentTime = new Date();
				var timeDiff = (sleepTimer-(currentTime - startTime)) / 60 / 1000;

				// Check if autoplay-interrupt has fired
				if(document.getElementsByClassName('player-autoplay-interrupter').length > 0 && document.getElementsByClassName('continue-playing').length > 0) {
					//Just click the continue button!
					document.getElementsByClassName('continue-playing')[0].click();
				} 

				//Check if at end of season
				if (document.getElementsByClassName('player-postplay-autoplay-header') && document.getElementsByTagName('video').length === 0 && document.getElementsByClassName('player-postplay-still-hover').length > 0) {
					//Click the next video picture
					document.getElementsByClassName('player-postplay-still-hover')[0].click();
				}		

				if(sleepTimer && !sleepStarted && timeDiff <= 0 ) {
					sleepStarted = true;
					sleep();
				}
			}, 1000);
		}
	}

	function exit() {
		if(!interval) {
			alert('You probably have to start before you exit.');
		} else {
			//stop the timer
			clearInterval(interval);
			interval = false;
		}	
	}

})();