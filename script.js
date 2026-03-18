document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const errorMsg = document.getElementById('error-msg');

    // Elements to update
    const cityNameEl = document.getElementById('city-name');
    const currentTempEl = document.getElementById('current-temp');
    const currentDescEl = document.getElementById('current-desc');
    const currentIconEl = document.getElementById('current-icon');
    const forecastContainer = document.getElementById('forecast-container');
    const frogImageEl = document.getElementById('frog-image');
    const suggestionTextEl = document.getElementById('suggestion-text');
    const bodyEl = document.body;

    // Helper: Map WMO weather code to our categories
    function getWeatherInfo(code) {
        // 0: Clear
        // 1-3: Cloudy
        // 45, 48: Fog
        // 51-67, 80-82, 95-99: Rain
        // 71-77, 85-86: Snow
        if (code === 0) {
            return { type: 'bg-sunny', icon: 'ph-sun', text: 'Güneşli', frog: 'sunbathing_frog.png' };
        } else if ([1, 2, 3, 45, 48].includes(code)) {
            return { type: 'bg-cloudy', icon: 'ph-cloud', text: 'Bulutlu', frog: 'hat_frog.png' };
        } else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) {
            return { type: 'bg-rainy', icon: 'ph-cloud-rain', text: 'Yağmurlu', frog: 'umbrella_frog.png' };
        } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
            return { type: 'bg-snowy', icon: 'ph-snowflake', text: 'Karlı', frog: 'scarf_frog.png' };
        } else {
            return { type: 'bg-cloudy', icon: 'ph-cloud', text: 'Genelde Bulutlu', frog: 'hat_frog.png' };
        }
    }

    // Helper: Format date string to day name
    function getDayName(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', { weekday: 'short' });
    }

    // Main function to fetch weather
    async function fetchWeather(city) {
        try {
            errorMsg.style.display = 'none';
            searchBtn.textContent = '...';
            searchBtn.disabled = true;

            // 1. Geocoding
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=tr&format=json`);
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error("Şehir bulunamadı. Lütfen tekrar deneyin.");
            }

            const location = geoData.results[0];
            const lat = location.latitude;
            const lon = location.longitude;
            const displayName = location.name;

            // 2. Weather Foreacst (Current + 5 Days)
            // request 6 days daily because index 0 might be today, 1-5 next 5 days.
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`);
            const weatherData = await weatherRes.json();

            // 3. Update UI
            updateUI(displayName, weatherData);

        } catch (err) {
            errorMsg.textContent = err.message || "Bir hata oluştu.";
            errorMsg.style.display = 'block';
        } finally {
            searchBtn.textContent = 'Ara';
            searchBtn.disabled = false;
        }
    }

    function updateUI(city, data) {
        const current = data.current_weather;
        const daily = data.daily;

        // Setup current weather info
        const info = getWeatherInfo(current.weathercode);

        // Update Theme Background
        bodyEl.className = info.type;

        // Update Current Weather UI
        cityNameEl.textContent = city;
        const currentTemp = Math.round(current.temperature);
        currentTempEl.textContent = currentTemp;
        currentDescEl.textContent = info.text;
        currentIconEl.innerHTML = `<i class="ph ${info.icon}"></i>`;

        // Update Suggestion and Frog Image
        frogImageEl.src = info.frog;

        let finalSuggestion = "";

        if (info.type === 'bg-sunny') {
            if (currentTemp < 10) finalSuggestion = `Bugün hava güneşli ancak sıcaklık ${currentTemp}°C, dışarı çıkarken ceket almayı unutma!`;
            else if (currentTemp >= 10 && currentTemp <= 25) finalSuggestion = `Bugün ${currentTemp}°C ve tam bir yürüyüş havası, tadını çıkar!`;
            else finalSuggestion = `Hava çok sıcak (${currentTemp}°C)! İnce giyin ve güneş gözlüğünü takmayı unutma.`;
        } else if (info.type === 'bg-rainy') {
            if (currentTemp <= 10) finalSuggestion = `Hava ${currentTemp}°C ve yağmurlu. Kalın giyinip şemsiyeni mutlaka al!`;
            else finalSuggestion = `Bugün hava ${currentTemp}°C. Yağmur yağıyor, dışarı çıkarken şemsiyeni ihmal etme.`;
        } else if (info.type === 'bg-snowy') {
            finalSuggestion = `Hava ${currentTemp}°C ve karlı. Atkını, bereni ve kalın montunu mutlaka giy, üşütme!`;
        } else {
            // Cloudy
            if (currentTemp <= 10) finalSuggestion = `Hava kapalı ve oldukça soğuk (${currentTemp}°C). Kalın giyinmelisin.`;
            else if (currentTemp > 10 && currentTemp <= 20) finalSuggestion = `Hava ${currentTemp}°C ve kapalı. Serin olabilir, yanına bir ceket alman iyi olur.`;
            else finalSuggestion = `Bugün hava ${currentTemp}°C ve ılık. Rahat kıyafetler seçebilirsin.`;
        }

        suggestionTextEl.textContent = finalSuggestion;

        // Update 5-Day Forecast
        forecastContainer.innerHTML = '';

        // daily arrays contain up to 7 days, we want 5 days starting from tomorrow or today. Let's do 5 days including today
        for (let i = 0; i < 5; i++) {
            const dayCode = daily.weathercode[i];
            const maxTemp = Math.round(daily.temperature_2m_max[i]);
            const minTemp = Math.round(daily.temperature_2m_min[i]);
            const dayName = i === 0 ? 'Bugün' : getDayName(daily.time[i]);
            const dayInfo = getWeatherInfo(dayCode);

            const item = document.createElement('div');
            item.className = 'forecast-item';
            item.innerHTML = `
                <div class="forecast-day">${dayName}</div>
                <i class="ph ${dayInfo.icon} forecast-icon"></i>
                <div class="forecast-temp">${maxTemp}°</div>
                <div class="forecast-temp-min">${minTemp}°</div>
            `;
            forecastContainer.appendChild(item);
        }
    }

    // Event Listeners
    searchBtn.addEventListener('click', () => {
        const city = searchInput.value.trim();
        if (city) fetchWeather(city);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = searchInput.value.trim();
            if (city) fetchWeather(city);
        }
    });

    // Option to load a default city or just keep empty
    // Uncomment next line to load Istanbul default:
    // fetchWeather('İstanbul');
});
