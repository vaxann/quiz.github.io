$(document).ready(function() {
    document.oncontextmenu = function() {return false;};

    var team1 = $('div#team1');
    var team2 = $('div#team2');
    var audio = new Audio('audio/gong.mp3');

    team1.hide();
    team2.hide();
    var clicked = false;

    $(document).mousedown(function(e) {
        if (clicked) return true;

        audio.play();
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
        }
    })
});