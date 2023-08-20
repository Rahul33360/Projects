const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-SearchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

const API_KEY = "ce618028f09c8323055746481a0694be";

let currentTab = userTab;

currentTab.classList.add("current-tab");
getfromSessionStorage();


function switchTab (clickedTab) {
    if(clickedTab != currentTab) {
        currentTab.classList.remove("current-tab")
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");    // changing the window

        // chaning it's all interface when window changes
        if(!searchForm.classList.contains("active")) {   // it means if searchTab's class  doesnot contaons active class then execute code of inside block
            
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");

        }
        else {
            //  meaning tab is on the search tab already then switch it to your weather tab 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("ative");
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", ()=>{
    // passing input tab as a clicked parameter
    switchTab(userTab);
});

searchTab.addEventListener("click", ()=>{
    // passing input tab as a clicked parameter
    switchTab(searchTab);
});

// It checks if coordinates are already present or not in sessioon storage
function getfromSessionStorage() { 
    const localCoordinates = sessionStorage.getItem("user-coordinates");

    if(!localCoordinates) {
        // if local coordinates is not avaliable
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates =  JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const {lat,lon} = coordinates;
    // 
    grantAccessContainer.classList.remove("active");
    //  make loader visible
    loadingScreen.classList.add("active");

    //  API CALLING
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data =await response.json();  
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);
    } 
    catch (err) {
        loadingScreen.classList.remove("active");
        // some code are remaining


    }
}


function renderWeatherInfo(weatherInfo) {
    //  fetching the elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch value from weatherInfo object and put it ui elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText =`${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;

}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);


const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //hW
    }
}













