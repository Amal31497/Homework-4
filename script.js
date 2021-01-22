$(document).ready(function(){
    var questionIndex = 0;
    var score = 0;
    // Main variables declaration
    var body = $("body")
    var start = $("#gameStart")
    var timer = $("#timer");
    var question = $("#question")
    var answers= $("#answers")
    var answerCheck = $(".answerCheck")
    var main = $("#main")
    // ...

    // Objects that contain three properties: Question, answers, and the right answer
    var questions = [{
        question: 'What is the "real" name of Javascript?',
        choices: ['Java' ,'JS' ,'I dont know' ,'Ecmascript'],
        answer: 'Ecmascript'
    },
    {
        question:'What is the scope of "var" variable?',
        choices:['HTML scope', 'Microscope', 'Function Scope', 'Sewer scope'],
        answer: 'Function Scope'
    },
    {
        question:'How does one garbs a specific class using jquery?',
        choices:['.class', '#class', 'class', 'className'],
        answer: '.class'
    },
    {
        question:'Query selector $("button:contains(a)") accesses which element(s)?',
        choices:['All button elements', 'All non empty button elements', 'All button elements the contents of which are equal to variable a', 'Only the first button element in a document'],
        answer: 'All button elements the contents of which are equal to variable a'
    }
    ]
    // ...


    // Initiate the start button
    start.on('click', function(){
        start.hide(10);
        function postQuestion(post){
            if( questionIndex < questions.length ){
                question.append("<h2>" + questions[post].question);
                for( i = 0; i < questions[post].choices.length; i++ ){
                    var newLi = $("<li>")
                    newLi.html( "<button>" + questions[post].choices[i]);
                    $("button:contains(" + questions[post].answer + ")").attr('id', 'rightAnswer');
                    answers.append(newLi);
                }
            } else if(questionIndex === questions.length){
                timeLeft = 0;
                answerCheck.hide(10);
                var input = ("<input>");
                gameOver();
            }

            function gameOver(){
                $(".initials").html("<h3>" + 'Your score is - ' + score + "<br>").html("<h4>" + 'Please put your initials to save your results ' + input + "<br>" + "<br>" + "<button>" + 'Submit');
                $(".initials").show(10);
                $("button:contains(Submit)").addClass("btn btn-outline-success").attr("type", "button");
                $("button:contains(Submit)").on('click', function(){
                    $(".main").hide(10);
                    input = $("input").val();
                    localStorage.setItem("Result", input + ' - ' + score);
                    var result = localStorage.getItem("Result");
                    $(".initials").append("<br>" + "<hr>" + 'Your result is : ' + result).append("<br>" + "<button>" + 'Restart') ;
                    $("button:contains(Restart)").addClass("btn btn-outline-primary").attr("type", "button");
                    $("button:contains(Restart)").on('click', function(){
                        score = 0;
                        timeLeft = 0;
                        $(".initials").hide(50);
                        main.show(10);
                        post=0;
                        postQuestion(questionIndex=0); 
                    });
                });
            }

            $("button").on('click', function(event){
                event.preventDefault();
                var selection = event.target.id
                if( selection === 'rightAnswer'){
                    answerCheck.html("<br>" + "<hr>" + "<br>" + 'Correct!').show(50).delay(500).hide(10);
                    questionIndex++;
                    question.empty();
                    answers.empty();
                    score += 5;
                    postQuestion(questionIndex);
                    
                } else {
                    answerCheck.html("<br>" + "<hr>" + "<br>" + 'Incorrect!').show(50).delay(200).hide(10);
                    questionIndex++;
                    question.empty();
                    answers.empty();
                    timeLeft -= 10;
                    postQuestion(questionIndex);
                }
            });
        }
        timer.text(downloadTimer);
        var timeLeft = 60;
        var downloadTimer = setInterval(function(){
            if(timeLeft <= 0){
              timer.text(' Time is up!')
              clearInterval(downloadTimer);
            } else {
               timer.text(timeLeft + " seconds");
            }
            timeLeft -= 1;
        }, 1000); 
        postQuestion(questionIndex=0);
    });
});