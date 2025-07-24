import { showData } from "./uiControl";

async function getData(cityName = "jakarta") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=FFF5MD2W854NT8CK43BZBB5TT`,
      { mode: "cors" },
    );
    const jsonResponse = await response.json();
    showData(jsonResponse);
  } catch (err) {
    console.log(err.message);
  }
}

export { getData };
