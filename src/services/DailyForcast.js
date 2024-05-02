const API_KEY = 'ae8b592a4d0736f1adb3f5f954ecd77f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';


export const getForecastByCity = async (city, days = 7) => {
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&cnt=${days}&units=metric`);
  console.log(response,"responsee in daily doractsee");
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  return await response.json();
};
