import axios from 'axios';

const api = axios.create({
  baseURL: 'https://newsapi.org/v2',
});

export async function getNewsByCategory(category: string) {
  const response = await api.get(
    `/everything?q=${category}&apiKey=a50beddf93ff470e8959b3df561112a7`
    );
  return response.data;
}

// Get news by country
export async function getNewsByCountry(country: string) {
  const response = await api.get(
    `/top-headlines?country=${country}&apiKey=a50beddf93ff470e8959b3df561112a7`
  );
  return response.data;
}
  
