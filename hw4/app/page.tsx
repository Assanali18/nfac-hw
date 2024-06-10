'use client'
import React from 'react';
import ProductList from "@/app/component/ProductList";
import Categories from "@/app/component/Categories";

export default function Home(){
    return(
        <div>
            <Categories/>
            <ProductList/>
        </div>
    )
}