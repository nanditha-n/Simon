var buttonColours= ["red", "blue", "green", "yellow"];

//Registoring computer selected color pattern
var gamePattern= [];

//Registoring user selected color pattern
var userClickedPattern=[];

var level;

var started=false;

var returnedVal;

console.log("Initial GamePattern []: "+gamePattern);
console.log("Initial UserClickedPattern []"+userClickedPattern);


//Game starts as soon as user enters any key on the keyboard
$(document).keypress(function(){

    if(!started){
        level= 0;
        $("h1").text("Level "+level);

        console.log("Calling nextSequence");
        nextSequence();
        //returnedVal= nextSequence();
        //console.log("returnedVal"+returnedVal);

        started=true;        
    }

});

//Detecting the color clicked by the user

$(".btn").click(function(){

    if(started===true){
        //Color selected by user
        //console.log("I chose: "+$(this).attr("id"));
        var userChosenColour= $(this).attr("id");
        
        //Pushing user selected color into an array
        console.log("Inside click func: pushing userChosenColour: "+userChosenColour);
        userClickedPattern.push(userChosenColour);
        //console.log("userChosenColour"+userChosenColour);

        //Addind sound when user clicks on button
        playSound(userChosenColour);

        //Animation
        animatePress(userChosenColour);
        console.log("Inside click func: Array Game Pattern : "+gamePattern);
        console.log("Inside click func: Array userClickedPattern : "+userClickedPattern);

        //console.log("checkAnswer: "+checkAnswer(userClickedPattern, gamePattern));
        //if(checkAnswerTrial(userClickedPattern, gamePattern)){
            //nextSequence();

            //if(userClickedPattern.length===level)
            //console.log("userClickedPattern.length-1: "+(userClickedPattern.length)-1);
            var currentLevel=(userClickedPattern.length)-1;
            checkAnswer(currentLevel);
        //}
        
    }
});

function nextSequence(){
    level++;
    console.log("##########################    LEVEL    "+level+"    ##################");
    $("h1").text("Level "+level);

    //clearing userClickedPattern=[] array
    console.log("Inside nextSequence: CLEARING userClickedPattern");
    userClickedPattern=[];

    //Generating random number to choose a computer color and pushing it into the another array
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];

    console.log("Inside nextSequence: Pushing randomly Chosen Colour by Comp : "+randomChosenColour);
    gamePattern.push(randomChosenColour);

    //Adding annimation to the randomly chosen color
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //Adding sound to the randomly chosen color
    playSound(randomChosenColour);
    console.log("Inside nextSequence: Array gamePattern: "+gamePattern);
    //return gamePattern;
}

//Generatized function to add sound to the button press
function playSound(name){
    var soundPath="sounds/"+name+".mp3";
    var audio = new Audio(soundPath);
    audio.play();
}

//Animation to user seleced color
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    console.log("Inside checkAnswer function");
    console.log("userClickedPattern[currentLevel]===gamePattern[currentLevel]");
    console.log(userClickedPattern[currentLevel]===gamePattern[currentLevel]);
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
        if((currentLevel+1)===level){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        var audio= new Audio("sounds/wrong.mp3");
        audio.play();

        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;

}














// function checkAnswerTrial(userClickedPattern, gamePattern){
//     var flag=0;

//     if(userClickedPattern.length===gamePattern.length)
//     {
//         for(var i=0;i<userClickedPattern.length;i++){
//             if(userClickedPattern[i]===gamePattern[i])
//                 continue;
//             else{
//              flag=1;
//              break;   
//             }
//         }
//         if(flag!=1)
//         return true;
//         else return false;
//     }
//     else return false;
// }
