import { getData } from "./controllerAPI";

import airIcon from "./assets/img/air.svg";
import humidityIcon from "./assets/img/humidity-percentage.svg";
import thermometerIcon from "./assets/img/thermometer.svg";

function getCityName() {
  const form = document.querySelector(".form-field");
  const inputCityName = document.querySelector("#city-name");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valueInputCityName = inputCityName.value;
    if (valueInputCityName === "") return;
    console.log("btn search on submit");
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

  const checkboxUnit = document.createElement("input");
  checkboxUnit.setAttribute("id", "checkbox-unit");
  checkboxUnit.setAttribute("type", "checkbox");
  checkboxUnit.setAttribute("value", "unit");
  checkboxUnit.classList.add("toggle-checkbox");
  const labelCheckbox = document.createElement("label");
  labelCheckbox.classList.add("label-container");
  labelCheckbox.setAttribute("for", "checkbox-unit");
  const labelCelsius = document.createElement("div");
  labelCelsius.textContent = "°C";
  const labelFahrenheit = document.createElement("div");
  labelFahrenheit.textContent = "°F";

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

  containerAddressAndConditions.appendChild(paraAddress);
  containerAddressAndConditions.appendChild(paraConditions);

  labelCheckbox.appendChild(labelCelsius);
  labelCheckbox.appendChild(labelFahrenheit);
  containerBtnUnit.appendChild(checkboxUnit);
  containerBtnUnit.appendChild(labelCheckbox);

  containerTempAndIcon.appendChild(paraTemp);
  containerTempAndIcon.appendChild(imgIcon);

  containerWind.appendChild(imgIconWind);
  containerWind.appendChild(paraWind);

  containerHumidity.appendChild(imgIconHumidity);
  containerHumidity.appendChild(paraHumidity);

  containerFeelsLike.appendChild(imgIconFeelsLike);
  containerFeelsLike.appendChild(paraFeelsLike);

  containerWeatherDetails.appendChild(containerFeelsLike);
  containerWeatherDetails.appendChild(containerHumidity);
  containerWeatherDetails.appendChild(containerWind);

  containerMainContent.appendChild(containerAddressAndConditions);
  containerMainContent.appendChild(containerBtnUnit);
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

  const addressData = jsondata.resolvedAddress;
  const conditionsData = jsondata.currentConditions.conditions;
  const temperatureData = Math.round(jsondata.currentConditions.temp);
  const feelsLikeData = Math.round(jsondata.currentConditions.feelslike);
  const humidityData = jsondata.currentConditions.humidity;
  const windData = Math.round(jsondata.currentConditions.windspeed);

  const checkboxUnit = document.querySelector("#checkbox-unit");
  checkboxUnit.addEventListener("change", () => {
    if (checkboxUnit.checked) {
      temp.textContent = "";
      const fahrenheitTempUnit = Math.round((temperatureData * 9) / 5 + 32);
      temp.textContent = `${fahrenheitTempUnit}°F`;
      feelsLike.textContent = "";
      const fahrenheitFeelsLikeUnit = Math.round((feelsLikeData * 9) / 5 + 32);
      feelsLike.textContent = `Feels Like: ${fahrenheitFeelsLikeUnit}°F`;
      wind.textContent = "";
      const mphWindUnit = Math.round(windData / 1.609344);
      wind.textContent = `Wind Speed: ${mphWindUnit} mph`;
    } else {
      temp.textContent = "";
      temp.textContent = `${temperatureData}°C`;
      feelsLike.textContent = "";
      feelsLike.textContent = `Feels Like: ${feelsLikeData}°C`;
      wind.textContent = "";
      wind.textContent = `Wind Speed: ${windData} km/h`;
    }
  });

  address.textContent = addressData;
  conditions.textContent = conditionsData;
  temp.textContent = `${temperatureData}°C`;
  feelsLike.textContent = `Feels Like: ${feelsLikeData}°C`;
  humidity.textContent = `Humidity: ${humidityData}%`;
  wind.textContent = `Wind Speed: ${windData} km/h`;

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

function renderErrorContent() {
  removeLoadingComponent();

  const form = document.querySelector(".form-field");
  const mainContainer = document.querySelector("#main-container");
  const containerMainContent = document.createElement("div");
  containerMainContent.setAttribute("id", "container-main-content");
  const paraErrorMessage = document.createElement("p");
  paraErrorMessage.classList.add("para-error-message");

  form.reset();
  paraErrorMessage.textContent = "City Not Found";

  containerMainContent.appendChild(paraErrorMessage);
  mainContainer.appendChild(containerMainContent);
}

export { getCityName, showData, createLoadingComponent, renderErrorContent };
