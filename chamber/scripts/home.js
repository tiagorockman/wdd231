import {clients} from './clients.js';
import { setDataFooter } from './base.js';

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

const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const urlForecast = `//api.openweathermap.org/data/3.0/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

async function apiFetch() {
  try {
      const response = await fetch(url);
      const response2 = await fetch(urlForecast);
      if (response.ok && response2.ok) {
          console.log(response.ok);
          const data = await response.json();
          const data2 = await response2.json();

          console.log(data);
          console.log(data2);

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

function displaWeatherResult(data){
  const iconTemperature = document.getElementById("weather-icon-temperature");
  const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconTemperature.setAttribute('src', iconURL);
  iconTemperature.setAttribute('alt', 'Weather Icon');

  
  
}

const newClientsList = selectUniqueRandom(clients, 3);
setDataFooter();


window.onload = loadClients;
