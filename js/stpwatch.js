var status = 0; // status=0:stop and 1:running
var time = 0;
var i = 0;
var lapvalues=[];
var hists= [];
hists=gethistoryfromlocal();
var startBtn = document.getElementById("startBtn");
var timerLabel = document.getElementById('timerLabel');
var hist=document.getElementById('history');

function start()
{
    status = 1;         //timer running
    startBtn.disabled = true;
    timer();
}

function stop()
{
    status = 0;         //timer paused
    startBtn.disabled = false;
}

function laps()
{   
    i++;
    var x=("Lap" + i + " occurs at:" + timerLabel.innerHTML);   //to get the lap values
    lapvalues.push(x);
    document.getElementById('lap').innerHTML = "";          
    lapvalues.forEach(function(lap) {                       //to take all the lapvalues in arrays and save in localstorage
        var li=document.createElement("li");
        li.textContent=lap;
        document.getElementById("lap").appendChild(li);
    });
    
}

function reset()
{
    status = 0;
    time = 0;
    timerLabel.innerHTML = '00:00:00';                  //to set the timer to 00:00:00
    startBtn.disabled = false;
    document.getElementById('lap').innerHTML = null;    //to clear lap values

    //adding lap history to local
    addhistorytolocal(lapvalues); 
}

//to show the lap history
function histories(){
   // console.log("history button working");
    //displayinghistoryfromlocal();
    lapvalues.forEach(function(lap) {
        var li=document.createElement("li");
        li.textContent=lap;
        document.getElementById("lap").appendChild(li);
    });
}

//add lap values in local storage
function addhistorytolocal(lapval)
{
    console.log("history added");
    hists.push(lapval);
    localStorage.setItem('lapvalue',JSON.stringify(hists));
}

//retreiving lapvalues from local storage
function gethistoryfromlocal()
{   
    const histost=localStorage.getItem('hists');
    if(histost===null)
{
        hists=[]; 
}
else
{
        histost= JSON.parse(histost);   //converting to javascript 
}
    return hists;
}

//to execute the timer
function timer(){
    if (status == 1) {
        setTimeout(function() {
            time++;
            var min = Math.floor(time/100/60);
            var sec = Math.floor(time/100);
            var mSec = time % 100;
            if (min < 10) min = "0" + min;
            if (sec >= 60) sec = sec % 60;
            if (sec < 10) sec = "0" + sec;
            if (mSec < 10) mSec = "0" + mSec;
            timerLabel.innerHTML = min + ":" + sec + ":" + mSec;        
            timer();
        }, 10); //ms
    }
}
document.onkeydown = function(event) { 
    if (event) {
        if (event.keyCode == 32 || event.which == 32) {         
            if(status == 1) {
                stop();
            } else if (status == 0) {
                start();
            }
        }
    }
};
