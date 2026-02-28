import axios from 'axios'

export const axiosInsance = axios.create({
        baseURL: 'www.themealdb.com/api/json/v1/1',
        timeout: 10000,
    }
);

axiosInsance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                throw new Error('Network error. Please check your connection.')
            }
            if (error.response.status === 404) {
                throw new Error('Resource not found.')
            }
            if (error.response.status === 429) {
                throw new Error('Too many requests. Please slow down.')
            }
            if (error.response.status >= 500) {
                throw new Error('Server error. Please try again later.')
            }
        }
        throw error
    }
)