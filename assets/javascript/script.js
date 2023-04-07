// Main Function to perform the overall tasks.
function mainExec(){



var searchInput = document.getElementById('searchInput');
var cityName = document.getElementById("cityName");
var h3_stateList = document.getElementById('h3_stateList');
cityName.innerHTML = searchInput.value;
h3_stateList.innerHTML = searchInput.value;
localStorage.setItem('searchInput', searchInput.value);
console.log();



// Created an account witch Third party APIs for weather and git an API key.
// API Key: bb31460c5f8a5ca7382b3ed7e464a124
// Creating Fetch
fetch('https://api.openweathermap.org/data/2.5/forecast?q='+searchInput.value+'&appid=bb31460c5f8a5ca7382b3ed7e464a124')
.then(response => response.json())
.then(data => {

    //Min and Max values for a day
    for(i = 0; i<5; i++){
        document.getElementById("d" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min);
        
    }

    for(i = 0; i<5; i++){
        document.getElementById("d" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_min);
        
    }

    // Grabbing Weather Icons
    for(i = 0; i<5; i++){
        document.getElementById("icn" + (i+1)).src = "http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png";
        
    }
    console.log(data);    
    
})

.catch(err => alert("Check your Internet Gateway."))
}

function settingDefaultval(){
    document.getElementById("searchInput").defaultValue = "Denver";
    mainExec();
}

// Five Days Forecast
var dd = new Date();
console.log(dd.getDay());
var weekd = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Grabbing from Arry


function chk_day(day){
    if(day + dd.getDay() > 6){
        return day + dd.getDay() - 7;
    }
    else{
        return day + dd.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("d" + (i+1)).textContent = weekd[chk_day(i)];
    }