var playing = false;
var score;
var livesLeft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;

$(function(){
    
            //click on start reset button
            $("#startReset").click(function (){

                //we are playing
                //if yes:
                if(playing == true){

                    //reload page
                    location.reload();
                }else{

                    //we are not playing
                    playing = true; //game initiated

                    //set scrore to 0
                    score = 0;
                    $("#scoreValue").html(score);

                    //show lives left
                    $("#livesLeft").show();
                    livesLeft = 3;
                    addHearts();

                    //hide game over box
                    $("#gameOver").hide();

                    //change button text to "reset game"
                    $("#startReset").html("Reset Game");

                    //start sending fruit
                    startAction();
                }
            });
            
            //slice a fruit
            $("#fruit1").mouseover(function(){
                score++;
                $("#scoreValue").html(score); //update score
            
                $("#slicesound")[0].play(); //play sound
                
                //stop fruit 
                clearInterval(action);
                
                //hide it
                $("#fruit1").hide("explode", 500); //slicing fruit
                
                //send new fruit
                setTimeout(startAction, 500);
            });


        //functions

        function addHearts(){
            $("#livesLeft").empty();
            for(i = 0; i < livesLeft; i++){
              $("#livesLeft").append('<img src="images/heart.png" class="life">');
            }
        }

        //start sending fruit

        function startAction(){
            $("#fruit1").show(); 
            chooseFruit(); //chose random fruit
            $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top': -50});
            //random position

            //generate a random step
            step = 1+ Math.round(5*Math.random()); //change step

            //move fruit down by one step ever 10 ms
            action = setInterval(function(){
                
                //move fruit by one step
                $("#fruit1").css('top', $("#fruit1").position().top + step);

                //check if fruit is too low
                if($("#fruit1").position().top > $("#fruitContainer").height()){
                   //check if we have lives left
                    if(livesLeft > 1 ){
                       //generate a fruit
                        $("#fruit1").show(); 
                        chooseFruit(); //choose a random fruit
                        $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top': -50});
                        //choose a random step
                        step = 1+ Math.round(5*Math.random()); //change step

                        //reduce lives by one
                        livesLeft --;

                        //populate lives left box
                        addHearts();

                       }else{ //game over
                           playing = false; 

                           $("#startReset").html("Start Game");

                           $("#gameOver").show();
                           $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                           $("#livesLeft").hide();
                           stopAction();
                       }
                   }
            }, 10);
        }

        //genertate a random fruit

        function chooseFruit(){
            $("#fruit1").attr('src' , '/images/' + fruits[Math.round(8*Math.random())] + '.png')
        }

        //stop dropping fruit

        function stopAction(){
            clearInterval(action);
            $("#fruit1").hide();
        }
    
});
