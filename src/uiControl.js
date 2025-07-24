import { getData } from "./controllerAPI";

const inputCityName = document.querySelector("#city-name");
const btnSearch = document.querySelector("#btn-search");
const pAddress = document.querySelector(".address");
const pConditions = document.querySelector(".conditions");
const pTemp = document.querySelector(".temp");
const iconWeather = document.querySelector(".weather-icon");

function getCityName() {
  btnSearch.addEventListener("click", () => {
    const valueInputCityName = inputCityName.value;
    console.log("btn search on click");
    console.log(`nama kota = ${valueInputCityName}`);
    getData(valueInputCityName);
  });
}

function showData(jsondata) {
  console.log(jsondata);
  console.log(`City Name: ${jsondata.resolvedAddress}`);
  console.log(`Weather: ${jsondata.currentConditions.conditions}`);

  pAddress.textContent = jsondata.resolvedAddress;
  pConditions.textContent = jsondata.currentConditions.conditions;
  pTemp.textContent = `${jsondata.currentConditions.temp}F`;
  const iconName = jsondata.currentConditions.icon;
  const iconImg = import(`./assets/img/${iconName}.svg`);
  iconImg.then((module) => (iconWeather.src = module.default));
  iconWeather.alt = iconName;
}

export { getCityName, showData };
