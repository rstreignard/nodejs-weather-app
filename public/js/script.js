const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const cityOneTemperature = document.querySelector('#cityOneTemperature')
const cityOneFeelsLike = document.querySelector('#cityOneFeelsLike')
const cityOneWeatherDesc = document.querySelector('#cityOneWeatherDesc')

const cityTwoTemperature = document.querySelector('#cityTwoTemperature')
const cityTwoFeelsLike = document.querySelector('#cityTwoFeelsLike')
const cityTwoWeatherDesc = document.querySelector('#cityTwoWeatherDesc')

const cityThreeTemperature = document.querySelector('#cityThreeTemperature')
const cityThreeWeatherDesc = document.querySelector('#cityThreeWeatherDesc')
const cityThreeFeelsLike = document.querySelector('#cityThreeFeelsLike')

fetch('/weather?address=Dublin').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            /* messageOne.textContent = data.error; */
        } else {
            cityOneTemperature.textContent = data.forecast.temperature;
            cityOneFeelsLike.textContent = data.forecast.feels_like;
            cityOneWeatherDesc.textContent = data.forecast.weather_description;
        }
    })
})

fetch('/weather?address=Tokyo').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            /* messageOne.textContent = data.error; */
        } else {
            cityTwoTemperature.textContent = data.forecast.temperature;
            cityTwoFeelsLike.textContent = data.forecast.feels_like;
            cityTwoWeatherDesc.textContent = data.forecast.weather_description;
        }
    })
})

fetch('/weather?address=Singapore').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            /* messageOne.textContent = data.error; */
        } else {
            cityThreeTemperature.textContent = data.forecast.temperature;
            cityThreeFeelsLike.textContent = data.forecast.feels_like;
            cityThreeWeatherDesc.textContent = data.forecast.weather_description;
        }
    })
})

if (weatherForm) {

    weatherForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const location = search.value;

        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';

        fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = 'It\'s ' + data.forecast.temperature + '° now. ' + 'Feels like ' + data.forecast.feels_like + '°. ' + data.forecast.weather_description;
                }
            })
        })
    })
}






