
const timeElement =document.getElementById('test')
const inputs=document.querySelectorAll('.inputs')

//function to Display current time
function DisplayTime(){
    var currtime=new Date();
    var hh=currtime.getHours()
    var mm=currtime.getMinutes();
    var ss=currtime.getSeconds();
    //var ampm=(currtime.getHours()) < 12 ? 'AM' : 'PM'


    hh=(hh<10)?'0'+hh:hh;
    mm=(mm<10)?'0'+mm:mm;
    ss=(ss<10)?'0'+ss:ss;

    let time = hh+':'+mm+':'+ss
    timeElement.innerText=time;



    let t=setTimeout(function(){
        DisplayTime()
        if (alarm_list.includes(time)){ring(time)}



        },1000)
}
DisplayTime();

//formatting time 
function formatTime(time){
    if(time==''){
        return '00'
     }else if(time<10&& !time.length<2){
         return '0'+time;
     }else{
         return time
     }
}
const AlarmList=document.querySelector('.set-alarms-list')

//creating array to store Alarm times

let alarm_list=[]

//taking input from user

const userInput=document.querySelector('.user-input');

//setting time in array

userInput.addEventListener('submit',function(e){
    e.preventDefault();
    const hrs=userInput.h.value;
    const min=userInput.min.value;
    const sec=userInput.sec.value;

    let inputHrs=formatTime(hrs)
    let inputMin=formatTime(min)
    let inputSec=formatTime(sec)

    const new_Alarm=`${inputHrs}:${inputMin}:${inputSec}`;
    if(isNaN(new_Alarm)){
        if(!alarm_list.includes(new_Alarm)){
            alarm_list.push(new_Alarm)
            DisplayAlarm(new_Alarm)

        }else{
            alert('alram Already exists')
            return
        }

    }
    inputs.forEach(inp=>inp.value='')
})
//Displaying Alarm list 

function DisplayAlarm(new_Alarm){
    const html=`<li class='time-list'><span class='time'>${new_Alarm}</span><button  class='deleteAlarm' id="deleteButton" onclick="remove(this.value)" value=${new_Alarm}  >delete</button></li>`;


    AlarmList.innerHTML+=html;
}

const audio=new Audio('alarm.mp3')
audio.loop=true;

//ring audio at alarm time
function ring(time){
    audio.play();
}

//function to stop the Alarm

function  clearAlarm(){
    audio.pause();

    alert('Alarm is cleared')
}

//function to delete the alarm


AlarmList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('deleteAlarm')){
        e.target.parentElement.remove();
    }
})

const remove=(value)=>{
    let newList=alarm_list.filter((time)=>time!=value);
    //clear content
    alarm_list.length=0;
    alarm_list.push.apply(alarm_list,newList)
    clearAlarm()
}