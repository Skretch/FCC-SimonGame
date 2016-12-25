var sound0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var sound1 =new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var soundArr = [
    sound0,
    sound1,
    sound2,
    sound3
];
var isRunning = false;
var isReplaying = false;
var isGettingInput = false;
var hasWon = false;
var inStrictMode = false;
var sequence = [];
var nextIndex;
$(".playBtn").click(function(){
    for(var i = 0; i < soundArr.length; i++){
        soundArr[i].volume = 0.01;
        soundArr[i].play();
        soundArr[i].pause();
        soundArr[i].volume = 1;
    }
    var btnNumber = this.id.slice(-1);
    btnNumber = Number(btnNumber)
    if(!isReplaying){
        soundArr[btnNumber].pause();
        soundArr[btnNumber].currentTime = 0;
        soundArr[btnNumber].play();
        if(btnNumber === sequence[nextIndex]){
            console.log("correct");
            if(nextIndex >= 19){
                hasWon = true;
                resetGame();
                winScreen(true);
            }else{
                if(nextIndex >= sequence.length-1){
                    console.log("finished");
                    isGettingInput = false;
                }
            }
            nextIndex++;
        }else{
            if(inStrictMode){
                resetGame();
                looseScreen(true);
            }else{
                isReplaying = true;
                $("body").css("background-color", "rgba(255,0,0,0.7)");
                setTimeout(function(){
                    replaySeq();
                },500);
            }
        }
    }
});
$("#resetBtn").click(function(){
    resetGame();
});
$("#strictBtn").click(function(){
    inStrictMode = !inStrictMode;
    if(inStrictMode){
        $("#strictBtn").css("background-color", "rgba(255,0,0,0.7)");
    }else{
        $("#strictBtn").css("background-color", "rgb(120,120,120)");
    }
    resetGame();
});
$("#startBtn").click(function(){
    resetGame();
    console.log("startBtn clicked");
    isRunning = true;
    sequence = [];
    var gameLoop = setInterval(function(){
        if(isRunning){
            if(!isReplaying && !isGettingInput){
                replaySeq();
            }
        }else{
            clearInterval(gameLoop);
        }
    }, 500);
});

function replaySeq(){
    isReplaying = true;
    var index = 0;
    if(!isGettingInput){
        sequence.push(getRandomInt(0,4));
    }
    $("#display div").text("Score: " + sequence.length);
    var replay = setInterval(function(){
        if(index >= sequence.length || !isReplaying){
            console.log("%cExiting replaySeq", "color:green");
            isReplaying = false;
            isGettingInput = true;
            nextIndex = 0;
            clearInterval(replay);
        }else{
            $("body").css("background-color", "grey");
            console.log(sequence);
            console.log("playing sound at index " + index);
            triggerClickAnim(sequence[index]);
            soundArr[sequence[index]].pause();
            soundArr[sequence[index]].currentTime = 0
            soundArr[sequence[index]].play();
            index++;
        }
    },500);
}
function triggerClickAnim(button){
    $("#mainBtn-" + button).addClass("activeBtn" +button);
    setTimeout(function(){
        $("#mainBtn-" +button).removeClass("activeBtn" + button);
    },200);
}
function winScreen(display){
    if(display){
        $("#winScreen").css("display", "block");
    }else{
        $("#winScreen").css("display", "none");
    }
}
function looseScreen(display){
    if(display){
        $("#looseScreen").css("display", "block");
    }else{
        $("#looseScreen").css("display", "none");
    }
}
function resetGame(){
    isRunning = false;
    isReplaying = false;
    isGettingInput = false;
    hasWon = false;
    sequence = [];
    looseScreen(false);
    winScreen(false);
}
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
}
