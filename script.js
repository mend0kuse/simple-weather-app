let popup = document.querySelector('.popup')
let cityinput = document.querySelector('.popup__town')
let popupButton = document.querySelector('.popup__button')
let main = document.querySelector('.main')
let err = document.querySelector('.error')

popupButton.addEventListener('click', async (e) => {


	try {
		const response = await fetch(`http://api.weatherstack.com/current?access_key=322ac5cb345db55420fc6d0a6aa85ce0&query=${cityinput.value}`);
		let data = await response.json();
		// console.log(data);

		err.classList.remove('error-active')
		err.textContent = ''

		while (main.firstChild) {
			main.firstChild.remove()
		}
		popup.classList.add('popup-hide');
		switch (data.current.weather_icons.toString()) {
			case 'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png':
				main.style.background = '#96B5E5'
				break;
			case 'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png':
				main.style.background = '#C5C5C5'
				break;
			case 'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png':
				main.style.background = '#96B5E5'
				break;
			case 'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png':
				main.style.background = '#3C4A91'
				break;
			case 'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0017_cloudy_with_light_rain.png':
				main.style.background = '#C5C5C5'
				break;
			case 'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0003_white_cloud.png':
				main.style.background = '#96B5E5'
				break;
			case 'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0006_mist.png':
				main.style.background = '#C5C5C5'
				break;

			default:
				break;
		}

		let cityName = document.createElement('h1')
		cityName.innerHTML = data.location.name
		cityName.classList = 'city-name'
		cityName.addEventListener('click', (e) => {
			popup.classList.remove('popup-hide');
		})
		main.appendChild(cityName)

		let weatherCountry = document.createElement('p');
		weatherCountry.textContent = data.location.country
		weatherCountry.classList = 'weather-country'
		main.append(weatherCountry)

		let weatherTime = document.createElement('p');
		weatherTime.textContent = data.location.localtime
		weatherTime.classList = 'weather-time'
		main.append(weatherTime)

		let weatherImg = document.createElement('img');
		weatherImg.src = data.current.weather_icons
		weatherImg.classList = 'weather-img'
		main.append(weatherImg)

		let weatherDesc = document.createElement('p');
		weatherDesc.textContent = data.current.weather_descriptions
		weatherDesc.classList = 'weather-desc'
		main.append(weatherDesc)

		let weatherTemp = document.createElement('p');
		weatherTemp.textContent = data.current.temperature + ' ℃'
		weatherTemp.classList = 'weather-temp'
		main.append(weatherTemp)

	} catch (error) {
		popup.classList.remove('popup-hide');
		err.classList.add('error-active')
		err.textContent = 'Введите сущестующий город'
	}
})
