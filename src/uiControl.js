import { getData } from "./controllerAPI";

const inputCityName = document.querySelector("#city-name");
const btnSearch = document.querySelector("#btn-search");
const address = document.querySelector(".address");
const conditions = document.querySelector(".conditions");
const temp = document.querySelector(".temp");
const iconWeather = document.querySelector("weather-icon");

function renderUI() {
  btnSearch.addEventListener("click", () => {
    const valueInputCityName = inputCityName.value;
    console.log("btn search on click");
    console.log(`nama kota = ${valueInputCityName}`);
    getData(valueInputCityName);
  });
}



export { renderUI };
