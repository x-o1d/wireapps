import { hookstate } from '@hookstate/core';

export interface ProductType {
  SKU: number,
  id: number,
  description: string,
  brandName: string,
  colour: string,
  name: string,
  price: {
    amount: string,
    currency: string,
  },
  sizes: string[],
  selectedSize: number,
  stockStatus: string,
  mainImage: string,
  count: number
}

export const Products = hookstate<ProductType[]>([]);
export const FilteredProducts = hookstate<ProductType[]>([]);
export const Cart = hookstate<ProductType[]>([]);