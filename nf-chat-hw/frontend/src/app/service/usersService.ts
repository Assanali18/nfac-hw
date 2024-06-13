
import axios from 'axios';
import { User } from '../interfaces/user';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1/', // Укажите ваш базовый URL
    headers: {
      'Content-Type': 'application/json',
    },
  });

const useUserService = () => {

    const getAllUsers = async (): Promise<User[]> => {
        try {
          const response = await axios.get('https://nfac-hw-production-09a4.up.railway.app/api/v1/users');
          return response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };

    const getUserById = async(id: string): Promise<User | undefined> => {
        try {
            const response = await api.get(`users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return {getAllUsers, getUserById }
}

export default useUserService;