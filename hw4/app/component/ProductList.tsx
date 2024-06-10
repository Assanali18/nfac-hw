'use client'

import React from 'react';
import { useProducts } from '@/api/services/productsService';

const ProductList = () => {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <div className="text-center">Loading...</div>;
    if (error && error instanceof Error) return <div className="text-red-600 text-center">An error occurred: {error.message}</div>;

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {products?.map(product => (
                <div key={product.id} className="border rounded-lg p-2 shadow-md cursor-pointer">
                    <img src={product.image} alt={product.title} className="w-full h-48 object-contain rounded-t-lg" />
                    <div className="p-4 flex flex-col gap-2">
                        <h3 className="text-[16px] ">{product.title}</h3>
                        <p className="text-800 font-bold">{product.price}$</p>
                        <p className="text-sm text-gray-600 font-semibold">{product.category}</p>
                        <p className="text-sm text-gray-500 truncate">
                            {product.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
