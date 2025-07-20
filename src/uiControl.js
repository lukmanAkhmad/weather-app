import { getData } from "./controllerAPI";

const inputCityName = document.querySelector("#city-name");
const btnSearch = document.querySelector("#btn-search");

function renderUI() {
  btnSearch.addEventListener("click", () => {
    const valueInputCityName = inputCityName.value;
    console.log("btn search on click");
    console.log(`nama kota = ${valueInputCityName}`);
    getData(valueInputCityName);
  });
}

export { renderUI };
