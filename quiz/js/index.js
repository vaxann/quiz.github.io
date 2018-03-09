$(document).ready(function() {
    document.oncontextmenu = function() {return false;};

    var team1 = $('#team1');
    var team2 = $('#team2');
	var clock = $('#clock');
    var audio = new Audio('audio/gong.mp3');

    team1.hide();
    team2.hide();
    var clicked = false;
	
	var isCounting = false;
	var isReset = true;
	
	function getOneMinute() {
		return new Date(new Date().valueOf() + 60 * 1000);
	}

	function startCounting() {
		clock.countdown(getOneMinute(),function(event) {
			$(this).html(event.strftime('%M:%S'));
		  }).on('finish.countdown', function(event) {
			playAudio();
			isCounting = false;
		  });
		isCounting = true;
	}
	
	function stopCounting() {
		clock.countdown('pause');
		isCounting = false;
	}
	
	function resetClock() {
		clock.countdown('pause');
		clock.text('01:00');
		isReset = true;
		isCounting = false;
	}
	
	function playAudio() {
		if (audio.ended){
			audio.play();
		} else {
			audio.pause();
			audio.currentTime = 0;
			audio.play();
		}
	}
	
    $(document).mousedown(function(e) {
        if (clicked) return true;
		
		
		if (!isReset) {
			if (isCounting) {
				stopCounting();
				playAudio();
			}
			
			// Check for left button
			if (e.button === 0) {
				team1.show();
				clicked = true;
				//alert('left clicked');
				return false;
			}
			// Check for right button
			if (e.button === 2) {
				team2.show();
				clicked = true;
				//alert('right clicked');
				return false;
			}	
		}
        return true;
    });

    // Check for space press
    $(window).keypress(function (e) {
        if (e.keyCode === 0 || e.keyCode === 32) {
            e.preventDefault();
            team1.hide();
            team2.hide();
            clicked = false;
            //alert('Space pressed')
			
			
			if (isReset&&!isCounting) {
				playAudio();
				startCounting();
				isReset = false;
			} else if(!isReset&&!isCounting){
				resetClock();
			} else {
				stopCounting();
			}
			
        }
    })
});