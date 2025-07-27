import { getData } from "./controllerAPI";

import airIcon from "./assets/img/air.svg";
import humidityIcon from "./assets/img/humidity-percentage.svg";
import thermometerIcon from "./assets/img/thermometer.svg";

function getCityName() {
  const btnSearch = document.querySelector("#btn-search");
  const inputCityName = document.querySelector("#city-name");

  btnSearch.addEventListener("click", () => {
    const valueInputCityName = inputCityName.value;
    console.log("btn search on click");
    console.log(`nama kota = ${valueInputCityName}`);
    getData(valueInputCityName);
  });
}

function createLoadingComponent() {
  const mainContainer = document.querySelector("#main-container");
  const containerLoading = document.createElement("div");
  containerLoading.setAttribute("id", "container-loading");

  removeContainerMainContent();
  mainContainer.appendChild(containerLoading);
}

function removeLoadingComponent() {
  const containerLoading = document.querySelector("#container-loading");
  containerLoading.remove();
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
  removeLoadingComponent();
  const mainContainer = document.querySelector("#main-container");
  removeContainerMainContent();
  renderMainContent(mainContainer);

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
  temp.textContent = `${jsondata.currentConditions.temp}°F`;
  feelsLike.textContent = `Feels Like: ${jsondata.currentConditions.feelslike}°F`;
  humidity.textContent = `Humidity: ${jsondata.currentConditions.humidity}%`;
  wind.textContent = `Wind Speed: ${jsondata.currentConditions.windspeed} km/h`;

  const iconName = jsondata.currentConditions.icon;
  const iconImg = import(`./assets/img/${iconName}.svg`);
  iconImg.then((module) => (iconWeather.src = module.default));
  iconWeather.alt = iconName;
}

function removeContainerMainContent() {
  const mainContainer = document.querySelector("#main-container");
  const containerMainContent = document.querySelector(
    "#container-main-content",
  );

  if (mainContainer.contains(containerMainContent)) {
    containerMainContent.remove();
  }
}

export { getCityName, showData, createLoadingComponent };
