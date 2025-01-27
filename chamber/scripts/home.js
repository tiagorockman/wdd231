import {clients} from './clients.js';
import { setDataFooter,  setHambugerButton } from './base.js';

//Initial calls
setHambugerButton();
setDataFooter();

const selectUniqueRandom = (arr, num) => {
  const result = [];
  const copy = [...arr];
  
  for (let i = 0; i < num && copy.length > 0; i++) {
      const index = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(index, 1)[0]);
  }
  
  return result;
};

function loadClients() {
    const directory = document.getElementById('directory');
    newClientsList.forEach(client => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="client-info-head">
              <h3>${client.BusinessName}</h3>
              <p>${client.BusinessTagline}</p>
              <hr/>
            </div>
              <div class="client-info-body">
                <img src="${client.ImageUrl}" alt="${client.BusinessName} Logo"> 
                <div>       
                <p>Email: <a href="mailto:${client.Email}">${client.Email}</a></p>
                <p>Phone: ${client.Phone}</p>
                </div>
            </div>
             <p class="url"><a href="${client.Url}" target="_blank">Visit Website</a></p>
        `;
        directory.appendChild(card);
    });
}

let lat = 47.507961019789335;
let lon = 19.037313945600143;

let apiKey = '6398c5c682bce03dc2990c40d11c35a2';


//Units
//metric - Celsius
//imperial - Farenheit
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
  try {
      const response = await fetch(url);
      const response2 = await fetch(urlForecast);
      if (response.ok && response2.ok) {

          const data = await response.json();
          const data2 = await response2.json();


          displaWeatherResult(data);
          displayForecastWeather(data2)
      }
      else {
          throw Error("Something wronng happend when consulting data.");
      }
  }
  catch (error) {
      console.log(error);
  }
}

let timing = (sunrise_or_sunset) => {
  const date = new Date(sunrise_or_sunset * 1000);
  const hrs = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formatting = `${hrs.toString().padStart(2, '0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  return formatting
}

function displaWeatherResult(data){
  const iconTemperature = document.getElementById("weather-icon-temperature");
  const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconTemperature.setAttribute('src', iconURL);
  iconTemperature.setAttribute('alt', 'Weather Icon');

  //Preparing fields ids to be filled
  const temp = document.getElementById("temp");
  const descKindWeather = document.getElementById("descKindWeather");
  const high = document.getElementById("high");
  const low = document.getElementById("low");
  const humidity = document.getElementById("humidity");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");

  //Set the weather values
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  descKindWeather.innerHTML = capitalizeEveryWord(`<b>${data.weather[0].description}</b>`);
  high.textContent = `High Temp: ${Math.round(data.main.temp_max)}°`;
  low.textContent = `Low Temp: ${Math.round(data.main.temp_min)}°`;
  humidity.textContent = `Humidity: ${data.main.humidity}`;
  sunrise.textContent = `Sunrise: ${timing(data.sys.sunrise)}`;
  sunset.textContent = `Sunset: ${timing(data.sys.sunset)}`;
  
}


function displayForecastWeather(data) {
  //Preparing fields ids to be filled
  const tomorrow = document.getElementById("tomorrow");
  const dayafer = document.getElementById("dayafer");
  const inthreedays = document.getElementById("inthreedays");

  const tempTomorrow = (data.list[4].main.temp);
  const descriptionTomorrow = capitalizeEveryWord(data.list[4].weather[0].description);

  const tempdayAfterTomorrow = (data.list[12].main.temp);
  const descriptionAfterTomorrow = capitalizeEveryWord(data.list[12].weather[0].description);

  const tempInThreeDays = (data.list[20].main.temp);
  const descriptionInThreeDaysTomorrow = capitalizeEveryWord(data.list[20].weather[0].description);

  tomorrow.innerHTML = `<b>Tomorrow:</b> ${descriptionTomorrow}, ${tempTomorrow}°C`;
  dayafer.innerHTML = `<b>Day After:</b> ${descriptionAfterTomorrow}, ${tempdayAfterTomorrow}°C`;
  inthreedays.innerHTML = `<b>In Three Days:</b> ${descriptionInThreeDaysTomorrow}, ${tempInThreeDays}°C`;

}


function capitalizeEveryWord(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}


const newClientsList = selectUniqueRandom(clients, 3);

loadClients();
apiFetch();
