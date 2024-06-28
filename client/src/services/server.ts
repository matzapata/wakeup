

import axios, { AxiosInstance } from "axios";

export interface RestaurantDto {
    id: string;
    name: string;
}

export interface PaginatedRestaurantsDto {
    restaurants: RestaurantDto[];
    count: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ProductDto {
    id: string;
    name: string;
    price: number;
}

export interface PaginatedProductsDto {
    products: ProductDto[];
    count: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

class ServerApi {
    private api: AxiosInstance;

    constructor(baseUrl: string) {
        this.api = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async getRestaurants(page: number = 1, pageSize: number = 10): Promise<PaginatedRestaurantsDto> {
        // await new Promise((resolve) => setTimeout(resolve, 1000)) to showcase infinite scrolling
        const response = await this.api.get(`/restaurants?page=${page}&pageSize=${pageSize}`);
        return response.data;
    }

    async getRestaurantById(restaurantId: string): Promise<RestaurantDto> {
        const response = await this.api.get(`/restaurants/${restaurantId}`);
        return response.data;
    }

    async getRestaurantProducts(restaurantId: string, page: number = 1, pageSize: number = 10): Promise<PaginatedProductsDto> {
        const response = await this.api.get(`/restaurants/${restaurantId}/products?page=${page}&pageSize=${pageSize}`);
        return response.data;
    }

    async createOrder(restaurantId: string, items: { productId: string, quantity: number }[]) {
        const res = await this.api.post(`/restaurants/${restaurantId}/orders`, {
            items,
        });
        return res.data
    }

}

export const serverApi = new ServerApi(process.env.REACT_APP_SERVER_URL!);