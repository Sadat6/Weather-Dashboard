var searHistory=[];
var searchInput = document.getElementById('searchInput');
var stateLists = document.querySelector('.stateLists');

// Main Function to perform the overall tasks.
function mainExec(){
var cityName = document.getElementById("cityName");
cityName.innerHTML = searchInput.value;
searHistory.push(searchInput.value);
localStorage.setItem('searHistory', JSON.stringify(searHistory) );
console.log();


// Created an account witch Third party APIs for weather and git an API key.
// API Key: bb31460c5f8a5ca7382b3ed7e464a124
// Creating Fetch that grabs the data from Third API and passing or contactinating with our API Key 
//so they can give us access to grab data.
fetch('https://api.openweathermap.org/data/2.5/forecast?q='+searchInput.value+'&appid=bb31460c5f8a5ca7382b3ed7e464a124')
.then(response => response.json())
.then(data => {

    //Minimun and Maximum values for each day
    for(i = 0; i<6; i++){
        document.getElementById("d" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min);
        
    }

    for(i = 0; i<6; i++){
        document.getElementById("d" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_min);
        
    }

    // Grabbing Weather Icons from that THIRD PARTY API.
    for(i = 0; i<6; i++){
        document.getElementById("icn" + (i+1)).src = "http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png";
        
    }
    console.log(data);    
    
})

.catch(err => alert("Check your Internet Gateway."))

pageLoad();
}


// Creating this function to SET a default Value for our Search Input Field and 
//Supplying DENVER CITY as the primary city when each times a page is loaded.
function settingDefaultval(){
    
        document.getElementById("searchInput").defaultValue = "Denver";
        mainExec();
    
}


// Creating variables and Array, supplying week Days for array.
// Five Days Forecast
var dd = new Date();
console.log(dd.getDay());
var weekd = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Grabbing data from Arry which we had created on line 54 and implementing CONDITIONAL STATE 
//using IF statement to check the condition.

function chk_day(day){
    if(day + dd.getDay() > 6){
        return day + dd.getDay() - 7;
    }
    else{
        return day + dd.getDay();
    }
}

    for(i = 0; i<6; i++){
        document.getElementById("d" + (i+1)).textContent = weekd[chk_day(i)];
    }

    // Function that creates dynamic HTML element.
    
    function pageLoad(){
       searHistory = JSON.parse(localStorage.getItem('searHistory' ));
       if(!searHistory){
        return
       } else {
            stateLists.innerHTML = "";
            for(var i=0; i<searHistory.length; i++){
                var dynamicButton = document.createElement('button');
                
                dynamicButton.textContent = searHistory[i];
                dynamicButton.setAttribute('class','automaticBtn');
                stateLists.append(dynamicButton)
        }
       }
    }