const API_KEY = 'ae8b592a4d0736f1adb3f5f954ecd77f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (city) => {
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return await response.json();
};


