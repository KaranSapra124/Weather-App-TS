"use strict";
// 1863401e31784462a60170621252001
const city = document.getElementById("city");
const locationPin = document.getElementById("locationPin");
const btn = document.getElementById("btn");
const weatherDiv = document.getElementById("weatherDiv");
console.log(weatherDiv);
let long = 0;
let lat = 0;
// Functions
locationPin === null || locationPin === void 0 ? void 0 : locationPin.addEventListener("click", async () => {
    try {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                var _a, _b;
                long = (_a = position === null || position === void 0 ? void 0 : position.coords) === null || _a === void 0 ? void 0 : _a.longitude;
                lat = (_b = position === null || position === void 0 ? void 0 : position.coords) === null || _b === void 0 ? void 0 : _b.latitude;
            });
            setTimeout(async () => {
                const res = await weatherData("1863401e31784462a60170621252001", "");
                const { location, current } = res;
                displayWeather(location, current);
            }, 1000);
        }
    }
    catch (err) {
        // console.log(err,"ERROR")
        if (err.PERMISSION_DENIED) {
        }
    }
});
btn.addEventListener("click", async () => {
    const res = await weatherData("1863401e31784462a60170621252001", city.value);
    const { location, current } = res;
    displayWeather(location, current);
});
// Fetch Weather
const weatherData = async (key, city) => {
    const res = await fetch(city !== ""
        ? `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
        : `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}&aqi=no`);
    const data = await res.json();
    return data;
};
// Display Weather
const displayWeather = (location, current) => {
    console.log(location);
    weatherDiv.innerHTML = `<div class="flex mx-auto   gap-2">
    <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
    <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
    <div class="w-3 h-3 rounded-full animate-pulse bg-blue-600"></div>
</div>`;
    setTimeout(() => {
        weatherDiv.innerHTML = `
  <div class="bg-white/50 max-[600px]:flex-col flex justify-evenly items-center p-4 rounded-lg w-full shadow-md ">
    <img src="${current.condition.icon}" alt="${current.condition.text}" class="w-32 mb-4" />
   <div>
   <h2 class="text-5xl max-[600px]:text-sm max-[600px]:font-extrabold font-light text-blue-600 mb-2">${current.temp_c}°C</h2>
<p class="text-xl max-[600px]:text-xs max-[600px]:font-bold font-medium my-4 text-blue-600 mb-2">${location.name},${location.region}</p>
   <h1 class="text-xl max-[600px]:text-xs font-semibold text-gray-800 mb-2">${current.condition.text}</h1>
    <p class="text-gray-500 max-[600px]:text-sm">Humidity: ${current.humidity}%</p>
   </div>
  </div>
`;
    }, 2000);
};
