const apiKey = "d780c4962479a88b5361fdaa3750e78e";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
  
const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
async function getWeatherByLocation(city){
    try{
        const resp = await fetch(url(city));
         const respData = await resp.json();
         if (respData.cod === "404"){
            alert("invalid city name. Please try again");
            return;
         }
     
           addWeatherToPage(respData);
    }
    catch(error){
        console.error(error);
    }
}
function addWeatherToPage(data){
    const temp = tempValue(data.main.temp);
    const weather = document.createElement('div')
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>`;
    main.innerHTML= "";
    main.appendChild(weather);
};
function tempValue(value){
    return Math.floor(value - 273.15);
}



form.addEventListener('submit',(event) =>{
    event.preventDefault();

    const city = search.value;
    if(city){
        getWeatherByLocation(city)
    }
});
    








