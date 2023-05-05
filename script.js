let apiKey = '7f5360ef6cc11d0145c270ba72266889' ;

const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    //if input is not valid after pressing enter button
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);    
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){//if browser supports geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser does not support geolocation api");
    }
});

function onSuccess(position){
    const{latitude, longitude} = position.coords; //getting latitude and longitude of user device
    api = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    //getting api response and parsing into js ogj
    //pass api result as argument to weatherDetails function
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    if(info.length == 0){
        infoTxt.innerText = `${inputField.value} is not valid`;
        infoTxt.classList.replace("pending", "error");
    }else{
        const city = info.name; 
        const country = info.sys.country; 
        const {description, id} = info.weather[0]; 
        const {pressure, humidity, temp} = info.main; 

        //icons depending on the weather ID in api
        if(id == 800){
            wIcon.src = "file:///C:/Users/rajes/Downloads/weather/icons/clear.svg";
        }else if(id >= 200 && id<=232){
            wIcon.src = "file:///C:/Users/rajes/Downloads/weather/icons/storm.svg";
        }else if(id >= 600 && id<=622){
            wIcon.src = "file:///C:/Users/rajes/Downloads/weather/icons/snow.svg";
        }else if(id >= 701 && id<=781){
            wIcon.src = "file:///C:/Users/rajes/Downloads/weather/icons/haze.svg";
        }else if(id >= 801 && id<=804){
            wIcon.src = "file:///C:/Users/rajes/Downloads/weather/icons/cloud.svg";
        }else if((id >= 300 && id<=321)||(id>=500 && id<=531)){
            wIcon.src = "file:///C:/Users/rajes/Downloads/weather/icons/rain.svg";
        }


        //passing values to html element
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location ").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(pressure);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;


        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
    }
    
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});
