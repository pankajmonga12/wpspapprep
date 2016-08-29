      
  var hours =document.getElementById("tt_hour").value;
  var minutes =document.getElementById("tt_minute").value;
  var seconds =document.getElementById("tt_second").value;
  var time_taken_in_second=0;
  var totalTimeSpent=document.getElementById("totalTimeSpent").value;
  var SD ;
  
  /*-----------------------Start Time Counter -------------------------------*/ 
  function setCountDown ()
{
	
   time_taken_in_second++;
   
  seconds--;
  if (seconds < 0){
      minutes--;
      seconds = 59
  }
  if (minutes < 0){
      hours--;
      minutes = 59
  }
  
  if (hours < 0){
     // days--;
      hours = 23
  }
   
 
  document.getElementById("tt_timer").innerHTML = ('0'+hours).slice(-2)+" : "+('0'+minutes).slice(-2)+" : "+('0'+seconds).slice(-2);
  
  document.getElementById("time_taken").value=+time_taken_in_second + +totalTimeSpent; // add total spent time in previous test and currently spended time 
  SD=setTimeout( "setCountDown()", 1000 );
 // alert(time_taken_in_second+totalTimeSpent);
 
 
  if (minutes == '0' && seconds == '0' && hours == '0') 
    {
       // alert('up');
        seconds = "00"; 
        clearTimeout(SD);
        alert("Time is up. Submitting your test."); // change timeout message as required
               
        submitMockExam();
    }
}
    


