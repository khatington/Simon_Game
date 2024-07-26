/*REFERENCE
Based on: https://youtu.be/n_ec3eowFLQ?si=t3iIY95d8nz9n5T6
---helped me a lot, majority was learnt throught this video but some is my own code
*/

/*Declaring vars*/
let active = false; //the switch for the start button
let turn; //for the score button 
let win; // player won or not 
let order = []; //track of pattern of lights
let playerOrder =[]; //track of player pressing lights
let flash; //int of flashes appearing
let good; // if player is doing good or not 
let compTurn; //track computer turn
let intervalId; //an id for the setInterval
let on = false;  //player can interact

let counter = document.querySelector('#score');

//when the start button is clicked
function toggle()
{
    let toggle = document.querySelector('#start')
    active = !active

    //if active, signal changes to green and play begins after 3 seconds
    if(active || win)
    {
        toggle.classList.add('active'); 
        $('#signal').css('background-color', '#24c524');
        setTimeout(play, 3000);
    }
    //if inactive, signal is off, counter reset
    else
    {
        toggle.classList.remove('active');
        $('#signal').css('background-color', '#cf1010');
        counter.innerHTML = "00"; 
        clearColor();
       // console.log("POWER OFF"); //just to check if its working
        order = [];
        playerOrder = []; 
        
    }
}

//begins after 3 seconds and updates counter to 1
function play()
{
    //setting up vars
    win = false;
    order = [];
    playerOrder =[];
    flash = 0; 
    turn = 1;
    counter.innerHTML = "0"+ turn;
    good = true; 

    for(var i = 0; i<20; i++)
    {
        //choose num between 1 and 4
        order.push(Math.floor(Math.random() * 4)+ 1); 
    }

    /*Start of turn 
    setInterval  = run gameTurn function every 800 milisecond */
    compTurn= true; 
    intervalId = setInterval(gameTurn, 800) 
}
//begins every 800 miliseconds
function gameTurn()
{
    //flash equals to number of turns
    if(flash == turn)
    {
        clearInterval(intervalId);
        compTurn = false; 
        clearColor();
        on = true; 
    }

    if(compTurn)
    {
       clearColor();
            //   condition     functions
            if(order[flash] ==1) one(); //if first item in array order is 1, run one()
            if(order[flash] ==2) two(); 
            if(order[flash] ==3) three(); 
            if(order[flash] ==4) four(); 
            flash++;
    }
}


/*START OF CODE FOR EACH FLASHING FUNCTION OF EACH COLOR*/
function one()
{
    setTimeout(() => {
    //green will change backgroun color to light green every 300 miliseconds
    topleft.style.background = "#89f289";
    }, 300);
    console.log("Hello, green has blinked")
    //color is then cleared straight after
    clearColor(); 
}

function two()
{
    setTimeout(() => {
    //red will change backgroun color to light red every 300 miliseconds
    topright.style.background = "#f98282";
}, 300);
    console.log("Hello, red has blinked")
    clearColor();
}

function three()
{
    setTimeout(() => {
    //yellow will change backgroun color to light yellolw every 300 miliseconds
    bottomleft.style.background = "#f9f3ca";
}, 300);
    console.log("Hello, yellow has blinked")
    clearColor();
}

function four()
{
    setTimeout(() => {
    //blue will change backgroun color to light blue every 300 miliseconds
    bottomright.style.background = "lightskyblue";
}, 300);
    console.log("Hello, blue has blinked")
    clearColor();
}

//clearing the color after flashing and after user clicks 
function clearColor(){

setTimeout( () =>
{
topleft.style.background= "";
topright.style.background = "";
bottomleft.style.background = "";
bottomright.style.background = "";
}, 800)
}

//flash all colors when user loses
function flashColor(){
 setTimeout( () =>
    {
    topleft.style.background= "#89f289";
    topright.style.background = "#f98282";
    bottomleft.style.background = "#f9f3ca";
    bottomright.style.background = "lightskyblue";
}, 300)
}


/*ADDING FUNCTIONALITY TO ALL THE BUTTONS */
topleft.addEventListener('click', (event) =>
{
    if(on)
    {
        playerOrder.push(1); 
        check();
        one();
        if(!win)
        {
            setTimeout(() =>
            {
                clearColor();
            },300); 
        }
    }
})

topright.addEventListener('click', (event) =>
{
    if(on)
    {
        playerOrder.push(2); 
        check();
        two();
        if(!win)
        {
            setTimeout(() =>
            {
                clearColor();
            },300); 
        }
    }
})

bottomleft.addEventListener('click', (event) =>
{
    if(on)
    {
        playerOrder.push(3); 
        check();
        three();
        if(!win)
        {
            setTimeout(() =>
            {
                clearColor();
            },300); 
        }
    }
})

bottomright.addEventListener('click', (event) =>
{
    if(on)
    {
        playerOrder.push(4); 
        check();
        four();
        if(!win)
        {
            setTimeout(() =>
            {
                clearColor();
            },300); 
        }
    }
})

//check functionality
//conditions included: 
//if player loses, and if player is doing good but hasnt won, next round 
//and if player has won game
function check()
{
    //the last thing that the player clicked doesnt equal to the actual order then
    if(playerOrder[playerOrder.length -1] !== order[playerOrder.length -1])
    {
        //flash all colors and set everything back for the reset of the game
        flashColor();
        good = false; 
        order = []; 
        playerOrder = []; 
        counter.innerHTML = "00";
        setTimeout(play, 3000);
    }

    //if player won 20 levels then, trigger win game
    if(playerOrder.length == 20 && good)
    {
        winGame();
    }

    //if player has got it right and is doing good but hasnt won
    //game reset and turn is updated
    if(turn == playerOrder.length && good && !win)
    {
        //console.log("WE DOING GREAT");
        turn++; 
        playerOrder = []; 
        compTurn = true; 
        flash = 0; 
        counter.innerHTML = "0"+ turn;
        intervalId = setInterval(gameTurn, 800);
        if(turn < 10)
        {
            counter.innerHTML = "0"+ turn;
        }
        else
        {
            counter.innerHTML = turn;
        }
    }
}

//if player has won, flash all colors and turn off game
function winGame()
{
    flashColor(); 
    clearColor();
    on = false; 
    win = true;
    setTimeout($('#signal').css('background-color', '#cf1010'), 3000);
    counter.innerHTML = "00"; 
    console.log("POWER OFF"); //just to check if its working
    order = [];
    playerOrder = []; 
}





