async function getData() {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/dieng?key=FFF5MD2W854NT8CK43BZBB5TT",
      { mode: "cors" },
    );
    const jsonResponse = await response.json();
    processData(jsonResponse);
    return jsonResponse;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}

function processData(jsondata) {
  console.log(jsondata);
  console.log(`City Name: ${jsondata.address}`);
  console.log(`Weather: ${jsondata.currentConditions.conditions}`);
}

export { processData, getData };
