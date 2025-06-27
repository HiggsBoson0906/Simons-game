var colorsequence = [];
var usersequence = [];
var gamestarted = false;
$('#green').click(green);
$('#red').click(red);
$('#yellow').click(yellow);
$('#blue').click(blue);

$(document).keypress(function (event) {
        if (event.key === 'g' || event.key === 'G') {
            green();
        }
        else if (event.key === 'r' || event.key === 'R') {
            red();
        }
        else if (event.key === 'y' || event.key === 'Y') {
            yellow();
        }
        else if (event.key === 'b' || event.key === 'B') {
            blue();
        }
        else if(!gamestarted) {
            gamestart();
        }
    }
)
$(document).on('click',function(){
    if (!gamestarted) {
        gamestart();
    }
})

function gamestart() {
    colorsequence = [];
    usersequence = [];
    gamestarted = true;

    nextSequence(1);
}
function nextSequence(level) {
    usersequence = [];
    var randomColor = blink();
    colorsequence.push(randomColor);

    $('#level-title').text('Level ' + level + ' - Watch the sequence');
    showSequence(0);
}
function showSequence(index) {
    if (index < colorsequence.length) {
        var color = colorsequence[index];
        $('#' + color).addClass('pressed');
        var sound = new Audio('./sounds/' + color + '.mp3');
        sound.play();
        setTimeout(function () {
            $('#' + color).removeClass('pressed');
        }, 100);
        setTimeout(function () {
            showSequence(index + 1);
        }, 500);
    }
    else {
        $('#level-title').text('Level ' + (colorsequence.length) + ' - Your turn');
    }
}
function checkSequence() {
    for (var i = 0; i < usersequence.length; i++) {
        if (usersequence[i] !== colorsequence[i]) {
            gamestarted = false;
            $('#level-title').text('Game Over, Press Any Key to Restart');  
            $('body').addClass('game-over');
            setTimeout(function () {
                $('body').removeClass('game-over');
            }, 200);
            var gameover = new Audio('./sounds/wrong.mp3');
            gameover.play();
            colorsequence = [];
            usersequence = [];
            return;
        }
    }
    if (usersequence.length === colorsequence.length) {
        setTimeout(function () {
            nextSequence(colorsequence.length + 1);
        }, 1000);
    }

}
function blink() {
    var color = ['green', 'red', 'yellow', 'blue'];
    var randomColor = color[Math.floor(Math.random() * color.length)];
    return randomColor;
}


function red() {
    $('#red').addClass('pressed');
    setTimeout(function () {
        $('#red').removeClass('pressed');
    }, 100);
    var red = new Audio('./sounds/red.mp3');
    red.play();
    usersequence.push('red');
    if (gamestarted) {
        checkSequence();
    }
}
function blue() {
    $('#blue').addClass('pressed');
    setTimeout(function () {
        $('#blue').removeClass('pressed');
    }, 100);
    var blue = new Audio('./sounds/blue.mp3');
    blue.play();
    usersequence.push('blue');
    if (gamestarted) {
        checkSequence();
    }
}
function yellow() {
    $('#yellow').addClass('pressed');
    setTimeout(function () {
        $('#yellow').removeClass('pressed');
    }, 100);
    var yellow = new Audio('./sounds/yellow.mp3');
    yellow.play();
    usersequence.push('yellow');
    if (gamestarted) {
        checkSequence();
    }
}
function green() {
    $('#green').addClass('pressed');
    setTimeout(function () {
        $('#green').removeClass('pressed');
    }, 100);
    var green = new Audio('./sounds/green.mp3');
    green.play();
    usersequence.push('green');
    if (gamestarted) {
        checkSequence();
    }
}
