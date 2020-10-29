const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const body = document.querySelector("body");
const forecast = new Forecast();


const updateUI = (data) => {

    //destructure properties
    const { cityDets, weather } = data;

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my4 temp">
          <span>${weather.Temperature.Metric.Value}</span>
          <span>&deg;c</span>
        </div>
    `;

    // update the night/day &icon image
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

    time.setAttribute("src", timeSrc);

    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none")
    };

};


cityForm.addEventListener("submit", e => {
    // prevent defualt
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    
    // set local storage
    localStorage.setItem("city", city)

});

if (localStorage.getItem("city")) {
   forecast.updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
};
