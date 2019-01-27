var status = 0; // status=0:stop and 1:running
var time = 0;
var i = 0;
var startBtn = document.getElementById("startBtn");
var timerLabel = document.getElementById('timerLabel');

function start()
{
    status = 1;
    startBtn.disabled = true;
    timer();
}

function stop()
{
    status = 0;
    startBtn.disabled = false;
}

function laps()
{   
    i++;
    let lapvalues = ("Lap" + i + " occurs at:" + timerLabel.innerHTML); 
    document.getElementById('lap').innerHTML += lapvalues + "</br>";
}

function reset()
{
    status = 0;
    time = 0;
    timerLabel.innerHTML = '00:00:00';
    startBtn.disabled = false;
}

function addhistorytolocal(lapval)
{
let hists= gethistoryfromlocal();
hists.push(lapval);
localStorage.setItem('lapvalue',JSON.stringify(hists));
}

function gethistoryfromlocal()
{
const histost=localStoragecontent.getItem('history');
let hists;
if(histost===null)
{
    hists=[]; 
}
else
{
    histost= JSON.parse(histost);
}
return hists;
}
  
  //history
function historylap(e) {
  console.log("hello from local storage");
    hist.style.visibility = 'hidden';
  
    let hists = getHistFromLocal();
    const div = document.createElement('li');
    //let hm = hists.toString();
    let histarr = [];
  
    for (let i = 0; i < hists.length; i++) {
      if (hists[i] === `"0:0:0:0"` || hists[i] === `"0:0:0:1"`) {
        //   alert("start first!");
        continue;
      } else {
        histarr.push(hists[i].slice(0, -1) + `"`);
      }
    }
  
    if (histarr.length >= 10) {
      for (var i = histarr.length - 10, j = 1; i < histarr.length, j <= 10; i++, j++) {
        const li = document.createElement('ol');
        li.textContent = j + "-" + hists[i];
        historyList.appendChild(li);
  
      }
    } else {
      for (var k = 0; k < histarr.length; k++) {
        const li = document.createElement('ol');
        li.textContent = k + "-" + hists[k];
        historyList.appendChild(li);

        //add to local storage
        addhistorytolocal();
  
      }
    }
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
        }, 10);
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