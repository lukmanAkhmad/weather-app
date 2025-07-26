import { getData } from "./controllerAPI";

import airIcon from "./assets/img/air.svg";
import humidityIcon from "./assets/img/humidity-percentage.svg";
import thermometerIcon from "./assets/img/thermometer.svg";

function getCityName() {
  const mainContainer = document.querySelector("#main-container");
  const btnSearch = document.querySelector("#btn-search");
  const inputCityName = document.querySelector("#city-name");

  btnSearch.addEventListener("click", () => {
    const valueInputCityName = inputCityName.value;
    console.log("btn search on click");
    console.log(`nama kota = ${valueInputCityName}`);
    renderMainContent(mainContainer);
    getData(valueInputCityName);
  });
}

function renderMainContent(parentNode) {
  const containerMainContent = document.createElement("div");
  containerMainContent.setAttribute("id", "container-main-content");

  const containerAddressAndConditions = document.createElement("div");
  containerAddressAndConditions.classList.add(
    "container-address-and-conditions",
  );
  const paraAddress = document.createElement("p");
  paraAddress.classList.add("address");
  const paraConditions = document.createElement("p");
  paraConditions.classList.add("conditions");

  const containerTempAndIcon = document.createElement("div");
  containerTempAndIcon.classList.add("container-temp-and-icon");
  const paraTemp = document.createElement("p");
  paraTemp.classList.add("temp");
  const imgIcon = document.createElement("img");
  imgIcon.classList.add("icon-weather");

  const containerWeatherDetails = document.createElement("div");
  containerWeatherDetails.classList.add("container-weather-details");

  const containerFeelsLike = document.createElement("div");
  containerFeelsLike.classList.add("container-feels-like", "weather-details");
  const imgIconFeelsLike = document.createElement("img");
  imgIconFeelsLike.classList.add("icon-feels-like");
  imgIconFeelsLike.src = thermometerIcon;
  imgIconFeelsLike.alt = "Feels Like";
  imgIconFeelsLike.title = "Feels Like";
  const paraFeelsLike = document.createElement("p");
  paraFeelsLike.classList.add("para-feels-like");

  const containerHumidity = document.createElement("div");
  containerHumidity.classList.add("container-humidity", "weather-details");
  const imgIconHumidity = document.createElement("img");
  imgIconHumidity.classList.add("icon-humidity");
  imgIconHumidity.src = humidityIcon;
  imgIconHumidity.alt = "Humidity";
  imgIconHumidity.title = "Humidity";
  const paraHumidity = document.createElement("p");
  paraHumidity.classList.add("para-humidity");

  const containerWind = document.createElement("div");
  containerWind.classList.add("container-wind", "weather-details");
  const imgIconWind = document.createElement("img");
  imgIconWind.classList.add("icon-wind");
  imgIconWind.src = airIcon;
  imgIconWind.alt = "Wind";
  imgIconWind.title = "Wind";
  const paraWind = document.createElement("p");
  paraWind.classList.add("para-wind");

  containerWind.appendChild(imgIconWind);
  containerWind.appendChild(paraWind);

  containerHumidity.appendChild(imgIconHumidity);
  containerHumidity.appendChild(paraHumidity);

  containerFeelsLike.appendChild(imgIconFeelsLike);
  containerFeelsLike.appendChild(paraFeelsLike);

  containerWeatherDetails.appendChild(containerFeelsLike);
  containerWeatherDetails.appendChild(containerHumidity);
  containerWeatherDetails.appendChild(containerWind);

  containerTempAndIcon.appendChild(paraTemp);
  containerTempAndIcon.appendChild(imgIcon);

  containerAddressAndConditions.appendChild(paraAddress);
  containerAddressAndConditions.appendChild(paraConditions);

  containerMainContent.appendChild(containerAddressAndConditions);
  containerMainContent.appendChild(containerTempAndIcon);
  containerMainContent.appendChild(containerWeatherDetails);

  parentNode.appendChild(containerMainContent);
}

function showData(jsondata) {
  const address = document.querySelector(".address");
  const conditions = document.querySelector(".conditions");
  const temp = document.querySelector(".temp");
  const iconWeather = document.querySelector(".icon-weather");
  const feelsLike = document.querySelector(".para-feels-like");
  const humidity = document.querySelector(".para-humidity");
  const wind = document.querySelector(".para-wind");

  console.log(jsondata);
  console.log(`City Name: ${jsondata.resolvedAddress}`);
  console.log(`Weather: ${jsondata.currentConditions.conditions}`);

  address.textContent = jsondata.resolvedAddress;
  conditions.textContent = jsondata.currentConditions.conditions;
  temp.textContent = `${jsondata.currentConditions.temp}`;
  feelsLike.textContent = `Feels Like: ${jsondata.currentConditions.feelslike}`;
  humidity.textContent = `Humidity: ${jsondata.currentConditions.humidity}%`;
  wind.textContent = `Wind Speed: ${jsondata.currentConditions.windspeed} km/h`;

  const iconName = jsondata.currentConditions.icon;
  const iconImg = import(`./assets/img/${iconName}.svg`);
  iconImg.then((module) => (iconWeather.src = module.default));
  iconWeather.alt = iconName;
}

export { getCityName, showData };
