import { useQuery } from 'react-query';
import {Product} from "@/types";
import {axiosQueryInstance} from "@/api/apiClient";
import axios from "axios";

const fetchProducts = async () => {
    const { data } = await axiosQueryInstance.get<Product[]>('/products');
    return data;
};

export const createProduct = async (product: {
    title: string;
    price: number;
    category: string;
    description: string;
    images: string[];
}) => {
    const response = await axios.post('https://fakestoreapi.com/products', product);
    return response.data;
};

export const useProducts = () => {
    return useQuery('products', fetchProducts);
};


